import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteConfirm from "../ManageSpots/DeleteConfirmModal";

import { useState } from "react";
import { useSelector } from "react-redux";

import './ReviewTiles.css'

export default function ReviewTiles ({review, spotName}) {
    const [showMenu, setShowMenu] = useState(false);

    const sessionUser = useSelector(state => state.session.user);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const closeMenu = () => setShowMenu(false);

    let hasReview = false;

    if (review.userId === sessionUser?.id) hasReview = true

    const date = new Date(review.createdAt)

    const year = date.getFullYear()
    const month = monthNames[date.getMonth()]

    // console.log('this is the spotNAme',spotName)
    // console.log('this is the review',review)


    if (!review.User) return false //state changes and causes rerender but doesn't have user info like when request reviews from db so new review hits false here... || solved by re-fetching reviews on review length change

    return (
    <section className="reviewTile">
    <h4>{spotName ? spotName : review.User.firstName}</h4>

    <div id="date">
        <h4>{month}</h4>
        <h4>{year}</h4>
    </div>

    <p>{review.review}</p>
        {hasReview &&
    <div id='deleteReview'>
        <OpenModalMenuItem
            itemText="Delete"
            onItemClick={closeMenu}
            modalComponent={<DeleteConfirm id={review.id} deleteType='review'/>}
            />
    </div>
    }

    {/* //Working on update review button here */}
    <div id='editReview'>
        <OpenModalMenuItem
            itemText="Update"
            onItemClick={closeMenu}
            modalComponent={<UpdateReview id={review.id} deleteType='review'/>}
            />
    </div>

    </section>);
};
