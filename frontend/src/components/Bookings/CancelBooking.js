import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'
import { cancelBookingThunk } from '../../store/bookings';


export default function CancelBooking ({id}) {
    const {closeModal} = useModal();
    const dispatch = useDispatch()

    const handleCancel = async (e) => {
        e.preventDefault()
        await dispatch(cancelBookingThunk(id))
        closeModal()

    }

    return (
        <section id='deleteConfirmModal'>

            <h1>Confirm Cancellation</h1>
            <h3 id='areYouSure'>Are you sure you want to cancel this trip?</h3>
            <button id='confirmDelete' onClick={handleCancel}>Yes (Cancel Reservation)</button>
            <button id='confirmKeep' onClick={closeModal}>No (Keep Reservation)</button>

        </section>
    )

}
