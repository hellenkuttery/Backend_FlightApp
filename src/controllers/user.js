"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
// User Controller:

const User=require("../models/user")
const sendMail = require('../helpers/sendMail')


module.exports={
    list : async (req,res)=>{

        // Swagger kısmını da oluşuturalım
           /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        // const result=await User.find()
        const result=await res.getModelList(User)

        res.status(200).send({
            error:false,
            details: await res.getModelListDetails(User),
            result
        })
    },

    create:async(req,res)=>{
        // $ref: '#/definitions/User'
        /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in:'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

        // Önce password kontrolü yapmalıyız. 5 karakterden fazla olması. Doğruysa create yapacak yoksa yapmayacak
      
        if (req.body.password.length > 5){
            const result=await User.create(req.body)


            sendMail(result.email,"Welcome"," A user created. Thank you for join to us")
               
            res.status(200).send({
                error:false,
                result
            })

        }else{
            res.errorStatusCode=404
            throw new Error("Password should be more than 5 characters")
        }


       

        res.status(200).send({
            error:false,
            details: await res.getModelListDetails(User),
            result
        })
    },

    read: async (req,res)=>{

          /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "Read User"
        */
 
        const result=await User.findOne({_id:req.params.id})

        res.status(200).send({
            error:false,
            result
        })
    },
    update:async(req,res)=>{
         // $ref: '#/definitions/User'
        /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in:'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

/* -------------------------------------------------------------------------- */
            // new: true
// ➜ Güncellenmiş dökümanı döndürür. Varsayılan olarak, MongoDB updateOne işlemi eski veriyi döndürür. Ama new: true eklenirse, güncellenmiş kullanıcıyı geri döndürür.

// ➜ Mongoose model  şeması üzerindeki doğrulama (validation) kurallarını çalıştırır.
// Eğer kullanıcı yanlış bir veri formatı gönderirse, hata alınır ve yanlış veri kaydedilmez. Örne biz user modelde email regex ile validation yazdık onu işleme sokar
/* -------------------------------------------------------------------------- */

            const result = await User.updateOne({_id:req.params.id},req.body,{new:true,runValidators:true })
        
        res.status(202).send({
            error:false,
            result
        })

    },
    deleteUser: async () => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

        const { deletedCount } = await User.deleteOne({ _id: req.params.id })

        res.status(deletedCount ? 204 : 404).send({
            error: !deletedCount
        })
    }
}