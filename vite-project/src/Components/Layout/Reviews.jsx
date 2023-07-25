import React from 'react'
import './Reviews.css'
import Rating from '@mui/material/Rating';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
const Reviews = ({author , postedOn , reviewText , productVersion , productName , reviewType , productType, starRating , numLikes}) => {
  return (
    <div className='reviewsContainer'>
      <div className='topCrdSection'>
        <div className='leftTopSection'>
          <p><Rating name="read-only" value={starRating} readOnly /></p>
          <p>{author}</p>
          <p>{postedOn}</p>
        </div>
        <div className='rightTopSection'>
          <p>{reviewType}</p>
        </div>
      </div>
      <p className='sectionDivider'></p>
      <div className='bottomCrdSection'>
        <div className='leftBottomSection'>{reviewText}
        </div>
        <div className='rightBottomSection'>
          <p>{numLikes}</p><p><ThumbUpOffAltIcon variant = 'outline' /></p>
          <p>{productVersion}</p>
          <p>{productName}</p>
          <p>Android 13</p>
          <p>{productType}</p>
        </div>
      </div>
    </div>
  )
}

export default Reviews