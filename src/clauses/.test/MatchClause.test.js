'use strict';

var MatchClause = require('../MatchClause');
var $matchParts = require('../../parts/match');

module.exports = function() {
	test('one match part as arg', function() {
		new MatchClause($matchParts.node({ label: 'Competitor', alias: 'competitor' })).toString()
			.should.eql('MATCH (competitor:Competitor)');
	});
	test('an array of match parts as arg', function() {
		var matchClause = new MatchClause([
			$matchParts.node({ label: 'Competitor', alias: 'competitor' }),
			$matchParts.node({ label: 'Activity', alias: 'activity' })
		]);
		matchClause.toString().should.eql('MATCH (competitor:Competitor), (activity:Activity)');
	});
};
