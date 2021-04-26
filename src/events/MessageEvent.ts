import { Message } from "discord.js";
import { Bot } from "../client/Client";
import { EmbedMessageService } from "../services";
import { RunFunction, Command } from "./../interfaces";
import dotenv from "dotenv";
dotenv.config();

const prefix: string = String(process.env.PREFIX);

const { embedMessage } = new EmbedMessageService();

export const run: RunFunction = async (client: Bot, message: Message) => {
    if (
        message.author.bot ||
        message.channel.type === "dm" ||
        !message.guild ||
        !message.content.toLocaleLowerCase().startsWith(prefix)
    ) {
        return;
    }

    const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd: string = String(args.shift());
    const command: Command | undefined = client.commands.get(cmd);

    if (!command) return;

    command
        .run(client, message, args)
        .catch((reason: any) =>
            message.channel.send(embedMessage.setTitle(`An error came: ${reason}`))
        );
};

export const name: string = "message";