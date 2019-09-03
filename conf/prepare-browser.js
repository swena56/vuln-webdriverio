"use strict";

exports.configure = function (browser) {

	var chai = require('chai');
	global.expect = chai.expect;
	global.assert = require('assert');
	chai.config.includeStack  = true;
	chai.config.showDiff = true;
	chai.should();

	require("@babel/register");

	browser.addCommand("assert", function () {
		expect(
                this &&
                this.selector &&
                this.isExisting()
        ).to.equal(true,`Element '${this.selector}' does not exist`);
        return this;
	}, true);

	// browser.addCommand('highlight', function(selector, color='red') {

	// 	function highlightElement(selector) {
	// 		const xPathToCss = require('xpath-to-css');
	// 		if (selector.substr(0, 1) === '/') {
	// 			if (selector.includes('text')) {
	// 				console.log(`Cannot highlight element that uses "text" value as part of its selector`)
	// 			} else {
	// 				selector = xPathToCss(selector)
	// 			}
	// 		}
	// 		const result = browser
	// 			.execute(function(selector,color) {
	// 				if (!window.highlighted) {
	// 					window.highlighted = []
	// 				}
	// 				let element = window.$(selector);
	// 				if (element.length > 0) {
	// 					element.css({
	// 						'border-color': color,
	// 						'border-width': '3px',
	// 						'border-style': 'solid',
	// 						'border-radius': '5px'
	// 					});
	// 					window.highlighted.push(selector)
	// 				}
	// 				return element.length
	// 			}, selector, color);

	// 		if (result.value === 0) {
	// 			console.log(`Element not found!`)
	// 		}
	// 	}

	// 	if (selector) {
	// 		highlightElement(selector)
	// 	} else {
	// 		const element = this.element(selector);
	// 		if (element.state === 'success') {
	// 			highlightElement(element.selector)
	// 		}
	// 	}
	// });

	// browser.addCommand('removeHighlights', () => {
 //        return browser.execute(function(selector) {
 //            if (window.highlighted) {
 //                window.highlighted.forEach(function(selector) {
 //                    window.$(selector)
 //                        .css({
 //                            'border-width': '0px'
 //                        })
 //                })
 //                window.highlighted = []
 //            }
 //        })
 //    })
};
