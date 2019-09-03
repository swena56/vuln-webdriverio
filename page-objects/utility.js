import fs from 'fs';
import url from 'url';

class Utility {
	get customRequest(){
		const request = require('request');
		return request.defaults({
			headers: {'User-Agent': 'user-agent1'}
		});
	}
    getFilesizeInBytes(filename) {
        if( fs.existsSync(filename) ){
            const stats = fs.statSync(filename);
            const fileSizeInBytes = stats.size;
            return fileSizeInBytes;
        } else {
            return 0;
        }
    }
    percentFixed(num){
        return parseFloat((num || 0) * 100.00).toFixed(2);
    }
    commify(num){
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    formatBytes(bytes,decimals){
       if(bytes == 0) return '0 Bytes';
       let k = 1024,
           dm = decimals <= 0 ? 0 : decimals || 2,
           sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
           i = Math.floor(Math.log(bytes) / Math.log(k));
       return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
	slugify(str) {
		return str.replace(/[\/:\#]/g, '-');
	}
	getTimeStamp(){
		return (new Date()).getTime();
	}
	getImageFileName(start=""){
    	let additionalText = this.slugify(start);
    	if( additionalText ){
			additionalText = `${additionalText}-`;
		}
		return `./errorShots/${ additionalText }${ this.generateUUID(12) }.png`;
    }
    sleep(seconds){
        return new Promise(resolve => setTimeout(resolve, (seconds || 1) * 1000));
    }
    generateUUID(size=20){
        return Buffer.from(require('crypto').randomBytes(size), 'base64').toString('hex');
    }
    uniqueSort(array){
        return array.filter(function(elem, pos) {
            return array.indexOf(elem) == pos;
        }).sort() || [];
    }
    randomizeArray(array){
        return arrray.sort( function() { return 0.5 - Math.random() } );
    }
    getLinksInElement(element="body"){
        const links = ( element && $(element).isExisting() ) ? $(element).$$('a').map( o => o.getAttribute('href') ) : [];
        return this.uniqueSort(links).filter(Boolean);
    }
    doesStringContainUuid(string){
        let regex = /.*[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}.*/;
        return regex.test(string.toLowerCase());
    }
    createDirectory(dir){
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		return dir;
    }
    isValidUrl(urlString){
      if( ! urlString ) return false;
      return !! urlString.match(new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"));
    }

	chunkify(array, size) {
        const chunked_arr = [];
        for (let i = 0; i < array.length; i++) {
          const last = chunked_arr[chunked_arr.length - 1];
          if (!last || last.length === size) {
            chunked_arr.push([array[i]]);
          } else {
            last.push(array[i]);
          }
        }
        return chunked_arr;
    }

	getAllComponentIds(){
		return browser.execute( function(){
			return Array.apply([], document.querySelectorAll('[id^="shop"]') ).map( o => o.id );
		});
	}

	/**
	 * Takes screenshot of element and returns base64 of element
	 * return data looks like this:
	 * @param element
	 * @param imageQuality
	 */
	elementScreenShot(elem){
		if( elem ){
			const filename = `./errorShots/${ this.generateUUID() }.png`;
			this.createDirectory('./errorShots');
			const element = $(elem);
			if( element && element.isExisting() ){
				element.scrollIntoView();
				element.waitForDisplayed();
				element.saveScreenshot(filename);
				const data = fs.readFileSync(filename);
				return browser.call(() =>{
					return new Buffer(data).toString('base64');
				});
			}
		}
	}

	async getHtml(urlString = null){
		if( ! urlString ) urlString = await browser.getUrl();
		const customRequest = await this.customRequest;
		return await new Promise(function (resolve, reject) {
			customRequest.get(urlString, function (error, response, resp) {
				if (! error && response && response['statusCode'] ) {
					resolve({
						href: urlString,
						status: response['statusCode'],
						body:  response.body,
					});
				} else {
					reject({
						href: urlString,
						status: 0,
						body: null,
					});
				}
			});
		});
	}

	testUrlStatusSync(urlString){
		const customRequest = this.customRequest;
		return new Promise(function (resolve, reject) {
			customRequest.get(urlString, function (error, response, resp) {
				if (! error && response && response['statusCode'] ) {
					//console.log(`${urlString} ${response.statusCode}`);
					resolve({
						href: urlString,
						status: response.statusCode,
						message: response.statusMessage,
					});
				} else {
					//console.log(`${urlString} ${error}`);
					reject({
						href: urlString,
						status: 0,
						message: 'Request Error',
					});
				}
			});
		});
	}

	async testUrlStatus(urlString){
		const customRequest = await this.customRequest;
		return await new Promise(function (resolve, reject) {
			customRequest.get(urlString, function (error, response, resp) {
				if (! error && response && response['statusCode'] ) {
					console.log(`${urlString} ${response.statusCode}`);
					resolve({
						href: urlString,
						status: response.statusCode,
						message: response.statusMessage,
					});
				} else {
					console.log(`${urlString} ${error}`);
					reject({
						href: urlString,
						status: 0,
						message: 'Request Error',
					});
				}
			});
		});
	}
}

export default new Utility();