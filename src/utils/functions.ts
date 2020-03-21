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
    const alias = botCache.command_aliases.get(commandName)
    return alias ? botCache.commands.get(alias) : botCache.commands.get(commandName);
};

export const logCommand = (message: Message, guildName: string, type: string) => {
    return logGreen(`[COMMAND - ${type}] by ${message.author().tag()} in ${guildName}`);
};

export const errorMessage = async (message: Message, text: string) => {
    const msg = await message.channel().send_message(text);
    return setTimeout(() => {
        msg.delete('');
        if (message.guild_id())
            message.delete('');
    }, 1000 * 5);
}

export const handleResponse = (response: any) => {
    return response.json().then(function (json: Object) {
        return response.ok ? json : Promise.reject(json);
    });
}

export const numToMonth = (month: number) => {
    return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ][month - 1];
}