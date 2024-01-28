const mongoose = require('mongoose')

const validator = require('validator')

const bcryptjs = require('bcryptjs')


const LoginSchema = new mongoose.Schema({
   email: {type: String, required: true},
   password: {type: String, required: true}
})

const Loginmodel = mongoose.model('Login', LoginSchema)

class Login {
  constructor(body){
   this.body = body
   this.errors = []
   this.user = null
  }

  async logar(){
   this.valida()
   if(this.errors.length > 0) return
   this.user =  await Loginmodel.findOne({email: this.body.email})

   if(!this.user){
      this.errors.push('Email ou senha invalido !')
      return
   } 

   if(!bcryptjs.compareSync(this.body.password, this.user.password)){
      this.errors.push('Senha invalida')
      this.user = null
      return
   }
  }

  async register(){
   this.valida()
   if(this.errors.length > 0) return
 
   await this.userExists()

   if(this.errors.length > 0) return

   const salt = bcryptjs.genSaltSync()
   this.body.password = bcryptjs.hashSync(this.body.password, salt)

   this.user = await Loginmodel.create(this.body)

  }

 async userExists(){
   this.user =  await Loginmodel.findOne({email: this.body.email})
   if(this.user) this.errors.push('Este usuario já existe')
  }


// vai validar os dados dos campos
  valida(){
     this.cleanUp()
// validação do email:  
if(!validator.isEmail(this.body.email)) this.errors.push('Email invalido!') 
if(this.body.password < 3 || this.body.password > 50 ) this.errors.push('A sua senha precisa ter entre 3 e 50 caracteres')


}

// Vai garantir que tudo dentro do meu body é uma string 
  cleanUp(){
      for(const key in this.body ){
         if(typeof this.body[key] !== 'string'){
             this.body[key] = ''
         }
      }

      this.body = {
         email: this.body.email,
         password: this.body.password
      }
  }

  
  
}

module.exports = Login

