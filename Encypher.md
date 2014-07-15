#Encypher

- [Descriptors](#descriptors)
  - Node
    - 1. BareNode
    - 2. LabeledNode
  - Relation
  - Entity

## Descriptors
### Node
Describes a node. Can be of two types:

#### 1. BareNode
  
*Fields:*
* `string` [**alias** = '$self']

*Example:*
```js
{
  alias: 'movie'
}
// movie
```

#### 2. LabeledNode

*Fields:*
* `string` **label**
* `string` [**alias** = lowercase(label)]

*Example:*
```js
{
  label: 'Movie'
}
// (movie:Movie)
```

### Relation
Describes a relation between two [nodes](#node)

*Fields:*

* `string` **type** - the relation's type (e.g. `ACTS_IN`)  
* `string | object | Node` [**self** = '$self'] - the origin node. It is converted to an actual [Node](#node), if not one already:
 * `string` -> [BareNode](#1-barenode)  
 * `object` -> [LabeledNode](#2-labelednode)  
* `object | Node` **related** - the other [node](#node). Is converted to a LabeledNode if `object` provided  
* `string('inbound' | 'outbound')` [**direction** = 'outbound']  
* `string('one' | 'many')` [**cardinality** = 'many']  

*Examples:*

* with all fields provided:
```js
{
  type: 'SOLD_BY',
  self: { label: 'Competitor' },
  related: { label: 'CompetitorProduct', alias: 'product' },
  direction: 'inbound',
  cardinality: 'one'
}
// (competitor:Competitor)<-[:SOLD_BY]-(product:CompetitorProduct)
```
* minimum definition:  
```js
{
  type: 'COVERS',
  related: 'market'
}
// $self-[:COVERS]->market
```

### Entity
An entity is defined by the following:
* `string` **label** (e.g. 'Market')
* `[string]` **fields** - the fields that define the entity
* `[object | RelationDescriptor]` **relationDescriptors** - its [relations](#relation)

*Example*
```js
{
  label: 'Competitor',
  fields: ['name', 'coverage', 'status'],
  relationDescriptors: [
    {
      type: 'SOLD_BY',
      related: { label: 'CompetitorProduct', alias: 'product' },
      dir: 'inbound'
    },
    {
      type: 'COVERS',
      related: { label: 'Market' }
    }
  ]
}
```


|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  
|__  

end