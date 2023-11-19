import { readdirSync } from "fs";
import { Command } from "../../types";
import logger from "../logger";
import path from "path";

const commands = new Map<string, Command>()
const commandFiles = readdirSync(path.resolve(process.cwd(), './src/commands')).filter(file => file.endsWith('.ts'));

for(const file of commandFiles){
  logger.debug(`Loading interaction ./src/libs/commands/${file}`)
  const command = require(`../../commands/${file}`).default as Command;
  console.log(command)
  if('data' in command && 'execute' in command){
    logger.debug(`Loaded interaction ${command.data.name}`);
    commands.set(command.data.name,  command);
  } else {
    logger.warn(`Failed to load interaction ${file}`)
    continue;
  }
  logger.debug(`Completed loading interaction ./src/libs/commands/${file}`)
}
logger.debug(`Finished loading interactions`);

export default commands