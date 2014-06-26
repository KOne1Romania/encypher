"use strict";

var should = require('chai').should();

var $p = require('../../src/parts');

suite('parts', function() {

	suite('node', function() {
		test('when name provided', function() {
			$p.node('CompetitorProduct', 'product').toString().should.eql('(product:CompetitorProduct)');
		});
		test('when name not provided', function() {
			$p.node('CompetitorProduct').toString().should.eql('(competitorProduct:CompetitorProduct)');
		});
	});

	suite('relation', function() {
		test('default', function() {
			$p.rel('COVERS', 'market').toString().should.eql('$self-[:COVERS]->market');
		});
		test('converts type to uppercase', function() {
			$p.rel('covers', 'market').toString().should.eql('$self-[:COVERS]->market');
		});
		test('when other is a node', function() {
			$p.rel('COVERS', $p.node('Market')).toString().should.eql('$self-[:COVERS]->(market:Market)');
		});
		test('inbound', function() {
			$p.rel('SOLD_BY', $p.node('CompetitorProduct', 'product'), { dir: 'inbound' }).toString()
				.should.eql('$self<-[:SOLD_BY]-(product:CompetitorProduct)');
		});
		test('custom self', function() {
			$p.rel('COVERS', 'market', { self: 'competitor' }).toString()
				.should.eql('competitor-[:COVERS]->market')
		});
		test('relation name', function() {
			$p.rel('COVERS', 'market', { name: 'rel' }).toString()
				.should.eql('$self-[rel:COVERS]->market')
		});
	});

	suite('start', function() {
		test('default', function() {
			$p.start().toString().should.eql('$self = node({id})');
		});
	});
});
