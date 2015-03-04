#Pōwst Office

##Introduction
Powst office is a simple mail catching solution for *NIX boxes designed to be lightweight and easy to use.  We use mostly testing emails on local and development drupal sites.

##Dependencies
1. PHP w/ Composer
2. MySql
3. Webserver (Apache, NGINX, etc.)

##Install
1. Clone the repo `/var/www/powst` or wherever you'd like to serve the front end from.
2. Run `bower install` and `composer install` to get the dependencies
3. Edit your php.ini file `sendmail_path` to point to `powst` in the root directory of this repo.
4. Chmod this file with executable permissions (755)
5. Create a MySql database with a read/write user and a table called `mail` comprised of the following columns
  * id - int (autoincrementing)
  * to_email - varchar
  * from - varchar
  * subject - varchar 
  * sent - timestamp (default to CURRENT_TIMESTAMP)
  * body - mediumtext
6. Edit the db config at the top of powst with the hostname, user, password, and database name.
7. Point your webserver at the repo
7. Restart Apache 

  