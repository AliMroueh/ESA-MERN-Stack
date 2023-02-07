import React from 'react'

function Rating(props) {
    // const { rating, numReviews } = props;
    const { rating, numReviews, caption } = props;
    return (
        <div className="rating">
            {/* <i class="fa-solid fa-star-sharp"></i> */}
            {/* <i class="fa-solid fa-star-sharp-half"></i> */}
            {/* <i class="fa-solid fa-star-sharp-half-stroke"></i> */}
            {/* <i class="fa-regular fa-star-sharp"></i> */}
            {/* <i class="fa-solid fa-star"></i> */}
            {/* <i class="fa-regular fa-star"></i> */}
            {/* <i class="fa-solid fa-star-half"></i> */}
                <span><i className={rating >= 1 ? "fa fa-star" : rating >= 0.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i></span>
                <span><i className={rating >= 2 ? "fa fa-star" : rating >= 1.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i></span>
                <span><i className={rating >= 3 ? "fa fa-star" : rating >= 2.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i></span>
                <span><i className={rating >= 4 ? "fa fa-star" : rating >= 3.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i></span>
                <span><i className={rating >= 5 ? "fa fa-star" : rating >= 4.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i></span>
                {/* <span>{numReviews + ' reviews'}</span> */}

                {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{numReviews + ' reviews'}</span>
      )}
            </div>
    )
}

export default Rating
