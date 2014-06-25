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

	suite('collect', function() {
		test('node', function() {
			$r.collect($r.node()).toString()
				.should.eql('collect(distinct $self) as $selves');
		});
		test('node with context self', function() {
			$r.collect($r.node(), { self: 'competitor'}).toString()
				.should.eql('collect(distinct competitor) as competitors');
		});
		test('node with context child', function() {
			$r.collect($r.node(), { child: 'market'}).toString()
				.should.eql('collect(distinct market) as markets');
		});
		test('node with both context child and self', function() {
			$r.collect($r.node(), { self: 'competitor', child: 'market'}).toString()
				.should.eql('collect(distinct competitor_market) as competitorMarkets');
		});
		test('fields', function() {
			$r.collect($r.field('name')).toString()
				.should.eql('collect(distinct $self.name) as names');
		});
		test('fields with context child', function() {
			$r.collect($r.field('name'), { child: 'competitor'}).toString()
				.should.eql('collect(distinct competitor.name) as competitorNames');
		});
		test('ids', function() {
			$r.collect($r.id()).toString()
				.should.eql('collect(distinct id($self)) as ids');
		});
		test('ids with context child', function() {
			$r.collect($r.id(), { child: 'competitor' }).toString()
				.should.eql('collect(distinct id(competitor)) as competitorIds');
		});
	});

});
