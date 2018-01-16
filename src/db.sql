CREATE TABLE flipfinder.ff_flip_Model
(
    id int(20) PRIMARY KEY NOT NULL,
    name varchar(50),
    missions varchar(255)
);
CREATE TABLE flipfinder.ff_flipper
(
    id int(20) PRIMARY KEY NOT NULL,
    active varchar(20),
    add_date date,
    last_seen date,
    price1 int(11),
    price2 int(11),
    CONSTRAINT flipModel FOREIGN KEY (id) REFERENCES ff_flip_Model (id)
);
CREATE TABLE flipfinder.place
(
    id int(20) PRIMARY KEY NOT NULL,
    name varchar(200),
    address varchar(200),
    postalCode int(5),
    city varchar(100),
    schedule varchar(250),
    coord point,
    creation_date date
);