'use strict';

var $binary = require('..').binary;

module.exports = function() {
	suite('#queryObject', function() {
		test('eq', function() {
			$binary({ op: 'eq', value: 15 }).queryObject().valueOf().should.eql({
				string: 'id($self) = {id}',
				params: { id: 15 }
			});
		});
		test('lt', function() {
			$binary({ field: 'age', op: 'lt', value: 15 }).queryObject().valueOf().should.eql({
				string: '$self.`age` < {maxAge}',
				params: { maxAge: 15 }
			});
		});
		test('gt', function() {
			$binary({ op: 'gt', value: 15 }).queryObject().valueOf().should.eql({
				string: 'id($self) > {minId}',
				params: { minId: 15 }
			});
		});
		test('ne', function() {
			$binary({ op: 'ne', value: 15 }).queryObject().valueOf().should.eql({
				string: 'id($self) <> {wrongId}',
				params: { wrongId: 15 }
			});
		});
		test('in', function() {
			$binary({ op: 'in', value: [15, 16] }).queryObject().valueOf().should.eql({
				string: 'id($self) IN {ids}',
				params: { ids: [15, 16] }
			});
		});
		test('regex', function() {
			$binary({ field: 'name', op: 'regex', value: ".*" }).queryObject().valueOf().should.eql({
				string: '$self.`name` =~ {nameRegex}',
				params: { nameRegex: '(?i).*' }
			});
		});
	});
	test('with context', function() {
		$binary({ value: 15 }).on('market').toString().should.eql('id(market) = 15');
	});
	test('with explicit nested context', function() {
		$binary({ value: 15, context: 'market' }).toString()
			.should.eql('id(market) = 15');
	});
};
