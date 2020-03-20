import { guild_create } from './guildCreate.ts';
import { Event_Handlers as eventHandler } from 'https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/types/options.ts';
import { ready } from './ready.ts';
import { message_create } from './messageCreate.ts';

export const event_handlers: eventHandler = {
	guild_create,
	ready,
	message_create
};
