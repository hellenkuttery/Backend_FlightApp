"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
// MAIL

const nodemailer=require("nodemailer")

module.exports=function mail(to,subject,message){

    const transporter=nodemailer.createTransport({
    host:"smtp.ethereal.email",
    port:587,
    secure:false,
    auth:{
         user: 'uerrwnw5mjnbfrx7@ethereal.email',
        pass: 'kYHKGBWzrQa7yCSptH',
    }
})

console.log(transporter)

// Send mail
transporter.sendMail({
    from:"uerrwnw5mjnbfrx7@ethereal.email",
    to:to,
    subject:subject,
    text:message,
    html:"<p> Hello <b> how are you</b> </p>"

},function(error,success){
    success ? console.log("SUCCESS",success) : console.log("ERROR",error)

})
}
