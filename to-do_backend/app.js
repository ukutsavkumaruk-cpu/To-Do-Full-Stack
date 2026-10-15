const express = require('express')
const http = require('http')
const todoItemsRouter = require('./routes/todoItemsRouter')
const { get404 } = require('./controllers/errors');
const { default: mongoose } = require('mongoose');
const DB_URL = "mongodb+srv://ukutsavkumaruk_db_user:utsav1311@airbnbv1.3ajox3i.mongodb.net/todo"






const app = express()
const server = http.createServer(app);


app.use(express.urlencoded())
app.use("/api/todo",todoItemsRouter)
app.use(get404)


const PORT = 3009;


mongoose.connect(DB_URL).then(()=>{
console.log("Connection Successful");
server.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})
}
)
.catch(err =>{
  console.log("Error occurs while connection to database.",err)
})