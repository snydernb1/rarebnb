import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchSpot } from '../../../store/spots'

export default function GetSingleSpot() {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);

    console.log('back in comp for single spot',spot)

    useEffect(() => {
        dispatch(fetchSpot(spotId))
    }, [dispatch])

    return(<>
        <h1>{spot.name}</h1>
        <h3>{spot.city}, {spot.state}, {spot.country}</h3>
        <section>
            <img src={spot.SpotImages} />
        </section>
    </>)
};
