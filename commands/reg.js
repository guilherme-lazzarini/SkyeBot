const Discord = require("discord.js");

exports.run = async (client, message, args) => {
args[0]
  if(message.author.id != "346373556931657728") return message.channel.send("Sem Permissão")
  if(args[0]=="pm"){
    message.channel.send({files: ['pm.json']})
  }
  if(args[0]=="bd"){
    message.channel.send({files: ['bd.json']})
  }
}