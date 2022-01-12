const Pool = require("pg").Pool;
var passwd   = process.env.RT_DATABASE;

const pool = new Pool(
    {
    user: "postgres",
    password: passwd,
    database: "rt_database",
    host: "localhost",
    port: 5432
});

module.exports = pool;
