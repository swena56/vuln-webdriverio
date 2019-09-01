
Setup Mysql
===========



```
/etc/init.d/mysql start
```

```sql
use mysql;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'PASSWORD';
update user set authentication_string=password('NEWPASSWORD') where user='root';
flush privileges;
```
mysqladmin -u root PASSWORD NEWPASSWORD


```
create user 'bwapp'@'localhost' identified by 'PASSWORD';
grant all privileges on bwapp.* to 'bwapp'@'localhost' identified by 'PASSWORD';
```

```
 php -a
$con = mysqli_connect("127.0.0.1","bwapp","PASSWORD","bwapp");
```