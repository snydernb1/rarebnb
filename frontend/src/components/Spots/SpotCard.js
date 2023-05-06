import './SpotCard.css'


export default function SpotCard ({spot}) {

    console.log('spot from SpotCard', spot)
    return (<>
    <div className="spotCard">

        <div className='imgDiv'>
        <img src={spot.previewImage} />
        </div>

        <div className='rating'>
            <p className='boldText'>{spot.city}, {spot.state}</p>
            <p>{spot.avgRating}</p>
        </div>

        <div className='price'>
        <p className='boldText'>${spot.price}</p>
        <p>night</p>
        </div>

    </div>
    </>)
};
