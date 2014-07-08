"use strict";

require('chai').should();

var nodeDescriptor = require('../node');
var NodeDescriptor = require('../node/LabeledNodeDescriptor');

suite('nodeDescriptor', function() {
	suite('with string parameter', function() {
		var bareNodeDescriptor;
		setup(function() {
			bareNodeDescriptor = nodeDescriptor('market')
		});
		test('is a BareNodeDescriptor', function() {
			bareNodeDescriptor.should.be.instanceOf(nodeDescriptor.Bare);
		});
		test('matchPart is its alias', function() {
			bareNodeDescriptor.matchPart().toString().should.eql('market');
		});
	});
	suite('with object parameter', function() {
		var labeledNodeDescriptor;
		test('is a BareNodeDescriptor', function() {
			labeledNodeDescriptor = nodeDescriptor({ label: 'CompetitorProduct' });
			labeledNodeDescriptor.should.be.instanceOf(nodeDescriptor.Labeled);
		});
		test('matchPart is ok', function() {
			labeledNodeDescriptor = nodeDescriptor({ label: 'CompetitorProduct', alias: 'product' });
			labeledNodeDescriptor.matchPart().toString().should.eql('(product:CompetitorProduct)');
		});
		test('default alias is lower case label', function() {
			labeledNodeDescriptor = nodeDescriptor({ label: 'Market' });
			labeledNodeDescriptor.matchPart().toString().should.eql('(market:Market)');
		});
	});
});
