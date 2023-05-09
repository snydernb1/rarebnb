import SpotForm from "./SpotForm";


export default function CreateSpot() {

    const spot = {}

    return (
        <>
        <SpotForm
        spot={spot}
        formType='Create'
        />
        </>
    );
};
