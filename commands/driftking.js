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
fac="DriftKing";
bdreg="RegDrift";

//REGISTRO
const IMG_FAC = "https://i.imgur.com/fP5weyD.png"
const COR_FAC = "d1fa42"
const ID_LOG = "781728698830815253"
const ROLE_ID = "723259769774932008"

function Erro(){
  message.channel.send("Ops deu erro");
}

type = args[0];

if(message.member.roles.cache.has(ROLE_ID) == false) return Erro()

valorantigo =  db.get('fac').find({faccao: fac}).value().total
ultregistro = db.get('fac').find({faccao: fac}).value().registros
qtdingresso = parseInt(db.get('fac').find({faccao: fac}).value().ingressoqtd)

var canal = message.guild.channels.cache.find(ch => ch.id === ID_LOG);

  //COMANDO ADICIONAR
  if(type == "add"){
    est=args[1]

    if(est=="ticket"){
      qtd=args[2]
      valoruni=args[3]
      if (!qtd|| !parseInt(qtd, 10) || qtd<0) return message.channel.send("Ops deu erro");
      if (!valoruni|| !parseInt(valoruni, 10) || valoruni<0) return message.channel.send("Ops deu erro");

      valor=qtd*valoruni
	  if(isNaN(valor)) return message.channel.send ("Ops deu Erro")
      registroatual =  parseInt(ultregistro)+1;
      registroatual=registroatual.toString();

      nQtdIngresso=(parseInt(qtdingresso))+(parseInt(qtd))

      db.get(bdreg)
        .push({
          registro: registroatual,
          faccao: fac,
          nick: message.author.username,
          id: message.author.id,
          tipo: est.toUpperCase(),
          qtd: parseInt(qtd),
          valoruni: valoruni,
          valor: valor
        }).write()

    //ENVIA LOG
      const msg = await canal.send(("**REGISTRADO**")
      + ("```") 
      + ("[FAC]: ") + (fac) 
      + ("\n[NICK]: ") + (message.author.username)
      + ("\n[REGISTRO]: ") + (registroatual)
      + ("\n[TIPO]: ") + (est.toUpperCase())
      + ("\n[QTD]: ") + (qtd)
      + ("\n[UNIDADE]: $") + (valoruni)
      + ("\n[VALOR TOTAL]: $") + (valor) 
      + ("```")
      + ("<@"+(message.author.id)+">"));

    //MSG
      message.channel.send((`${message.author}`) + " **adicionou** a venda número `"+(registroatual)+"` de `" +(qtd)+ "` ingressos para `"+(fac) + "` no valor de `$" +(valor)+("`."))

      //EMBED MSG
      const embed = new Discord.MessageEmbed()
        .setTitle(fac)
        .setThumbnail(IMG_FAC)
        .setColor(COR_FAC)
        .setDescription(("Registro `") + (registroatual) + ("`")
        + ("\nTipo `") + (est.toUpperCase()) + ("`")
        + ("\nQtd `") + (qtd) + ("`")
        + ("\nUnidade `$") + (valoruni) + ("`")
        + ("\nValor Total `$") + (valor) + ("`")
        + ("\n*Nao esqueça de anexar a Print abaixo.*"))
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

      message.channel.send(embed);

      db.get('fac').find({faccao: fac}).assign({ingressoqtd: parseInt(nQtdIngresso)}).write()

    }

    if(est=="des"){
    car = args[2].toUpperCase();
    desmanche = args[3]
    if (!args[1] || !parseInt(desmanche, 10) || desmanche<0) return message.channel.send("Ops deu erro");

    //BD_CALCULA
      novovalor = parseInt(valorantigo)+parseInt(desmanche)
	  if(isNaN(novovalor)) return message.channel.send ("Ops deu Erro")
      registroatual =  parseInt(ultregistro)+1;
      registroatual=registroatual.toString();

      db.get(bdreg)
        .push({
          registro: registroatual,
          faccao: fac,
          nick: message.author.username,
          id: message.author.id,
          tipo: "DESMANCHE",
          valor: parseInt(desmanche),
          carro: car
        }).write()

      //ENVIA LOG
      const msg = await canal.send(("**REGISTRADO**")
      + ("```") 
      + ("[FAC]: ") + (fac) 
      + ("\n[NICK]: ") + (message.author.username)
      + ("\n[REGISTRO]: ") + (registroatual)
      + ("\n[DESMANCHOU]: ") + (car)
      + ("\n[VALOR]: $") + (desmanche) 
      + ("```")
      + ("<@"+(message.author.id)+">"));

      //MSG
      message.channel.send((`${message.author}`) + " **adicionou** o desmanche número `"+(registroatual)+"` para `"+(fac) + "` no valor de `$" +(desmanche)+"` do veiculo `"+(car)+("`."))


      //EMBED MSG
      const embed = new Discord.MessageEmbed()
        .setTitle(fac)
        .setThumbnail(IMG_FAC)
        .setColor(COR_FAC)
        .setDescription(("Registro `") + (registroatual) + ("`")
        + ("\nTipo `DESMANCHE`")
        + ("\nDesmanche `R$ ") + (desmanche) + ("`")
        + ("\nCliente/Fac `R$ ") + (desmanche*0.5) + ("`")
        + ("\nVeiculo `") + (car) + ("`"))
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));

      message.channel.send(embed);

      db.get('fac').find({faccao: fac}).assign({total: novovalor}).write()

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
      if(tiporeg=="DESMANCHE"){

      valorreg = db.get(bdreg).find({registro: regx.toString()}).value().valor
      carreg = db.get(bdreg).find({registro: regx.toString()}).value().valor  

      //Calcula
      novovalor = ((parseInt(valorantigo))-(parseInt(valorreg)));

      message.channel.send((`${message.author}`) + " **removeu** o registro número `"
      +(regx)+"` no valor de `$"
      +parseInt(valorreg)+"` da `"
      +(fac)+"`")

      //ENVIA LOG
      const msg = await canal.send(("**REMOVIDO**")
      + ("```") 
      + ("[FAC]: ") + (fac) 
      + ("\n[NICK]: ") + (message.author.username)
      + ("\n[REGISTRO]: ") + (regx)
      + ("\n[TIPO]: ") + (tiporeg)
      + ("\n[DESMANCHOU]: ") + (carreg)
      + ("\n[VALOR]: $") + (valorreg) 
      + ("```")
      + ("<@"+(message.author.id)+">"));

      db.get('fac').find({faccao: fac}).assign({total: novovalor}).write()

      }

      if(tiporeg=="TICKET"){
        qtdreg = db.get(bdreg).find({registro: regx.toString()}).value().qtd
        valorreg= db.get(bdreg).find({registro: regx.toString()}).value().valor

      //
      novaqtd = ((parseInt(qtdingresso))-(parseInt(qtdreg)));

      message.channel.send((`${message.author}`) + " **removeu** o registro número `"
      +(regx)+"` no qtd de `"
      +parseInt(qtdreg)+"` ingressos da `"
      +(fac)+"`")

      //ENVIA LOG
      const msg = await canal.send(("**REMOVIDO**")
      + ("```") 
      + ("[FAC]: ") + (fac) 
      + ("\n[NICK]: ") + (message.author.username)
      + ("\n[REGISTRO]: ") + (regx)
      + ("\n[TIPO]: ") + (tiporeg)
      + ("\n[QTD]: ") + (qtdreg)
      + ("\n[VALOR TOTAL]: $") + (valorreg) 
      + ("```")
      + ("<@"+(message.author.id)+">"));

      db.get('fac').find({faccao: fac}).assign({ingressoqtd: novaqtd}).write()

      }

    registroatual=ultregistro-1
    db.get(bdreg).remove({registro: regx.toString()}).write()
    db.get('fac').find({faccao: fac}).assign({registros: registroatual.toString()}).write()
    }
  }
  db.write()
}