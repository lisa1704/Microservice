drop database if exists productDB;
create database productDB;
use productDB;

create table rating(
    id int not null auto_increment primary key,
    productId int not null ,
    rating int not null,
    raterId int not null
);