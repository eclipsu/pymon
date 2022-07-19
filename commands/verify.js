const { MessageEmbed } = require("discord.js");

const travelersID = "998631828896370719";
const guestID = "998974130349162527";

module.exports.run = async (client, msg, args) => {
  // ID of roles user has
  const roles = msg.member._roles;

  // Roles user has
  const userRolesByName = roles.map((role) => {
    return msg.guild.roles.cache.find((r) => r.id === role).name;
  });

  // Chekcs if user has a role with name of 9 lenght which is bascially UUID
  // If he is already verified
  if (userRolesByName.some((role) => role.length === 9)) {
    const exampleEmbed = await new MessageEmbed().setColor("#ff0000").setTitle("Failed \\❌ ").setDescription(`You're already verified. `).setTimestamp();
    return await msg.channel.send(exampleEmbed);
  }

  // Chekcs if the command reveiced args
  if (args.length <= 0 || args.length >= 2) {
    // inside a command, event listener, etc.
    const exampleEmbed = await new MessageEmbed().setColor("#ff0000").setTitle("Failed \\❌ ").setDescription(`UID not specified, Please try again!`).setFooter("useage: ?verify <UID> ").setTimestamp();
    return await msg.channel.send(exampleEmbed);
  }

  // Checks if the user already has visitor role if he tries to verify with visitor again
  if (userRolesByName.some((role) => role.length === 9) && args[0] === "visitor") {
    const exampleEmbed = await new MessageEmbed().setColor("#ff0000").setTitle("Failed \\❌ ").setDescription(`You're already verified as visitor `).setTimestamp();
    return await msg.channel.send(exampleEmbed);
  }

  // Chekcs if the argument is "visitor", which assigns the user with guest role instead of UUID and Travelers role
  else if (args[0] === "visitor") {
    msg.member.roles.add(guestID);
    const exampleEmbed = await new MessageEmbed().setColor("#2E2EAC").setTitle("Verified \\✅").setDescription(`verified as a visitor \n `).setTimestamp();
    return await msg.channel.send(exampleEmbed);
  }
  // checks if the UID user provided is valid uid
  else if (isNaN(args[0]) || args[0].length !== 9) {
    const exampleEmbed = await new MessageEmbed().setColor("#ff0000").setTitle("Failed \\❌ ").setDescription(`Failed to verify UID: ${args[0]}. Please check your UID and try again !`).setFooter("useage: ?verify <UID> ").setTimestamp();
    return await msg.channel.send(exampleEmbed);
  }
  // If everything works out, now we will create a role with the UID user provided and assign it to him with travelrs role
  const person = msg.member;

  // Removes the guest role if the user already has it
  try {
    const guestRole = msg.guild.roles.cache.get(guestID);
    msg.member.roles.remove(guestRole);
  } catch (err) {}
  msg.guild.roles
    .create({
      data: {
        name: args[0],
        color: "BLACK",
      },
      reason: "we needed a role for Super Cool People",
    })
    .then((role) => {
      person.roles.add(travelersID);
      person.roles.add(role.id);
    })
    .catch(console.error);

  // inside a command, event listener, etc.
  const exampleEmbed = await new MessageEmbed().setColor("#2E2EAC").setTitle("Verified \\✅").setDescription(`You have been verified with UID: ${args[0]}.\n `).setTimestamp();

  return await msg.channel.send(exampleEmbed);
};
