import dotenv from 'dotenv'

dotenv.config({path: `${process.cwd()}/.env`})

const config = {
    discordToken: process.env.DISCORD_TOKEN,
    discordClientId: process.env.DISCORD_CLIENT_ID,
    discordClientSecret: process.env.DISCORD_CLIENT_SECRET,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    shouldCreateCommands: true
}

export const { discordToken, discordClientSecret, discordClientId, db, shouldCreateCommands } = config