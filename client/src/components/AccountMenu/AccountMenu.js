import './accountMenu.css';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toggleAccountMenu} from "../../store/slices/menuSlice";
import IconContainer from "../IconContainer/IconContainer";
import closeIcon from "../../assets/icons/closeIcon.svg";

const AccountMenu = () => {
    const dispatch = useDispatch();
    const accountMenuState = useSelector(state => state.menuState);
    const {
        zIndex,
        accountState,
    } = accountMenuState;

    const styleAccountBtn = {
        textDecoration: "none",
        background: "var(--color01)",
        color: "var(--color07)",
        width: "150px",
        margin: "10px 0",
        padding: "10px 5px",
        borderRadius: "5px",
        textAlign: "center",
    }

    return (
        <div
            className={`accountMenu__menu ${accountState ? "openAccountMenu" : "hideAccountMenu"}`}
            style={{zIndex: zIndex}}
        >
            <button
                type="button"
                className="closeBtn"
                onClick={() => dispatch(toggleAccountMenu({
                    zIndex: 99,
                    cartState: false,
                }))}
                style={{top: "-15px", right: "-15px"}}
            >
                <IconContainer
                    src={closeIcon}
                    alt="close icon svg"
                    width={30}
                    height={30}
                    background={false}
                />
            </button>
            <div className="accountMenu__menu__section01">
                <button type="button" className="accountMenu__menu__signInBtn">
                    Sign In
                </button>
                <p className="accountMenu__menu__signUpBtn">
                    New customer?
                    <button type="button">
                        Start here
                    </button>
                </p>
            </div>
            <div className="separator-full"/>
            <div className="accountMenu__menu__section02">
                <NavLink
                    to="/account"
                    style={{...styleAccountBtn}}
                >
                    Your Account
                </NavLink>
                <NavLink
                    to="/orders"
                    style={{...styleAccountBtn}}
                >
                    Your Orders
                </NavLink>
            </div>
        </div>
    );
}

export default AccountMenu;