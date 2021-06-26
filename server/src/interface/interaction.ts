import Discord, { MessageEmbed } from 'discord.js';

export interface interaction {
  id: string;
  token: string;
  channel: Discord.TextChannel;// The channel where this interaction occurred
  guild: Discord.Guild;// The guild where this interaction occurred
  member: Discord.GuildMember | null;// The guild member who issued the interaction (will be null if we cannot obtain a guildMember)
  author: Discord.User | null;// The user who issued the interaction (will be null if we cannot obtain an user)
  name: string;// name of this command
  content: string;// content of this command (everything after the main command name)
  createdTimestamp: number;// timestamp of this command being used
  options: { value: string; name: string }[] | null;// list of options this user inputted to the command
  /**
   * Replies to this Interaction.
   *
   * **Note:** Ephemeral messages don't appear to support embeds at this time.
   * @arg input - A message string, embed array, or object containing both
   * @arg ephemeral - Make the reply viewable only to the command sender. If false, reply is public
   * @returns A Promise that resolves a `messageId` which can be used with `.edit(...)` and `.delete(...)`
   */
  reply: (
    input?: string | MessageEmbed[] | { content: string; embeds: MessageEmbed[] },
    ephemeral?: boolean,
  ) => Promise<string>;
  /**
   * Edit a previous reply to this Interaction
   *
   * **Note:** Ephemeral messages don't appear to support embeds at this time.
   * @arg input - A message string, embed array, or object containing both
   * @arg messageId - The id of the message to delete. If omitted, the original reply message is deleted.
   */
  edit: (
    input?: string | MessageEmbed[] | { content: string; embeds: MessageEmbed[] },
    messageId?: string,
  ) => Promise<void>;
  /**
   * Sends a simple reply that makes the bot say "is thinking..."
   *
   * **Note:** You must use `.edit(...)` if you want to update the reply with an actual message later on.
   * @arg ephemeral - Make the reply viewable only to the command sender. If false, reply is public
   */
  thinking: (ephemeral?: boolean) => Promise<void>;
  /**
   * Deletes a reply to the Interaction
   *
   * **Note:** You cannot delete ephemeral messages.
   * @arg messageId - The id of the message to delete. If omitted, the original reply message is deleted.
   */
  delete: (messageId?: string) => Promise<void>;
}