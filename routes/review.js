const express = require("express");
const router = express.Router({ mergeParams: true }); 
// mergeParams allows you to access params from the parent route

const Listing = require("../models/listing");
const Review = require("../models/review");
const { validateReview } = require("../utils/validateModels");
const{isLoggedIn, isReviewAuthor}=require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

const reviewController = require("../controllers/review");

// Define the route for creating a new review
router.post(
  "/",isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Define the route for deleting a review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
