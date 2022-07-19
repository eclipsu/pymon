const fs = require("fs");
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "?";

client.commands = new Discord.Collection();
const commands = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
for (file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${commandName}`);
  client.commands.set(commandName, command);
}

client.on("ready", () => {
  client.user.setActivity("Genshin Hub", { type: "WATCHING" });
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();
    const command = client.commands.get(commandName);
    if (!command) return;
    command.run(client, msg, args);
  }
});

client.login(process.env.TOKEN);
