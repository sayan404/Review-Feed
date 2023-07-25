const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema({
    starRating: {
        type: Number,
        required: true,
    },
    reviewerName: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    reviewType: {
        type: String,
        enum: ["Feature request", "Bug", "Appreciation"],
        required: true,
    },
    reviewText: {
        type: String,
        required: true

    },
    numLikes: {
        type: Number,
        default: 0
    },
    productName: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    productVersion: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("ProductReview", productReviewSchema);
