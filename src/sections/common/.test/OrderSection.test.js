'use strict';

var OrderSection = require('../OrderSection');

module.exports = function() {
	test('simple', function() {
		new OrderSection({
			orderParts: [ { field: 'name' } ]
		}).toString().should.eql('ORDER BY $self.name ASC');
	});
	test('none', function() {
		new OrderSection().toString().should.eql('');
	});
};
