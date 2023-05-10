import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteConfirm from "../ManageSpots/DeleteConfirmModal";

import { useState } from "react";
import { useSelector } from "react-redux";

export default function ReviewTiles ({review}) {
    const [showMenu, setShowMenu] = useState(false);

    const sessionUser = useSelector(state => state.session.user);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const closeMenu = () => setShowMenu(false);

    let hasReview = false;

    if (review.userId === sessionUser?.id) hasReview = true

    const date = new Date(review.createdAt)

    const year = date.getFullYear()
    const month = monthNames[date.getMonth()]
    if (!review.User) return false //state changes and causes rerender but doesn't have user info like when request reviews from db so new review hits false here... || solved by re-fetching reviews on review length change

    return (<>
    <h4>{review.User.firstName}</h4>
    <h4>{month}{year}</h4>
    <p>{review.review}</p>
    {hasReview &&
    <OpenModalMenuItem
        itemText="Delete"
        onItemClick={closeMenu}
        modalComponent={<DeleteConfirm id={review.id} deleteType='review'/>}
        />
    }
    </>);
};
