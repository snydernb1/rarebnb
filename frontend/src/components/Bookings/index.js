import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";

import './Bookings.css'
import { newBookingThunk } from "../../store/bookings";


export default function Bookings ({spot, sessionUser}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [errors, setErrors] = useState({})

    console.log('what is the default date format?', startDate)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const bookingData = {
            spotId: spot.id,
            data: {
                startDate,
                endDate
            }
        }

        const bookingMessage = await dispatch(newBookingThunk(bookingData))
            .catch(async (res) => {
                const errors = {}
                const resErrors = await res.json()
                // console.log('errors?', errors)
                errors.dates = resErrors.message

                setErrors(errors)

                return
            })


    }




    return (
        <section>
            <h1>Book a trip at {spot.name}</h1>
            <form onSubmit={handleSubmit}>

                {errors.dates && <p>{errors.dates}</p>}
                <p>Start date</p>
                <input
                type="date"
                className="dateInput"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                />

                <p>End Date</p>
                <input
                type="date"
                className="dateInput"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                />

                <button>Book your trip</button>

            </form>

        </section>
    )
}
