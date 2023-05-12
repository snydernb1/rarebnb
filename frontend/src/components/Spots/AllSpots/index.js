import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots, fetchClearSpot } from "../../../store/spots";
import SpotCard from "./SpotCard";
import './Spots.css'

function Spots() {
    const spotsObj = useSelector(state => state.spots.allSpots);
    const dispatch = useDispatch();

    const spots = Object.values(spotsObj);


    useEffect(() => {
        dispatch(fetchSpots());

        return () => dispatch(fetchClearSpot())
    }, [dispatch]);


    return (
    <section id='cardSection'>
        <div className="cards">
            {spots.map((spot)=> (
                <SpotCard
                spot={spot}
                id={spot.id}
                />
                ))}
        </div>
    </section>
    );
};

export default Spots;
