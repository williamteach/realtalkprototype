const Pool = require("pg").Pool;

const pool = new Pool(
    {
    user: "postgres",
    password: "R@TW00Dbull",
    database: "rt_database",
    host: "localhost",
    port: 5432
});

module.exports = pool;