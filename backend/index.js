const express=require('express')

const mongoose=require('mongoose')
const TodoModel = require('./models/Todo')
const cors=require('cors')

const app = express();

app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Fetch all todos
app.get('/get', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new todo
app.post('/add', async (req, res) => {
    try {
        const newTodo = new TodoModel({ item: req.body.item, checked: req.body.checked || false});
        await newTodo.save();
        res.json(newTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/update/:id', async (req, res) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.id, 
            { checked: req.body.checked }, 
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Delete a todo
app.delete('/delete/:id', async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001,()=> {
    console.log('listening on http://localhost:3001')
})