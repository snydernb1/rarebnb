import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FourOhFour.css'

export default function FourOhFour() {
    const history = useHistory();

    const handleHome = () => {
        history.push('/')
    }

    return (
        <div id='fourOhFour'>
            <h1>Ooops, you're out of bounds...</h1>
            <div id='homeLinkDiv'>
                <h2 onClick={handleHome} id='homeLink'>Click me!</h2>
                <h2>to return return home</h2>
            </div>
        </div>
    );
};
