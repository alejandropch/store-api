const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    name:{
        type: String,
        required: [true, "Not all fields were provided"]
    },
    price:{
        type: Number,
        required: [true, "Not all fields were provided"]

    },
    company:{
        type: String,
        enum:{
            values: ['ikea','marcos','caressa','liddy'],
            message: '{VALUE} is not supported'
        },
    },
    featured:{
        type:Boolean,
        default: false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})
module.exports = model('Product', productSchema)