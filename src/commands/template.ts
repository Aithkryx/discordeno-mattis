import { Message } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts';
import { botCache } from '../../mod.ts';

export const command = (message: Message) => {
    return;
};

botCache.commands.set('example', {
  callback: command,
  nsfw: false,
  guildOnly: false,
  requiresArgs: false,
  devOnly: true,
  userPermission: '',
  botPermission: ''
});
