const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix)) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;



    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    //console.error('Erro:' + err);
  }
});


client.on("ready", () => {

  var testChannel=client.channels.cache.find(channel=> channel.id === '782496095372181506');
  setInterval(() => {
      let data = new Date();
      let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
      var dataBase = data2.toISOString().replace(/\.\d{3}Z$/, '');
      testChannel.send("**BKP "+(dataBase)+("**"));
    
    testChannel.send({files: ['pm.json']})
    testChannel.send({files: ['bd.json']})
  }, 3600000);

  let activities = [
      `Infinity RP`,
      `Infinity RP`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING"
      }), 5000); 
  client.user
      .setStatus("available")
      .catch(console.error);
console.log("Skye Bot On!")
});

client.login("NzcxODEzMDU1ODY3NjUwMTA4.X5xk7A.pSNKgsUmG6mTNrk6jOKk9K3u8GM"); //Ligando o Bot caso ele consiga acessar o tokenTE~

