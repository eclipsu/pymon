const { MessageEmbed } = require("discord.js");

module.exports.run = async (cleint, msg, args) => {
  const roles = msg.member._roles;
  const rolesOfUser = roles.map((role) => {
    return msg.guild.roles.cache.find((r) => r.id === role).name;
  });
  const numericRole = rolesOfUser.filter((role) => !isNaN(role));

  if (numericRole.length <= 0) {
    const exampleEmbed = await new MessageEmbed().setColor("#ff0000").setTitle("Failed \\❌ ").setDescription(`You're not verified with a UID. `).setTimestamp();

    return await msg.channel.send(exampleEmbed);
  }
  await msg.guild.roles.cache.find((r) => r.name === numericRole[0]).delete();
  // msg.guild.roles.cache.find((r) => r.id === "871770395081048074").delete();
  const exampleEmbed = new MessageEmbed().setColor("#ff0000").setTitle("Unverified \\❌ ").setDescription(`Your verification id: ${numericRole[0]} was removed `).setTimestamp();

  return await msg.channel.send(exampleEmbed);
};
