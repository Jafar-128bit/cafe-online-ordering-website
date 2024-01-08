import OrderCustomizationMenu from "./OrderCustomizationMenu/OrderCustomizationMenu";
import {useSelector} from "react-redux";

const PopUpMenus = ({type}) => {

    const popUpMenuSlices = useSelector(state => state.popUpMenus);
    const cartData = useSelector(state => state.cartItems);
    const itemData = cartData.filter(item => item.id === popUpMenuSlices.itemId);

    return <>
        {type === "orderCustomizationMenu" && <OrderCustomizationMenu data={itemData[0]}/>}
    </>
}

export default PopUpMenus;