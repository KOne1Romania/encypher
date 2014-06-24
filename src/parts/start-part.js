"use strict";

function StartPart(nodeName, idName) {
	this.nodeName = nodeName || '$self';
	this.idName = idName || 'id';
}

StartPart.prototype.toString = function() {
	return [this.nodeName, '=', 'node({' + this.idName + '})'].join(' ');
};

module.exports = StartPart;
