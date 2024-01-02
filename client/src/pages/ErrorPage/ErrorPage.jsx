import './errorPage.css';
import {useNavigate} from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <section className="errorPage">
            <h1>404</h1>
            <h2>Error</h2>
            <h2>UnderConstruction</h2>
            <button type="button" onClick={() => navigate("/")}>
                Go Back Home Page?
            </button>
        </section>
    );
}

export default ErrorPage;