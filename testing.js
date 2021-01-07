
const data = require('./pokemons.json');
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:1234@localhost/sql_intro')

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })


const insertData = async function(p) {
    const query_type = `SELECT id FROM pokemon_type WHERE type='${p.type}'`
    const type_id = await sequelize.query(query_type)
    console.log(type_id[0][0].id)
    let query = `INSERT INTO pokemon VALUES (${p.id}, '${p.name}', ${type_id[0][0].id}, ${p.height}, ${p.weight} )`
    let result = await sequelize.query(query)
    return result[0]
}

const addPokemon = function (pokemons) {
    pokemons.forEach(p => insertData(p))
}

// addPokemon(data)


const addTrainer = async function (pokemons) {
    const arr = []
    pokemons.forEach(p => { 
        p.ownedBy.forEach(async o => {
            if(!arr.includes(o.name))
            {
                arr.push(o.name)
                const query_town = `SELECT id FROM town WHERE town='${o.town}'`
                const town_id = await sequelize.query(query_town)
                let query = `INSERT INTO trainer VALUES (null, '${o.name}', ${town_id[0][0].id})`
                let result = await sequelize.query(query)
                return result[0]

            }
        })
    })
}

// addTrainer(data)


const addToPokemonType = async function (pokemons) {
    let arr = []
    pokemons.forEach(async p => {
            if(!arr.includes(p.type)){
                arr.push(p.type)
                let query = `INSERT INTO pokemon_type VALUES (null, '${p.type}')`
                let result = await sequelize.query(query)
                return result[0]
            }

    })
}

// addToPokemonType(data)

const addToTown = async function (pokemons) {
    let arr = []
    pokemons.forEach(async p => {
            let towns = p.ownedBy.map(o => o.town)
            towns.forEach(async t => {
                if(!arr.includes(t)){
                    arr.push(t)
                    let query = `INSERT INTO town VALUES (null, '${t}')`
                    let result = await sequelize.query(query)
                    return result[0]
                }
            })
    })
}

// addToTown(data)



const addToPokemonTrainer = async function (pokemons) {
    pokemons.forEach(async p => {
        let pokemonID = p.id
        let owners = p.ownedBy.map(o => o.name)
        owners.forEach(async o => {
            let query1 = `SELECT id FROM trainer WHERE name='${o}'`
            result = await sequelize.query(query1)
            let ownerIds = result[0]
            let query2 = `INSERT INTO pokemon_trainer VALUES (${pokemonID}, ${ownerIds[0].id})`
            result2 = await sequelize.query(query2)
            console.log(result2[0])
        })
    })
}

// addToPokemonTrainer(data)


const heaviestPokemon = async function () {
    let heaviest;
    let query = `SELECT name
                 FROM pokemon
                 WHERE weight = (SELECT MAX(weight) FROM pokemon)`
    let result = await sequelize.query(query)
    heaviest = result[0][0].name
    console.log(heaviest)
}

// heaviestPokemon()


const findByType = async function (type) {
    let arr = []
    let query = `SELECT name 
                FROM pokemon 
                WHERE type=(SELECT id FROM pokemon_type WHERE type = '${type}') `
    let result = await sequelize.query(query)
    arr = result[0].map(p => p.name)
    console.log(arr)

}

// findByType('grass')

const findOwners = async function(name) {
    let arr = []
    let query = `SELECT trainer.name
                FROM pokemon_trainer, pokemon, trainer
                WHERE pokemon_trainer.pokemon_id = pokemon.id AND
                pokemon_trainer.trainer_id = trainer.id 
                AND pokemon.name = '${name}'
                `
    let result = await sequelize.query(query)
    arr = result[0].map(p => p.name)
    console.log(arr)

}

// findOwners("bulbasaur")


const findRoster = async function(name) {
    let arr = []
    let query = `SELECT pokemon.name
                FROM pokemon_trainer, pokemon, trainer
                WHERE pokemon_trainer.pokemon_id = pokemon.id AND
                pokemon_trainer.trainer_id = trainer.id 
                AND trainer.name = '${name}'
                `
    let result = await sequelize.query(query)
    arr = result[0].map(p => p.name)
    console.log(arr)
}


// findRoster("Loga")



const getMostOwnedPokemon = async function() {
    let mostOwned = await sequelize
                            .query(`SELECT pokemon.name, COUNT(pokemon_trainer.trainer_id) AS owner_count 
                                    FROM pokemon, pokemon_trainer, trainer
                                    WHERE  pokemon_trainer.pokemon_id = pokemon.id AND 
                                    trainer.id = pokemon_trainer.trainer_id
                                    GROUP BY pokemon.name ORDER BY COUNT(pokemon_trainer.trainer_id) DESC
                                    `)

    let maxOwners = mostOwned[0][0].owner_count
    let indexNotMax = mostOwned[0].findIndex(mo => mo.owner_count !== maxOwners)
    mostOwned[0].splice(indexNotMax)
    let namesMostOwned = []
    mostOwned[0].forEach(mo => namesMostOwned.push(mo.name))
    console.log(namesMostOwned)
}

// getMostOwnedPokemon()








