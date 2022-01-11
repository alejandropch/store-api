require('dotenv').config()
require('express-async-errors')

const express = require('express')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const conectDB = require('./db/connect')
const app = express()
const PORT = process.env.PORT ?? 3000
const productsRouter = require('./routes/products.route')
// middleware
app.use(express.json())

// routes
app.get('/', (req,res)=> {
    res.send('<h1>Task Manager</h1> <a href="/api/v1/products">Go to the products page</a>')
})


app.use('/api/v1/products', productsRouter)

// products route
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async()=>{
    try{
        await conectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log('runing on port:', PORT))
    
    }catch(e){
        console.log(e)
    }
}
start()

