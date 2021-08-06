//by Lost
const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client

//PERM
  const IMG_PM="https://i.imgur.com/5TJE5na.png"
  const PERM_ADD="721180875974246480"

  const PERM_PAY_STAFF="755502460084289576"
  const PERM_PAY_MOD="673764446341955604"

//LOG
  const ID_LOG = "781728540658892800"


  module.exports.run = async (client, message, args) => {

    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('pm.json')
    const db = low(adapter)
  
    db.read()
  
    function Erro(){
    message.channel.send("Ops deu erro");
    }
  
    function DBCria(fac){
      db.get('Faccao').push({Fac: fac,PotAcoes: 0,ValorTotal: 0,LojaQtd: 0, CaixaQtd: 0, BancoQtd: 0,JoalheriaQtd: 0,IateQtd: 0}).write()
    } 
  
    type = args[0].toLowerCase();
  
    if(!args[0]=="add" || !args[0]=="reset" || !args[0]=="loot") return Erro()
  
    function ResetPm(){
      
    }
    if(type == "reset"){
      if(message.author.id != "346373556931657728") return message.channel.send("Sem Permissão")
      db.set('PM', []).write()
      db.set('Faccao', []).write()
      db.set('Civil', []).write()
      db.set('REGISTROS', []).write()
      db.get('REGISTROS').push({Org: "PM",registros: 0}).write()
  
      DBCria("DriftKing")
      DBCria("Camorra")
      DBCria("Abutres")
      DBCria("Vanilla")
      DBCria("CosaNostra")
      DBCria("Ira")
      DBCria("Ndrangheta")
      DBCria("Salamancas")
      DBCria("Verdes")
      DBCria("Rosas")
      DBCria("Midnight")
  
      message.channel.send((`${message.author}`) + " **resetou** o `Banco de Ações` ")
  
    }
  
    function ZeraPM(){
      const Members = db.get('PM').value()
      total=0
      idvalor=0
        for (let i in Members) {
        id=(Members[i].ID).toString()
        nl=db.get('PM').find({ID: id}).value()
          if(nl != undefined){
            idvalor=db.get('PM').find({ID: id}).value().Total
          }
        total=total+idvalor
        }
      if(total!=undefined){
      db.set('PM', []).write()
      message.channel.send((`${message.author}`) + " **pagou** as ações pendentes da `PM` no valor de `$"+(total)+"`.")
  
      db.get('REGISTROS').remove({vencedor: "PM"}).write()
      }
    }
  
    function ZeraFac(fac){
      valorfac=db.get('Faccao').find({Fac: fac}).value().ValorTotal
      db.get('Faccao').find({Fac: fac}).assign({ValorTotal: 0}).write()
  
      db.get('REGISTROS').remove({vencedor: fac}).write()
  
      message.channel.send((`${message.author}`) + " **pagou** as ações pendentes do `" +(fac) + "` no valor de `$" +(valorfac) + "`.")
  
    }
  
  
    if(type == "pay"){
      if(message.member.roles.cache.has(PERM_PAY_STAFF) == true || message.member.roles.cache.has(PERM_PAY_MOD) == true){
      if(!args[1]) return Erro()
      org=args[1].toLowerCase()
        if(org == "pm"){
          ZeraPM()
        }
        else if(org == "driftking"){
          ZeraFac("DriftKing")
        }else if(org == "camorra"){
          ZeraFac("Camorra")
        }else if(org == "abutres"){
          ZeraFac("Abutres")
        }else if(org == "vanilla"){
          ZeraFac("Vanilla")
        }else if(org == "cosanostra"){
          ZeraFac("CosaNostra")
        }else if(org == "ira"){
          ZeraFac("Ira")
        }else if(org == "ndrangheta"){
          ZeraFac("Ndrangheta")
        }else if(org == "salamancas"){
          ZeraFac("Salamancas")
        }else if(org == "verdes"){
          ZeraFac("Verdes")
        }else if(org == "rosas"){
          ZeraFac("Rosas")
        }else if(org == "midnight"){
          ZeraFac("Midnight")
        }else if(org == "civil"){
          if(!args[2]) return Erro()
          idsearch=args[2]
          const List=db.get('Civil').value() 
          var aux=0
          var i=0
          for (i in List){
              id=List[i].ID
              if(id===idsearch){
                aux = i
              }
            valor=List[aux].Total
            idfinded=List[aux].ID
            }
          db.get('Civil').remove({ID: idfinded}).write()
          message.channel.send((`${message.author}`) + " **pagou** as ações pendentes do `ID "+(idfinded)+ "` no valor de `$"+(valor)+"`.")
        }
      }
    } 
  
  
    function AcoesFac(fac){
      Loja_Qtd = db.get('Faccao').find({Fac: fac}).value().LojaQtd
      Caixa_Qtd = db.get('Faccao').find({Fac: fac}).value().CaixaQtd
      Banco_Qtd = db.get('Faccao').find({Fac: fac}).value().BancoQtd
      Joalheria_Qtd = db.get('Faccao').find({Fac: fac}).value().JoalheriaQtd
      Iate_Qtd = db.get('Faccao').find({Fac: fac}).value().IateQtd
      message.channel.send(("**ACOES ")+(fac.toUpperCase())+("**")
          + ("\n`LOJA | ")+(Loja_Qtd)
          +("\nCAIXA | ")+ (Caixa_Qtd)
          +("\nBANCO | ")+ (Banco_Qtd)
          +("\nJOALHERIA | ")+ (Joalheria_Qtd)
          +("\nIATE | ")+ (Iate_Qtd) +("`"))
    }
  
    if(type == "check"){
      if(message.member.roles.cache.has(PERM_PAY_STAFF) == true || message.member.roles.cache.has(PERM_PAY_MOD) == true){
        if(!args[1]) return Erro()
        org=args[1].toLowerCase()
        if(org == "driftking"){
          AcoesFac("DriftKing")
        }else if(org == "camorra"){
          AcoesFac("Camorra")
        }else if(org == "abutres"){
          AcoesFac("Abutres")
        }else if(org == "vanilla"){
          AcoesFac("Vanilla")
        }else if(org == "cosanostra"){
          AcoesFac("CosaNostra")
        }else if(org == "ira"){
          AcoesFac("Ira")
        }else if(org == "ndrangheta"){
          AcoesFac("Ndrangheta")
        }else if(org == "salamancas"){
          AcoesFac("Salamancas")
        }else if(org == "verdes"){
          AcoesFac("Verdes")
        }else if(org == "rosas"){
          AcoesFac("Rosas")
        }else if(org == "midnight"){
          AcoesFac("Midnight")
        }
      }
    }
    // 
    
    ultregistro = db.get('REGISTROS').find({Org: "PM"}).value().registros
  
    if(type == "loot"){
      if(message.member.roles.cache.has(PERM_PAY_STAFF) == true || message.member.roles.cache.has(PERM_PAY_MOD) == true){
      org=args[1]
      message.channel.send("`PENDENTE`")
      if(org == "pm"){
      const Members = db.get('PM').value()
      totalpm=0
      idvalor=0
        for (let i in Members) {
        id=(Members[i].ID).toString()
        nl=db.get('PM').find({ID: id}).value()
          if(nl != undefined){
            idvalor=db.get('PM').find({ID: id}).value().Total
            message.channel.send("<@"+(id)+"> `$"+(idvalor)+"`")
          }
        totalpm=totalpm+idvalor
        }
      message.channel.send(("`TOTAL | $") + (totalpm)+ ("`"))
      }
  
        if(org == "civil"){
        const List=db.get('Civil').value()
            for (i in List){
              id=List[i].ID
              totalid=db.get('Civil').find({ID: id}).value().Total
              message.channel.send("`ID "+(id)+" | $" +(totalid)+"`")
            }
  
        }
  
      function FiltraFac(fac){
        valorfac=db.get('Faccao').find({Fac: fac}).value().ValorTotal
        message.channel.send("`"+(fac.toUpperCase())+" | $"+(valorfac)+"`")
      }
  
        if(org == "driftking"){
          FiltraFac("DriftKing")
        }if(org == "camorra"){
          FiltraFac("Camorra")
        }if(org == "abutres"){
          FiltraFac("Abutres")
        }if(org == "vanilla"){
          FiltraFac("Vanilla")
        }if(org == "cosanostra"){
          FiltraFac("CosaNostra")
        }if(org == "ira"){
          FiltraFac("Ira")
        }if(org == "ndrangheta"){
          FiltraFac("Ndrangheta")
        }if(org == "salamancas"){
          FiltraFac("Salamancas")
        }if(org == "verdes"){
          FiltraFac("Verdes")
        }if(org == "rosas"){
          FiltraFac("Rosas")
        }if(org == "midnight"){
          FiltraFac("Midnight")
        }if(!org){
        FiltraFac("DriftKing")
        FiltraFac("Camorra")
        FiltraFac("Abutres")
        FiltraFac("Vanilla")
        FiltraFac("CosaNostra")
        FiltraFac("Ira")
        FiltraFac("Ndrangheta")
        FiltraFac("Salamancas")
        FiltraFac("Verdes")
        FiltraFac("Rosas")
        FiltraFac("Midnight")
      }
    }
  }
    //
  
    if(type == "add"){
      if(message.member.roles.cache.has(PERM_ADD) == false) return Erro()
      win = args[1].toLowerCase();
      acao = args[2].toLowerCase();
      qtd = args[3];
  
      registroatual = parseInt(ultregistro, 10)+1
  
      db.get('PM').find({Org: "PM"}).assign({registros: registroatual.toString()}).write()
  
        if(!args[2] || args[2]!=="loja" && args[2]!=="banco" && args[2]!=="caixa" && args[2]!=="joalheria" && args[2]!=="iate"){
          return Erro()
        }
        else{
          if(!parseInt(qtd) || qtd<0){ 
            return Erro()
            }
            else{
  
        LojinhaValor=200000
        BancoValor=300000
        CaixaValor=250000
        JoalheriaValor=300000
        IateValor=200000
        if(acao == "loja"){
            var total=LojinhaValor*parseInt(qtd)
            var Pont=4*parseInt(qtd)
          }
        else if(acao == "banco"){
            var total=BancoValor*parseInt(qtd)
            var Pont=8*parseInt(qtd)
            }
        else if(acao == "caixa"){
            var total=CaixaValor*parseInt(qtd)
            var Pont=6*parseInt(qtd)
            }
        else if(acao == "joalheria"){
            var total=JoalheriaValor*parseInt(qtd)
            var Pont=8*parseInt(qtd)
            }
        else if(acao == "iate"){
            var total=IateValor*parseInt(qtd)
            var Pont=4*parseInt(qtd)
            }
  
      if(win == "civil"){
        id=args[4]
        if(!id || !parseInt(id,10) || id<0) return Erro()
  
        LojinhaValor=400000
        CaixaValor=500000
        if(acao == "loja"){
            var total=LojinhaValor*parseInt(qtd)
          }
        else if(acao == "caixa"){
            var total=CaixaValor*parseInt(qtd)
            }
  
        message.channel.send((`${message.author}`) + " **registrou** a ação número `"+(registroatual)+"` com o vencedor `"+(id)+"` no valor de `$" +(total)+ "`.")
  
        //
        const embed = new Discord.MessageEmbed()
        .setTitle("Relatório de Ações")
        .setThumbnail(IMG_PM)
        .setColor("ff0000")
        .setDescription(("Ação `Nº") + (registroatual) + ("`")
        + ("\nResultado: `DERROTA`")
        + ("\nVencedor: `") + (id) + ("`")
        + ("\nTipo: `") + (acao.toUpperCase()) + ("`")
        + ("\nParticipantes: `") + (qtd) + ("`")
        + ("\nPerdas: `$") + (total) + ("`"))
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
  
        message.channel.send(embed);
  
        db.get('REGISTROS').find({Org: "PM"}).assign({registros: registroatual.toString()}).write()
  
        //CRIA REG CIVIL
        db.get("REGISTROS")
        .push({
          acao: registroatual.toString(),
          vencedor: "Civil",
          id: id,
          nick: message.author.username,
          autorid: message.author.id,
          valor: total,
        }).write()
  
        //SALVA DB
        if(!db.get('Civil').find({ID: id}).value()){
        db.get('Civil')
        .push({
          ID: id,
          Total: parseInt(total,10)
        }).write()
        }else{
        totalantigo=db.get('Civil').find({ID: id}).value().Total
        novototal=parseInt(totalantigo,10)+parseInt(total, 10)
        db.get('Civil').find({ID: id}).assign({Total: novototal}).write() 
        }
      }   
  
      if(win == "pm"){
        id="N/A"
        LojinhaValor=50000
        BancoValor=150000
        CaixaValor=75000
        JoalheriaValor=150000
        IateValor=50000
  
        if(acao == "loja"){
          var total=LojinhaValor*parseInt(qtd)
        }
            if(acao == "banco"){
              var total=BancoValor*parseInt(qtd)
            }
              if(acao == "caixa"){
                var total=CaixaValor*parseInt(qtd)
              }
              if(acao == "joalheria"){
                var total=JoalheriaValor*parseInt(qtd)
              }
                if(acao == "iate"){
                var total=IateValor*parseInt(qtd)
              }
  
      //SALVA DB
      if(!db.get('PM').find({ID: message.author.id}).value()){
        db.get('PM')
        .push({
          ID: message.author.id,
          Total: parseInt(total,10)
        }).write()
        message.channel.send((`${message.author}`) + " **registrou** a ação número `"+(registroatual)+"` com o vencedor `PM` com ganhos de `$" +(total)+ "`.") 
      }else{
        totalantigo=db.get('PM').find({ID: message.author.id}).value().Total
  
        novototal=parseInt(totalantigo,10)+parseInt(total, 10)
        db.get('PM').find({ID: message.author.id}).assign({Total: novototal}).write()
        message.channel.send((`${message.author}`) + " **registrou** a ação número `"+(registroatual)+"` com o vencedor `PM` com ganhos de `$" +(total)+ "`.") 
        }
      
      //CRIA REGISTRO
      db.get("REGISTROS")
        .push({
          acao: registroatual.toString(),
          vencedor: "PM",
          nick: message.author.username,
          autorid: message.author.id,
          valor: total,
        }).write()
  
      //SALVA ULTIMO REGISTRO
      db.get('REGISTROS').find({Org: "PM"}).assign({registros: registroatual.toString()}).write()
      const embed = new Discord.MessageEmbed()
        .setTitle("Relatório de Ações")
        .setThumbnail(IMG_PM)
        .setColor("006a9c")
        .setDescription(("Ação `Nº") + (registroatual) + ("`")
        + ("\nResultado: `VITÓRIA`")
        + ("\nVencedor: `PM`")
        + ("\nTipo: `") + (acao.toUpperCase()) + ("`")
        + ("\nParticipantes: `") + (qtd) + ("`")
        + ("\nGanhos: `$") + (total) + ("`"))
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
      message.channel.send(embed)
      }
      // Faccao
  
      function DbAtt(fac){
        id="N/A"
        valorantigo = db.get('Faccao').find({Fac: fac}).value().ValorTotal
        novovalor= parseInt(valorantigo)+parseInt(total)
        ultpont = db.get('Faccao').find({Fac: fac}).value().PotAcoes
        calcpont=parseInt(ultpont)+parseInt(Pont)
  
        db.get('Faccao').find({Fac: fac}).assign({ValorTotal: novovalor}).write()
        db.get('Faccao').find({Fac: fac}).assign({PotAcoes: calcpont}).write()
  
        message.channel.send((`${message.author}`) + " **registrou** a ação número `"+(registroatual)+"` com o vencedor `" +(fac)+ "` no valor de `$" +(total)+ "`.")
  
  
        //
        Loja_Qtd = db.get('Faccao').find({Fac: fac}).value().LojaQtd
        Caixa_Qtd = db.get('Faccao').find({Fac: fac}).value().CaixaQtd
        Banco_Qtd = db.get('Faccao').find({Fac: fac}).value().BancoQtd
        Joalheria_Qtd = db.get('Faccao').find({Fac: fac}).value().JoalheriaQtd
        Iate_Qtd = db.get('Faccao').find({Fac: fac}).value().IateQtd
  
        if(acao == "loja"){
          Loja_Qtd = Loja_Qtd+1
          db.get('Faccao').find({Fac: fac}).assign({LojaQtd: Loja_Qtd}).write()
        }
          if(acao == "banco"){
              Banco_Qtd = Banco_Qtd+1
              db.get('Faccao').find({Fac: fac}).assign({BancoQtd: Banco_Qtd}).write()
            }
            if(acao == "caixa"){
                Caixa_Qtd = Caixa_Qtd+1
                db.get('Faccao').find({Fac: fac}).assign({CaixaQtd: Caixa_Qtd}).write()
              }
              if(acao == "joalheria"){
                Joalheria_Qtd = Joalheria_Qtd+1
                db.get('Faccao').find({Fac: fac}).assign({JoalheriaQtd: Joalheria_Qtd}).write()
              }
                if(acao == "iate"){
                Iate_Qtd = Iate_Qtd+1
                db.get('Faccao').find({Fac: fac}).assign({IateQtd: Iate_Qtd})
              }
  
        //
  
        //
        const embed = new Discord.MessageEmbed()
        .setTitle("Relatório de Ações")
        .setThumbnail(IMG_PM)
        .setColor("ff0000")
        .setDescription(("Ação `Nº") + (registroatual) + ("`")
        + ("\nResultado: `DERROTA`")
        + ("\nVencedor: `") + (fac.toUpperCase()) + ("`")
        + ("\nTipo: `") + (acao.toUpperCase()) + ("`")
        + ("\nParticipantes: `") + (qtd) + ("`")
        + ("\nPerdas: `$") + (total) + ("`"))
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
  
        message.channel.send(embed);
  
        db.get('REGISTROS').find({Org: "PM"}).assign({registros: registroatual.toString()}).write()
  
        //CRIA REG Fac
        db.get("REGISTROS")
        .push({
          acao: registroatual.toString(),
          vencedor: fac,
          nick: message.author.username,
          autorid: message.author.id,
          tipo: acao.toLowerCase(),
          valor: total,
          pont: Pont,
        }).write()
      }
  
  
      if(win == "driftking"){
        DbAtt("DriftKing")
      }else if(win == "camorra"){
        DbAtt("Camorra")
      }else if(win == "abutres"){
        DbAtt("Abutres")
      }else if(win == "vanilla"){
        DbAtt("Vanilla")
      }else if(win == "cosanostra"){
        DbAtt("CosaNostra")
      }else if(win == "ira"){
        DbAtt("Ira")
      }else if(win == "ndrangheta"){
        DbAtt("Ndrangheta")
      }else if(win == "salamancas"){
        DbAtt("Salamancas")
      }else if(win == "verdes"){
        DbAtt("Verdes")
      }else if(win == "rosas"){
        DbAtt("Rosas")
      }else if(win == "midnight"){
        DbAtt("Midnight")
      }
  
      }
  
    }
      //ENVIA LOG ADD
      var canal = message.guild.channels.cache.find(ch => ch.id === ID_LOG);
        const msg = await canal.send(("**REGISTRADO**")
        + ("```") 
        + ("RELATÓRIO DE AÇÕES")
        + ("\nAÇÃO Nº: ") +  (registroatual)
        +("\n[VENCEDOR] ") + (win.toUpperCase())
        +("\n[ID] ") + (id)
        + ("\n[TIPO]: ") + (acao.toUpperCase())
        + ("\n[PARTICIPANTES]: ") + (qtd)
        + ("\n[VALOR]: $") + (total) 
        + ("```")
        + ("<@"+(message.author.id)+">"));
  
    }
      
    if(type == "rem"){
      reg=args[1]
      if(reg!=ultregistro) return message.channel.send("Ops deu erro")
      if(!parseInt(reg, 10)) return Erro()
  
        if(!db.get('REGISTROS').find({acao: reg}).value()){
        return message.channel.send("Não existe esse Registro")
      }else{
        valorreg = db.get('REGISTROS').find({acao: reg.toString()}).value().valor
        org=db.get('REGISTROS').find({acao: reg.toString()}).value().vencedor
  
        if(org=="PM"){
          valorantigo = db.get('PM').find({ID: message.author.id}).value().Total
          novovalor = ((parseInt(valorantigo))-(parseInt(valorreg)));
          db.get('PM').find({ID: message.author.id}).assign({Total: novovalor}).write()
            flushval=db.get('PM').find({ID: message.author.id}).value().Total
              if(flushval==0){
                db.get('PM').remove({ID: message.author.id}).write()
              }
        }
        if(org=="Civil"){
          idreg=db.get('REGISTROS').find({acao: reg.toString()}).value().id
          valorantigo=db.get('Civil').find({ID: idreg.toString()}).value().Total
          novovalor = ((parseInt(valorantigo))-(parseInt(valorreg)));
          db.get('Civil').find({ID: idreg.toString()}).assign({Total: novovalor}).write()
            flushval=db.get('Civil').find({ID: idreg.toString()}).value().Total
              if(flushval==0){
                db.get('Civil').remove({ID: idreg.toString()}).write()
              }        
        }
        if(org!="PM" && org!="Civil"){
  
          TipoReg= db.get('REGISTROS').find({acao: reg.toString()}).value().tipo
  
          if(TipoReg==="loja"){
            Loja_Qtd = db.get('Faccao').find({Fac: org}).value().LojaQtd
            Loja_Qtd=parseInt(Loja_Qtd)-1
            db.get('Faccao').find({Fac: org}).assign({LojaQtd: Loja_Qtd}).write()
          }
          else if(TipoReg==="caixa"){
            Caixa_Qtd = db.get('Faccao').find({Fac: org}).value().CaixaQtd
            Caixa_Qtd=Caixa_Qtd-1
            db.get('Faccao').find({Fac: org}).assign({CaixaQtd: Caixa_Qtd}).write()
          }
          else if(TipoReg==="banco"){
            Banco_Qtd = db.get('Faccao').find({Fac: org}).value().BancoQtd
            Banco_Qtd=Banco_Qtd-1
            db.get('Faccao').find({Fac: org}).assign({BancoQtd: Banco_Qtd}).write()
          }
          else if(TipoReg==="joalheria"){
            Joalheria_Qtd = db.get('Faccao').find({Fac: org}).value().JoalheriaQtd
            Joalheria_Qtd=Joalheria_Qtd-1
            db.get('Faccao').find({Fac: org}).assign({JoalheriaQtd: Joalheria_Qtd}).write()
          }
          else if(TipoReg==="iate"){
            Iate_Qtd = db.get('Faccao').find({Fac: org}).value().IateQtd
            Iate_Qtd=Iate_Qtd-1
            db.get('Faccao').find({Fac: org}).assign({IateQtd: Iate_Qtd}).write()          
          }
  
        
          valorantigo = db.get('Faccao').find({Fac: org}).value().ValorTotal
          novovalor = ((parseInt(valorantigo))-(parseInt(valorreg)));
  
          pontantiga = db.get('REGISTROS').find({acao: reg.toString()}).value().pont
          pontatual = db.get('Faccao').find({Fac: org}).value().PotAcoes
          novapontuacao= ((parseInt(pontatual))-(parseInt(pontantiga)));
  
          db.get('Faccao').find({Fac: org}).assign({ValorTotal: novovalor}).write()
          db.get('Faccao').find({Fac: org}).assign({PotAcoes: novapontuacao}).write()
        }
  
        db.get('REGISTROS').remove({acao: reg.toString()}).write()
  
        message.channel.send((`${message.author}`) + " **removeu** a ação número `"
        +(reg)+"` do vencedor `"+ (org) +"` no valor de `$"+(parseInt(valorreg))+"`.")
      }
  
      //ENVIA LOG REM
      var canal = message.guild.channels.cache.find(ch => ch.id === ID_LOG);
        const msg = await canal.send(("**REMOVIDO**")
        + ("```") 
        + ("RELATÓRIO DE AÇÕES")
        + ("\nAÇÃO Nº: ") +  (reg)
        +("\n[VENCEDOR] ") + (org.toUpperCase())
        + ("\n[VALOR]: $") + (valorreg)
        + ("```")
        + ("<@"+(message.author.id)+">"));
  
      registroatual=ultregistro-1
      db.get('REGISTROS').find({Org: "PM"}).assign({registros: registroatual.toString()}).write()
      
    }
    db.write()
  }