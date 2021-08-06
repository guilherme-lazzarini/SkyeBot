//by Lost
const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client

const PERM_STAFF="755502460084289576"
const PERM_MOD="673764446341955604"

EQUI_PONT=100000  // 1 PONTO = 100K FARMADO TOTAL
EQUI_ACO=10000      // 1 PONTO = 10K ACO
EQUI_INGRESSO=1    // 1 INGRESSO = 1 PONTO

module.exports.run = async (client, message, args) =>   {
	
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('bd.json')
const db = low(adapter)

const adapterpm = new FileSync('pm.json')
const dbpm = low(adapterpm)

db.read()
dbpm.read()

if(message.member.roles.cache.has(PERM_STAFF) == true || message.member.roles.cache.has(PERM_MOD) == true){

  fac = args[0];
  
     AcoToPont = 0
    ValorToPont = 0
    PmToPont = 0
    IngressoToPont= 0


  function Ranking(fac){

    registros = db.get('fac').find({faccao: fac}).value().registros

    //CALCULA "TOTAL"
    Valor = db.get('fac').find({faccao: fac}).value().total
    ValorToPont=Valor/EQUI_PONT
    PmToPont = dbpm.get('Faccao').find({Fac: fac}).value().PotAcoes

    //CALCULA "ACO"
    if(fac=="Salamancas" || fac=="Ndrangheta" || fac=="Ira"){
      AcoTotal = db.get('fac').find({faccao: fac}).value().acototal
      AcoToPont = (AcoTotal/EQUI_ACO)
    }
    //CALCULA "INGRESSO"
    else if(fac=="DriftKing" || fac=="Camorra"){
      IngressoQtd=db.get('fac').find({faccao: fac}).value().ingressoqtd
      IngressoToPont= (IngressoQtd*EQUI_INGRESSO)
    }
    
    else{
      AcoToPont = 0
      IngressoToPont= 0
    }

    PontTotal=(ValorToPont+PmToPont+AcoToPont+IngressoToPont).toFixed(0)
    message.channel.send("`"+(fac.toUpperCase()) + " | " + PontTotal + " PONTOS`") 


  }

///////////////////////////////////////////////////////////////////////////

    function Info(fac){
    registros = db.get('fac').find({faccao: fac}).value().registros

      //CALCULA "TOTAL"
      Valor = db.get('fac').find({faccao: fac}).value().total
      ValorToPont=Valor/EQUI_PONT
      PmToPont = dbpm.get('Faccao').find({Fac: fac}).value().PotAcoes

    //CALCULA "ACO"
    if(fac=="Salamancas" || fac=="Ndrangheta" || fac=="Ira"){
      AcoTotal = db.get('fac').find({faccao: fac}).value().acototal
      AcoToPont = (AcoTotal/EQUI_ACO)
    }
      else if(fac=="DriftKing" || fac=="Camorra"){
      IngressoQtd=db.get('fac').find({faccao: fac}).value().ingressoqtd
      IngressoToPont= (IngressoQtd*EQUI_INGRESSO)
    }

    else if(fac=="Verdes" || fac=="Rosas" || fac=="Midnight"){
      Valor = db.get('fac').find({faccao: fac}).value().total
      ValorToPont=Valor/EQUI_PONT
      PmToPont = dbpm.get('Faccao').find({Fac: fac}).value().PotAcoes
    }

    else{
      AcoToPont = 0
    }


    PontTotal=(ValorToPont+PmToPont+AcoToPont+IngressoToPont).toFixed(0)
    
    if(fac=="Salamancas" || fac=="Ndrangheta" || fac=="Ira"){
        message.channel.send(("**")+(fac.toUpperCase())+("**")
        + ("\n`[REGISTROS]: ")+(registros)
        +("\n[ACO]: ")+ (AcoTotal) + (" | ")+(AcoToPont)+ (" PONTOS")
        +("\n[VALOR]: $")+ (Valor) + (" | ")+(ValorToPont)+ (" PONTOS")
        +("\n[ACAO]: ")+ (PmToPont)+(" PONTOS")
        +("\nTOTAL | " + PontTotal + " PONTOS`"))
      }
      else if(fac=="DriftKing" || fac=="Camorra"){
        message.channel.send(("**")+(fac.toUpperCase())+("**")
        + ("\n`[REGISTROS]: ")+(registros)
        +("\n[INGRESSOS]: ")+ (IngressoQtd) + (" | ")+(IngressoToPont)+ (" PONTOS")
        +("\n[VALOR]: $")+ (Valor) + (" | ")+(ValorToPont)+ (" PONTOS")
        +("\n[ACAO]: ")+ (PmToPont)+(" PONTOS")
        +("\nTOTAL | " + PontTotal + " PONTOS`"))
      }
      
      else{
          message.channel.send(("**")+(fac.toUpperCase())+("**")
        + ("\n`[REGISTROS]: ")+(registros)
        +("\n[VALOR]: $")+ (Valor) + (" | ")+(ValorToPont)+ (" PONTOS")
        +("\n[ACAO]: ")+ (PmToPont)+(" PONTOS")
        +("\nTOTAL | " + PontTotal + " PONTOS`"))
      }

    }


  function Reset(fac){
    //RESET PONT PotAcoes
    dbpm.get('Faccao').find({Fac: fac}).assign({PotAcoes: 0}).write()
    dbpm.get('Faccao').find({Fac: fac}).assign({LojaQtd: 0}).write()
    dbpm.get('Faccao').find({Fac: fac}).assign({CaixaQtd: 0}).write()
    dbpm.get('Faccao').find({Fac: fac}).assign({BancoQtd: 0}).write()
    dbpm.get('Faccao').find({Fac: fac}).assign({IateQtd: 0}).write()
    //RESET TOTAL SEMANA
    db.get('fac').find({faccao: fac}).assign({total: 0}).write()
    //ZERA REG
    db.get('fac').find({faccao: fac}).assign({registros: 0}).write()
    //RESET ACO
    if(fac=="Salamancas" || fac=="Ndrangheta" || fac=="Ira"){
      db.get('fac').find({faccao: fac}).assign({acototal: 0}).write()
    }
    if(fac=="DriftKing" || fac=="Camorra"){
      db.get('fac').find({faccao: fac}).assign({ingressoqtd: 0}).write()
    }
  
  }

  if(fac == "driftking"){
    Info("DriftKing")
  }if(fac == "camorra"){
    Info("Camorra")
  }if(fac == "abutres"){
    Info("Abutres")
  }if(fac == "vanilla"){
    Info("Vanilla")
  }if(fac == "cosanostra"){
    Info("CosaNostra")
  }if(fac == "ira"){
    Info("Ira")
  }if(fac == "ndrangheta"){
    Info("Ndrangheta")
  }if(fac == "salamancas"){
    Info("Salamancas")
  }if(fac == "verdes"){
    Info("Verdes")
  }if(fac == "rosas"){
    Info("Rosas")
  }if(fac == "midnight"){
    Info("Midnight")
      }if(!fac){
      message.channel.send("**RANKING**")
      Ranking("DriftKing")
      Ranking("Camorra")
      Ranking("Abutres")
      Ranking("Vanilla")
      Ranking("CosaNostra")
      Ranking("Ira")
      Ranking("Ndrangheta")
      Ranking("Salamancas")
      Ranking("Verdes")
      Ranking("Rosas")
      Ranking("Midnight")
    }


  if(fac == "reset"){
      if(message.author.id != "346373556931657728") return message.channel.send("Sem Permissão")
      Reset("DriftKing")
      Reset("Camorra")
      Reset("Abutres")
      Reset("Vanilla")
      Reset("CosaNostra")
      Reset("Ira")
      Reset("Ndrangheta")
      Reset("Salamancas")
      Reset("Verdes")
      Reset("Rosas")
      Reset("Midnight")
      db.set('RegDrift', []).write()
      db.set('RegCamorra', []).write()    
      db.set('RegAbutres', []).write()
      db.set('RegVanilla', []).write()    
      db.set('RegCosaNostra', []).write() 
      db.set('RegIra', []).write()
      db.set('RegNdrangheta', []).write()  
      db.set('RegSalamancas', []).write() 
      db.set('RegVerdes', []).write() 
      db.set('RegRosas', []).write() 
      db.set('RegMidnight', []).write() 
    message.channel.send((`${message.author}`) + " **resetou** o `Ranking`.") 
    }
  }
  db.write()
  dbpm.write()
}
