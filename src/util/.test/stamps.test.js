'use strict'

require('chai').should()
var _       = require('lodash'),
    stampit = require('stampit')

var stamps = require('../stamps')

suite('stamps', function() {
	suite('Forwarder', function() {
		var Forwarder = stamps.Forwarder

		test('one method', function() {
			var oneMethodProxy = stampit()
				.state({
					target: { one: _.constant(1) }
				})
				.compose(Forwarder({
					target: ['one']
				}))
			oneMethodProxy().one().should.eql(1)
		})

		test('two methods', function() {
			var target = {
				one: _.constant(1),
				two: _.constant(2)
			}
			var twoMethodsProxy = stampit()
				.state({
					target: target
				})
				.compose(Forwarder({
					target: ['one', 'two']
				}))
			twoMethodsProxy().two().should.eql(2)
		})

		test('methods calling one another', function() {
			var target = {
				_x: 1,
				x: function() {
					return this._x
				},
				xx: function() {
					return 2 * this.x()
				}
			}
			var nestedMethodsProxy = stampit()
				.state({ target: target })
				.compose(Forwarder({
					target: ['x', 'xx']
				}))
			nestedMethodsProxy().x().should.eql(1)
			nestedMethodsProxy().xx().should.eql(2)
		})
	})

	suite('Ensure', function() {
		var Ensure             = stamps.Ensure,
		    Point              = stampit().state({ x: 0, y: 0 }),
		    PointWrapper       = Ensure({ point: Point }),
		    PointsArrayWrapper = Ensure({ points: [Point] })

		test('keeps the object if it is already an instance', function() {
			var somePoint    = Point(),
			    pointWrapper = PointWrapper({ point: somePoint })
			pointWrapper.point.should.equal(somePoint)
		})

		test('makes a stamp if the object is not an instance', function() {
			var pointWrapper = PointWrapper({ point: {} })
			Point.fixed.methods.isPrototypeOf(pointWrapper.point).should.equal(true)
		})

		test('instantiate all objects if defined as array of Stamp', function() {
			var pointsArrayWrapper = PointsArrayWrapper({ points: [{}, {}] })
			_.all(pointsArrayWrapper.points, function(point) {
				return Point.fixed.methods.isPrototypeOf(point)
			}).should.equal(true)
		})
	})
})
