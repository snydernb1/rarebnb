import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../../store/spots";
import SpotCard from "./SpotCard";
import './Spots.css'

function Spots() {
    const spotsObj = useSelector(state => state.spots.allSpots);
    const dispatch = useDispatch();

    const spots = Object.values(spotsObj);
    console.log('Spots from spot component', spots)

    // console.log('is spots running?')

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);


    return (
    <div className="cards">
        {spots.map((spot)=> (
            <SpotCard
            spot={spot}
            id={spot.id}
            />
        ))}
    </div>);
};

export default Spots;
