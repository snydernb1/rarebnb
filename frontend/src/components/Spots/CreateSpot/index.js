import SpotForm from "./SpotForm";


export default function CreateSpot() {

    const spot = {
        country: '',
        address: '',
        city: '',
        state: '',
        description: '',
        name: '',
        price: '',
    }

    return (
        <>
        <SpotForm
        spot={spot}
        formType='Create'
        />
        </>
    );
};
