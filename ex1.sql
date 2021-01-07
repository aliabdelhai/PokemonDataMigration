
use sql_intro;

CREATE TABLE pokemon_type(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    type VARCHAR(20)

);

-- DROP TABLE pokemon_type


CREATE TABLE trainer(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    town VARCHAR(20)
);

-- DROP TABLE trainer


CREATE TABLE town(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20)
);

-- DROP TABLE town;

CREATE TABLE pokemon( 
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(20),
    type VARCHAR(20),
    height SMALLINT,
    weight SMALLINT
);

-- DROP TABLE pokemon;

CREATE TABLE pokemon_trainer(
    pokemon_id INT,
    trainer_id INT,
    FOREIGN KEY(pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY(trainer_id) REFERENCES trainer(id)
);

-- DROP TABLE pokemon_trainer;



-- SELECT name 
-- FROM pokemon
-- WHERE type = "grass"


-- SELECT * FROM pokemon_trainer ORDER BY pokemon_id;
-- SELECT * FROM trainer;

 

-- SELECT MAX (t)
-- FROM (SELECT pokemon_id, COUNT(pokemon_id) as t
-- FROM pokemon_trainer
-- GROUP BY pokemon_id) as T;


-- SELECT p.name, COUNT(pt.trainer_id) AS owner_count 
-- FROM pokemon AS p, pokemon_trainer AS pt, trainer AS t
-- WHERE  pt.pokemon_id = p.id AND t.id = pt.trainer_id
-- GROUP BY p.name

-- SELECT pokemon_trainer.pokemon_id, COUNT(pokemon_trainer.pokemon_id)
-- FROM pokemon_trainer
-- GROUP BY pokemon_trainer.pokemon_id


