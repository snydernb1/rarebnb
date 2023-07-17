import './BookingTiles.css'

export default function BookingTilesPast ({booking, spot}) {

    const today = new Date()

    console.log(Date.parse(today))
    if (spot.previewImage === undefined) return

    if (Date.parse(booking.startDate) > Date.parse(today)) return

    return (
        <section className="bookingTileContainer">

            <div className="bookingImgContainer">
                <img src={spot.previewImage} className="bookingImg"/>
            </div>

            <div className='bookingDetails'>


                <h2>{spot.name}</h2>

                <p>Starts: {booking.startDate}</p>
                <p>Ends: {booking.endDate}</p>


                {/* <div id='editDeleteReview'>
                <OpenModalMenuItem
                itemText="Delete"
                onItemClick={closeMenu}
                modalComponent={<DeleteConfirm id={review.id} deleteType='review'/>}
                />
                </div> */}

            </div>

        </section>
    );
};
