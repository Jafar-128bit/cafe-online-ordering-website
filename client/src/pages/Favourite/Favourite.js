import './favourite.css';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {toggleCategories} from "../../store/slices/menuSlice";

const Favourite = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(toggleCategories({categoriesTab: false}));
    });
    return(
        <section className="favourite">
            Favourite
        </section>
    );
}

export default Favourite;