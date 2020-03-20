import { Message } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/structures/message.ts";
import { bot_cache } from "../../mod.ts";

export const ping_command = async (message: Message) => {
  const msg = await message.channel().send_message("Pinging...");
  console.log(msg.author().id());
  msg.edit(`Pong! Took ${msg.timestamp() - message.timestamp()}s.`);
};

bot_cache.commands.set(`ping`, {
  callback: ping_command,
  nsfw: false,
  guildOnly: false,
  requiresArgs: false,
  devOnly: false,
  userPermission: "MANAGE_ROLES",
  botPermission: "MANAGE_ROLES"
});
