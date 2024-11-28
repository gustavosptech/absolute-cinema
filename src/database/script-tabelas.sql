CREATE DATABASE absolute_cinema;
USE absolute_cinema;

CREATE TABLE usuario (
id int primary key auto_increment,
nome varchar(50),
email varchar(100),
senha varchar(256)
);

CREATE TABLE filme (
idFilme int primary key auto_increment,
nome varchar(45),
genero varchar(45)
);

CREATE TABLE avaliacao (
idAvaliacao int auto_increment,
fkFilme int,
primary key (idAvaliacao, fkFilme),

fkUsuario int,
CONSTRAINT fkAvaliacaoUsuario foreign key (fkUsuario) references usuario(id),

avaliacao int,
dtAvaliacao date
);

CREATE TABLE endereco (
idEndereco int auto_increment,
fkUsuario int,

primary key (idEndereco, fkUsuario),

constraint fkEnderecoUsuario foreign key (fkUsuario) references usuario(id),

Pais varchar(50),
Cidade varchar(50),
Estado varchar(50)
);

SHOW TABLES;

SELECT * FROM usuario;
SELECT * FROM filme;
SELECT * FROM avaliacao;
SELECT * FROM endereco;

TRUNCATE TABLE endereco;

SELECT idEndereco, pais, estado, cidade FROM endereco WHERE fkUsuario = 7;

SELECT TRUNCATE(avg(avaliacao), 2) FROM avaliacao;