import React from "react";

// SVG template for rating stars
var star = (color) => ( 
	<svg height="16px" width="16px" viewBox="-1 -1 2 2">
	  <polygon points="0,-1 .588,.809 -.95,-.31 .95,-.31 -.588,.809"
	  fill={color} />
	</svg>
);

// generate star rating
var fillStars = (red) => {
	var stars = Array(5);
	stars.fill(star('crimson'), 0, red);
	stars.fill(star('lightGray'), red);
	return stars;
};

//generate random colors based on name
const circleColorRoulette = (name) => {
	let red = name.charCodeAt(0) % 256;
	let green = name.charCodeAt(name.length - 1) % 256;
	let blue = name.charCodeAt(~~(name.length / 2)) % 256;
	let colors = `rgb(${red},${green},${blue})`;
	return colors;
};

const SingleReview = ({ review }) => {
  return (
    <div className="review" key={review.id}>
      <div className="profile">
        <div className="circle" style={{ backgroundColor: circleColorRoulette(review.name) }}>
          {review.name[0].toUpperCase()}
        </div>
        {review.is_vip ? <span className="VIP">VIP</span> : null}
        <div className="author">{review.name}</div>
        <div className="city">{review.city}</div>
        <div className="pastReviews">{`${review.past_reviews} reviews`}</div>
      </div>
      <div className="userReview">
        <div className="banner">
          <div className="starsAndDate">
            <div className="stars">{fillStars(review.stars)}</div>
            <div className="date">{review.date.slice(0,10)}</div>
          </div>
          <div className="ratings">
            Overall <div className="overall">{review.overall}</div>
            Food <div className="food">{review.food}</div>
            Service <div className="service">{review.service}</div>
            Ambience <div className="ambience">{review.ambience}</div>
          </div>
        </div>
        <div className="post">{review.post}</div>
      </div>
    </div>
  );
};

export default SingleReview;
