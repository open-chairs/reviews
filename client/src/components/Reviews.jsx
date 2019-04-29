import React from 'react';

import AggregateReviews from './AggregateReviews.jsx';
import Feed from './Feed.jsx';
import '../style.css';
import axios from 'axios';

var port = process.env.PORT || 3004;

class Reviews extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: [],
			starFilter: null,
			restaurantId: window.location.pathname
		};
		this.updateStarFilter = this.updateStarFilter.bind(this);
		this.getReviews = this.getReviews.bind(this);
		this.addAverageRating = this.addAverageRating.bind(this);
	}

	componentDidMount() {
		this.getReviews();
	}

	getReviews() {
		axios.get(`http://localhost:${port}/api/reviews${this.state.restaurantId}`)
		.then(response => this.setState({ reviews: response.data}))
		.catch(err => console.error(err))
	}

	updateStarFilter(star) {
		this.setState({ starFilter: star })
	}

	//calculates the avg rating (food, service & ambience) & adds those properties to reviews object
	addAverageRating(reviews) {
		return reviews.map((review) => {
			let avg = Math.round((review.food + review.service + review.ambience)/3);
			review.stars = avg;
			review.overall = avg;
			return review;
		})
	}

	render() {
		let reviews = this.addAverageRating(this.state.reviews);
		let filtered;
		if (this.state.starFilter) {
			filtered = reviews.filter(review => {
				return review.stars === Number(this.state.starFilter)
			})
		};

		return (
			<div>
				<AggregateReviews 
					reviews={reviews} 
					updateStarFilter={this.updateStarFilter} 
				/>
				<Feed reviews={this.state.starFilter === null ? reviews : filtered} />
			</div>
		);
	}
}

module.exports = Reviews;