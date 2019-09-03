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

	global.chalk = require('chalk');

	browser.addCommand("highlight", function (color = 'red') {
		console.log(`element highlight: ${this.selector} with color: ${color}`);
		if( this.isExisting() ){
			this.execute((selector,color)=>{
				if (!window.highlighted) {
					window.highlighted = []
				}
				var element = window.$(selector);
				if (element.length > 0) {
					element.css({
						'border-color': color,
						'border-width': '3px',
						'border-style': 'solid',
						'border-radius': '5px'
					});
					window.highlighted.push(selector)
				}
			},this.selector,color);
		}
	},true);

	browser.addCommand('removeHighlights', () => {
		return browser.execute(() => {
			if (window.highlighted) {
				window.highlighted.forEach(function(selector) {
					window.$(selector)
						.css({
							'border-width': '0px'
						})
				});
				window.highlighted = []
			}
		});
	});
};
