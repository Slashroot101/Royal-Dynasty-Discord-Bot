const {Pool} = require('pg')
const dotenv = require('dotenv')
const {drizzle} = require('drizzle-orm/node-postgres')
const {migrate} = require('drizzle-orm/node-postgres/migrator')
dotenv.config({path: `${process.cwd()}/.env`})

const pool = new Pool({
    database: "royal",
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})
const db = drizzle(pool);
 
(async () => {
    await migrate(db, { migrationsFolder: "./migrations" });
})()
