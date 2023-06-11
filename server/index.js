const express = require('express')
const cors = require('cors')
const { v4 : uuidv4 } = require('uuid')

const app = express()
// const uuid = uuidv4()
app.use(cors())
app.use(express.json())


const todoList = [
    {
        id : "123",
        todo : 'sample hard coded todo',
        isComplete : false
    },
]

//get method
app.get('/api/todo', (req,res)=> {

    res.status(200).json(todoList)
})

//post method
app.post('/api/todo', (req,res)=> {

    console.log(uuidv4(),'==uuid');
    // console.log(req.body);

    const { todo } = req.body;
    console.log(req.body,'req.bdy');

    if (!("todo" in req.body)) {
        return res.status(400).json( {
            message : `${JSON.stringify(req.body)} : This attribute is not accepted ...! Required attribute todo `
        })
    }
    const todoItem = {
        id : uuidv4(),
        todo : todo,
        isComplete : false
    };
    console.log(todoItem);
    todoList.push(todoItem)
    todo
    res.json(todoList)
})

//put  method update
app.put('/api/todo', (req,res)=> {
    const { id,todo,isComplete } = req.body
    
    const isExist = todoList.find(itm=> itm.id=== id)
    // console.log(isExist,'log');
    if (! isExist) {
       return res.status(400).json({message: `item with id - ${id} does not exist...!`})
    }

    todoList.forEach((todoItm)=> {
        if (todoItm.id === id) {
            todoItm.todo = todo
            todoItm.isComplete = isComplete || false
        }
    })
    return res.json(todoList)
})

//delete method
app.delete('/api/todo', (req,res)=> {
    const { id } = req.body

    const todoIdx =todoList.findIndex(itm => itm.id === id )
    console.log(todoIdx,'*********');
    if (todoIdx !== -1) {
        todoList.splice(todoIdx,1)
        res.json(todoList)
    }
})


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`app running on ${PORT}`))