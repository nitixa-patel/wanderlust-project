
const path = require('path');
const { reviewSchema } = require(path.join(__dirname, '../schema'));


const ExpressError = require('./ExpressError');

const validateListing = (req, res, next) => {
    const { listing } = req.body;
    if (!listing || Object.keys(listing).length === 0) {
      throw new ExpressError(400, 'Listing is required');
    }
    if (!listing.description || typeof listing.description !== 'string' || listing.description.trim().length === 0) {
        throw new ExpressError(400, 'Description is required and should be a non-empty string');
      }
    const requiredFields = ['title', 'description', 'location', 'country', 'price'];
    const missingFields = [];
    for (const field of requiredFields) {
      if (!listing[field]) {
        missingFields.push(field);
      }
    }
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map((field) => field.charAt(0).toUpperCase() + field.slice(1));
      const errorMessage = missingFieldNames.join(', ') + (missingFields.length > 1 ? ' are required' : ' is required');
      throw new ExpressError(400, errorMessage);
    }
    if (listing.price <=0) {
      throw new ExpressError(400, 'Price should be a non-zero and non-negative number');
    }

    if (listing.image && !isValidURL(listing.image)) {
        throw new ExpressError(400, 'Image URL is invalid');
    }
    next();
  };

  function isValidURL(str) {
    // You can implement a URL validation function here
    // For a simple check, you can use a regular expression
    const pattern = new RegExp('^(https?|ftp)://');
    return pattern.test(str);
}
  
const validateReview = (req,res,next)=>{
  let{error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
}


module.exports = { validateListing, validateReview }; 

  