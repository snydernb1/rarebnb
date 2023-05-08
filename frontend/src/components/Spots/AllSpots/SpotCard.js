import { Link } from 'react-router-dom'

import './SpotCard.css'


export default function SpotCard ({spot, id}) {

    // console.log('spot from SpotCard', spot)
    return (<>
    <Link
    className="spotCard"
    to={`/${id}`}
    >

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

    </Link>
    </>)
};