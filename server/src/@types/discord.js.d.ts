import { Client as InteractionsClient } from 'discord-slash-commands-client';

declare module 'discord.js' {
  export interface Client {
    interactions: InteractionsClient
  }
}