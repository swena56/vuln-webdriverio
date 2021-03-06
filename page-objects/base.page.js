export default class Base {

        loadPage(url='/'){
                browser.url(url);
                this.waitForPageload();
        }

	waitForPageload(additionalWait=0){
                $('#main').waitForExist(20000,'Main element does not exist');

                browser.waitUntil(
                	() => {
                        return browser.execute('return document.readyState') === 'complete';
                	}, 
                	180000,
                	'Page not loaded completely within 180 seconds'
                );

                if( additionalWait && additionalWait > 0 ){
                	browser.pause(additionalWait);
                }
	}
}