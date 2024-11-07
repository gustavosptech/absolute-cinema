CREATE DATABASE absolute_cinema;
USE absolute_cinema;

CREATE TABLE usuario (
id int primary key auto_increment,
nome varchar(50),
email varchar(100),
senha varchar(100)
);

SELECT * FROM usuario;