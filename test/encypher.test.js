var should = require('chai').should();

var encypher = require('../src/encypher');

suite('enchyper', function() {

//	test('#findOne', function() {
//			var query = encypher.findOne('Competitor', 12);
//			query.should.eql({
//				text: [
//					'START $self = node({id})',
//					'OPTIONAL MATCH $self-[:COVERS]->(market:Market)',
//					'OPTIONAL MATCH $self<-[:SOLD_BY]-(product:CompetitorProduct)',
//					'RETURN {',
//						'id: id($self),',
//						'name: $self.name,',
//						'marketIds: collect(distinct id(market)),',
//						'productIds: collect(distinct id(product)),',
//					'} as $self'
//				].join(' '),
//				params: {
//					id: 12
//				}
//			});
//		}
//	);

});
