const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaCoreUser = new Schema()
schemaCoreUser.set('collection', 'CoreUser')

schemaCoreUser.add({
	id: mongoose.Schema.ObjectId,
	username: { type: String, required: true, unique: true, dropDups: true },
	email: { type: String, required: true, unique: true, dropDups: true },
	password: { type: String, required: true },
	date: { type: Date, default: Date.now },
	role: { type: Schema.Types.ObjectId, ref: 'CoreRole', required: true },
})

module.exports = mongoose.model('CoreUser', schemaCoreUser)
