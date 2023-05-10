import { useDispatch } from "react-redux";
import { fetchDeleteSpot } from "../../../../store/spots";
import { useModal } from "../../../../context/Modal";
import { fetchDeleteReview } from "../../../../store/reviews";


export default function DeleteConfirm({id, deleteType}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    // console.log('delete type in confirm delete modal', id)

    const handleDelete = (e) => {
        e.preventDefault();

        if (deleteType === 'spot') {
            dispatch(fetchDeleteSpot(id));
            closeModal();
        } else if (deleteType === 'review') {
            dispatch(fetchDeleteReview(id));
            closeModal();
        };
    };

    return (<>

    <h1>Confirm Delete</h1>
    <h3>{deleteType === 'spot' ? 'Are you sure you want to remove this spot from the listings?' : 'Are you sure you want to delete this review?'}</h3>
    <button onClick={handleDelete}>Yes (Delete {deleteType === 'spot' ? 'Spot' : 'Review'})</button>
    <button onClick={closeModal}>No (Keep {deleteType === 'spot' ? 'Spot' : 'Review'})</button>
    </>);
};
