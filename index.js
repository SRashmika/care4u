
const express = require('express');
const bodyParser = require('body-parser');
const ejs =require('ejs');
const session = require('express-session');
const mysql = require('mysql');

//const fileupload = require('express-fileupload');
//const cors = require('cors');
//const _ =require('lodash');

//Express configuration
const app=express();
app.use(session({
    secret:'KeyToEncryptSessions',
    resave:true,
    saveUninitialized:true
}));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//app.use(fileupload({createParentPath: true}));
//app.use(cors());



//Mysql configuration
const connection = mysql.createConnection({
    host:"localhost",
    database:"CARE4U",
    user:"root",
    port:"3306",
    password:"root"
});

connection.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("MySql Server Connected Sucsessfully...");

    }

});

function getfromdb(query){
    return new Promise((resolve,reject)=>{
        connection.query(query,(error,result,fields)=>{
            if(error){
                 reject(error);
            }else{
                resolve(result);
            }
        });
    });
}




/////////////  Request Handling  ///////////
////////  Get Requests  //////
///////Page-rendering//////


/////////care4u admin login//////////
app.get("/Admin-login",(request,response)=>{
    response.render("Admin-login",{ErrorMessage:''});
    
});


app.post('/admin/login',async (req,res)=>{
    let username= req.body.username;
    let password= req.body.password;
    console.log(username,password)
    if(username && password){
        let user = await getfromdb(`SELECT * FROM admin WHERE username='${username}' AND password='${password}';`);
        if(user.length>0){
            req.session.loggedin=true;
            req.session.userid= user[0].username;
            res.redirect('/Company-applications');
        }else{
            res.render('Admin-login',{ErrorMessage:'Username of Password is incorrect!'});
        }
    }else{
        res.render('Admin-login',{ErrorMessage:'please enter both username and password correctly!'});
    }    
});

////////////company-login////////
app.get("/Home/Company-login",(request,response)=>{
    response.render("Company-login",{ErrorMessage1:''});
    
});



app.post('/company/login',async (req,res)=>{
    let comEmail = req.body.comEmail;
    let comPwd = req.body.comPwd;
    if(comEmail && comPwd){
        let comuser = await getfromdb(`SELECT * FROM company WHERE comEmail='${comEmail}' AND comPwd='${comPwd}';`);
        if(comuser.length>0){
            req.session.loggedin=true;
            req.session.userid= comuser[0].comName;
            res.redirect('/Company');
        }else{
            res.render('Company-login',{ErrorMessage1:'Username or Password is incorrect!'});
        }
    }else{
        res.render('Company-login',{ErrorMessage1:'Please enter both username and password correctly!'});
    }
});


///////////////////company-register/////////








app.get("/",(request,response)=>{
    response.render("Home");
    
});



app.get("/Company",(request,response)=>{
    response.render("Company");
    
});

app.get("/Company-login",(request,response)=>{
    response.render("Company-login");
    
});

app.get("/Company-register",(request,response)=>{
    response.render("Company-register");
    
});

app.get("/Main-home",(request,response)=>{
    response.render("Main-home");
    
});

app.get("/Company-home",(request,response)=>{
    response.render("Company-home");
    
});



app.get("/Member",(request,response)=>{
    response.render("Member");
    
});

app.get("/Nurse-order-form",(request,response)=>{
    response.render("Nurse-order-form");
    
});

app.get("/Nurse-application",(request,response)=>{
    response.render("Nurse-application");
    
});

app.get("/Manage-employees",(request,response)=>{
    response.render("Mange-employees");
    
});

app.get("/Manage-Nurse-applications",(request,response)=>{
    response.render("Applications");
    
});

app.get("/Manage-Nurse-bookings",(request,response)=>{
    response.render("Bookings");
    
});

app.get("/Company-applications",(request,response)=>{
    response.render("Company-applications");
    
});

////////Requests in home page/////
app.get("/Home/Company-register",(request,response)=>{
    response.render("Company-register");
    
});

// app.get("/Home/Company-login",(request,response)=>{
//     response.render("Company-login");
    
// });
app.get("/Home/Main-home",async (request,response)=>{
    let complist = await getfromdb('select comName from company')
    console.log(complist)
    response.render("Main-home",{complist});
    
});

//////////Requests of company-home nav-bar////
app.get("/company-home-upper",(request,response)=>{
    response.render("Company-home");
    
});

app.get("/company-home-middle",(request,response)=>{
    response.render("company-home-middle");
    
});

app.get("/company-home-middle-ourservice",(request,response)=>{
    response.render("company-home-middle-ourservice");
    
});

app.get("/company-home-middle-members",(request,response)=>{
    response.render("company-home-middle-members");
    
});

app.get("/company-home-middle-rateus",(request,response)=>{
    response.render("company-home-middle-rateus");
    
});
app.get("/company-home-middle-ad",(request,response)=>{
    response.render("company-home-middle-ad");
    
});

//////////Requests of company-home/////
// app.get("/Home-member-view",(request,response)=>{
//     response.render("Member");
    
// });

// app.get("/Ad/Nurseapply",(request,response)=>{
//     response.render("Nurse-application");
    
// });


app.get("/Home/Home-member-view",async (request,response)=>{
    let comName =request.query.comName;
    let result = await getfromdb(`select * from company where comName="${comName}"`) 
    response.render("Member", {result});
    
});

app.get("/Home/Nurseapply",(request,response)=>{
    response.render("Nurse-application");
    
});

//////////Requests of member-page/////////
app.get("/Home/Booking",(request,response)=>{
    response.render("Nurse-order-form");
    
});

//////////////////Requests of company admin///////
app.get("/Company/Company-details",(request,response)=>{
    response.render("Company");
    
});
app.get("/Company/Manage-employees",(request,response)=>{
    response.render("Manage-employees");
    
});
app.get("/Company/Employee-applications",(request,response)=>{
    response.render("Applications");
    
});

////////////Requests of Main home//////
app.get("/Home/CompanyHome",async (request,response)=>{
    let comName =request.query.comName;
    let result = await getfromdb(`select * from company where comName="${comName}"`) 
    response.render("Company-home",{result});
    
});







//Data HAndling
app.post('/Company/savedetails',async(req,res)=>{
    
    
    let comaddress = req.body.comAddress;
    let comemail= req.body.comEmail;
    let comvision=req.body.vision;
    let commission = req.body.mission;
    let aboutus =req.body.aboutUs;
    let comphone =req.body.comPhone;
    let comwhy= req.body.whyChooseUs;
    let comservice =req.body.services;

    let comname =req.session.userid;
    await getfromdb(`update company set comAddress= "${comaddress}",comEmail = "${comemail}", comPhone="${comphone}",vision = "${comvision}", mission = "${commission}",aboutUs = "${aboutus}",whyChooseUs="${comwhy}", services="${comservice}" where comName="${comname}"`);
    // let result = await getfromdb(`select * from company where comName="${comname}"`)
    // console.log(result)
    res.send("Data Saved Successfully");

});


app.post('/Home/Company-register/savedetails',async(req,res)=>{

    let comname = req.body.comName;
    let comregno = req.body.comRegNo;
    let comaddress = req.body.comAddress;
    let comtype = req.body.comType;
    let comphone = req.body.comPhone;
    let comemail = req.body.comEmail;
    let compwd = req.body.comPwd;

    await getfromdb(`INSERT INTO company(comName,comPwd,comRegNo,comAddress,comType,comEmail,comPhone) VALUES("${comname}","${compwd}","${comregno}","${comaddress}","${comtype}","${comemail}","${comphone}" )`);
    // let result = await getfromdb(`select * from company where comName="${comname}"`)
    // console.log(result)
    res.send("Data Saved Successfully");
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000...");
});


