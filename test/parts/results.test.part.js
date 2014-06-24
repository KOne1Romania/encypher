module.exports = function(parts) {
	return function() {
		var $r = parts.results;

		suite('Node', function() {
			suiteForResultPart('taking name', $r.node('category'), {
				key  : 'category',
				value: 'category',
				alias: 'category'
			});
			suiteForResultPart('with parent', $r.node('market', 'competitor'), {
				key  : 'market',
				value: 'competitor_market',
				alias: 'market'
			});
		});

		suiteForResultPart('Property', $r.property('name', 'competitor'), {
			key  : 'name',
			value: 'competitor.name',
			alias: 'competitorName'
		});

		suiteForResultPart('Id', $r.id('competitor'), {
			key  : 'id',
			value: 'id(competitor)',
			alias: 'competitorId'
		});

		suiteForResultPart('Count', $r.count('category'), {
			key  : 'categoriesCount',
			value: 'count(category)',
			alias: 'categoriesCount'
		});

		suite('List of', function() {
			suiteForResultPart('strings', $r.list('category'), {
				key  : 'categories',
				value: 'collect(category)',
				alias: 'categories'
			});
			suiteForResultPart('nodes 2nd level', $r.list($r.node('market', 'competitor')), {
				key  : 'markets',
				value: 'collect(competitor_market)',
				alias: 'markets'
			});
			suiteForResultPart('strings with parent', $r.list('market', 'competitor'), {
				key  : 'markets',
				value: 'collect(competitor_market)',
				alias: 'markets'
			});
			suiteForResultPart('nodes with parent', $r.list($r.node('market'), 'competitor'), {
				key  : 'markets',
				value: 'collect(competitor_market)',
				alias: 'markets'
			});
			suiteForResultPart('properties', $r.list($r.property('name', 'category')), {
				key  : 'names',
				value: 'collect(category.name)',
				alias: 'categoryNames'
			});
			suiteForResultPart('ids', $r.list($r.id('category')), {
				key  : 'ids',
				value: 'collect(id(category))',
				alias: 'categoryIds'
			});
			suiteForResultPart('map', $r.list($r.map(['name'], 'category')), {
				key  : 'categories',
				value: 'collect({ name: category.name })',
				alias: 'categories'
			});
		});


		suite('Map with', function() {
			suiteForResultPart('one property', $r.map(['name'], 'competitor'), {
				key  : 'competitor',
				value: '{ name: competitor.name }',
				alias: 'competitor'
			});
			suiteForResultPart('many properties', $r.map(['name', 'coverage'], 'competitor'), {
				key  : 'competitor',
				value: '{ name: competitor.name, coverage: competitor.coverage }',
				alias: 'competitor'
			});
			suiteForResultPart('id', $r.map([$r.id()], 'competitor'), {
				key  : 'competitor',
				value: '{ id: id(competitor) }',
				alias: 'competitor'
			});
		});
	}
};

/**
 * Generates tests for a ResultPart
 * @param {ResultPart} part
 * @param {{ key: string, value: string, alias: string}} def
 * @param name
 */
function suiteForResultPart(name, part, def) {
	suite(name, function() {
		test('#key', function() {
			part.key.should.eql(def.key);
		});
		test('#value', function() {
			part.value.should.eql(def.value);
		});
		test('#alias', function() {
			part.alias.should.eql(def.alias);
		});
	});
}
