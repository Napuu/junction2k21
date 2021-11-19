CREATE TABLE IF NOT EXISTS journeys  (
    id SERIAL PRIMARY KEY,
    j_date DATE,
    start_location INT,
    end_location INT,
    quantity INT
);

CREATE TABLE IF NOT EXISTS route (
    id INT PRIMARY KEY, -- alku- + loppupostinumero
    geom Geometry(LINESTRING)
);
