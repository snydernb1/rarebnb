import { useEffect } from "react"
import { fetchUserTrips } from "../../store/bookings"
import { useDispatch, useSelector } from "react-redux"
import { fetchSpots } from "../../store/spots"
import BookingTiles from "./BookingTiles"
import BookingTilesPast from "./BookingTilesPast"

import './ManageBookings.css'


export default function ManageBookings () {
    const dispatch = useDispatch()
    const spotsObj = useSelector(state => state.spots.allSpots)
    const bookingsObj = useSelector(state => state.bookings.userBookings)

    const bookings = Object.values(bookingsObj)

    const compareDates = (a, b) => {
        return new Date(a.startDate) - new Date(b.startDate)
    }

    bookings.sort(compareDates)


    useEffect(() => {
        dispatch(fetchUserTrips())
        dispatch(fetchSpots())
    }, [])

    if (Object.keys(spotsObj).length === 0) return

    return (
        <section className="manageBookingsContainer">
            <h1 id='reviewHeader'>Manage Your Trips</h1>


            <h3 className="bookingSubHeader">Upcoming Trips:</h3>

            <div className="reviewCards">
                {bookings.length > 0 && bookings.map((booking)=> (
                    <BookingTiles
                    booking={booking}
                    key={booking.id}
                    spot = {spotsObj[booking.spotId]}
                    />
                    ))}

            </div>

            <h3 className="bookingSubHeader" id="bookingSubHeader">Past Trips:</h3>

            <div className="reviewCards">
                {bookings.length > 0 && bookings.reverse().map((booking)=> (
                    <BookingTilesPast
                    booking={booking}
                    key={booking.id}
                    spot = {spotsObj[booking.spotId]}
                    />
                    ))}
            </div>
        </section>
    )
}
