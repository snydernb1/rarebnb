import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import DeleteConfirm from '../ManageSpots/DeleteConfirmModal';

import { useDispatch } from 'react-redux'
import { fetchDeleteSpot } from '../../../store/spots';
import { useHistory, Link } from 'react-router-dom';
import { useState } from 'react';

import './SpotCard.css'

export default function SpotCard ({spot, id, owner}) {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory()

    const handleUpdate = (e) => {
        e.preventDefault();
        history.push(`/${id}/edit`)
    }

    const closeMenu = () => setShowMenu(false);

    console.log('spot from SpotCard', spot)
    return (<>
    <Link
    className="spotCard"
    to={`/${id}`}
    >

        <div className='imgDiv'>
            <img src={spot.previewImage} className='toolTip'/>
            <span className='toolTipText'>{spot.name}</span>
        </div>

        <div className='rating'>
            <p className='boldText'>{spot.city}, {spot.state}</p>

            <div id='rating'>
                <i class="fa-sharp fa-solid fa-star"></i>
                <p>{spot.avgRating !== null ? spot.avgRating?.toFixed(1) : 'New'}</p>
            </div>
        </div>

        <div className='price'>
        <p className='boldText'>${Number(spot.price).toFixed(2)}</p>
        <p>night</p>
        </div>


    </Link>
        {owner?.id === spot.ownerId && <div>
            <button onClick={handleUpdate}>Update</button>
            {/* <button onClick={handleDelete}>Delete</button> */}
            <OpenModalMenuItem
              itemText="Delete"
              onItemClick={closeMenu}
              modalComponent={<DeleteConfirm id={id} deleteType='spot'/>}
            />
            </div>}
    </>)
};
