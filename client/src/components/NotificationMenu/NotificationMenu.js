import './notificationMenu.css';
import './mediaQueryNotificationMenu.css';

import {useSelector} from "react-redux";
import {motion} from "framer-motion";

const NotificationMenu = () => {

    const notificationMenuState = useSelector(state => state.menuState.notificationMenuState);
    const {State, zIndex} = notificationMenuState;

    return (
        <motion.div
            className="notificationMenu" style={{zIndex: zIndex}}
            initial={{opacity: 0, x: 0}}
            animate={State ? {opacity: 1, x: 0} : {opacity: 1, x: 455}}
            transition={{ease: "easeOut", duration: 0.25}}
        >
            <h4 className="notificationMenu__title">Notification Menu</h4>
        </motion.div>
    );
}

export default NotificationMenu;