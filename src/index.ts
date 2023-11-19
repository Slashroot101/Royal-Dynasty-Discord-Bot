import logger from "./libs/logger"
import { initializeSlashCommand } from "./libs/commandRegistry/initializeSlashCommands";
import { Client, GatewayIntentBits } from "discord.js";
import { discordToken } from "./libs/config";
import handleInteractionCreate from "./events/handleInteractionCreate";
export default (async function() {
    logger.info('Bot is starting up');

    const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })


    logger.info('Registering slash commands');
    await initializeSlashCommand()
    logger.info('Completed slash command reigstration');
    
    client.on('interactionCreate', handleInteractionCreate)

    logger.info('Bot startup complete');
    await client.login(discordToken)
})()