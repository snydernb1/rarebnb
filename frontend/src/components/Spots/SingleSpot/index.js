import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchSpot } from '../../../store/spots'
import './Spot.css'

export default function GetSingleSpot() {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const [loading, setLoading] = useState(true)



    // console.log('back in comp for single spot',spot)

    useEffect(() => {
        const loadingTimeout = setTimeout(()=>{
            setLoading(false)
        }, 500)

        return ()=>clearTimeout(loadingTimeout)
    }, [spot])

    useEffect(() => {
        dispatch(fetchSpot(spotId))
    }, [dispatch, spotId])

    if (loading) return <h1>Loading ...</h1>

    const handleReserve = () => {
        alert(`Feature coming soon...`)

    }


    const images = spot.SpotImages.slice(1)

        if (images.length < 4) {
            for (let i = 0; i < 4; i++) {
                images[i] = {
                    url: 'blank'
                }
            }
        }

    return(
        <section className='spot'>
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>

            <div className='allImages'>

                <div className='prevImage'>
                    <img src={spot.SpotImages[0].url} />
                </div>

                <div className='tileImages'>
                    {images.map((image, i)=> (
                        image.url !== 'blank' ? <img className='tileImg' key={i} src={image.url} /> : <img className='tileImg' key={i} src='https://digitalcommons.georgiasouthern.edu/jesuit-gallery205/1000/preview.jpg' />
                    ))}
                </div>

            </div>

            <div className='spotData'>

                <div className='leftSpotData'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>

                <div className='rightSpotData'>
                    <section className='rightData'>
                        <h3>${spot.price} night</h3>
                        <h4>{spot.avgStarRating}</h4>
                        {spot.numReviews === 0 ? <h4>New</h4> : <h4>{spot.numReviews} reviews</h4>}
                    </section>
                    <button className='reserveButton' onClick={handleReserve}>Reserve</button>
                </div>

            </div>

            <div>
                {spot.numReviews === 0 ? <h4>New</h4> : <h3>{spot.avgStarRating} {spot.numReviews} reviews</h3>}



            </div>

        </section>
    )
};
