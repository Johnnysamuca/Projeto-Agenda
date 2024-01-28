exports.middlewaresGlobal = (req, res, next) =>{  
 res.locals.errors= req.flash('errors')
 res.locals.success= req.flash('success')
 res.locals.user = req.session.user
 next()
}

exports.outroMiddlewaresGlobal = (req, res, next) =>{  
    next()
   }

exports.checkErrorCsrf = (err, req, res, next) =>{
    if(err){
        console.log(err)
         return res.render('404')
    }
    
    next()
}

exports.csrfMiddlewares = (req, res , next) =>{
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.loginrequired = (req, res, next) =>{
    if(!req.session.user){
        console.log('Você precisa fazer login')
        req.flash('errors', 'Você precisa fazer login')
        req.session.save(() => res.redirect('/'))
        return
    }

    next()
}

