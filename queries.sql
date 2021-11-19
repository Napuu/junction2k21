CREATE TABLE journeys IF NOT EXISTS (
    id SERIAL PRIMARY KEY,
    j_date DATE,
    start_location INT,
    end_location INT,
    quantity INT
)

CREATE TABLE route IF NOT EXISTS (
    id INT PRIMARY KEY, -- alku- + loppupostinumero
    geom LINESTRING
)