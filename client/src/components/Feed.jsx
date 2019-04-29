import React from 'react';

import SingleReview from './SingleReview.jsx';

const Feed = ({ reviews }) => {
    return (
        <div className="feed">
            {reviews.map((review) => {
                return (
                    <div key={review.id}>
                        <SingleReview review={review} key={review.id}/>
                    </div>
                    )
                })
            }
        </div>
    );
}

export default Feed;