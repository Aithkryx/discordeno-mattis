import { Message } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts';
import { botCache } from '../../mod.ts';

export const command = (message: Message) => {
  message.channel().send_message('Pinging...')
    .then(msg => {
      msg.edit(`Pong! Took \`${msg.timestamp() - message.timestamp()}\`s.`);
    })
};

botCache.commands.set('ping', {
  callback: command,
  nsfw: false,
  guildOnly: false,
  requiresArgs: false,
  devOnly: false,
  userPermission: '',
  botPermission: ''
});
