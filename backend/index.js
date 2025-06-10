import express from 'express'
import serverless from 'serverless-http'
import mongoose from 'mongoose'
import cors from 'cors'
import TodoModel from '../models/Todo.js'

const app = express()
app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI

let conn = null
async function connectDB() {
  if (!conn) {
    conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
}

// Routes
app.get('/get', async (req, res) => {
  await connectDB()
  const todos = await TodoModel.find()
  res.json(todos)
})

app.post('/add', async (req, res) => {
  await connectDB()
  const newTodo = new TodoModel({
    item: req.body.item,
    checked: req.body.checked || false,
  })
  await newTodo.save()
  res.json(newTodo)
})

app.patch('/update/:id', async (req, res) => {
  await connectDB()
  const updated = await TodoModel.findByIdAndUpdate(
    req.params.id,
    { checked: req.body.checked },
    { new: true }
  )
  res.json(updated)
})

app.delete('/delete/:id', async (req, res) => {
  await connectDB()
  await TodoModel.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted successfully' })
})

export default serverless(app)
