import {Pool} from 'pg'
import * as schema from './schemas'
import {db} from '../config'
import {drizzle} from 'drizzle-orm/node-postgres'
const pool = new Pool({
    database: "royal",
    host: db.host,
    username: db.username,
    password: db.password,
    port: db.port
})

export const database = drizzle(pool, {schema})