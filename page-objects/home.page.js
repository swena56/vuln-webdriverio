import Base from './base.page';

class Home extends Base {

	get LOGIN_BUTTON(){ return $('button[type=submit]'); }
	get LOGIN_FIELD(){ return $('input#login'); }
	get PASSWORD_FIELD(){ return $('input#password'); }
	get SECURITY_DROPDOWN(){ return $('select[name=security_level]'); }
	get SECURITY_SET_BUTTON(){ return $('button[name=form_security_level]'); }

	changeSecurityLevel( level ){
		level = new String(level).toLowerCase();
		expect(
			level === 'low' ||
			level === 'medium' ||
			level === 'high'
		).to.equal(true, 
			`changeSecurityLevel needs parameter 1 (level) to be low, medium, or high, but got ${level}` 
		);
		expect(this.SECURITY_DROPDOWN.isExisting()).to.equal(true,
			'Security drop down does not exist'
		);
		this.SECURITY_DROPDOWN.selectByVisibleText(level);
		expect(this.SECURITY_SET_BUTTON.isExisting()).to.equal(true,
			'Security set button does not exist'
		);
		this.SECURITY_SET_BUTTON.click();
	}

	login(urlString){
		this.loadPage('/login.php');
		expect(
			$('#main h1').isExisting() &&
			$('#main h1').getText() === 'Login'
		).to.equal(true,'Login.php page does not have h1 innerHTML of Login');
		expect(this.LOGIN_BUTTON.isExisting()).to.equal(true);
		expect(this.LOGIN_FIELD.isExisting()).to.equal(true);
		expect(
			this.LOGIN_BUTTON.isExisting()
		).to.equal(true,"login button does not exist");
		this.LOGIN_FIELD.setValue('bee');
		expect(this.PASSWORD_FIELD.isExisting()).to.equal(true);
		this.PASSWORD_FIELD.setValue('bug');
		this.LOGIN_BUTTON.scrollIntoView();
		this.LOGIN_BUTTON.click();
		this.waitForPageload(1000);
		if(urlString){
			this.loadPage(urlString);
		}
	}

	logout(){}

}

exports.Home = Home;

export default new Home();