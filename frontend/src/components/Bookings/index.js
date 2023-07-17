import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";

import './BookingModal.css'
import { newBookingThunk } from "../../store/bookings";
import { useHistory } from "react-router-dom";


export default function Bookings ({spot, sessionUser}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [errors, setErrors] = useState({})
    const [submit, setSubmit] = useState(false)


    useEffect(() => {
        const errors = {}

        let date = new Date()
        console.log('todays date', Date.parse(date))
        console.log('start date', Date.parse(startDate))

        if (!startDate) errors.startDate = "Please provide a start date"
        if (!endDate) errors.endDate = "Please provide a end date"
        if (Date.parse(date) > Date.parse(startDate)) errors.badStart = "Please pick a start date in the future"
        if (Date.parse(endDate) < Date.parse(startDate)) errors.badDates = "End date cannot be before the start"

        setErrors(errors)

    }, [startDate, endDate])

    console.log('front end errors', errors)



    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubmit(true);

        if (errors.badDates || errors.badStart || errors.startDate || errors.endDate) return

        const bookingData = {
            spotId: spot.id,
            data: {
                startDate,
                endDate
            }
        }

        const bookingMessage = await dispatch(newBookingThunk(bookingData))
            .then(() => closeModal())
            .then(() => history.push(`/users/${sessionUser.id}/trips`))
            .catch(async (res) => {
                const tempErrors = {}
                const resErrors = await res.json()
                tempErrors.dates = resErrors.message

                setErrors(tempErrors)
                return
            })





    }



    let makeDisabled = false;

    if (startDate && endDate) {
      makeDisabled = true
    }


    return (
        <section id="bookingModal">
            <h1 id="bookingFormHeader">Book a trip at {spot.name}</h1>
            <form onSubmit={handleSubmit} className="bookingForm">

                {errors.dates && <p className="createSpotErrors">{errors.dates}</p>}


                {submit && errors.startDate && <p className="bookingErrors">{errors.startDate}</p>}
                {submit && errors.endDate && <p className="bookingErrors">{errors.endDate}</p>}
                {submit && errors.badDates && <p className="bookingErrors">{errors.badDates}</p>}
                {submit && errors.badStart && <p className="bookingErrors">{errors.badStart}</p>}


                <p>Start date:</p>
                <input
                type="date"
                className="dateInput"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                />

                <p>End Date:</p>
                <input
                type="date"
                className="dateInput"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                />

                <button
                id="bookingButton"
                disabled={!makeDisabled}
                className={makeDisabled === false ? "reviewButtonDisabled" : "reviewButton"}
                >
                    Book your trip
                </button>

            </form>

        </section>
    )
}
