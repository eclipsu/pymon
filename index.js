require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commands = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

// Loading in commands
for (file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${commandName}`);
  client.commands.set(commandName, command);
}

// On ready
client.on("ready", () => {
  client.user.setActivity("Genshin Hub", { type: "WATCHING" });
  console.log(`Logged in as ${client.user.tag}!`);
});

// On message receive
client.on("message", async (msg) => {
  // Calls in command function if message starts ith prefix and if commands exists
  if (msg.content.startsWith(process.env.PREFIX)) {
    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const commandName = args.shift();
    const command = client.commands.get(commandName);
    if (!command) return;
    return command.run(client, msg, args);
  }
});

// Run the client with token form .env file.
client.login(process.env.TOKEN);
