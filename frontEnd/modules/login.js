import validator from "validator";

export default class Login{
    constructor(formClass){
    this.form = document.querySelector(formClass)
    }

    init(){
      this.events()
    }

    events() {
        if (!this.form) return
    
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e)
        });
    }
    
    validate(e){
      const el = e.target 
      const imputEmail = el.querySelector('input[name="email"]') 
      const imputPassword = el.querySelector('input[name="password"]')
      let error = false 
      
      if(!validator.isEmail(imputEmail.value)){
        alert('Email invalido')
        error = true
      } 
      if(imputPassword.value.length < 3 || imputPassword.value.length > 50 ){
        alert('senha invalida')
        error = true
      } 

      if(!error) el.submit()

      
    }
}