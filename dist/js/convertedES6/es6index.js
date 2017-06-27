"use strict";

var x = function x(n) {
	return n + 1;
};

var y = 3.1415;

function f() {
	console.log("I'm outside");
}
(function () {
	if (false) {
		var _f = function _f() {
			console.log('I am inside');
		};
	}
	f();
})();

var o = function o(t) {
	return t + 3;
};