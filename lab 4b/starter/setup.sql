CREATE DATABASE lab4b;
\c lab4b;
CREATE TABLE animals (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	age INT,
	species VARCHAR(25)
);
INSERT INTO animals (name, age, species) VALUES ('Test', 77, 'test');
