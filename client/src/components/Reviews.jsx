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
			sortReviewsBy: null,
			restaurantId: window.location.pathname
		};
		this.updateStarFilter = this.updateStarFilter.bind(this);
		this.getReviews = this.getReviews.bind(this);
		this.addAverageRating = this.addAverageRating.bind(this);
		this.updateSort = this.updateSort.bind(this);
	}

	componentDidMount() {
		this.getReviews();
	}

	getReviews() {
		axios.get(`http://localhost:${port}/api/reviews${this.state.restaurantId}`)
		.then(response => this.setState({ reviews: response.data }))
		.catch(err => console.error(err))
	}

	updateStarFilter(star) {
		this.setState({ starFilter: star })
	}

	updateSort(e) {
		this.setState({
			sortReviewsBy: e.target.value,
		})
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

		if (this.state.sortReviewsBy) {
			if (this.state.sortReviewsBy === 'newest') {
				reviews.sort((a, b) => (new Date(b.date) - new Date(a.date)));
			}
			if (this.state.sortReviewsBy === 'highest') {
				reviews.sort((a, b) => (b.stars - a.stars));
			}
			if (this.state.sortReviewsBy === 'lowest') {
				reviews.sort((a, b) => (a.stars - b.stars));
			}
		};

		if (this.state.starFilter) {
			filtered = reviews.filter(review => {
				return review.stars === Number(this.state.starFilter)
			})
		};

		return (
			<div>
				<AggregateReviews reviews={reviews} updateStarFilter={this.updateStarFilter} />
				<div className='reviewToolbar'>
					<select onChange={this.updateSort}>
						<option value='newest'>Newest</option>
						<option value='highest'>Highest rating</option>
						<option value='lowest'>Lowest rating</option>
					</select>
				</div>
				<Feed reviews={this.state.starFilter === null ? reviews : filtered} />
			</div>
		);
	}
}

module.exports = Reviews;