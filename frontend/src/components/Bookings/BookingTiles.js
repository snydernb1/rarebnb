import CancelBooking from './CancelBooking';
import { useEffect, useState } from 'react'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

import './BookingTiles.css'

export default function BookingTiles ({booking, spot}) {

    const [showMenu, setShowMenu] = useState(false);

    const today = new Date()
    const closeMenu = () => setShowMenu(false);

    if (Date.parse(booking.startDate) < Date.parse(today)) return

    return (
        <section className="bookingTileContainer">

            <div className="bookingImgContainer">
                <img src={spot.previewImage} className="bookingImg"/>
            </div>

            <div className='bookingDetails'>


                <h2>{spot.name}</h2>

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
