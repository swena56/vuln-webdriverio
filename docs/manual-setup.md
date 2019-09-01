Manually setup 

Extract `bwapp-latest.zip`

```bash
unzip bwapp-latest.zip -d server
cd server/bWAPP
DIRS=(passwords images documents logs)
find ${DIRS[@]} | xargs -i chmod 777 '{}'


ls -lrt admin/settings.php
ln -s . /var/www/html/bWAPP

mysql -e "CREATE DATABASE IF NOT EXISTS bWAPP;"

cp -rf bWAPP /var/www/html/
```
