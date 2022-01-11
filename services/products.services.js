const Product = require('../models/product.models')
getAllProducts= async(req, res) => {
    const {name, company, featured, sort, fields, numericFilters} = req.query
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const skip = (page - 1) * limit
    const queryObject = {}
    
    if(featured){
        queryObject.featured = featured == "true" ? true : false 
    }
    if(company){
        queryObject.company={$regex: company, $options: "i"}
    }
    if(name){
        queryObject.name = {$regex: name, $options: "i"}
    }

    // number filtering
    if(numericFilters){
        const options = ["price","rating"]
        const operators= {
            '<':'$lt',
            '>':'$gt',
            '<=':'$lte',
            '>=':'$gte',
            '=':'$eq'
        }

        const regEx= /\b(<|>|=|<=|<|>=)\b/g
        let filter = numericFilters.replace(regEx,(v)=>`-${operators[v]}-`)
        filter = filter.split(',').forEach(item => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
                console.log(queryObject[field])
            }
        })
        }

    let result = Product.find(queryObject)

    //sort
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createAt')
    }
    //fields
    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    } 
    result = result.limit(limit).skip(skip)

    const products = await result
    return res.json({products, HNumber: products.length})

}


getAllProductsStatic= async(req,res)=>{
    let products = Product.find({})
    return res.json({products, nbHits: products.length})
}

module.exports={getAllProducts,getAllProductsStatic}