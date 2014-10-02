'use strict';

var OrderClause = require('../OrderClause');
var $orderPart = require('../../parts').order;

module.exports = function() {
	test('one order part as arg', function() {
		new OrderClause($orderPart({ field: 'name' })).toString().should.eql('ORDER BY $self.`name` ASC');
	});
	test('empty string if no order parts', function() {
		new OrderClause().toString().should.eql('');
	});
	test('DESC', function() {
		var withDistinctClause = new OrderClause($orderPart({ field: 'name', direction: 'desc' }));
		withDistinctClause.toString().should.eql('ORDER BY $self.`name` DESC');
	});
	test('an array of match parts as arg', function() {
		var matchClause = new OrderClause([
			$orderPart({ field: 'name' }),
			$orderPart({ field: 'date', direction: 'desc' })
		]);
		matchClause.toString().should.eql('ORDER BY $self.`name` ASC, $self.`date` DESC');
	});
};
