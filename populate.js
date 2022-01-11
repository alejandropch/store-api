require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/product.models')
const productsJson = require('./products.json')
const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(productsJson)
        console.log('success')
        process.exit(0)

    }catch(e){
        console.log(e)
        process.exit(1)

    }
}
start()
