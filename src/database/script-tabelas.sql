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
idAvaliacao int,
fkFilme int,
primary key (idAvaliacao, fkFilme),

fkUsuario int,
CONSTRAINT fkAvaliacaoUsuario foreign key (fkUsuario) references usuario(id),

avaliacao int,
dtAvaliacao date
);

SHOW TABLES;