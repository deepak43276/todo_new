const mongoose=require('mongoose')

const TodoSchema = new mongoose.Schema({
    item:String,
    checked:{type:Boolean,default:false}
})

const TodoModel = mongoose.model("Todo",TodoSchema)

module.exports = TodoModel;