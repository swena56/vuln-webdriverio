import Utility from '../page-objects/utility';
import HtmlReporter from './html-helper';
import BasePage from "../page-objects/base.page";
const fs = require('fs');
const sharp = require('sharp');
Utility.createDirectory('./errorShots');

/**
 * Helpful for analyzing and modifying images
 * TODO: add image diff
 *
 * example
 const headerScreenShot = new ImageHelper().takeElementScreenShot('#header').getBase64(null,350);
 */
export default class ImageHelper {

	constructor( cleanUp = false ){
		this.filename = Utility.getImageFileName();
		this.html = false;
		this.cleanup = cleanUp;
		return this;
	}

	enableHtml(title){
		this.html = true;
		this.title = title;
		return this;
	}

	takeScreenShot(){
		const screenShot = browser.saveScreenshot(this.filename);
		this.setBuffer(screenShot);
		//this.watchForFile(this.filename);
		return this;
	}

	takeElementScreenShot(elem){
		if( elem ){
			this.element = elem;
			const element = $(elem);
			if( element && element.isExisting() ){
				try{
					element.scrollIntoView();
					element.waitForDisplayed(15000);
					const size = element.getSize();
					if( size.height > 0 && size.width > 0 ){
						const screenShot = element.saveScreenshot(this.filename);
						this.setBuffer(screenShot);
						console.log(`Element Shot: ${elem}`);
					}
				} catch (e) {
					//console.log(`Failed to take shot: ${e}`);
				}
				//this.watchForFile(this.filename);
			}
		}
		return this;
	}

	watchForFile(file=this.filename){
		return browser.call(()=>{
			return new Promise( (resolve) => {
				fs.watch(file, (eventType) => {
					resolve(true);
				});
			}).catch( e => console.log(`error: ${e}`));
		});
	}

	setBuffer(buffer){
		this.buffer = buffer;
		return this;
	}

	bufferToBase64(buffer, height=null, width=null){
		this.setBuffer(buffer);
		return browser.call( () => {
			return this.getBase64Async(height, width);
		});
	}

	getBase64(height=null, width=null){
		const buffer = browser.call( () => {
			return this.getBase64Async(height, width);
		});
		return ( this.html ) ? HtmlReporter.imageElement(buffer) : buffer;
	}

	async getBase64Async(height=null, width=null){
		if( this.buffer ){
			expect( await Buffer.isBuffer(this.buffer) ).to.equal(true,"getBase64Async, no screenshot data");
			const imgBuff = await sharp(this.buffer).resize(height, width).toBuffer();
			const buffer = await imgBuff.toString('base64');
			this.cleanUp();
			return ( this.html ) ? HtmlReporter.imageElement(buffer) : buffer;
		}
	}

	cleanUp(){
		if( this.cleanup && fs.existsSync(this.filename) ){
			fs.unlinkSync(this.filename);
			this.filename = null;
		}
	}
}