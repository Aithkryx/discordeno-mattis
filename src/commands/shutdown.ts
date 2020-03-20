import { Message } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts';
import { botCache } from '../../mod.ts';

export const command = async (message: Message) => {
    await message.channel().send_message('Shutting down...');
    Deno.exit();
};

botCache.commands.set('shutdown', {
    callback: command,
    nsfw: false,
    guildOnly: false,
    requiresArgs: false,
    devOnly: true,
    userPermission: '',
    botPermission: ''
});
