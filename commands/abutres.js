//by Lost
const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client

module.exports.run = async (client, message, args) => {
	
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('bd.json')
const db = low(adapter)

db.read()

// INFOS 
//DB
fac="Abutres";
bdreg="RegAbutres";

//REGISTRO
const IMG_FAC = "https://i.imgur.com/5lLR7FO.png"
const COR_FAC = "e1ff00"
const ID_LOG = "781728698830815253"
const ROLE_ID = "694738988413747301"

function Erro(){
  message.channel.send("Ops deu erro");
}

type = args[0];

if(message.member.roles.cache.has(ROLE_ID) == false) return Erro()

valorantigo = db.get('fac').find({faccao: fac}).value().total
ultregistro = db.get('fac').find({faccao: fac}).value().registros
var canal = message.guild.channels.cache.find(ch => ch.id === ID_LOG);

  //COMANDO ADICIONAR
  if(type == "add"){
    valor = args[1];
    p = args[2];
    if (!args[1] || !parseInt(valor, 10) || valor<0) return message.channel.send("Ops deu erro");
    if (!args[2] || p<0 || p>100) return message.channel.send("Ops deu erro");

  //BD_CALCULA
    novovalor = parseInt(valorantigo)+parseInt(valor)
    registroatual =  parseInt(ultregistro)+1;
    registroatual=registroatual.toString();
    CalcP=p/100
    Lucro=(valor*CalcP).toFixed()
    Cliente=(valor-Lucro).toFixed()
    if(isNaN(novovalor) || isNaN(valor) || isNaN(Lucro) || isNaN(Cliente)) return message.channel.send ("Ops deu Erro")

    db.get(bdreg)
      .push({
        registro: registroatual,
        faccao: fac,
        nick: message.author.username,
        id: message.author.id,
        valor: parseInt(valor),
        porcentagem: p,
        lucro: Lucro,
        cliente: Cliente
      }).write()

    //ENVIA LOG
    const msg = await canal.send(("**REGISTRADO**")
    + ("```") 
    + ("[FAC]: ") + (fac) 
    + ("\n[NICK]: ") + (message.author.username)
    + ("\n[REGISTRO]: ") + (registroatual)
    + ("\n[LAVADO]: $") + (valor)
    + ("\n[PORCENTAGEM]: ") + (p) +("%")     
    + ("\n[LUCRO]: $") + (Lucro) 
    + ("\n[CLIENTE]: $") + (Cliente)     
    + ("```")
    + ("<@"+(message.author.id)+">"));

    //MSG
    message.channel.send((`${message.author}`) + " **adicionou** a lavagem a número `"+(registroatual)+"` a `"+(p)+"%` para `"+(fac) + "` no valor de `$" +(valor)+("`."))


    //EMBED MSG
    const embed = new Discord.MessageEmbed()
      .setTitle(fac)
      .setThumbnail(IMG_FAC)
      .setColor(COR_FAC)
      .setDescription(("Registro `") + (registroatual) + ("`")
      + ("\nLavado `R$ ") + (valor) + ("`")
      + ("\nPorcentagem  `") + (p) + ("%`")
      + ("\nLucro `R$ ") + (Lucro) + ("`")
      + ("\nCliente `R$ ") + (Cliente) + ("`")
      + ("\n*Nao esqueça de anexar a Print abaixo.*"))
      .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

    message.channel.send(embed);

    db.get('fac').find({faccao: fac}).assign({registros: registroatual.toString()}).write()

  }

  if(type == "rem"){
    regx=args[1];
    if(regx!=ultregistro) return message.channel.send("Ops deu erro")
    if(!fac || !regx || !parseInt(regx, 10)) return message.channel.send("Ops deu erro");
      if(!db.get(bdreg).find({registro: regx.toString()}).value()){
      return message.channel.send("Não existe esse Registro")
  
    }else{

      valorreg = db.get(bdreg).find({registro: regx.toString()}).value().valor
      lucroreg = db.get(bdreg).find({registro: regx.toString()}).value().lucro
      clientereg = db.get(bdreg).find({registro: regx.toString()}).value().cliente
      preg = db.get(bdreg).find({registro: regx.toString()}).value().porcentagem
      //Calcula
      novovalor = ((parseInt(valorantigo))-(parseInt(valorreg)));

      db.get(bdreg).remove({registro: regx.toString()}).write()

      message.channel.send((`${message.author}`) + " **removeu** o registro número `"
      +(regx)+"` no valor de `$"
      +parseInt(valorreg)+"` dos `"
      +(fac)+"`.")

      //ENVIA LOG
      const msg = await canal.send(("**REMOVIDO**")
      + ("```") 
      + ("[FAC]: ") + (fac) 
      + ("\n[NICK]: ") + (message.author.username)
      + ("\n[REGISTRO]: ") + (regx)
      + ("\n[LAVADO]: $") + (valorreg)
      + ("\n[PORCENTAGEM]: ") + (preg) +("%")   
      + ("\n[LUCRO]: $") + (lucroreg) 
      + ("\n[CLIENTE]: $") + (clientereg)    
      + ("```")
      + ("<@"+(message.author.id)+">"));

      registroatual=ultregistro-1
      db.get('fac').find({faccao: fac}).assign({registros: registroatual.toString()}).write()
    }
  }

db.get('fac').find({faccao: fac}).assign({total: novovalor}).write()
db.write()

}