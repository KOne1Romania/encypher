'use strict';

require('chai').should();

var $m = require('..');

suite('matchParts', function() {
	suite('node', function() {
		test('simple', function() {
			$m.node({ label: 'Market', alias: 'market' }).toString()
				.should.eql('(market:Market)');
		});
		test('nested', function() {
			$m.node({ label: 'Market', alias: 'market' }).of('competitor').toString()
				.should.eql('(competitor_market:Market)');
		});
	});
	suite('relation', function() {
		test('outbound', function() {
			$m.relation({
				self     : '$self',
				type     : 'COVERS',
				related  : 'market',
				direction: 'outbound'
			}).toString().should.eql('$self-[:COVERS]->market');
		});
		test('inbound', function() {
			$m.relation({
				self     : '$self',
				type     : 'SOLD_BY',
				related  : 'product',
				direction: 'inbound'
			}).toString().should.eql('$self<-[:SOLD_BY]-product');
		});
	});
});
