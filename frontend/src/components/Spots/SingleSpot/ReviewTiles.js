export default function ReviewTiles ({review}) {

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const date = new Date(review.createdAt)
    console.log('log after new review', review)

    const year = date.getFullYear()
    const month = monthNames[date.getMonth()]
    if (!review.User) return false

    return (<>
    <h4>{review.User.firstName}</h4>
    <h4>{month}{year}</h4>
    <p>{review.review}</p>
    </>);
};
