const express = require("express");
const app = express();

const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash=require("connect-flash");

const sessionOptions = {
    secret: "mysupersecretsstring",
    resave: false,
    saveUninitialized:true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register",(req,res)=>{
  let{name="anonymous"}=req.query;
  console.log(req.session);
  req.session.name=name;
  req.flash("success","user registered successfully");
 res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    // console.log(req.flash('success'));
    res.locals.msg = req.flash('success');
    res.render("page.ejs",{name:req.session.name});
        // res.send(`hello,${req.session.name}`);
    
});





// app.use(cookieParser());

const user = require("./routes/users.js");
const post = require("./routes/posts.js");

app.use("/posts",post);
app.use("/users",user);

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namaste");
//     res.cookie("origin","India");
//     res.send("sent you some cookies");
// });

// app.get("/getcookies",(req,res)=>{
//      let{name="anonymous"} = req.cookies;
//      res.send(`Hi , ${name}`);
// });

app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("got the cookies");
});

app.use(cookieParser("secretecode"));

app.get("/getsignedcookie",(req,res)=>{
      res.cookie("color","red",{signed:true});
      res.send("done!");
});

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
   res.send("verified");
});





app.get("/",(req,res)=>{
    res.send("Hi , I am root");
});

app.listen(3000,()=>{
    console.log("server is listing to 3000");
});