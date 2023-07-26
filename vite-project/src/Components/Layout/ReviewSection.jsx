import React from "react";
import Reviews from "./Reviews";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import Loader from "./Loader";
import BarLoader from "react-spinners/BarLoader"
const ReviewSection = () => {

  const { loading, reviews } = useSelector((state) => state.reviews);
  const reviewData = reviews.allReviews;
  useEffect(() => {
  }, [loading]);
  return (
    <div>
      {loading ? (
        <BarLoader color="#07a1d9" style={{display: "block" , margin: "0 auto"}}/>
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