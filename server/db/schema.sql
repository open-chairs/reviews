DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

USE reviews;

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jdoc JSON
);

-- EXECUTE THIS FILE IN COMMAND LINE BY TYPING:
-- mysql -u <USER> < schema.sql