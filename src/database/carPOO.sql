-- Active: 1698778687760@@127.0.0.1@3306

CREATE TABLE cars (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    marca TEXT NOT NULL,
    modelo TEXT UNIQUE NOT NULL,
    ano TEXT NOT NULL,
    created_at TEXT  
);

INSERT INTO cars (id, marca, modelo, ano)
VALUES
	('c001', 'Ford', 'Fusion', '2024'),
	('c002', 'Volkswagen', 'Golf', '2023');

DROP TABLE cars;
SELECT * FROM cars;