const Listing= require("../models/listing");

//index
module.exports.index=async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
 };

 //new listing
 module.exports.renderNewForm=(req,res)=>{
    //   console.log(req.user);
     res.render("listings/new.ejs");
 };


 //show listing
 module.exports.showListing =async (req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id)
                           .populate({path:"reviews",populate:{path:"author"}})
                           .populate("owner");
    if(!listing){
       req.flash("error","The listing you requested for does not exist!");
       res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};

//create listing
module.exports.createListing = async(req,res,next)=>{
     
    if(!req.body.listing){
        throw new ExpressError(404,"Send valid data for listing");
    }
    if (!req.body.listing.description) {
        throw new ExpressError(400, "Description is required");
    }
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
   await newListing.save();
   req.flash("success","New Listing Created!");
   res.redirect("/listings");
}

// render edit from listing

module.exports.renderEditForm=async (req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
       req.flash("error","The listing you requested for does not exist!");
       res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
    
};

//update listing 
module.exports.updateListing=async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(404,"Send valid data for listing");
    }
let{id} = req.params;
await Listing.findByIdAndUpdate(id,{...req.body.listing});
req.flash("success","Listing Updated!");
res.redirect(`/listings/${id}`);
};

//delete listing
module.exports.destroyListing=async (req,res)=>{
    let{id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};