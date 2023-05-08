import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewSpot } from "../../../store/spots";
import { fetchNewSpotImgs } from "../../../store/spots";
import { useHistory } from "react-router-dom";



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
    const [imgs, setImgs] = useState({})
    // const [imgTwo, setImgTwo] = useState("")
    // const [imgThree, setImgThree] = useState("")
    // const [imgFour, setImgFour] = useState("")
    // const [imgFive, setImgFive] = useState("")
    const [submit, setSubmit] = useState(false)

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    // console.log(sessionUser.id);

//====Checking for Errors=======================================
    useEffect(() => {
        const errors = {}
        if (!country.length) errors.country = "Country is required"
        if (!address.length) errors.address = "Address is required"
        if (!city.length) errors.city = "City is required"
        if (!state.length) errors.state = "State is required"
        if (description.length < 30) errors.description = "Description needs a minimum of 30 characters"
        if (!name.length) errors.name = "Title is required"
        if (!price.length ) errors.price = "Price is required"
        if (!prevImg.length ) errors.prevImg = "Preview image is required"

        const images = Object.values(imgs) // this might mess up img order, can revisit later

        for (let image of images) {
            if (image.length === 0 || image.endsWith('.png') || image.endsWith('.jpg') || image.endsWith('.jpeg')) {} else{errors.image = "Image URL must end in .png, .jpg, or .jpeg"}
        }

        setErrors(errors)
      }, [country, address, city, state, description, name, price, prevImg, imgs])

      useEffect(()=> {
        setSubmit(false)
      }, [])



//====On Submit================================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmit(true);

        const spotData = {
            ownerId: sessionUser.id, country, address, city, state, description, name, price, lat: 12.23523, lng:13.43567
        }



        if (Object.values(errors).length === 0) {

            const newSpot = await dispatch(fetchNewSpot(spotData))
            // console.log('new Spot from component',newSpot)

            const preview = {
                spotId: newSpot.id, url: prevImg, preview: true
            }

            await dispatch(fetchNewSpotImgs(preview))

            const images = Object.values(imgs)
            for (let image of images) {

                if (image.length > 0) {
                    const tileImg = {
                        spotId: newSpot.id, url: image, preview: false
                    }

                    await dispatch(fetchNewSpotImgs(tileImg))
                }
            }

            //redirect here i think
            history.push(`/${newSpot.id}`)


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

            {submit && errors.address && (
            <div className="error">* {errors.address}</div>
          )}
            <label>
                Street Address:
                <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
            </label>

        <div>
            {submit && errors.city && (
                <div className="error">* {errors.city}</div>
            )}
                <label>
                    City:
                    <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                </label>

            {submit && errors.state && (
                <div className="error">* {errors.state}</div>
            )}
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

        {submit && errors.description && (
            <div className="error">* {errors.description}</div>
        )}
            <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

        <h3>Create a title for your spot</h3>
        <h4>Catch guests' attention with a spot title that highlights what makes
        your place special.</h4>

        {submit && errors.name && (
            <div className="error">* {errors.name}</div>
        )}
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

        <h3>Set a base price for your spot</h3>
        <h4>Competitive pricing can help your listing stand out and rank higher
        in search results.</h4>

        {submit && errors.price && (
            <div className="error">* {errors.price}</div>
        )}
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

        {submit && errors.prevImg && (
            <div className="error">* {errors.prevImg}</div>
        )}
            <input
            type="text"
            value={prevImg}
            onChange={(e) => setPrevImg(e.target.value)}
            />

        {submit && errors.image && (
            <div className="error">* {errors.image}</div>
        )}
            <input
            type="text"
            value={imgs.two}
            onChange={(e) => setImgs({...imgs, two: e.target.value})}
            />

        {/* {submit && errors.image && (
            <div className="error">* {errors.image}</div>
        )} */}
            <input
            type="text"
            value={imgs.three}
            onChange={(e) => setImgs({...imgs, three: e.target.value})}
            />

        {/* {submit && errors.image && (
            <div className="error">* {errors.image}</div>
        )} */}
            <input
            type="text"
            value={imgs.four}
            onChange={(e) => setImgs({...imgs, four: e.target.value})}
            />

        {/* {submit && errors.image && (
            <div className="error">* {errors.image}</div>
        )} */}
            <input
            type="text"
            value={imgs.five}
            onChange={(e) => setImgs({...imgs, five: e.target.value})}
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
