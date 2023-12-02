import './iconContainer.css';
import defaultIcon from '../../assets/icons/defaultIcon.svg';

const IconContainer = ({
                           src = defaultIcon,
                           alt = "default Icon",
                           width = 26,
                           height = 26,
                           background = true
                       }) => {
    return (
        <div className="iconContainer" style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: background ? "#F28705" : "transparent",
        }}>
            <img src={src} alt={alt}/>
        </div>
    );
}

export default IconContainer;