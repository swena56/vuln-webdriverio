
Testing BWAPP with webdriverio
==============================

A test suite for testing the top website vulnerabilities using webdriverio.

Setup Vulnerable Webserver
--------------------------

Use docker to create a bWAPP server.  After pulling the image

```bash
	docker pull raesene/bwapp
	docker run -d -p 80:80 raesene/bwapp 
```

Setup Test Suite
----------------

```bash
	npm install
	npm test 
```

Resources
---------
1) https://sourceforge.net/projects/bwapp/files/latest/download
2) https://sourceforge.net/projects/bwapp/files/bWAPP/
3) http://localhost/install.php
4) https://webdriver.io/