const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema,reviewSchema}=require("../schema.js");
const {validateListing,validateReview}= require("../utils/validateModels.js");
// const Listing = require("../models/listing");
const router = express.Router();
const {isLoggedIn, isOwner}=require("../middleware.js");
const listingController = require("../controllers/listings.js");


//Index and post(create) route
router
   .route("/")
     .get(wrapAsync(listingController.index))
     .post(
    isLoggedIn,
     validateListing,
      wrapAsync((listingController.createListing)));


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show route,put(Upadate) route,delete route
router
     .route("/:id")  
     .get(
        wrapAsync(listingController.showListing))
     .put(isLoggedIn,
         isOwner,
        validateListing,
        wrapAsync (listingController.updateListing))
      .delete(isLoggedIn,isOwner,
     wrapAsync (listingController.destroyListing)
 );   

 
 
 //Edit From Route
 router.get("/:id/edit",isLoggedIn,isOwner,
     wrapAsync(listingController.renderEditForm));
 
 module.exports = router;