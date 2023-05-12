import { useDispatch, useSelector } from "react-redux";
import SpotForm from "../CreateSpot/SpotForm";
import { useEffect } from "react";
import { fetchSpot } from "../../../store/spots";
import { useParams } from "react-router-dom";
import { fetchClearSpot } from "../../../store/spots";


export default function EditSpot () {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => state.spots.singleSpot);


    useEffect(() => {
        dispatch(fetchSpot(spotId))

        return () => dispatch(fetchClearSpot())
    }, [dispatch, spotId]);

    return (
        Object.keys(spot).length > 1 && (
        <>
            <SpotForm
              spot={spot}
              formType='Edit'
            />
        </>
        )
    );
};
