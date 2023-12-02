import './categoriesTab.css';
import {menuList} from "../../data/data";
import {changeCategory} from "../../store/slices/categoriesSlices";
import {useDispatch} from "react-redux";

const Options = ({id, optionName, symbol, dispatch}) => {
    return (
        <section className="categories__options" style={{
            backgroundImage: `url(${symbol})`,
        }}>
            <button
                type="button"
                className="categories__optionName"
                onClick={() => dispatch(changeCategory({selectedCategory: id}))}
            >
                {optionName}
            </button>
        </section>
    );
}

const CategoriesTab = () => {
    const dispatch = useDispatch();
    return (
        <section className="categories whiteGlass">
            {
                menuList.map((value) => <Options
                        key={value.id}
                        id={value.id}
                        symbol={value.menuIcon}
                        optionName={value.menuHeading}
                        dispatch={dispatch}
                    />
                )
            }
        </section>
    );
}

export default CategoriesTab;