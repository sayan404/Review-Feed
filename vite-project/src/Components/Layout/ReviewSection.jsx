import React from "react";
import Reviews from "./Reviews";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
const ReviewSection = () => {

  const { loading, reviews } = useSelector((state) => state.reviews);
  const reviewData = reviews.allReviews;
  useEffect(() => {
  }, [loading]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : reviewData ? (
        reviewData.map((review) => (
          <Reviews
            key={review._id}
            author={review.reviewerName}
            postedOn={review.datePosted}
            reviewText={review.reviewText}
            productVersion={review.productVersion}
            productName={review.productName}
            reviewType={review.reviewType}
            productType={review.productType}
            starRating={review.starRating}
            numLikes={review.numLikes}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default ReviewSection;
/*
datePosted
: 
"2023-07-24T23:18:23.072Z"
numLikes
: 
100
productName
: 
"Awesome Gizmo"
productType
: 
"Tech"
productVersion
: 
"4.1"
reviewText
: 
"Overall, a great product. It would be perfect with a built-in camera."
reviewType
: 
"Feature request"
reviewerName
: 
"Emily Wilson"
starRating
: 
4
__v
: 
0
_id
: 
"64bf06bf1745d7fd5e373b80"*/
