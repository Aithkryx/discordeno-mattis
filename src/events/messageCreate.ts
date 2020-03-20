import { Message } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts';
import { commandHandler } from '../monitors/commandHandler.ts';

export const message_create = (message: Message) => {
  commandHandler(message);
};
