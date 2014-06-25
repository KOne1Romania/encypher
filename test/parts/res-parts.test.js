"use strict";

require('chai').should();

var $r = require('../../src/parts/res');

suite('Result Parts', function() {

	suite('node', function() {
		test('simple', function() {
			$r.node({ self: 'competitor' }).toString().should.eql('competitor');
		});
		test('default self', function() {
			$r.node().toString().should.eql('$self');
		});
		test('with self and child', function() {
			$r.node({ self: 'competitor', child: 'market' }).toString()
				.should.equal('competitor_market as competitorMarket')
		});
		test('with child and default self', function() {
			$r.node({ child: 'market' }).toString()
				.should.equal('market')
		});
	});

	suite('field', function() {
		test('with custom self', function() {
			$r.field('name', { self: 'competitor' }).toString()
				.should.equal('competitor.name as name')
		});
		test('with default self', function() {
			$r.field('name').toString()
				.should.equal('$self.name as name')
		});
		test('with nested opts', function() {
			$r.field('name', { self: 'competitor', child: 'market'}).toString()
				.should.equal('competitor_market.name as marketName')
		});
		test('with default self and child', function() {
			$r.field('name', { child: 'market'}).toString()
				.should.equal('market.name as marketName')
		});
	});

	suite('id', function() {
		test('with custom self', function() {
			$r.id({ self: 'competitor' }).toString()
				.should.equal('id(competitor) as id')
		});
		test('with default self', function() {
			$r.id().toString()
				.should.equal('id($self) as id')
		});
		test('with self and child', function() {
			$r.id({ self: 'competitor', child: 'market'}).toString()
				.should.equal('id(competitor_market) as marketId')
		});
		test('with default self and child', function() {
			$r.id({ child: 'market' }).toString()
				.should.equal('id(market) as marketId')
		});
	});

	suite.skip('collect', function() {
		test('string', function() {
			$r.collect('competitor').toString()
				.should.eql('collect(distinct competitor) as competitors');
		});
		test.skip('default node', function() {
			$r.collect($r.node()).toString()
				.should.eql('collect(distinct $self) as $selves');
		});
		test.skip('fields', function() {
			$r.collect($r.field('name')).toString()
				.should.eql('collect(distinct $self.name) as names');
		});
		test.skip('fields of child node', function() {
			$r.collect($r.field('name', $r.node({ child: 'competitor'}))).toString()
				.should.eql('collect(distinct competitor.name) as competitorNames');
		});
		test.skip('ids', function() {
			$r.collect($r.id()).toString()
				.should.eql('collect(distinct id($self)) as ids');
		});
		test.skip('ids of child nodes', function() {
			$r.collect($r.id($r.node({ child: 'competitor' }))).toString()
				.should.eql('collect(distinct id(competitor)) as competitorIds');
		});
	});

});
