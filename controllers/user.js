const User = require("../models/user");

//signup from
module.exports.renderSignupFrom = (req,res)=>{
    res.render("users/signup.ejs");
  };


//signup
module.exports.signup = async(req,res)=>{
    try{
    let{username,email,password} = req.body;
     const newUser =  User ({email,username});
     const registeredUser =  await User.register(newUser,password);
     console.log(registeredUser);
     //For after sign up go on listings page 
     req.login(registeredUser,(err)=>{
        if(err){
           return next(err);
        }
     })
     req.flash("success","Welcome to Wanderlust");
     res.redirect("/listings");
    }
    catch(e){
       req.flash("error",e.message);
       res.redirect("/signup");
    }
};

//render login form
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

//login user
module.exports.login=  async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//logout user
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged you out!");
        res.redirect("/listings");
    })
};