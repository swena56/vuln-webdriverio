
Testing BWAPP with webdriverio
==============================

A test suite for testing the top website vulnerabilities using webdriverio.

Setup Vulnerable Webserver
--------------------------

Use docker to create a bWAPP server.  After pulling the docker image

```bash
	/etc/init.d/docker start
	docker pull raesene/bwapp
	docker run -d -p 80:80 raesene/bwapp
	firefox http://localhost/install.php?install=yes
```

Test Suite
----------------

```bash
	npm install
	npm test
	npm test -- --suite injection 
```

Resources
---------
1) https://sourceforge.net/projects/bwapp/files/latest/download
2) https://sourceforge.net/projects/bwapp/files/bWAPP/
3) http://localhost/install.php
4) https://webdriver.io/