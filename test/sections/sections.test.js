"use strict";

var should = require('chai').should();

var $s = require('../../src/sections');
var $p = require('../../src/parts');

suite('sections', function() {

	suite('start', function() {
		test('default', function() {
			$s.start().toString().should.eql('START $self = node({id})');
		});
	});

	suite('optionalRels', function() {
		test('one relation', function() {
			$s.optionalRels($p.rel('COVERS', $p.node('Market'))).toString()
				.should.eql('OPTIONAL MATCH $self-[:COVERS]->(market:Market)');
		});
		test('two relations', function() {
			$s.optionalRels([
				$p.rel('COVERS', $p.node('Market')),
				$p.rel('SOLD_BY', 'product', { dir: 'inbound' })
			]).toString()
				.should.eql([
					'OPTIONAL MATCH $self-[:COVERS]->(market:Market)',
					'OPTIONAL MATCH $self<-[:SOLD_BY]-product'
				].join(' '));
		});
	});

	suite('returnResult', function() {
		test('string');
	});

});
