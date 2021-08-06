//by Lost
const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client

module.exports.run = async (client, message, args) => {

  const low = require('lowdb')
  const FileSync = require('lowdb/adapters/FileSync')
  const adapter = new FileSync('bd.json')
  const db = low(adapter)

  db.read()

  function Debug(regfac,fac){
    database=db.get('fac').find({faccao: fac}).value().total
    
  List=db.get(regfac).value()
  total=0
  for (let i in List) {
    valor=(List[i].valor)
      if(!isNaN(valor)){
        total+=valor
      }
    }
    message.channel.send("`"+(fac)+"Total | DB: $"+(database)+ " | REG: $"+(total)+"`")
    db.get('fac').find({faccao: fac}).assign({total: total}).write()
  }



  function DebugAco(regfac,fac){
    database=db.get('fac').find({faccao: fac}).value().acototal
    
  List=db.get(regfac).value()
  total=0
  for (let i in List) {
    valor=parseInt(List[i].qtd)
      if(!isNaN(valor)){
        total+=valor
      }
    }
    message.channel.send("`"+(fac)+"Aco | DB: "+(database)+ "x | REG: "+(total)+"x`")
    db.get('fac').find({faccao: fac}).assign({acototal: total}).write()
  }
    


  function DebugIngresso(regfac,fac){
    database=db.get('fac').find({faccao: fac}).value().ingressoqtd
    
  List=db.get(regfac).value()
  total=0
  for (let i in List) {
    valor=parseInt(List[i].qtd)
      if(!isNaN(valor)){
        total+=valor
      }
    }
    message.channel.send("`"+(fac)+"Ingresso | DB: "+(database)+ "x | REG: "+(total)+"x`")
    db.get('fac').find({faccao: fac}).assign({ingressoqtd: total}).write()
  }

    Debug('RegDrift',"DriftKing")
    Debug('RegCamorra',"Camorra")    
    Debug('RegAbutres',"Abutres")
    Debug('RegVanilla',"Vanilla")    
    Debug('RegCosaNostra',"CosaNostra") 
    Debug('RegIra',"Ira")
    Debug('RegNdrangheta',"Ndrangheta")  
    Debug('RegSalamancas',"Salamancas") 
    Debug('RegMidnight',"Midnight") 
    Debug('RegVerdes',"Verdes") 
    Debug('RegRosas',"Rosas") 
    DebugAco('RegIra',"Ira")
    DebugAco('RegNdrangheta',"Ndrangheta")  
    DebugAco('RegSalamancas',"Salamancas") 
    DebugIngresso('RegDrift',"DriftKing")
    DebugIngresso('RegCamorra',"Camorra")   

    message.channel.send("`TODOS REGISTROS FORAM VALIDADOS COM SUCESSO!`")
    db.write()

  }
