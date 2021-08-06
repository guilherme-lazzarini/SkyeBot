const Discord = require("discord.js");

const PERM_STAFF="755502460084289576"
const PERM_MOD="673764446341955604"

exports.run = async (client, message, args) => {
  if(message.member.roles.cache.has(PERM_STAFF) == true || message.member.roles.cache.has(PERM_MOD) == true){
  message.channel.send("`Online`")
  }
}