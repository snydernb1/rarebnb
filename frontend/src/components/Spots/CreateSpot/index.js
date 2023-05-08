import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewSpot } from "../../../store/spots";



export default function CreateSpot() {
    const [errors, setErrors] = useState({})
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [prevImg, setPrevImg] = useState("")
    const [imgTwo, setImgTwo] = useState("")
    const [imgThree, setImgThree] = useState("")
    const [imgFour, setImgFour] = useState("")
    const [imgFive, setImgFive] = useState("")
    const [submit, setSubmit] = useState(false)

    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

    // console.log(sessionUser.id);

//====Checking for Errors=======================================
    useEffect(() => {
        const errors = {}
        if (country.length < 4) errors.country = "Country is required"



        setErrors(errors)
      }, [country])



//====On Submit================================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmit(true);

        const spotData = {
            ownerId: sessionUser.id, country, address, city, state, description, name, price, lat: 12.23523, lng:13.43567
        }


        if (Object.values(errors).length === 0) {
            const newSpot = await dispatch(fetchNewSpot(spotData))
        }




        const imgData = {

        }

    }


    return (
      <section>

        <h1>Create a new Spot</h1>
        <h3>Where's your place located?</h3>
        <h4>Guests will only get your exact address once they booked a
        reservation.</h4>

        <form onSubmit={handleSubmit}>

        {submit && errors.country && (
            <div className="error">* {errors.country}</div>
          )}
            <label>
                Country:
                <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                />
            </label>

        <div className="errors">{errors.address}</div>
            <label>
                Street Address:
                <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
            </label>

        <div>
            <div className="errors">{errors.city}</div>
                <label>
                    City:
                    <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                </label>

            <div className="errors">{errors.state}</div>
                <label>
                    State:
                    <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    />
                </label>
        </div>

        <h3>Describe your place to guests</h3>
        <h4>Mention the best features of your space, any special amentities like
        fast wifi or parking, and what you love about the neighborhood.</h4>

        <div className="errors">{errors.description}</div>
            <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

        <h3>Create a title for your spot</h3>
        <h4>Catch guests' attention with a spot title that highlights what makes
        your place special.</h4>

        <div className="errors">{errors.name}</div>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

        <h3>Set a base price for your spot</h3>
        <h4>Competitive pricing can help your listing stand out and rank higher
        in search results.</h4>

        <div className="errors">{errors.price}</div>
            <label>
                $
                <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
            </label>

        <h3>Liven up your spot with photos</h3>
        <h4>Submit a link to at least one photo to publish your spot.</h4>

        <div className="errors">{errors.prevImg}</div>
            <input
            type="url"
            value={prevImg}
            onChange={(e) => setPrevImg(e.target.value)}
            />

        <div className="errors">{errors.imgTwo}</div>
            <input
            type="url"
            value={imgTwo}
            onChange={(e) => setImgTwo(e.target.value)}
            />

        <div className="errors">{errors.imgThree}</div>
            <input
            type="url"
            value={imgThree}
            onChange={(e) => setImgThree(e.target.value)}
            />

        <div className="errors">{errors.imgFour}</div>
            <input
            type="url"
            value={imgFour}
            onChange={(e) => setImgFour(e.target.value)}
            />

        <div className="errors">{errors.imgFive}</div>
            <input
            type="url"
            value={imgFive}
            onChange={(e) => setImgFive(e.target.value)}
            />

        <button
        type="submit"
        >
           Create Spot
        </button>

        </form>

      </section>
    )
}
