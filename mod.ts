import Client from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/module/client.ts';
import { configs } from './configs.ts';
import { Intents } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/types/options.ts';
import { event_handlers } from './src/events/eventHandlers.ts';
import { Message } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts';
import { Guild } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/types/return-type.ts';
import { Command } from './src/types/commands.ts';

export const botCache = {
  commands: new Map<string, Command>(),
  command_aliases: new Map<string, string>(),
  guild_prefixes: new Map<string, string>(),
  inhibitors: new Map<string, (message: Message, command: Command, guild: Guild | undefined) => boolean>()
};

const import_directory = async (path: string) => {
  const files = Deno.readdirSync(Deno.realpathSync(path));

  await Promise.all(
    files.map(async file => {
      if (!file.name) return;

      const currentPath = `${path}/${file.name}`;
      if (file.isDirectory()) return import_directory(currentPath);

      await import(currentPath);
    })
  );
};

await Promise.all(
  ['./src/commands', './src/inhibitors'].map(path => import_directory(path))
);

export const Bot = new Client({
  token: configs.token,
  bot_id: configs.bot_id,
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
  event_handlers
});
