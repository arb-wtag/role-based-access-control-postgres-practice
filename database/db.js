const { Pool }=require('pg');

const pool = new Pool({
    host: 'db',
    user: 'postgres',
    port: 5432,
    database: "rbacdb",
    password: process.env.DB_PASS
});

module.exports=pool;