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
fac="Ira";
bdreg="RegIra";

//REGISTRO
const IMG_FAC = "https://i.imgur.com/JK7PNYA.png"
const COR_FAC = "008b3a"
const ID_LOG = "781728698830815253"
const ROLE_ID = "673766618110623755"

function Erro(){
  message.channel.send("Ops deu erro");
}

type = args[0];

if(message.member.roles.cache.has(ROLE_ID) == false) return Erro()

  valorantigo = db.get('fac').find({faccao: fac}).value().total
  ultregistro = db.get('fac').find({faccao: fac}).value().registros
  AcoAntigo = db.get('fac').find({faccao: fac}).value().acototal

  var canal = message.guild.channels.cache.find(ch => ch.id === ID_LOG);

  //COMANDO ADICIONAR
  if(type == "add"){
    tipo = args[1].toUpperCase();

    if(args[1]=="armas"){
      valor = args[2]
      if (!tipo || !parseInt(valor, 10) || valor<0) return message.channel.send("Ops deu erro");

        novovalor = parseInt(valorantigo)+parseInt(valor)
		   if(isNaN(novovalor)) return message.channel.send ("Ops deu Erro")
        registroatual =  parseInt(ultregistro)+1;
        registroatual = registroatual.toString();

      // REGISTRO
      db.get(bdreg)
        .push({
          registro: registroatual,
          faccao: fac,
          tipo: tipo,
          nick: message.author.username,
          id: message.author.id,
          valor: parseInt(valor),
        }).write()

      //ENVIA LOG
      const msg = await canal.send(("**REGISTRADO**")
      + ("```") 
      + ("[FAC]: ") + (fac)
      + ("\n[NICK]: ") + (message.author.username)
      + ("\n[REGISTRO]: ") + (registroatual)
      + ("\n[TIPO]: ") + (tipo) 
      + ("\n[VALOR]: $") + (valor) 
      + ("```")
      + ("<@"+(message.author.id)+">"));

      //MSG
      message.channel.send((`${message.author}`) + " **adicionou** o registro de venda número `"+(registroatual)+"` do `"+(fac) + "` no valor de `$" +(valor)+ "`.")

      //EMBED MSG
      const embed = new Discord.MessageEmbed()
      .setTitle(fac)
      .setThumbnail(IMG_FAC)
      .setColor(COR_FAC)
      .setDescription(("Registro `") + (registroatual) + ("`")
      + ("\nTipo `VENDA DE ") + (tipo) + ("`")
      + ("\nValor `R$ ") + (valor) + ("`")
      + ("\n*Nao esqueça de anexar a Print abaixo.*"))
      .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

      message.channel.send(embed);

      //ATUALIZA VALOR
      db.get('fac').find({faccao: fac}).assign({total: novovalor}).write()

    }

    if(args[1]=="aco"){
      qtd = args[2]
      if (!args[1] || !parseInt(qtd, 10) || qtd<0) return message.channel.send("Ops deu erro");

        NovoAco = parseInt(AcoAntigo)+parseInt(qtd)
		   if(isNaN(NovoAco)) return message.channel.send ("Ops deu Erro")
        registroatual =  parseInt(ultregistro)+1;
        registroatual = registroatual.toString();

      // REGISTRO
      db.get(bdreg)
        .push({
          registro: registroatual,
          faccao: fac,
          tipo: tipo,
          nick: message.author.username,
          id: message.author.id,
          qtd: parseInt(qtd),
        }).write()

      //ENVIA LOG
      const msg = await canal.send(("**REGISTRADO**")
      + ("```") 
      + ("[FAC]: ") + (fac)
      + ("\n[NICK]: ") + (message.author.username)
      + ("\n[REGISTRO]: ") + (registroatual)
      + ("\n[TIPO]: ") + (tipo) 
      + ("\n[QTD]: ") + (qtd) 
      + ("```")
      + ("<@"+(message.author.id)+">"));

      //MSG
      message.channel.send((`${message.author}`) + " **adicionou** o registro de `AÇO` número `"+(registroatual)+"` do `"+(fac) + "` na quantidade de `" +(qtd)+ "`.")

      //EMBED MSG
      const embed = new Discord.MessageEmbed()
      .setTitle(fac)
      .setThumbnail(IMG_FAC)
      .setColor(COR_FAC)
      .setDescription(("Registro `") + (registroatual) + ("`")
      + ("\nTipo `FARM DE ") + (tipo) + ("`")
      + ("\nQtd `") + (qtd) + ("`")
      + ("\n*Nao esqueça de anexar a Print abaixo.*"))
      .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

      message.channel.send(embed);

      //ATUALIZA VALOR
      db.get('fac').find({faccao: fac}).assign({acototal: NovoAco}).write()

    }
    db.get('fac').find({faccao: fac}).assign({registros: registroatual.toString()}).write()
  }

    if(type == "rem"){
        regx=args[1];
        if(regx!=ultregistro) return message.channel.send("Ops deu erro")
        if(!fac || !regx || !parseInt(regx, 10)) return message.channel.send("Ops deu erro");
          if(!db.get(bdreg).find({registro: regx.toString()}).value()){
          return message.channel.send("Não existe esse Registro")
      
        }else{
          tiporeg = db.get(bdreg).find({registro: regx.toString()}).value().tipo 
          if(tiporeg=="ACO"){

            qtdreg = db.get(bdreg).find({registro: regx.toString()}).value().qtd

            //Calcula
            NovoAco = ((parseInt(AcoAntigo))-(parseInt(qtdreg)));

            db.get(bdreg).remove({registro: regx.toString()}).write()

           message.channel.send((`${message.author}`) + " **removeu** o registro de `" +(tiporeg)+"` número `"
          +(regx)+"` na quantidade de `"
          +parseInt(qtdreg)+"` do `"
          +(fac)+"`.")

            //ENVIA LOG
            const msg = await canal.send(("**REMOVIDO**")
            + ("```") 
            + ("[FAC]: ") + (fac) 
            + ("\n[NICK]: ") + (message.author.username)
            + ("\n[REGISTRO]: ") + (regx)
            + ("\n[TIPO]: ") + (tiporeg) 
            + ("\n[QTD]: ") + (qtdreg) 
            + ("```")
            + ("<@"+(message.author.id)+">"));

          db.get('fac').find({faccao: fac}).assign({acototal: NovoAco}).write()

          registroatual=ultregistro-1
          db.get('fac').find({faccao: fac}).assign({registros: registroatual.toString()}).write()

          }

          if(tiporeg=="ARMAS"){
          valorreg = db.get(bdreg).find({registro: regx.toString()}).value().valor

          //Calcula
          novovalor = ((parseInt(valorantigo))-(parseInt(valorreg)));

          db.get(bdreg).remove({registro: regx.toString()}).write()

          message.channel.send((`${message.author}`) + " **removeu** o registro de `" +(tiporeg)+"` número `"
          +(regx)+"` no valor de `$"
          +parseInt(valorreg)+"` do `"
          +(fac)+"`.")

          //ENVIA LOG
          const msg = await canal.send(("**REMOVIDO**")
          + ("```") 
          + ("[FAC]: ") + (fac) 
          + ("\n[NICK]: ") + (message.author.username)
          + ("\n[REGISTRO]: ") + (regx)
          + ("\n[TIPO]: ") + (tiporeg) 
          + ("\n[VALOR]: $") + (valorreg) 
          + ("```")
          + ("<@"+(message.author.id)+">"));

          registroatual=ultregistro-1
          db.get('fac').find({faccao: fac}).assign({registros: registroatual.toString()}).write()


          db.get('fac').find({faccao: fac}).assign({total: novovalor}).write()
          }
        db.get(bdreg).remove({registro: regx.toString()}).write()
        }
      }
  db.write()
}