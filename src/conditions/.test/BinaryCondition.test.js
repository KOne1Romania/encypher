'use strict';

var $binary = require('..').binary;

module.exports = function() {
	suite('defaults', function() {
		test('op defaults to eq', function() {
			$binary({ field: 'name', value: 'KFC' }).toString().should.eql('$self.`name` = "KFC"');
		});
		test('field defaults to id', function() {
			$binary({ value: 15 }).toString().should.eql('id($self) = 15');
		});
	});
	suite('ops', function() {
		test('lt', function() {
			$binary({ op: 'lt', value: 15 }).toString().should.eql('id($self) < 15');
		});
		test('gt', function() {
			$binary({ op: 'gt', value: 15 }).toString().should.eql('id($self) > 15');
		});
		test('ne', function() {
			$binary({ op: 'ne', value: 15 }).toString().should.eql('id($self) <> 15');
		});
		test('in', function() {
			$binary({ op: 'in', value: [15, 16] }).toString().should.eql('id($self) IN [15, 16]');
		});
		test('is', function() {
			$binary({ op: 'is', value: null }).toString().should.eql('id($self) IS NULL');
		});
		test('isnt', function() {
			$binary({ op: 'isnt', value: null }).toString().should.eql('id($self) IS NOT NULL');
		});
		test('regex', function() {
			$binary({ field: 'name', op: 'regex', value: ".*" }).toString()
				.should.eql('$self.`name` =~ "(?i).*"');
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
