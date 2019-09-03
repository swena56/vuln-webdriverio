import Home from '../../page-objects/home.page';

describe('auth login forms', function () {
	it('Broken Auth. - Insecure Login Forms ba_insecure_login_1.php', function () {
		Home.login('/ba_insecure_login_1.php');
		Home.changeSecurityLevel('low');

	});
});