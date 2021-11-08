CREATE DATABASE RT_database;

--\c into todo_database

CREATE TABLE expressions(
    expression_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);