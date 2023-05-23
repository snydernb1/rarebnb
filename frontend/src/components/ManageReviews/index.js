import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserReviews } from "../../store/reviews"

import ReviewTiles from "../Spots/SingleSpot/ReviewTiles"

import './ManageReviews.css'

export default function ManageReviews() {
    const reviewObj = useSelector(state => state.reviews.user);
    const dispatch = useDispatch();

    const reviewsRev = Object.values(reviewObj);
    const reviews = reviewsRev.reverse();

    // console.log('in manage reviews before review tiles', reviews)

    useEffect(() => {
        dispatch(fetchUserReviews())
    }, [dispatch])

    return (
    <section className="manageReviews">
        <h1 id='reviewHeader'>Manage Your Reviews</h1>

        <div className="reviewCards">
                {reviews.length > 0 && reviews.map((review)=> (
                    <ReviewTiles
                    review={review}
                    key={review.id}
                    spotName = {review.Spot.name}
                    />
                    ))}
            </div>

    </section>

    );
};
