"use strict";

require('chai').should();

var $map = require('..').map;
var $id = require('..').id;
var $field = require('..').field;
var $collect = require('..').collect;
var QueryPartError = require('../../../errors/QueryPartError');

module.exports = function() {
	test('constructor throws error if no part provided', function() {
		$map.should.throw(QueryPartError, /requires.*parts/);
	});
	test('id', function() {
		$map($id()).toString()
			.should.eql('{ id: id($self) } as $self');
	});
	test('string', function() {
		$map('name').toString()
			.should.eql('{ name: $self.name } as $self');
	});
	test('id and field', function() {
		$map([$id(), $field('name')]).toString()
			.should.eql('{ id: id($self), name: $self.name } as $self');
	});
	test('one id with context', function() {
		$map([$id().of('competitor')]).toString()
			.should.eql('{ competitorId: id(competitor) } as $self');
	});
	test('one id with map context', function() {
		$map([$id()]).of('competitor').toString()
			.should.eql('{ id: id(competitor) } as competitor');
	});
	test('two parts with context', function() {
		$map([$id(), $field('name')]).of('competitor').toString()
			.should.eql('{ id: id(competitor), name: competitor.name } as competitor');
	});
	test('nested collect', function() {
		$map($collect($id()).of('market')).of('competitor').toString()
			.should.eql('{ marketIds: collect(distinct id(competitor_market)) } as competitor');
	});
	test('nested map', function() {
		$map($map($field('name')).of('competitor')).toString()
			.should.eql('{ competitor: { name: competitor.name } } as $self');
	});
	test('nested map', function() {
		$map($map($field('name')).of('competitor')).toString()
			.should.eql('{ competitor: { name: competitor.name } } as $self');
	});
	test('double nested map', function() {
		var parentMap = $map($id()).of('parent');
		var competitorMap = $map(parentMap).of('competitor');
		var resultMap = $map(competitorMap);
		resultMap.toString()
			.should.eql('{ competitor: { parent: { id: id(competitor_parent) } } } as $self');
	});
};
