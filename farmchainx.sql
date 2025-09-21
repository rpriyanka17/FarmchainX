CREATE DATABASE farmchainx;
CREATE USER 'farmuser'@'%' IDENTIFIED BY 'farmpassword';
GRANT ALL PRIVILEGES ON farmchainx.* TO 'farmuser'@'%';
FLUSH PRIVILEGES;


