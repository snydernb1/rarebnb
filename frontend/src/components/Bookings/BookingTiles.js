import CancelBooking from './CancelBooking';
import { useEffect, useState } from 'react'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

import './BookingTiles.css'
import { useHistory } from 'react-router-dom';

export default function BookingTiles ({booking, spot}) {
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);

    const today = new Date()
    const closeMenu = () => setShowMenu(false);

    if (Date.parse(booking.startDate) < Date.parse(today)) return

    if (!spot.previewImage) return

    const handleRedirect = () => {
        history.push(`/spot/${spot.id}`)
    }

    return (
        <section className="bookingTileContainer">

            <div className="bookingImgContainer" onClick={handleRedirect}>
                <img src={spot.previewImage} className="bookingImg"/>
            </div>

            <div className='bookingDetails'>


                <h3>{spot.name}</h3>

                <p>Starts: {booking.startDate}</p>
                <p>Ends: {booking.endDate}</p>


                <div id='cancelTrip'>
                    <OpenModalMenuItem
                    itemText="Cancel Trip"
                    onItemClick={closeMenu}
                    modalComponent={<CancelBooking id={booking.id}/>}
                    />
                </div>

            </div>

        </section>
    );
};
