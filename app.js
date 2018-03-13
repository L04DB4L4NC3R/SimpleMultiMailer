const express = require("express");
const bodyparser = require("body-parser");
const mail = require("./mailer")
const multer = require("multer");
var upload = multer({dest:"uploads/"});
const fs = require("fs");

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/",upload.single("file"),(req,res)=>{




    if(req.file){

        fs.rename(req.file.path,"uploads/"+req.file.originalname,()=>{


                    fs.readFile("./uploads/"+req.file.originalname,"utf8",(err,data)=>{

                        req.body.to = data;

                        console.log(req.body);
                        mail(req.body)
                        .then(()=>{
                            fs.unlinkSync("./uploads/" + req.file.originalname);
                            res.send("mail sent").status(200);
                        })
                        .catch((err)=>{
                            fs.unlinkSync("./uploads/" + req.file.originalname);
                            res.redirect("/");
                        });
                    });

                });


        }

else{
    console.log(req.body);
    mail(req.body)
    .then(()=>{
        res.send("mail sent").status(200);
    })
    .catch((err)=>{
        res.redirect("/");
    });
}

});

app.listen(process.env.PORT || 3000,()=>{
    console.log("Listening on port 3000");
});
