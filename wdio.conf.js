require("@babel/register");
const base = require('./conf/base.conf');
let baseArgs = ! process.env.SHOW_UI ? ['--headless', '--disable-gpu'] : [];

let sauce = {
	services: ['sauce'],
	user: process.env.SAUCE_USERNAME,
	key: process.env.SAUCE_ACCESS_KEY,
};

exports.config = {
	...base.config,
    services: ['selenium-standalone'],
    capabilities: [
        {
            browserName: 'chrome',
            "goog:chromeOptions": {
                args: [ 
                    ...baseArgs,
                    '--disable-infobars',
					'--fast-start',
					'--auto-open-devtools-for-tabs',
                ],
            }
        }
    ],
}
