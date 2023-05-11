import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewSpot } from "../../../store/spots";
import { fetchNewSpotImgs } from "../../../store/spots";
import { fetchEditSpot } from "../../../store/spots";
import { useHistory } from "react-router-dom";

import './CreateSpot.css'

export default function SpotForm({spot, formType}) {

    //=====================================Old Code For Edit Image
    // let existPrevImg;
    // const imgObj = {
    //     2: {url: ""},
    //     3: {url: ""},
    //     4: {url: ""},
    //     5: {url: ""},
    // }

    // let i = 2;

    // if (formType === "Edit") {
    //     for (let img of spot.SpotImages) {
    //         if (img.preview === true) {
    //             existPrevImg = img.url;
    //         } else {
    //             imgObj[i] = img;
    //             i++;
    //         }
    //     };
    // };
    //=====================================Old Code For Edit Image

    const [errors, setErrors] = useState({})
    const [country, setCountry] = useState(spot?.country)
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [description, setDescription] = useState(spot?.description)
    const [name, setName] = useState(spot?.name)
    const [price, setPrice] = useState(spot?.price)
    const [prevImg, setPrevImg] = useState("")
    const [imgs, setImgs] = useState({})
    const [submit, setSubmit] = useState(false)


    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

//====Checking for Errors=======================================
    useEffect(() => {
        const errors = {}
        if (!country.length) errors.country = "Country is required"
        if (!address.length) errors.address = "Address is required"
        if (!city.length) errors.city = "City is required"
        if (!state.length) errors.state = "State is required"
        if (description.length < 30) errors.description = "Description needs a minimum of 30 characters"
        if (!name.length) errors.name = "Title is required"
        if (!price.toString().length) errors.price = "Price is required"


        if (formType === "Create") {
            if (!prevImg.length ) errors.prevImg = "Preview image is required"

            const images = Object.values(imgs) // this might mess up img order, can revisit later
            for (let image of images) {
                if (image.url.length === 0 || image.url.endsWith('.png') || image.url.endsWith('.jpg') || image.url.endsWith('.jpeg')) {} else{errors.image = "Image URL must end in .png, .jpg, or .jpeg"}
            }
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
            ...spot, ownerId: sessionUser.id, country, address, city, state, description, name, price, lat: 12.23523, lng:13.43567
        }

        if (Object.values(errors).length === 0) {


            if (formType === 'Create') {
                            const newSpot = await dispatch(fetchNewSpot(spotData))
                            // console.log('new Spot from component',newSpot)

                            const preview = {
                                spotId: newSpot.id, url: prevImg, preview: true
                            }

                            await dispatch(fetchNewSpotImgs(preview))

                            const images = Object.values(imgs)
                            console.log('there should be tile images here?', images)
                            for (let image of images) {

                                console.log('what is image?', image)
                                if (image.url.length > 0) {
                                    const tileImg = {
                                        spotId: newSpot.id, url: image.url, preview: false
                                    }

                                    await dispatch(fetchNewSpotImgs(tileImg))
                                }
                            }
                            history.push(`/${newSpot.id}`)

            } else if (formType === 'Edit') {
                const editSpot = await dispatch(fetchEditSpot(spotData))
                history.push(`/${editSpot.id}`)
            }




        }
    }

//====Form ================================================

    return (
      <section className="form">


        <h1 id='formHeader'>{formType === 'Create' ? 'Create a new Spot': 'Update yourSpot'}</h1>
        <h3>Where's your place located?</h3>
        <h4 className='formComments'>Guests will only get your exact address once they booked a
        reservation.</h4>


        <form onSubmit={handleSubmit}>

        {submit && errors.country && (
            <div className="error">* {errors.country}</div>
          )}
            <label className='spotFormLabel'>
                Country:
            </label >
                <input
                type="text"
                value={country}
                placeholder="United States"
                className='spotFormInput'
                onChange={(e) => setCountry(e.target.value)}
                />

            {submit && errors.address && (
            <div className="error">* {errors.address}</div>
          )}
            <label className='spotFormLabel'>
                Street Address:
                <input
                type="text"
                value={address}
                placeholder="1234 Example Ln"
                className='spotFormInput'
                onChange={(e) => setAddress(e.target.value)}
                />
            </label>

        <div id='cityState'>
            {submit && errors.city && (
                <div className="error">* {errors.city}</div>
            )}
                <label className='spotFormLabel'>
                    City:
                    <input
                    type="text"
                    value={city}
                    placeholder="Dayton"
                    className='spotFormInput'
                    onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                    <p id="cityStateComma">,</p>


            {submit && errors.state && (
                <div className="error">* {errors.state}</div>
            )}
                <label className='spotFormLabel'>
                    State:
                    <input
                    type="text"
                    value={state}
                    placeholder="Ohio"
                    className='spotFormInput'
                    onChange={(e) => setState(e.target.value)}
                    />
                </label>
        </div>

        <h3 className='formSubHeading'>Describe your place to guests</h3>
        <h4 className='formComments'>Mention the best features of your space, any special amentities like
        fast wifi or parking, and what you love about the neighborhood.</h4>

        {submit && errors.description && (
            <div className="error">* {errors.description}</div>
        )}
            <textarea
            type="text"
            value={description}
            id='formDesc'
            placeholder="Please write at least 30 characters"
            onChange={(e) => setDescription(e.target.value)}
            />

        <h3 className='formSubHeading'>Create a title for your spot</h3>
        <h4 className='formComments'>Catch guests' attention with a spot title that highlights what makes
        your place special.</h4>

        {submit && errors.name && (
            <div className="error">* {errors.name}</div>
        )}
            <input
            type="text"
            value={name}
            placeholder="Name of your spot"
            onChange={(e) => setName(e.target.value)}
            />

        <h3 className='formSubHeading'>Set a base price for your spot</h3>
        <h4 className='formComments'>Competitive pricing can help your listing stand out and rank higher
        in search results.</h4>

        {submit && errors.price && (
            <div className="error">* {errors.price}</div>
        )}
            <label>
                $
                <input
                type="number"
                value={price}
                placeholder="Price per night (USD)"
                onChange={(e) => setPrice(e.target.value)}
                />
            </label>
        { formType === 'Create' ?

        <div>
            <h3 className='formSubHeading'>Liven up your spot with photos</h3>
            <h4 className='formComments'>Submit a link to at least one photo to publish your spot.</h4>

            {submit && errors.prevImg && (
                <div className="error">* {errors.prevImg}</div>
            )}
                <input
                type="text"
                value={prevImg}
                placeholder="Preview Image URL"
                onChange={(e) => setPrevImg(e.target.value)}
                />

            {submit && errors.image && (
                <div className="error">* {errors.image}</div>
            )}
                <input
                type="text"
                value={imgs[2]?.url}
                placeholder="Image URL"
                onChange={(e) => setImgs({...imgs, 2: {url: e.target.value}})}
                />

                <input
                type="text"
                value={imgs[3]?.url}
                placeholder="Image URL"
                onChange={(e) => setImgs({...imgs, 3: {url: e.target.value}})}
                />

                <input
                type="text"
                value={imgs[4]?.url}
                placeholder="Image URL"
                onChange={(e) => setImgs({...imgs, 4: {url: e.target.value}})}
                />

                <input
                type="text"
                value={imgs[5]?.url}
                placeholder="Image URL"
                onChange={(e) => setImgs({...imgs, 5: {url: e.target.value}})}
                />
        </div>
            :
            false
        }

        <button
        type="submit"
        >
           {formType === "Create" ? 'Create Spot' : 'Update Spot'}
        </button>

        </form>

      </section>
    )
}
