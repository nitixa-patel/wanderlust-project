const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const{saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");


//render signup form , post route for singup
router
    .route("/signup")
       .get(userController.renderSignupFrom)
       .post(wrapAsync(userController.signup));


//render login form , after signup direct login
router
     .route("/login")
     .get(userController.renderLoginForm)
     .post(
            saveRedirectUrl,
           passport.authenticate("local",
           {failureRedirect:'/login',
            failureFlash:true}),
            userController.login
          );

//logout router
router.get("/logout",userController.logout);

module.exports = router;