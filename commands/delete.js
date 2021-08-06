//by Lost
const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client

module.exports.run = async (client, message, args) => {
	
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('bd.json')
const db = low(adapter)

db.read()

Faccao = args[0]
Registro = args[1]

function Erro(){
    message.channel.send("Ops deu erro");
  }

function RegDel(Fac,Reg,Nome){
    if(!db.get(Fac).find({registro: Reg.toString()}).value()){
        Erro()
    }
    else{
        db.get(Fac).remove({registro: Reg.toString()}).write()
        message.channel.send((`${message.author}`) + " **removeu** o registro número `" +(Reg)+ "` de `"+(Nome).toUpperCase()+"`")
        
    }
}

if(message.author.id != "346373556931657728") return message.channel.send("Sem Permissão")
    if(!args[0] || !args[1] || !parseInt(Registro)) return Erro()
        else if(Faccao == "driftking"){
            RegDel("RegDrift",Registro,Faccao)
        }else if(Faccao == "camorra"){
            RegDel("RegCamorra",Registro,Faccao)
        }else if(Faccao == "abutres"){
            RegDel("RegAbutres",Registro,Faccao)
        }else if(Faccao == "vanilla"){
            RegDel("RegVanilla",Registro,Faccao)
        }else if(Faccao == "cosanostra"){
            RegDel("RegCosaNostra",Registro,Faccao)
        }else if(Faccao == "ira"){
            RegDel("RegIra",Registro,Faccao)
        }else if(Faccao == "ndrangheta"){
            RegDel("RegNdrangheta",Registro,Faccao)
        }else if(Faccao == "salamancas"){
            RegDel("RegSalamancas",Registro,Faccao)
        }else if(Faccao == "verdes"){
            RegDel("RegVerdes",Registro,Faccao)
        }else if(Faccao == "rosas"){
            RegDel("RegRosas",Registro,Faccao)
        }else if(Faccao == "midnight"){
            RegDel("RegMidnight",Registro,Faccao)
        }

}



