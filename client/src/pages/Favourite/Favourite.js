import './favourite.css';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {toggleCategories} from "../../store/slices/menuSlice";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const Favourite = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(toggleCategories({categoriesTab: false}));
    });
    return (
        <section className="favourite">
            <div className="whiteGlass" style={{width: "500px", height: "300px",}}>
                <h1>Under Construction</h1>
                <LoadingScreen/>
            </div>
        </section>
    );
}

export default Favourite;