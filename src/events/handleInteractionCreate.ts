import { Interaction, InteractionResponse } from "discord.js";
import commandCache from '../libs/commandRegistry'
import logger from "../libs/logger";

export default async function(interaction: Interaction): Promise<void>{
    if(interaction.isChatInputCommand()){
        const command = commandCache.get(interaction.commandName)

        if(!command){
            logger.warn(`Command ${interaction.commandName} not found in cache`)
            interaction.reply({content: 'Command not found', ephemeral: true})
            return
        }

        logger.debug(`Executing command ${interaction.commandName}`)
        try {
            await command.execute(interaction)
        } catch (error) {
            logger.error(`Error executing command ${interaction.commandName} ${error}`)
            await interaction.reply({content: 'There was an error while executing this command', ephemeral: true})
        }
    }
}