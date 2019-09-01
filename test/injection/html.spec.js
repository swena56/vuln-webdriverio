import Home from '../../page-objects/home.page';

describe('HTML injection', function () {
	
	/*
	* Reflected GET	
	*/
	it('reflected get - low', function () {
		Home.login();
		Home.loadPage('/htmli_get.php');
		$('#firstname').assertExistence();
		$('#lastname').assertExistence();
		$('select[name=security_level]').selectByVisibleText('low')
		const firstnamePayload = '<div id="firstnameInjected">firstname<div>';
		const lastnamePayload = '<div id="lastnameInjected">lastname<div>';
		$('#firstname').setValue(firstnamePayload);
		$('#lastname').setValue(lastnamePayload);
		$('form button').scrollIntoView();
		$('form button').click();
		Home.waitForPageload();
		expect($('#firstnameInjected').isExisting()).to.equal(true,'Injected HTML not detected in #firstname form element');
		expect($('#lastnameInjected').isExisting()).to.equal(true,'Injected HTML not detected in #lastname form element');	
	});

	it('reflected get - medium', function () {
		Home.login();
		Home.loadPage('/htmli_get.php');
		$('#firstname').assertExistence();
		$('#lastname').assertExistence();
		const firstnamePayload = '<div id="firstnameInjected">firstname<div>';
		const lastnamePayload = '<div id="lastnameInjected">lastname<div>';
		$('select[name=security_level]').selectByVisibleText('medium')
		$('#firstname').setValue(encodeURI(firstnamePayload));
		$('#lastname').setValue(encodeURI(lastnamePayload));
		$('form button').scrollIntoView();
		$('form button').click();
		Home.waitForPageload();
		expect($('#firstnameInjected').isExisting()).to.equal(true,'Injected HTML not detected in #firstname form element on medium');
		expect($('#lastnameInjected').isExisting()).to.equal(true,'Injected HTML not detected in #lastname form element on medium');
	});

	it('post', function () {
		'/htmli_post.php';
	});

	it('htmli_current_url.php', function () {
		Home.login();
		Home.loadPage('/htmli_current_url.php');
		assert(false);
	});
});