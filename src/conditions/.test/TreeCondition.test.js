'use strict';

var $tree = require('..').tree;
var $binary = require('..').binary;

module.exports = function() {
	suite('depending on child count', function() {
		test('empty string for none', function() {
			$tree({ children: [] }).toString().should.eql('');
		});
		test('the child itself if one', function() {
			$tree({ children: [ $binary({ value: 15 }) ] }).toString().should.eql('id($self) = 15');
		});
		test('children joined by operator if two', function() {
			$tree({ op: 'and', children: [
				$binary({ value: 15 }),
				$binary({ field: 'name', value: 'someName' })
			] }).toString().should.eql('(id($self) = 15 AND $self.`name` = "someName")');
		});
		test('children joined by operator if more', function() {
			$tree({ op: 'or', children: ['a', 'b', 'c'] }).toString().should.eql('(a OR b OR c)');
		});
	});
	suite('default', function() {
		test('op is AND', function() {
			$tree({ children: ['a', 'b'] }).toString().should.eql('(a AND b)');
		});
		test('children is []', function() {
			$tree({ op: 'or' }).toString().should.eql('');
		});
		test('empty map if no arg provided', function() {
			$tree().toString().should.eql('');
		});
	});
	test('context propagates to children', function() {
		$tree({ children: [
			$binary({ value: 15 }),
			$binary({ field: 'name', value: 'someName' })
		] }).on('other').toString().should.eql('(id(other) = 15 AND other.`name` = "someName")');
	});
};
