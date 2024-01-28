const mongoose = require('mongoose')

const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
   nome: { type: String, required: true },
   sobrenome: { type: String, required: false, default: '' },
   email: { type: String, required: false, default: '' },
   telefone: { type: Number, required: false, default: '' },
   criadoEm: { type: Date, default: Date.now }
})


const Contatomodel = mongoose.model('Contato', ContatoSchema)

function Contato(body) {
   this.body = body
   this.errors = []
   this.contato = null
}

Contato.prototype.register = async function() {
  this.valida()
  if(this.errors.length > 0) return

  this.contato = await Contatomodel.create(this.body)
}

Contato.prototype.valida = function(){
   this.cleanUp()

// validação do email:  
if(this.body.email && !validator.isEmail(this.body.email)){
   
   this.errors.push('Email invalido!') 
}

// validação nome
if(!this.body.nome){
   
   this.errors.push('nome precisa ser enviado') 
}

// Nome ou telefone 
if(!this.body.email && !this.body.telefone){
   
   this.errors.push('pelo menos um contato precisa ser enviado: e-mail ou telefone') 

}


}

// Vai garantir que tudo dentro do meu body é uma string 
Contato.prototype.cleanUp = function(){
    for(const key in this.body ){
       if(typeof this.body[key] !== 'string'){
           this.body[key] = ''
       }
    }

    this.body = {
       nome: this.body.nome,
       sobrenome: this.body.sobrenome,
       email: this.body.email,
       telefone: this.body.telefone
       
    }
}

Contato.prototype.edit = async function(id){
   if(typeof id !== 'string' ) return
   this.valida()
   if(this.errors.length > 0) return
   this.contato = await Contatomodel.findByIdAndUpdate(id, this.body , {new: true})
}

// Metodos estaticos

Contato.buscaPorId = async function(id){
   if(typeof id !== 'string') return
   const contato = await Contatomodel.findById(id)
   return contato
}

Contato.buscaContatos = async function(){
   const contatos = await Contatomodel.find()
   .sort({criadoEm: -1})
   return contatos
}

Contato.delete = async function(id){
   if(typeof id !== 'string') return
   const contato = await Contatomodel.findOneAndDelete({_id: id})
   return contato
}


module.exports = Contato

