const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'maxillaris',
    password: '123',
    port: 5432,
})
const getPersona = (request, response) => {
    pool.query('SELECT * FROM persona order by idPersona', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPersona = (request, response) => {
    const { nombres, apepaterno, apematerno, documento, fechanacimiento, email, direccion, region, provincia, distrito } = request.body

    pool.query('INSERT INTO Persona ( Nombres, ApePaterno, ApeMaterno, Documento, FechaNacimiento, Email, Direccion,Region,Provincia,Distrito) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11 )', [nombres, apepaterno, apematerno, documento, fechanacimiento, email, direccion,region,provincia,distrito], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`persona registrada con el ID: ${results.rows[0].id}`)
    })
}

module.exports = {
    getPersona,
    createPersona

}