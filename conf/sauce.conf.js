exports.config = {
	user: process.env.SAUCE_USERNAME,
	key: process.env.SAUCE_ACCESS_KEY,
	services: [ 'sauce' ],
	capabilities: [
		{ tags:['@lv'], browserName: 'MicrosoftEdge', platform: 'Windows 10', version: '18.17763', exclude:[] },
	],
	beforeTest: () => {
		if( process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY ) {
			console.log(() => {
				const jobId = browser.sessionId;
				const authCode = crypto
					.createHmac('md5', `${process.env.SAUCE_USERNAME}:${process.env.SAUCE_ACCESS_KEY}`)
					.update(jobId)
					.digest('hex');
				return `https://app.saucelabs.com/tests/${jobId}?auth=${authCode}`;
			});
		} else {
			throw new Error("Missing env vars: SAUCE_USERNAME,SAUCE_ACCESS_KEY");
		}
	},
};