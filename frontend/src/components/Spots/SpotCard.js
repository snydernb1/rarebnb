export default function SpotCard ({spot}) {

    console.log('spot from SpotCard', spot)
    return (<>
    <div className="spotCard">
        <img src={spot.previewImage} />
        <div>
            <h3>{spot.city}, {spot.state}</h3>
            <h3>{spot.avgRating}</h3>
        </div>
        <h3>${spot.price} night</h3>
    </div>
    </>)
};
