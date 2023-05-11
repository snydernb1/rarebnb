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

    // console.log('images in single spot before return false', spot.SpotImages)
    if (!spot.SpotImages) return false

        const images = spot.SpotImages.slice(1)
        // console.log('images in single spot details', images)
        // console.log('spot.SpotImages in single spot details', spot.SpotImages)

        if (images.length < 4) {
            for (let i = 0; i < 4; i++) {
                images[i] = {
                    url: 'blank'
                }
            }
        }

        // console.log('images after loop', images)

    if (!reviews) return false


    const hasReview = reviews.find((review) => review.userId === sessionUser?.id)

    return(
        <section className='spot'>
            <h1>{spot.name}</h1>
            <h3 id='location'>{spot.city}, {spot.state}, {spot.country}</h3>

            <div className='allImages'>

                <div className='prevImage'>
                    <img src={spot.SpotImages[0].url} id='prevImg'/>
                </div>

                <div className='tileImages'>
                    { images.map((image, i)=> (
                        image.url !== 'blank' ? <img className='tileImg' key={i} id={`img${i}`} src={image.url} /> : <img className='tileImg' key={i} id={`img${i}`} src='https://digitalcommons.georgiasouthern.edu/jesuit-gallery205/1000/preview.jpg' />
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
                        <div id='cost'>
                            <h3>${Number(spot.price).toFixed(2)}</h3>
                            <p>night</p>
                        </div>

                        <div id='revInfoBox'>
                        {
                            spot.numReviews === 0 ? false :
                            <div className='starRating'>
                            <i class="fa-sharp fa-solid fa-star"></i>
                            <h4>{spot.avgStarRating?.toFixed(1)}</h4>
                        </div>
                        }

                        {
                        spot.numReviews === 0 ? false :
                        <i class="fa-sharp fa-solid fa-circle"></i>
                        }

                        <div className='review'>
                            {spot.numReviews === 0 ? <div className='noRevs'><i class="fa-sharp fa-solid fa-star"></i><h4>New</h4></div> : <h4>{spot.numReviews}</h4>}
                            {spot.numReviews === 0 ? false : <p>{spot.numReviews === 1 ? 'Review' : 'Reviews'}</p>}
                        </div>
                        </div>

                    </section>
                    <button className='reserveButton' onClick={handleReserve}
                    id='reserve'
                    >Reserve</button>
                </div>

            </div>

            <div className='reviewData'>
                <div className='starRating'>
                    <i class="fa-sharp fa-solid fa-star"></i>
                    {spot.numReviews === 0 ? <h4>New</h4> : <h4>{spot.avgStarRating.toFixed(1)}</h4>}
                </div>

                {
                spot.numReviews === 0 ? false :
                <i class="fa-sharp fa-solid fa-circle"></i>
                }

                {
                spot.numReviews === 0 ? false :
                <div className='review'>
                    <h4>{spot.numReviews}</h4>
                    <p>{spot.numReviews === 1 ? 'Review' : 'Reviews'}</p>
                </div>
                }


            </div>

            {
                sessionUser && sessionUser.id !== spot.ownerId && !hasReview &&
            <div id='createReview'>
            <OpenModalMenuItem
              itemText="Post Your Review"
              onItemClick={closeMenu}
              modalComponent={<CreateReview spotId={spotId}/>}
            />
            </div>
            }

            {!reviews.length && sessionUser && sessionUser.id !== spot.ownerId && !hasReview && <h4>Be the first to post a review!</h4>}

            <div className="reviewCards">
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
