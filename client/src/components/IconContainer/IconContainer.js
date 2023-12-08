import './iconContainer.css';
import defaultIcon from '../../assets/icons/defaultIcon.svg';

const IconContainer = ({
                           src = defaultIcon,
                           alt = "default Icon",
                           width = "26px",
                           height = "26px",
                           id = "",
                           background = "",
                           round = 0,
                       }) => {
    return (
        <div id={id} className="iconContainer" style={{
            width: width,
            height: height,
            background: background,
            borderRadius: round ? "50%" : "0",
        }}>
            <img src={src} alt={alt}/>
        </div>
    );
}

export default IconContainer;