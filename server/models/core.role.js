const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaCoreRole = new Schema()
schemaCoreRole.set('collection', 'CoreRole')

schemaCoreRole.add({
  id: mongoose.Schema.ObjectId,
  title: { type: String, required: true, unique: true, dropDups: true },
  parent: { type: Schema.Types.ObjectId, ref: 'CoreRole', default: null },
})

module.exports = mongoose.model('CoreRole', schemaCoreRole)
