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
fac="Verdes";
bdreg="RegVerdes";

//REGISTRO
const IMG_FAC = "https://i.imgur.com/WbxBBYl.png"
const COR_FAC = "2ecc71"
const ID_LOG = "781728698830815253"
const ROLE_ID = "673766599790166035"

var Items = [
  'CAIXA',
  'ALGEMAS',
  'C4',
  'CAPUZ',
  'COLETE',
  'CORDAS',
  'DETONADOR',
  'LOCKPICK',
  'MASTERPICK',
  'NOTEBOOK',
  'PENDRIVE',
  'REBITE'
];

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
    Qtd = args[1]
    Item = args[2].toUpperCase();
    ValorUni = args[3]
    if (!Qtd || !parseInt(Qtd, 10) || Qtd<0) return message.channel.send("Ops deu erro");
      if (!Item || Items.indexOf(Item) == -1) return message.channel.send("Ops deu erro");
        if (!ValorUni || !parseInt(ValorUni, 10) || ValorUni<0) return message.channel.send("Ops deu erro");

  //BD_CALCULA
    ValorTotal=ValorUni*Qtd
    novovalor = parseInt(valorantigo)+parseInt(ValorTotal)
	  if(isNaN(novovalor)) return message.channel.send ("Ops deu Erro")
    registroatual =  parseInt(ultregistro)+1;
    registroatual=registroatual.toString();

    db.get(bdreg)
      .push({
        registro: registroatual,
        faccao: fac,
        nick: message.author.username,
        id: message.author.id,
        item: Item,
        qtd: Qtd,
        unidade: ValorUni,
        valor: ValorTotal
      }).write()

    //ENVIA LOG
    const msg = await canal.send(("**REGISTRADO**")
    + ("```") 
    + ("[FAC]: ") + (fac) 
    + ("\n[NICK]: ") + (message.author.username)
    + ("\n[REGISTRO]: ") + (registroatual)
    + ("\n[ITEM]: ") + (Item)
    + ("\n[QTD]: ") + (Qtd)
    + ("\n[UNIDADE]: ") + (ValorUni)
    + ("\n[VALOR]: $") + (ValorTotal) 
    + ("```")
    + ("<@"+(message.author.id)+">"));

    //MSG
    message.channel.send((`${message.author}`) + " **adicionou** a venda número `"+(registroatual)+"` de `"+(Qtd)+" "+(Item)+"` para `Los Zetas` no valor de `$" +(ValorTotal)+("`."))

    //EMBED MSG
    const embed = new Discord.MessageEmbed()
      .setTitle(fac)
      .setThumbnail(IMG_FAC)
      .setColor(COR_FAC)
      .setDescription(("Registro `") + (registroatual) + ("`")
        + ("\nTipo Venda `" +(Item)+"`")
        + ("\nQtd `") + (Qtd) + ("`")
        + ("\nUnidade `$") + (ValorUni) + ("`")
        + ("\nValor Total `$") + (ValorTotal) + ("`")
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
      itemreg = db.get(bdreg).find({registro: regx.toString()}).value().item

      //Calcula
      novovalor = ((parseInt(valorantigo))-(parseInt(valorreg)));

      db.get(bdreg).remove({registro: regx.toString()}).write()

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
      + ("\n[ITEM]: ") + (itemreg)
      + ("\n[VALOR]: $") + (valorreg) 
      + ("```")
      + ("<@"+(message.author.id)+">"));

      registroatual=ultregistro-1
      db.get('fac').find({faccao: fac}).assign({registros: registroatual.toString()}).write()
    }
  }

db.get('fac').find({faccao: fac}).assign({total: novovalor}).write()
db.write()
}


