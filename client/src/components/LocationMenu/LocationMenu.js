import './locationMenu.css';
import addIcon from '../../assets/icons/addIcon.svg';
import closeIcon from '../../assets/icons/closeIcon.svg';
import IconContainer from "../IconContainer/IconContainer";

import {toggleLocationMenu} from '../../store/slices/menuSlice';
import {useDispatch, useSelector} from "react-redux";

const LocationMenu = () => {
    const dispatch = useDispatch();
    const locationMenuState = useSelector(state => state.menuState);
    const {
        zIndex,
        locationState,
    } = locationMenuState;

    return (
        <div className={`locationMenu ${locationState ? '' : 'hideLocationMenu'}`} style={{zIndex: zIndex}}>
            <button
                type="button"
                className="closeBtn"
                onClick={() => dispatch(toggleLocationMenu({
                    zIndex: 97,
                    locationState: false
                }))}
            >
                <IconContainer
                    src={closeIcon}
                    alt="close icon svg"
                    width={30}
                    height={30}
                    background={false}
                />
            </button>
            <button className="button" type="button">
                Add Location
                <IconContainer
                    src={addIcon}
                    alt="close icon svg"
                    width={12}
                    height={12}
                    background={false}
                />
            </button>
        </div>
    );
}

export default LocationMenu;