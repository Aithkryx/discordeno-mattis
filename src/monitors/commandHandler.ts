import { Message } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts';
import { logGreen, logRed } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/utils/logger.ts';
import { configs } from '../../configs.ts';
import { botCache } from '../../mod.ts';
// import { cache } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/utils/cache.ts';
import * as functions from '../utils/functions.ts';

export const commandHandler = async (message: Message) => {
  if (message.author().bot()) return;

  const guildId = message.guild_id();

  const prefix = functions.checkPrefix(guildId);

  if (!message.content().startsWith(prefix) && !message.content().startsWith('-'))
    return;

  const [commandName, ...args] = message.content().substring(prefix.length).split(' ');

  const command = functions.checkCommand(commandName);
  if (!command)
    return;

  if (!configs.developers.includes(message.author().id())) {
    if (command.devOnly)
      return;
    if (command.nsfw && !message.guild_id() || message.guild_id() && !message.channel()?.nsfw())
      return functions.errorMessage(message, 'This command is NSFW, but this is not a NSFW channel!');
  }
  if (command.guildOnly && !guildId)
    return functions.errorMessage(message, 'This command can only be used on a guild!');
  if (command.requiresArgs && !args.length)
    return functions.errorMessage(message, "This command requires args, but you didn't provide any!");

  try {
    await command.callback(message, args);
  }
  catch (error) {
    logRed(error);
  }
};