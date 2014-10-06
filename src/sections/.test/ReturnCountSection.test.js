"use strict";

var ReturnCountSection = require('../ReturnCountSection');

module.exports = function() {
	test('works', function() {
		new ReturnCountSection().toString().should.eql('RETURN count(distinct $self)');
	});
};
