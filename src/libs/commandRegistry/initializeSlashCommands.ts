import { Command } from "../../types";
import {discordToken, discordClientId, shouldCreateCommands} from "../config";
import logger from "../logger";
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v10';

export const initializeSlashCommand = async (): Promise<Map<string, Command>> => {
  const commands = (await import('./index')).default as Map<string, Command>;
  if(!discordToken || !discordClientId){
    logger.error('Discord token or client ID not set. Please set these in your .env file');
    throw new Error('Discord token or client ID not set. Please set these in your .env file');
}
  if(shouldCreateCommands){
      logger.info('Registering interactions with Discord');
      const rest = new REST({ version: '10' }).setToken(discordToken);
      await rest.put(Routes.applicationCommands(discordClientId), { body: [...commands].map(([_, value]) => (value.data)) })
      logger.info('Succesfully created slash interactions with Discord');
  }

  return commands;
}