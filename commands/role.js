//by Lost
const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client

const PERM_STAFF="755502460084289576"
const PERM_MOD="673764446341955604"

module.exports.run = async (client, message, args) => {

    function Erro(){
        message.channel.send("Ops deu erro");
        }

    if(message.member.roles.cache.has(PERM_STAFF) == true || message.member.roles.cache.has(PERM_MOD) == true){
        let role = message.mentions.roles.first()
        if(!role) return Erro()
        let roleID = role.id

    Members = message.guild.roles.cache.find(role => role.id === roleID).members.map(m=>m.user.id)
        for (i in Members){
            id=Members[i]
            message.channel.send("<@"+(id)+">")
        } 
    }else return Erro()
    
}