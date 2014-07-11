"use strict";

var NestedContextChain = require('../NestedContextChain');
var rootContextChain = require('../rootContextChain');

module.exports = function() {
	suite('NestedContextChain', function() {
		suite('one arg', testsForOneContext(new NestedContextChain(['a'])));
		suite('two args', testsForTwoNestedContexts(new NestedContextChain(['aa', 'bb'])));
		suite('one arg & nested in', testsForTwoNestedContexts(new NestedContextChain(['bb']).nestIn('aa')));
	});

	suite('rootContextChain', testsForRootContext(rootContextChain));
	var nestedInItself = rootContextChain.nestIn(rootContextChain);
	suite('rootContextChain & nest in itself', testsForRootContext(nestedInItself));
	suite('rootContextChain & nest in nothing', testsForRootContext(rootContextChain.nestIn()));
	suite('rootContextChain & nested in', testsForOneContext(rootContextChain.nestIn('a')));
	suite('rootContextChain & nested in twice',
		testsForTwoNestedContexts(rootContextChain.nestIn('bb').nestIn('aa')));
};

function testsForRootContext(rootContextChain) {
	return function() {
		test('value is $self', function() {
			rootContextChain.value().should.eql('$self');
		});
		test('with empty suffix is the name', function() {
			rootContextChain.withSuffix().should.eql('$self');
		});
		test('keeps only suffix if valid', function() {
			rootContextChain.withSuffix('s').should.eql('s');
		});
	}
}

function testsForOneContext(chain) {
	return function() {
		test('value is the name', function() {
			chain.value().should.eql('a');
		});
		test('with empty suffix is the name', function() {
			chain.withSuffix().should.eql('a');
		});
		test('adds valid suffix to the name with camelCase', function() {
			chain.withSuffix('s').should.eql('aS');
		});
	}
}

function testsForTwoNestedContexts(chain) {
	return function() {
		test('value is the names joined with underscore', function() {
			chain.value().should.eql('aa_bb');
		});
		test('with empty suffix is the camelCase joined names', function() {
			chain.withSuffix().should.eql('aaBb');
		});
		test('adds valid suffix to the name', function() {
			chain.withSuffix('S').should.eql('aaBbS');
		});
	}
}
