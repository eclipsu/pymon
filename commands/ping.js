module.exports.run = (client, msg, args) => {
  console.log(args);
  msg.channel.send("pong");
};
