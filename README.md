#Encypher
---------
**Encypher** is a query builder for [Neo4j Cypher Query Language][cypher]. It follows a certain [model](#model), which will be described below, covering only a subset of all the possible query combinations, since _cypher_ is pretty complex.

###Usage
```sh
$ npm install --save git@github.com:Kalon/encypher.git
```

####Build
```js
var Encypher = require('encypher'),
    encypher = Encypher.base

var cypherBuilder = encypher.match('User').whereId(1).return()

assert.equal(cypherBuilder.toString(), 'MATCH ($main:User) WHERE id($main) = 1 return $main')
assert.deepEqual(cypherBuilder.valueOf(), {
  string: 'MATCH ($main:User) WHERE id($main) = {id} return $main',
  params: { id : 1 }
})
```

####Run
The built cypher can then be run using **`#run`**, which takes a `queryFunction`:
```js
var encypher = require('encypher').base

function someQueryFunction(string, params) {
  // must return a Promise with the query result(s)
}

var returnAllUsersCypher = encypher.match('User').return()
returnAllUsersCypher
  .run(someQueryFunction)
  .then(console.log)

```

Alternatively, **`Encypher.Runner`** factory method can be used, which creates a wrapper around a `queryFunction`:
```js
var EncypherRunner = require('encypher').Runner

var someEncypherRunner = EncypherRunner(someQueryFunction)

someEncypherRunner(returnAllUsersCypher).then(console.log)
```

###Model
**Encypher** centers its query model around stacks of nodes, with the bottom one being called `$main`. With each subsequent `match` another node is added to the stack, and at any point, the stack can be reset to `$main`. Most actions that are done (conditions, setting node data, deleting, etc.) are done on the top of the stack. Some actions, such as creating a new relation, also use the previous node on the stack, creating the relation between it and the top node. And there are also few that don't use the stack at all (e.g. `subset`).

####Features
This library is designed such as it makes **composing** query builders (will call them **encyphers**) very easy. For that, each **encypher** is *chainable* and *immutable*, so that all operations made on it (chaining, composing) create a new instance, rather than changing the existing one.

```js
// chaining
var matchUsers = encypher.match('User')

// immutable - matchUsers can be reused since its state is not altered
var returnUsers = matchUsers.return() // "MATCH ($main:User) return $main"
var deleteUsers = matchUsers.delete() // "MATCH ($main:User) delete $main"

// composable
var returnTenResults = encypher.return().subset({ limit: 10 })
var returnFirstTenUsers = matchUsers.compose(returnTenResults)

// or
returnFirstTenUsers = Encypher.compose(matchUsers, returnTenResults)
```

###Data types
####Node
`{ label:String, [alias:String = lowercase(label)] }`

```js
Node({ label: 'User', alias: 'user' })
Node({ label: 'User' })
Node('User')
// (user:User)
```

####RelationArc
`{ type:String, [arrow:<left|right> = right], [alias:String = ''] }`

```js
RelationArc('HAS_POST') // -[:HAS_POST]->
RelationArc({ type: 'WRITTEN_BY', arrow: 'left' }) // <-[:WRITTEN_BY]-

RelationArc({ type: 'HAS_POST', alias: '_r' }) // -[_r:HAS_POST]->
RelationArc({ type: 'HAS_POST', alias: '$default' }) // -[$r_has_post:HAS_POST]->
```

####Condition
- unary: `isNull`, `isNotNull`
    > ``{ field: 'name', op: 'isNull' }`` ``"$main.`name` IS NULL"``
- binary: `eq`, `ne`, `in`, `lt`, `gt`, `regex`
    > ``{ field: 'name', op: 'eq', value: 'John' }`` ``"$main.`name` = {name}" :: { name: 'John' }``
- nested: `and`, `or`
    > `{ and: [c1, c2, c3 ]}` `(c1 AND c2 AND c3)`
- negated: `not`
    > `{ not: condition }` `NOT condition`

####ResultOptions
`{ [select:<id|String|_>], [aggregate:<collect|count|_>]}`

```js
ResultOptions({ select: 'id' }) // id($main)
ResultOptions({ select: 'name' }) // $main.`name`
ResultOptions({ aggregate: 'count' }) // count($main)
ResultOptions({ select: 'id', aggregate: 'collect' }) // collect(id($main))
ResultOptions({}) // $main
```

####SubsetOptions
`{ [skip:Number][, limit:Number]}`

```js
SubsetOptions({ skip: 20, limit: 10 }) // SKIP 20 LIMIT 10
```

####OrderPart
`{ field:String[, direction:<asc|desc> = asc] }`

```js
OrderPart({ field: 'name', direction: 'desc' }) // $main.`name` DESC
OrderPart({ field: 'id' }) // id($main) ASC
OrderPart('age') // $main.`age` ASC
```

###API
---

####.match(node[, example])
Adds the [`node`](#node) onto the stack, and produces the `MATCH` query. The first node is the main node, and its alias is overridden with `$main`. The stack size is limited to 2 in this case, in order to avoid unnecessary Cartesian products, which tend to be very inefficient. When a 3rd `match` occurs, the stack is automatically [reset](#reset). An `example` object can be optionally provided, in order to filter out results based on it.
```js
var matchCypher = encypher.match('User').match('Post') // 'MATCH ($main:User) MATCH (post:Post)'
var matchByExampleCypher = encypher.match('User', { name: 'John' }) // 'MATCH ($main:User {data})' :: { data: { name: 'John' } }
```

---


####.optionalMatch(node[, example])
The same as [`.match`](#matchnode-example), only using `OPTIONAL MATCH`

---


####.create(node, data)
Creates a [`node`](#node) with the provided data.
```js
var createCypher = encypher.create('User', { name: 'John' }) // 'CREATE ($main:User {data})' :: { data: { name: 'John' } }
```

---


####.merge(node, data)
The same as [`.create`](#createnode-data), only using `MERGE` instead of `CREATE`.

---


####.matchRelation(relationArc, node)
Adds the [`node`](#node) onto the stack, while producing the query for matching the [relation](#relationarc) between the previous node and the current. It also keeps track of the relation alias, if one is provided.
```js
var matchUserAddress = encypher.match('User').matchRelation('HAS_ADDRESS', 'Address')
// 'MATCH ($main:User) MATCH $main-[:HAS_ADDRESS]->(address:Address)'

var matchUserAddressWithCity = matchAddressRelationCypher.matchRelation('IN_CITY', 'City')
// 'MATCH ($main:User) MATCH $main-[:HAS_ADDRESS]->(address:Address) MATCH address-[:IN_CITY]->(address_city:City)'
```

---


####.optionalMatchRelation(node[, example])
The same as [`.matchRelation`](#matchrelationrelationarc-node), only using `OPTIONAL MATCH`

---


####.where(condition)
Applies the given [`condition`](#condition) to the current node.
```js
var matchUserByName = encypher.match('User').where({ field: 'name', op: 'eq', value: 'John' })
// 'MATCH ($main:User) WHERE $main.`name` = {name}' :: { name: 'John' }
```
---


####.createRelation(relationArc)
Creates a relation between the last two [`node`s](#node) from the stack, while producing the query. It also resets the stack afterwards.
```js
var createUserHasAddress = encypher.match('User').match('Address').createRelation('HAS_ADDRESS')
// 'MATCH ($main:User) MATCH (address:Address) CREATE $main-[:HAS_ADDRESS]->address'
```

---


####.mergeRelation(node[, example])
The same as [`.createRelation`](#createrelationrelationarc), but with `MERGE`

---


####.fetch(resultOptions)
Stores the current top node as a result, using the given [`resultOptions`](#resultoptions). It produces and `WITH` clause of the previously stored results, plus the new one. The stored results can later be used in [`.returnExpanded`](#returnexpandedfields).
```js
var fetchTagIds = encypher.match('Post').matchRelation('HAS_TAG', 'Tag').fetch({ select: 'id', aggregate: 'collect' })
// 'MATCH ($main:Post) MATCH $main-[:HAS_TAG]->(tag:Tag) WITH $main, collect(id(tag)) as tagIds'
```

---


####.returnExpanded(fields)
Returns the current stack top as a map, containing the specified fields, as well as the stored results (using [`.fetch`](#fetchresultoptions)) 
```js
var returnPostTitleAndTagIds = encypher.match('Post')
    .matchRelation('HAS_TAG', 'Tag').fetch({ select: 'id', aggregate: 'collect' })
    .returnExpanded(['id', 'name'])
// 'MATCH ($main:Post) MATCH $main-[:HAS_TAG]->(tag:Tag) WITH $main, collect(id(tag)) as tagIds
//      RETURN { id: id($main), name: $main.`name`, tagIds: tagIds }
```

---


####.return([resultOptions])
Returns the `$main` node, optionally using the given [`resultOptions`](#resultoptions)
```js
var returnMainIdCypher = encypher.match('User').return({ select: 'id' }) // 'MATCH ($main:User) RETURN id($main)
```

---


####.reset()
Resets the stack back to `$main` node and produces `WITH distinct $main` clause. It is usually called internally by other steps (like [`.createRelation`](#createrelationrelationarc)), but it must be called explicitly in some situations.
```js
var resetCypher = encypher.match('Post')                // MATCH ($main:Post)
    .matchRelation('WRITTEN_BY', 'User').whereId(15)    // MATCH $main-[:WRITTEN_BY]->(user:User) WHERE id(user) = 15
    .reset()                                            // WITH distinct $self
    .matchRelation('HAS_TAG', 'Tag').whereId(31)        // MATCH $main-[:HAS_TAG]->(tag:Tag) WHERE id(tag) = 31
    .return()                                           // RETURN $main
```

---


####.subset(subsetOptions)
Applies *skip/limit* restriction to the returned result. It can be called after `WITH` steps (`.reset`, `fetch`) or `RETURN` ones (`.return`, `.returnExpanded`)
```js
var return10UsersAfterFirst20 = encypher.match('User') // MATCH ($main:User)
    .return().subset({ skip: 20, limit: 10 }) // RETURN $main SKIP 20 LIMIT 10
```

---


####.order(orderParts)
Applies ordering on the returned result. It should be called after `RETURN` clauses (`.return`, `.returnExpanded`)
```js
var sortUsersByNameAndAge = encypher.match('User')          // MATCH ($main:User)
    .return()                                               // RETURN $main
    .order(['name', { field: 'age', direction: 'desc' }])   // ORDER BY $main.`name` ASC, $main.`age` DESC
```

---


####.setNode(data)
Sets the current top node with `data`.
```js
var updatePost = encypher.match('Post').whereId(10)  // MATCH ($main:Post) WHERE ID = {id}  ::  { id: 10 }
    .setNode({ title: 'New Title' })                 // SET $main = {data}  ::  { data: { title: 'New Title' } }
```

---


####.setLabel(label)
Adds a new label to the current node.
```js
encypher.match('Post')      // MATCH ($main:Post)
    .whereId(10)            // WHERE ID = {id}  ::  { id: 10 }
    .setLabel('Archived')   // SET $main:Archived
```

---


####.removeLabel(label)
Removes a label from the current node.
```js
encypher.match('Post')          // MATCH ($main:Post)
    .whereId(10)                // WHERE ID = {id}  ::  { id: 10 }
    .removeLabel('Archived')    // REMOVE $main:Archived
```

---


####.delete()
Deletes the current node.
```js
encypher.match('Post').delete()  // MATCH ($main:Post) DELETE $main
```

---


####.deleteRelation()
Deletes the current relation.
```js
encypher.match('User')                                                  // MATCH ($main:User)
    .matchRelation({ type: 'HAS_ADDRESS', alias: '_r' }, 'Address')     // MATCH $main-[_r:HAS_ADDRESS]->(address:Address)
    .deleteRelation()                                                   // DELETE _r
```

---


[cypher]: http://neo4j.com/docs/stable/cypher-query-lang.html
