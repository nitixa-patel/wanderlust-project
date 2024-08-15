const Listing= require("../models/listing");
const Review= require("../models/review");


//create review
module.exports.createReview=async(req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return;
    }

    if (!listing.reviews) {
      listing.reviews = []; // Initialize listing.reviews as an array
    }
    const newReview = new Review(req.body.review);
   newReview.author = req.user._id;
   console.log(newReview);
    

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
  }

  //destroy review
module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
  };