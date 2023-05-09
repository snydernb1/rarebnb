import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { useEffect, useState } from "react";
import './ReviewModal.css'


export default function CreateReview() {
    const dispatch = useDispatch();

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({});

    console.log('rating?', rating)

    useEffect(() => {
        const errors = {}
        if (review.length < 10) errors.review = "Review needs a minimum of 10 characters"
        if (rating < 1) errors.rating = "Rating must have a minimum of 1 star"

        setErrors(errors)
    }, [rating, review]);

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    function starRating (num) {
        const props = {};
        props.onMouseEnter = () =>  setRating(num)
        props.onMouseLeave = () => setRating(rating)
        props.onClick = () => setRating(num)

        return (
          <div key={num} className={`${rating >= num ? "filled" : "empty"}`}
            {...props}
            >
              <i id="1" className="fa fa-star"></i>
            </div>
        )
      }


    return (<>
    <h1>How was your stay?</h1>

    <form onSubmit={handleSubmit}>


        <textarea
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            />


        {[1,2,3,4,5].map((num)=>starRating(num))}

        <h4>Stars</h4>

        <button
        type="submit"
        disabled={Object.values(errors).length > 0} //add validations
        >
            Submit Your Review
           {/* {formType === "Create" ? 'Create Spot' : 'Update Spot'} */}
        </button>

    </form>
    </>);
};
