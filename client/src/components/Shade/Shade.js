import './shade.css';
import {useDispatch, useSelector} from "react-redux";
import {toggleCartMenu, toggleLocationMenu, toggleAccountMenu} from '../../store/slices/menuSlice';

const Shade = () => {
    const dispatch = useDispatch();
    const shadeState = useSelector(state => state.menuState);
    const {
        zIndex,
        cartState,
        locationState,
        accountState
    } = shadeState;

    const handleOnClick = () => {
        if (cartState) dispatch(toggleCartMenu({zIndex: zIndex, cartState: false}));
        if (locationState) dispatch(toggleLocationMenu({zIndex: zIndex, locationState: false}));
        if (accountState) dispatch(toggleAccountMenu({zIndex: zIndex, accountState: false}));
    }

    return <div
        className={`shade ${cartState || locationState || accountState ? "openShade" : "hideShade"}`}
        style={{zIndex: zIndex - 1}}
        onClick={handleOnClick}
    />
};

export default Shade;