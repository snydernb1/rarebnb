import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserReviews, fetchClearReviews } from "../../store/reviews"

import ReviewTiles from "../Spots/SingleSpot/ReviewTiles"

import './ManageReviews.css'

export default function ManageReviews() {
    const reviewObj = useSelector(state => state.reviews.user);
    const dispatch = useDispatch();

    const reviewsRev = Object.values(reviewObj);
    const reviews = reviewsRev.reverse();

    console.log('reviews in manage index', reviews)

    useEffect(() => {
        dispatch(fetchUserReviews())

        return () => dispatch(fetchClearReviews())
    }, [dispatch])


    return (
    <section className="manageReviews">
        <h1 id='reviewHeader'>Manage Your Reviews</h1>

        <div className="reviewCards">
                {reviews.length > 0 && reviews.map((review)=> (
                    <ReviewTiles
                    review={review}
                    key={review.id}
                    spotName = {review.Spot?.name}
                    />
                    ))}
            </div>

    </section>

    );
};
