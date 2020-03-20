import { Message } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts';
import { logGreen, logRed } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/utils/logger.ts';
import { configs } from '../../configs.ts';
import { botCache } from '../../mod.ts';
// import { cache } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/utils/cache.ts';

export const commandHandler = async (message: Message) => {
  if (message.author().bot()) return;

  const guildId = message.guild_id();

  const prefix = checkPrefix(guildId);

  if (!message.content().startsWith(prefix) && !message.content().startsWith('-'))
    return;

  const [commandName, ...args] = message.content().substring(prefix.length).split(' ');

  const command = checkCommand(commandName);
  if (!command)
    return;

  if (command.devOnly && !configs.developers.includes(message.author().id()))
    return;
  if (command.guildOnly && !guildId)
    return message.channel().send_message('This command can only be used on a guild!');
  if (command.requiresArgs && !args.length)
    return message.channel().send_message("This command requires args, but you didn't provide any!");

  try {
    await command.callback(message, args);
  }
  catch (error) {
    logRed(error);
  }
};

export const checkPrefix = (
  guildId: string | undefined
) => {
  const prefix = guildId
    ? botCache.guild_prefixes.get(guildId)
    : configs.prefix;
  return prefix || configs.prefix;
};

export const checkCommand = (commandName: string) => {
  const command = botCache.commands.get(commandName);
  if (command) return command;

  // Check aliases if the command wasn't found
  const alias = botCache.command_aliases.get(commandName);
  if (!alias) return;

  return botCache.commands.get(alias);
};

export const logCommand = (
  message: Message,
  guildName: string,
  type: string
) => {
  logGreen(`[COMMAND - ${type}] by ${message.author().tag()} in ${guildName}`);
};
