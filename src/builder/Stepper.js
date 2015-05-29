'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var steps = require('../steps')

function Stepper(stepNames) {
	var steps      = stepNames.map(makeStepperMethod),
	    methodsMap = _.zipObject(stepNames, steps)
	return stampit().methods(methodsMap)
}

function makeStepperMethod(stepName) {
	return function() {
		var stepBuilder = steps[_.capitalize(stepName)]
		if (stepBuilder == null) {
			throw Error('Step `' + stepName + '` not found!')
		}
		var step = stepBuilder.apply(steps, arguments)
		return this.addStep(step)
	}
}

module.exports = Stepper
