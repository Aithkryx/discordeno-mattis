import { Message } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts';

export interface Command {
  callback: (message: Message, args: string[]) => unknown;
  nsfw?: boolean;
  guildOnly: boolean;
  requiresArgs: boolean;
  devOnly: boolean;
  userPermission: string;
  botPermission: string;
}
