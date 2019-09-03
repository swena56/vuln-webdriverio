describe('Base64 Encoding (Secret)', function () {
		
		/*
			document.cookie secret
			Any Bugs
			https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
		*/
		it('easy', function () {
			//insecure_crypt_storage_3.php


			browser.execute(()=>{
				atob('ss')
			});
		});

		/*
			document.cookie secret
			Not decoded
		*/
		it('medium', function () {
			//insecure_crypt_storage_3.php


			browser.execute(()=>{
				atob('ss')
			});
		});


});