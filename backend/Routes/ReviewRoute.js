const express = require("express")
const { getProductReview, createProductReview } = require("../Controlers/AllReviewsControler")
const router = express.Router()

router.route("/reviews").get(getProductReview).post(createProductReview)

module.exports = router