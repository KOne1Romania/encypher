'use strict';

var _ = require('lodash-node');

var $tree = require('..').tree;
var $binary = require('..').binary;

var c_ID_EQ_15 = $binary({ value: 15 }),
    s_ID_EQ = 'id($self) = {id}';

function repeat(val, times) {
	return Array.apply(null, new Array(times)).map(_.constant(val));
}

module.exports = function() {
	suite('depending on child count', function() {
		test('empty string for none', function() {
			$tree({ children: [] }).queryObject().valueOf().should.eql({
				string: '',
				params: {}
			});
		});
		test('the child itself if one', function() {
			$tree({ children: [ $binary({ value: 15 }) ] }).queryObject().valueOf().should.eql({
				string: '(id($self) = {id})',
				params: { id: 15 }
			});
		});
		test('children joined by operator if two', function() {
			$tree({ op: 'and', children: [
				$binary({ value: 15 }),
				$binary({ field: 'name', value: 'someName' })
			] }).queryObject().valueOf().should.eql({
					string: '(id($self) = {id}) AND ($self.`name` = {name})',
					params: { id: 15, name: 'someName' }
				});
		});
		test('children joined by operator if more', function() {
			$tree({ op: 'or', children: repeat(c_ID_EQ_15, 3) }).queryObject().valueOf().should.eql({
				string: repeat('(' + s_ID_EQ + ')', 3).join(' OR '),
				params: { id: 15 }
			});
		});
	});
	suite('default', function() {
		test('children is []', function() {
			$tree({ op: 'or' }).queryObject().valueOf().should.eql({ string: '', params: {} });
		});
		test('empty map if no arg provided', function() {
			$tree().queryObject().valueOf().should.eql({ string: '', params: {} });
		});
	});
	test('context on one child works', function() {
		$tree({ children: [
			$binary({ value: 15, contextName: 'market' }),
			$binary({ field: 'name', value: 'someName' })
		] }).queryObject().valueOf().should.eql({
				string: '(id(market) = {marketId}) AND ($self.`name` = {name})',
				params: { marketId: 15, name: 'someName' }
			});
	});
	test('context on parent propagates to children', function() {
		$tree({
			children   : [
				$binary({ value: 15 }),
				$binary({ field: 'name', value: 'someName' })
			],
			contextName: 'market'
		}).queryObject().valueOf().should.eql({
				string: '(id(market) = {marketId}) AND (market.`name` = {marketName})',
				params: { marketId: 15, marketName: 'someName' }
			});
	});
};
