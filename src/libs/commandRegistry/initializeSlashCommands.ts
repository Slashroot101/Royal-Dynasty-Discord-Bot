import { Command } from "../../types";
import {discordToken, discordClientId, shouldCreateCommands} from "../config";
import logger from "../logger";
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v10';
import { upsertCommands } from "../commands/business";

export const initializeSlashCommand = async (): Promise<Map<string, Command>> => {
  const commands = (await import('./index')).default as Map<string, Command>;
  if(!discordToken || !discordClientId){
    logger.error('Discord token or client ID not set. Please set these in your .env file');
    throw new Error('Discord token or client ID not set. Please set these in your .env file');
}
  if(shouldCreateCommands){
      logger.info('Registering interactions with Discord');
      const rest = new REST({ version: '10' }).setToken(discordToken);
      logger.debug(`Creating command entries in database, cleaning up non-existent ones`)
      const createdCommands = await upsertCommands([...commands].map(([_, value]) => (value)))
      createdCommands.forEach(x => {
        logger.debug(`Setting metadata for command [${x.name}]`)
        const command = commands.get(x.name)
        if(!command){
          logger.warn(`Command ${x.name} not found in cache`)
          return
        }
        commands.set(x.name, {data: command.data, execute: command.execute, ...x})
        logger.debug(`Completed setting metadata for command [${x.name}]`)
      })
      logger.debug(`Completed creating command entries in database, cleaning up non-existent ones`)
      await rest.put(Routes.applicationCommands(discordClientId), { body: [...commands].map(([_, value]) => (value.data)) })
      logger.info('Succesfully created slash interactions with Discord');
  }

  return commands;
}