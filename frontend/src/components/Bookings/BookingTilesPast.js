import { useHistory } from 'react-router-dom';

import './BookingTiles.css'

export default function BookingTilesPast ({booking, spot}) {
    const history = useHistory()
    const today = new Date()


    if (Date.parse(booking.startDate) > Date.parse(today)) return

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

            </div>

        </section>
    );
};
