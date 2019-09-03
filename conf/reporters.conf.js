const video = require('wdio-video-reporter');
exports.config = {
	reporters: [
		'dot',
		'spec',
		['junit', {
			outputDir: './junit-results',
			outputFileFormat: function(options) {
				return `results-${(new Date()).getTime()}.xml`
			}
		}],
		//['json',{ outputDir: './allure-results/json'} ],
		[video, {
			outputDir: './allure-results/raw-video',
			saveAllVideos: false,
			videoSlowdownMultiplier: process.env.VIDEO_SLOW_DOWN || 5,
		}],
		['allure', {
			outputDir: './allure-results',
			disableWebdriverStepsReporting: true,
			disableWebdriverScreenshotsReporting: true,
		}],
	],
};