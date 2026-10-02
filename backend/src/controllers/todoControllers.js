import Todo from "../models/Todo.js"

const createTodo=(req,res)=>{
try {
    const {title,description}=req.body

const todo = Todo.create({
    title,
    description,
    userId:req.userId,

})

} catch (error) {
    
}

}