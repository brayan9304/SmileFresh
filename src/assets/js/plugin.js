/*eslint-disable no-unused-vars*/
/*!
 * jQuery JavaScript Library v3.1.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-07-07T21:44Z
 */
( function( global, factory ) {

	"use strict";

	$(".sidebar-toggle").bind("click", function (e) {
	  $("#sidebar").toggleClass("active");
	  $(".app-container").toggleClass("__sidebar");
	});

	$(".navbar-toggle").bind("click", function (e) {
	  $("#navbar").toggleClass("active");
	  $(".app-container").toggleClass("__navbar");
	});

});
