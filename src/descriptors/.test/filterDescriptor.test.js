'use strict';

var $filter = require('../filter');
var DescriptorArgsError = require('../../errors/DescriptorArgsError');

module.exports = function() {
	suite('self', function() {
		test('throws Error if it does not receive a valid nodeDescriptor format', function() {
			var call = function() { return $filter.self() };
			call.should.throw(DescriptorArgsError, /requires a `label`/);
		});
		test('just matches self if no conditions', function() {
			var noConditionsDescriptor = $filter.self({
				nodeDescriptor: { label: 'Competitor' }
			});
			testFilterDescriptor(noConditionsDescriptor, {
				matchString: '($self:Competitor)'
			});
		});
		test('adds condition if provided', function() {
			var conditionedDescriptor = $filter.self({
				nodeDescriptor: { label: 'Competitor' },
				conditions    : [
					{ value: 12 }
				]
			});
			testFilterDescriptor(conditionedDescriptor, {
				conditionsString: 'id($self) = 12'
			})
		});
		test('handles multiple conditions', function() {
			var conditionedDescriptor = $filter.self({
				nodeDescriptor: { label: 'Competitor' },
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
		test('simple', function() {
		});
	});
};

function testFilterDescriptor(descriptor, expected) {
	if (expected.matchString != null)
		return descriptor.matchPart().toString().should.eql(expected.matchString);
	if (expected.conditionsString != null)
		descriptor.conditionParts().join(', ').should.eql(expected.conditionsString);
}
