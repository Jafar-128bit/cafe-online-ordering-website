import './iconContainer.css';
import defaultIcon from '../../assets/icons/defaultIcon.svg';

const IconContainer = ({
                           src = defaultIcon,
                           alt = "default Icon",
                           width = 26,
                           height = 26,
                           background = true,
                           size = false,
                           id = "",
                       }) => {
    return (
        <div id={id} className="iconContainer" style={{
            width: size ? "90%" : `${width}px`,
            height: size ? "90%" : `${height}px`,
            backgroundColor: background ? "#F28705" : "transparent",
        }}>
            <img src={src} alt={alt}/>
        </div>
    );
}

export default IconContainer;