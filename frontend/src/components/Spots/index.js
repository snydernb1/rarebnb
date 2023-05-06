import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import SpotCard from "./SpotCard";

function Spots() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state=> state.spots.allSpots)

    // console.log('Spots from spot component', spots)
    const spots = Object.values(spotsObj);



    useEffect(()=> {
        dispatch(fetchSpots());
    }, [dispatch])


    return (
    <>
        <h1>Hello From SPots</h1>
        {spots.map((spot)=> (
            <SpotCard
            spot={spot}
            />
        ))}
    </>);
};

export default Spots;
