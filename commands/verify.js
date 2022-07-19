const { Discord, MessageEmbed } = require("discord.js");
module.exports.run = async (client, msg, args) => {
  const roles = msg.member._roles;
  const something = roles.map((role) => {
    return msg.guild.roles.cache.find((r) => r.id === role).name;
  });
  if (something.some((role) => role.length === 9)) {
    const exampleEmbed = await new MessageEmbed().setColor("#ff0000").setTitle("Failed \\❌ ").setDescription(`You're already verified. `).setTimestamp();

    return await msg.channel.send(exampleEmbed);
  }

  if (args.length <= 0 || args.length >= 2) {
    // inside a command, event listener, etc.
    const exampleEmbed = await new MessageEmbed().setColor("#ff0000").setTitle("Failed \\❌ ").setDescription(`UID not specified, Please try again!`).setFooter("useage: ?verify <UID> ").setTimestamp();

    return await msg.channel.send(exampleEmbed);
  } else if (isNaN(args[0]) || args[0].length !== 9) {
    const exampleEmbed = await new MessageEmbed().setColor("#ff0000").setTitle("Failed \\❌ ").setDescription(`Failed to verify UID: ${args[0]}. Please check your UID and try again !`).setFooter("useage: ?verify <UID> ").setTimestamp();

    return await msg.channel.send(exampleEmbed);
  } else if (msg.member.roles.cache.some((role) => role.name === args[0])) {
    const exampleEmbed = await new MessageEmbed().setColor("#ff0000").setTitle("Failed \\❌ ").setDescription(`You're already verified. `).setTimestamp();

    return await msg.channel.send(exampleEmbed);
  }

  const person = msg.member;
  msg.guild.roles
    .create({
      data: {
        name: args[0],
        color: "BLACK",
      },
      reason: "we needed a role for Super Cool People",
    })
    .then((role) => {
      person.roles.add("998631828896370719");
      person.roles.add(role.id);
    })
    .catch(console.error);

  // inside a command, event listener, etc.
  const exampleEmbed = await new MessageEmbed().setColor("#2E2EAC").setTitle("Verified \\✅").setDescription(`You have been verified with UID: ${args[0]}.\n `).setTimestamp();

  return await msg.channel.send(exampleEmbed);
};
