'use strict';

var $filter = require('../filter');
var DescriptorArgsError = require('../../errors/DescriptorArgsError');

module.exports = function() {
	suite('self', function() {
		test('throws Error if it does not receive a valid nodeDescriptor format', function() {
			var call = function() { return new $filter.Self() };
			call.should.throw(DescriptorArgsError, /`label` is required/);
		});
		test('just matches self if no conditions', function() {
			var noConditionsDescriptor = new $filter.Self({
				label: 'Competitor'
			});
			testFilterDescriptor(noConditionsDescriptor, {
				matchString: '($self:Competitor)',
				conditionsString: ''
			});
		});
		test('adds condition if provided', function() {
			var conditionedDescriptor = new $filter.Self({
				label: 'Competitor',
				conditions    : [
					{ value: 12 }
				]
			});
			testFilterDescriptor(conditionedDescriptor, {
				conditionsString: 'id($self) = 12'
			})
		});
		test('handles multiple conditions', function() {
			var conditionedDescriptor = new $filter.Self({
				label: 'Competitor',
				conditions    : [
					{ value: 12 },
					{ field: 'age', op: 'gt', value: 30 }
				]
			});
			testFilterDescriptor(conditionedDescriptor, {
				conditionsString: 'id($self) = 12, $self.`age` > 30'
			})
		});
	});
	suite('related', function() {
		test('throws Error for invalid relation descriptor', function() {
			var call = function() { return new $filter.Related() };
			call.should.throw(DescriptorArgsError, /invalid relationDescriptor/);
		});
		test('simple', function() {
			var noConditionDescriptor = new $filter.Related({
				relation: { type: 'COVERS', related: { label: 'Market' } }
			});
			testFilterDescriptor(noConditionDescriptor, {
				matchString: '$self-[:COVERS]->(market:Market)'
			});
		});
		test('simple inbound', function() {
			var noConditionDescriptor = new $filter.Related({
				relation: {
					direction: 'inbound',
					type: 'SOLD_BY',
					related: { label: 'Product' }
				}
			});
			testFilterDescriptor(noConditionDescriptor, {
				matchString: '$self<-[:SOLD_BY]-(product:Product)'
			});
		});
		test('one condition', function() {
			var conditionedDescriptor = new $filter.Related({
				relation: { type: 'COVERS', related: { label: 'Market' } },
				conditions: [
					{ value: 15 }
				]
			});
			testFilterDescriptor(conditionedDescriptor, {
				matchString: '$self-[:COVERS]->(market:Market)',
				conditionsString: 'id(market) = 15'
			});
		});
		test('with context', function() {
			var conditionedDescriptor = new $filter.Related({
				relation: { type: 'COVERS', related: { label: 'Market' } },
				conditions: [
					{ value: 15 }
				],
				context: 'competitor'
			});
			testFilterDescriptor(conditionedDescriptor, {
				matchString: 'competitor-[:COVERS]->(competitor_market:Market)',
				conditionsString: 'id(competitor_market) = 15'
			});
		});
	});
	suite('instanceCreator', function() {
		test('is selfFilter if label provided', function() {
			$filter({ label: 'Competitor' }).should.be.instanceOf($filter.Self);
		});
		test('is relatedFilter if relation provided', function() {
			$filter({ relation: { type: 'COVERS', related: { label: 'Market' } } })
				.should.be.instanceOf($filter.Related);
		});
	});
};

function testFilterDescriptor(descriptor, expected) {
	if (expected.matchString != null)
		descriptor.matchPart().toString().should.eql(expected.matchString);
	if (expected.conditionsString != null)
		descriptor.conditionParts().join(', ').should.eql(expected.conditionsString);
}
