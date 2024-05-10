const express= require("express");
const router= express.Router({mergeParams:true});
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const{listingSchema,reviewSchema}= require("../schema.js");
const Review= require("../models/review.js");
const Listing= require("../models/listing.js");


const validateReview= (req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    } else{
        next();
    }
}

const reviewController= require("../controllers/reviews.js");;
const review= require("../models/review.js");

//reviews- post route
router.post("/",validateReview,wrapAsync(reviewController.createReview));


//Delete- review route
router.delete("/:reviewId",wrapAsync(reviewController.destroyReview));

module.exports= router;