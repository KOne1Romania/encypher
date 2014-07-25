"use strict";

var nodeDescriptor = require('../node');

module.exports = function() {
	suite('BareNodeDescriptor', function() {
		test('is $self with no context', function() {
			new nodeDescriptor.Bare().toString().should.eql('$self');
		});
		test('is the alias when given', function() {
			new nodeDescriptor.Bare({ alias: 'market' }).toString().should.eql('market');
		});
		test('is its context name when it has context', function() {
			new nodeDescriptor.Bare({ context: 'market' }).toString().should.eql('market');
		});
		test('#withContext', function() {
			new nodeDescriptor.Bare().withContext('market').toString().should.eql('market');
		});
	});
	suite('LabeledNodeDescriptor', function() {
		test('toString is ok when label and alias provided', function() {
			var labeledNodeDescriptor = new nodeDescriptor.Labeled({
				label: 'CompetitorProduct',
				alias: 'product'});
			labeledNodeDescriptor.toString().should.eql('(product:CompetitorProduct)');
		});
		test('default alias is lower case label', function() {
			var labeledNodeDescriptor = new nodeDescriptor.Labeled({ label: 'Market' });
			labeledNodeDescriptor.toString().should.eql('(market:Market)');
		});
		test('with context', function() {
			new nodeDescriptor.Labeled({ label: 'Market', context: 'competitor' }).toString()
				.should.eql('(competitor_market:Market)');
		});
		test('#withContext', function() {
			new nodeDescriptor.Labeled({ label: 'Market' }).withContext('competitor').toString()
				.should.eql('(competitor_market:Market)');
		});
	});
	suite('instanceCreator', function() {
		test('makes a BareNodeDescriptor for no arg', function() {
			nodeDescriptor().should.be.instanceOf(nodeDescriptor.Bare);
		});
		test('makes a BareNodeDescriptor for arg with no label', function() {
			nodeDescriptor({ context: 'market' }).should.be.instanceOf(nodeDescriptor.Bare);
		});
		test('makes a LabeledNodeDescriptor when label provided', function() {
			nodeDescriptor({ label: 'A' }).should.be.instanceOf(nodeDescriptor.Labeled);
		});
	});
};
