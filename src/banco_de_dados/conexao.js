const {Pool} = require('pg')


const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'canon95',
    database: 'bd_inovahub'
})


const query = (text, param) => {
    return pool.query(text, param)
}

module.exports =  {
    query
}