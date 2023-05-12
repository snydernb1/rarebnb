import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SpotCard from "../AllSpots/SpotCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSpots, fetchClearSpot } from "../../../store/spots";

import './ManageSpots.css'


export default function ManageSpots() {
    const sessionUser = useSelector(state => state.session.user);
    const spotsObj = useSelector(state => state.spots.allSpots);
    const history = useHistory()
    const dispatch = useDispatch();

    const spots = Object.values(spotsObj);

    const handleClick = () => {
        history.push('/new')
    };

    useEffect(() => {
        dispatch(fetchUserSpots())

        return () => dispatch(fetchClearSpot())
    }, [dispatch]);

    return (<section id="manageSpotsPage">
        <h1>Manage Your Spots</h1>
        {
        spots.length === 0 &&
        <button onClick={handleClick} id='manageSpotCreate'>Create a New Spot</button>
        }

        <div className="manageCards">
            {spots.map((spot)=> (

                    <SpotCard
                    spot={spot}
                    id={spot.id}
                    owner={sessionUser}
                    />

            ))}
        </div>

    </section>)
}
