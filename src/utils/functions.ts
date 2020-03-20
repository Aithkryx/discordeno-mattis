import { Message } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts';
import { logGreen, logRed } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/utils/logger.ts';
import { configs } from '../../configs.ts';
import { botCache } from '../../mod.ts';
import { cache } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/utils/cache.ts';

export const checkPrefix = (guildId: string | undefined) => {
    const prefix = guildId ? botCache.guild_prefixes.get(guildId) : configs.prefix;
    return prefix || configs.prefix;
};

export const checkCommand = (commandName: string) => {
    const command = botCache.commands.get(commandName);
    if (command) return command;

    const alias = botCache.command_aliases.get(commandName);
    if (!alias) return;

    return botCache.commands.get(alias);
};

export const logCommand = (message: Message, guildName: string, type: string) => {
    logGreen(`[COMMAND - ${type}] by ${message.author().tag()} in ${guildName}`);
};