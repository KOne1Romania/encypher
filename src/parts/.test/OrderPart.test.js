'use strict';

var $order = require('..').order;

module.exports = function() {
	test('only field provided', function() {
		$order({ field: 'name' }).toString().should.eql('$self.`name` ASC');
	});
	test('field and direction provided', function() {
		$order({ field: 'name', direction: 'desc' }).toString().should.eql('$self.`name` DESC');
	});
};
