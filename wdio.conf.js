const base = require('./conf/base.conf');

//require('child_process').execSync('ls').toString()

exports.config = {
    ...base.config,
    services: [
        'selenium-standalone'
    ],
    //...require('./conf/selenium.conf').config,
    capabilities: [
        {
            browserName: 'chrome',
            "goog:chromeOptions": {
                //binary: `${require('puppeteer').executablePath()}`,
                args: [ 
                    ...[ !! process.env.SHOW ? '' : '--headless' ],
                    '--disable-gpu',
                    '--disable-infobars',
                    '--fast-start',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    //'--auto-open-devtools-for-tabs',
                ].filter(Boolean),
            }
        }
    ],
}
