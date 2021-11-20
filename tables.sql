CREATE TABLE IF NOT EXISTS journeys (
	id SERIAL PRIMARY KEY,
	j_date DATE,
	postinro VARCHAR(6),
	kotipostinro VARCHAR(6),
	kunta VARCHAR(20),
	maakunta VARCHAR(20),
	kotikunta VARCHAR(20),
	kotimaakunta VARCHAR(20),
	lkm FLOAT
);

CREATE TABLE IF NOT EXISTS route (
    id TEXT PRIMARY KEY, -- alku- + loppupostinumero
    geom Geometry(LINESTRING)
);

