DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR (50),
    restaurant_id INT,
    city VARCHAR (50),
    past_reviews INT,
    is_vip BOOLEAN NOT NULL, 
    date DATE NOT NULL DEFAULT CURRENT_DATE, 
    post VARCHAR (500),  
    food INT,
    service INT,
    ambience INT
);

-- EXECUTE THIS FILE IN COMMAND LINE BY TYPING:
-- psql -f <file_name> -U <username>
-- e.g. psql -f psqlschema.sql -U adrienne

-- To copy to psql, connect to your db e.g. reviews & type:
-- COPY reviews (name,restaurant_id,city,past_reviews,is_vip,date,post,food,service,ambience) 
--      FROM '/Users/adrienne/ghrsea01/reviews/testData.csv' DELIMITER ',' CSV HEADER;

-- To add primary key to records:
-- ALTER TABLE reviews ADD COLUMN ID SERIAL PRIMARY KEY;
