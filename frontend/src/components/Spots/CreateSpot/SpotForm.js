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

        if (prevImg.length === 0 || prevImg.endsWith('.png') || prevImg.endsWith('.jpg') ||prevImg.endsWith('.jpeg')) {} else{errors.image = "Image URL must end in .png, .jpg, or .jpeg"}

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


                            const preview = {
                                spotId: newSpot.id, url: prevImg, preview: true
                            }

                            await dispatch(fetchNewSpotImgs(preview))

                            const images = Object.values(imgs)

                            for (let image of images) {


                                if (image.url.length > 0) {
                                    const tileImg = {
                                        spotId: newSpot.id, url: image.url, preview: false
                                    }

                                    await dispatch(fetchNewSpotImgs(tileImg))
                                }
                            }
                            history.push(`/spot/${newSpot.id}`)

            } else if (formType === 'Edit') {
                const editSpot = await dispatch(fetchEditSpot(spotData))
                history.push(`/spot/${editSpot.id}`)
            }




        }
    }


    let makeDisabled = false;


    if (name.length) {
      makeDisabled = true
    }

//====Form ================================================

    return (
      <section className="form">


        <h1 id='formHeader'>{formType === 'Create' ? 'Create a new Spot': 'Update your Spot'}</h1>
        <h3>Where's your place located?</h3>
        <h4 className='formComments'>Guests will only get your exact address once they booked a
        reservation.</h4>


        <form onSubmit={handleSubmit}>

            <label className='spotFormLabel'>
                Country:
            {submit && errors.country && (
                <div className="createSpotErrors">* {errors.country}</div>
                )}
            </label >


                <input
                type="text"
                value={country}
                placeholder="United States"
                maxLength='20'
                className='spotFormInput'
                onChange={(e) => setCountry(e.target.value)}
                />

            <label className='spotFormLabel'>
                Street Address:
            {submit && errors.address && (
            <div className="createSpotErrors">* {errors.address}</div>
          )}
            </label>
                <input
                type="text"
                value={address}
                maxLength='30'
                placeholder="1234 Example Ln"
                className='spotFormInput'
                onChange={(e) => setAddress(e.target.value)}
                />

        <div id='cityState'>
                <div className="cityStateCol">
                <label className='spotFormLabel'>
                    City:
                    {submit && errors.city && (
                        <div className="createSpotErrors">* {errors.city}</div>
                    )}
                </label>

                <input
                type="text"
                value={city}
                placeholder="Dayton"
                maxLength='17'
                className='spotFormInput'
                onChange={(e) => setCity(e.target.value)}
                />
                </div>
                <p id="cityStateComma">,</p>

                <div className="cityStateCol">
                <label className='spotFormLabel'>
                    State:
                    {submit && errors.state && (
                        <div className="createSpotErrors">* {errors.state}</div>
                        )}
                </label>

                <input
                type="text"
                value={state}
                placeholder="Ohio"
                maxLength='16'
                className='spotFormInput'
                onChange={(e) => setState(e.target.value)}
                />
                </div>

        </div>

        <h3 className='formSubHeading'>Describe your place to guests</h3>
        <h4 className='formComments'>Mention the best features of your space, any special amentities like
        fast wifi or parking, and what you love about the neighborhood.</h4>

            <textarea
            type="text"
            value={description}
            id='formDesc'
            maxLength='255'
            placeholder="Please write at least 30 characters"
            onChange={(e) => setDescription(e.target.value)}
            />
            {submit && errors.description && (
                <div className="createSpotErrors">* {errors.description}</div>
            )}

        <h3 className='formSubHeading textAreaBorder'>Create a title for your spot</h3>
        <h4 className='formComments'>Catch guests' attention with a spot title that highlights what makes
        your place special.</h4>

            <input
            type="text"
            value={name}
            placeholder="Name of your spot"
            maxLength='30'
            className="botBorderSpacing"
            onChange={(e) => setName(e.target.value)}
            />
            {submit && errors.name && (
                <div className="createSpotErrors">* {errors.name}</div>
            )}

        <h3 className='formSubHeading textAreaBorder'>Set a base price for your spot</h3>
        <h4 className='formComments'>Competitive pricing can help your listing stand out and rank higher
        in search results.</h4>

            <div id='priceField'>
                $
                <input
                type="number"
                value={price}
                max='999999'
                placeholder="Price per night (USD)"
                className="botBorderSpacing"
                onChange={(e) => setPrice(e.target.value)}
                />
            </div>
                {submit && errors.price && (
                    <div className="createSpotErrors">* {errors.price}</div>
                )}
        { formType === 'Create' ?

        <section>
            <h3 className='formSubHeading textAreaBorder' >Liven up your spot with photos</h3>
            <h4 className='formComments'>Submit a link to at least one photo to publish your spot.</h4>

                    <input
                    type="text"
                    value={prevImg}
                    placeholder="Preview Image URL  |  Example: https://a0.muscache.com/737b978b2b6a.jpg"
                    className="urlLinks"
                    onChange={(e) => setPrevImg(e.target.value)}
                    />

                    <input
                    type="text"
                    value={imgs[2]?.url}
                    placeholder="Image URL"
                    className="urlLinks"
                    onChange={(e) => setImgs({...imgs, 2: {url: e.target.value}})}
                    />

                    <input
                    type="text"
                    value={imgs[3]?.url}
                    placeholder="Image URL"
                    className="urlLinks"
                    onChange={(e) => setImgs({...imgs, 3: {url: e.target.value}})}
                    />

                    <input
                    type="text"
                    value={imgs[4]?.url}
                    placeholder="Image URL"
                    className="urlLinks"
                    onChange={(e) => setImgs({...imgs, 4: {url: e.target.value}})}
                    />

                    <input
                    type="text"
                    value={imgs[5]?.url}
                    placeholder="Image URL"
                    className="urlLinks"
                    id='lasturlInput'
                    onChange={(e) => setImgs({...imgs, 5: {url: e.target.value}})}
                    />

{submit && errors.prevImg && (
                        <div className="createSpotErrors">* {errors.prevImg}</div>
                        )}
                    {submit && errors.image && (
                        <div className="createSpotErrors">* {errors.image}</div>
                        )}

        </section>
            :
            false
        }

        <div  id='createSpotDiv'>
            <button
            type="submit"
            disabled={!makeDisabled}
            id='createSpotButton'
            className={makeDisabled === false ? "loginButtonDisabled" : "loginButton"}
            >
            {formType === "Create" ? 'Create Spot' : 'Update your Spot'}
            </button>
        </div>

        </form>

      </section>
    )
}
