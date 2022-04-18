var db=require('../config/connection')
var collection=require('../config/collctions')
const bcrypt=require('bcrypt')
const { resolve, reject } = require('promise')
const { response } = require('express')

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            
        userData.Password=await bcrypt.hash(userData.Password,10)
        db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
            resolve(data.ops[0])
        })
        

    })
    },
    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus=false
            let respose={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("success")
                        respose.user=user
                        response.status=true
                        resolve(response)
                        
                    }else{
                        console.log("Incoreect password");
                        resolve({status:false})
                    }
                })
                

            }else{
                console.log('YOU dont have account');
                resolve({status:false})
            }
        })
    }

}