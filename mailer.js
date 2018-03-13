const nodemailer = require("nodemailer")

module.exports = (data)=>{
    return new Promise((resolve,reject)=>{

        var transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:data.user,
                pass:data.pass
            }
        });

        var mailOptions = {
            from:data.user,
            to:data.to,
            subject:data.subject,
            text:data.text
        }

        transporter.sendMail(mailOptions,(err,info)=>{
            if(err) {console.log(err);reject("Error sending mail");}
            else    resolve("Mail sent to " + data.to);
        });

    });
}
