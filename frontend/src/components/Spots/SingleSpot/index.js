import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchSpot } from '../../../store/spots'
import './Spot.css'
import { fetchReviews } from '../../../store/reviews'
import ReviewTiles from './ReviewTiles.js'
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem'
import CreateReview from './CreateReviewModal'

export default function GetSingleSpot() {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const reviewsObj = useSelector(state => state.reviews.spot);
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    const reviews = Object.values(reviewsObj);

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(fetchSpot(spotId))
        dispatch(fetchReviews(spotId))
    }, [dispatch, reviews.length])


    const handleReserve = () => {
        alert(`Feature coming soon...`)
    }

    if (!spot.SpotImages) return false
        const images = spot.SpotImages.slice(1)

            if (images.length < 4) {
                for (let i = 0; i < 4; i++) {
                    images[i] = {
                        url: 'blank'
                    }
                }
            }

    if (!reviews) return false

    const hasReview = reviews.find((review) => review.userId === sessionUser?.id)

    return(
        <section className='spot'>
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>

            <div className='allImages'>

                <div className='prevImage'>
                    <img src={spot.SpotImages[0].url} />
                </div>

                <div className='tileImages'>
                    { images.map((image, i)=> (
                        image.url !== 'blank' ? <img className='tileImg' key={i} src={image.url} /> : <img className='tileImg' key={i} src='https://digitalcommons.georgiasouthern.edu/jesuit-gallery205/1000/preview.jpg' />
                    ))}
                </div>

            </div>

            <div className='spotData'>

                <div className='leftSpotData'>
                    <h2  id='name'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>

                <div className='rightSpotData'>
                    <section className='rightData'>
                        <h3>${spot.price.toFixed(2)} night</h3>

                        <div className='starRating'>
                            <i class="fa-sharp fa-solid fa-star"></i>
                            <h4>{spot.avgStarRating.toFixed(1)}</h4>
                        </div>

                        {spot.numReviews === 0 ? <h4>New</h4> : <h4>{spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'}</h4>}
                    </section>
                    <button className='reserveButton' onClick={handleReserve}>Reserve</button>
                </div>

            </div>

            <div>
                <i class="fa-sharp fa-solid fa-star"></i>
                {spot.numReviews === 0 ? <h3>New</h3> : <h3>{spot.avgStarRating.toFixed(1)} {spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'}</h3>}
            </div>
            {
            sessionUser && sessionUser.id !== spot.ownerId && !hasReview &&
            <OpenModalMenuItem
              itemText="Post Your Review"
              onItemClick={closeMenu}
              modalComponent={<CreateReview spotId={spotId}/>}
            />
            }

            {!reviews.length && <h4>Be the first to post a review!</h4>}

            <div className="cards">
                {reviews.length > 0 && reviews.map((review)=> (
                    <ReviewTiles
                    review={review}
                    key={review.id}
                    hasReview={hasReview}
                    />
                    ))}
            </div>

        </section>
    )
};
