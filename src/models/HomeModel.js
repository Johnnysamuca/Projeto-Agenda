const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
   titulo: {type: String, require: true},
   descricao: {type: String}
})

const Homemodel = mongoose.model('Home', HomeSchema)

module.exports = Homemodel

