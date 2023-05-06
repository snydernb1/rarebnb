import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchSpot } from '../../../store/spots'

export default function GetSingleSpot() {
    const spotId = useParams();
    const dispatch = useDispatch();
    const spotObj = useSelector(state => state.spots.singleSpot);

    useEffect(() => {
        dispatch(fetchSpot(spotId))
    }, [dispatch])

    return(<>
        <h1>hello from single spot details page</h1>
    </>)
};
