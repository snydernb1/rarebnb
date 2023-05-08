import { Link } from 'react-router-dom'

import './SpotCard.css'
import { useDispatch } from 'react-redux'
import { fetchDeleteSpot } from '../../../store/spots';


export default function SpotCard ({spot, id, owner}) {
    const dispatch = useDispatch();

    const handleUpdate = () => {
        return
    }

    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(fetchDeleteSpot(id));
    }

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

        {owner?.id === spot.ownerId && <div>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
            </div>}

    </Link>
    </>)
};
