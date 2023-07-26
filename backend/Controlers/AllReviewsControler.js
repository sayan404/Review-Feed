const catchAsyncError = require('../Middleware/CatchAsyncError')
const ProductReview = require('../Models/ReviewModel');

exports.getProductReview = catchAsyncError(async (req, res, next) => {
    const { deviceOptions, ratingOptions , versionOptions , reviewOptions , keyword } = req.query;
    const allReviews = [];
    
    const queryObject = {};

    if (deviceOptions && deviceOptions.trim() !== "") {
        const deviceOptionsArray = deviceOptions.split(",").map((option) => option.trim());
        queryObject.productType = { $in: deviceOptionsArray };
    }

    if (ratingOptions && ratingOptions.trim() !== "") {
        const ratingOptionsArray = ratingOptions.split(",").map((option) => option.trim());
        queryObject.starRating = { $in: ratingOptionsArray };
    }
    if (versionOptions && versionOptions.trim() !== "") {
        const versionOptionsArray = versionOptions.split(",").map((option) => option.trim());
        queryObject.productVersion = { $in: versionOptionsArray };
    }
    if (reviewOptions && reviewOptions.trim() !== "") {
        const reviewOptionsArray = reviewOptions.split(",").map((option) => option.trim());
        queryObject.reviewType = { $in: reviewOptionsArray };
    }
    // console.log(keyword);
    // if (keyword) {
    //     queryObject.productName = { $regex: keyword, $options: "i" }
    // }
    // console.log("1");

    try {
        allReviews.push(await ProductReview.find(queryObject));
        const productListLength = allReviews.length;
        // console.log(allReviews);
        res.json({
            success: true,
            productListLength,
            allReviews: allReviews.flat(),
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


// Create a new product review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    try {
        const {
            starRating,
            reviewerName,
            reviewType,
            reviewText,
            productName,
            productType,
            productVersion,
        } = req.body;

        const newReview = new ProductReview({
            starRating,
            reviewerName,
            reviewType,
            reviewText,
            productName,
            productType,
            productVersion,
        });

        const savedReview = await newReview.save();
        res.json({
            success: true,
            savedReview
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
})