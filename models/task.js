const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  is_active: {
    type:Boolean,
    required: true,
    default: false
  },
  status: {
    type: String,
    enum: ['plan', 'development', 'qa', 'done'],
    required:true
     }
})

module.exports = mongoose.model('tasktable', taskSchema)