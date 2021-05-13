import Bot from "../bot";
import { Message, User } from "discord.js";
import { ILocale, RunFunction } from "../interfaces";
import { EmbedMessageService } from "../services";

const { embedMessage } = new EmbedMessageService();
const language = "ptbr";

export const run: RunFunction = async (client: Bot, message: Message) => {
    const { join }: ILocale = require(`../locales/${language}.json`);

    embedMessage.setTitle(join["title"]);
    const channel = message.member?.voice?.channel;
    const permission = channel?.permissionsFor(message.client.user as User);

    if (!channel) {
        embedMessage.setDescription(join["no voice channel"]);
        return void message.channel.send(embedMessage);
    }

    if (!permission?.has("CONNECT")) {
        embedMessage.setDescription(join["no permission"]);
        return void message.channel.send(embedMessage);
    }

    message.member?.voice.channel?.join();
};

export const name: string = "join";

export const aliases: string[] = [];
