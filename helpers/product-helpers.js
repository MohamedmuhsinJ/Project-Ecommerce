var db=require('../config/connection')
var collection=require('../config/collctions')
const { resolve, reject } = require('promise')
const async = require('hbs/lib/async')
module.exports={
    addProduct:(product,callback)=>{
        
        db.get().collection('product').insertOne(product).then((data)=>{
         //   console.log(data.ops[0]._id);
            callback(data.ops[0]._id)

        })

    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    }
}