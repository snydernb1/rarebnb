import { useDispatch } from "react-redux";
import { fetchDeleteSpot } from "../../../../store/spots";
import { useModal } from "../../../../context/Modal";


export default function DeleteConfirm({id}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(fetchDeleteSpot(id));
    }

    return (<>

    <h1>Confirm Delete</h1>
    <h3>Are you sure you want to remove this spot
    from the listings?</h3>
    <button onClick={handleDelete}>Yes (Delete Spot)</button>
    <button onClick={closeModal}>No (Keep Spot)</button>
    </>)
}
