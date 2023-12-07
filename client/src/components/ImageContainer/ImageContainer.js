import './imageContainer.css';

const ImageContainer = ({
                            width,
                            height,
                            borderRadius = "0",
                            boxShadow = "none",
                            margin = "0",
                            src,
                            alt = "image",
                            position = "unset",
                            zIndex = null,
                        }) => {
    const style = {
        width: width,
        height: height,
        borderRadius: borderRadius,
        boxShadow: boxShadow,
        margin: margin,
        position: position,
        zIndex: zIndex,
    }
    return (
        <div className="imageContainer" style={{...style}}>
            <img src={src} alt={alt}/>
        </div>
    );
}

export default ImageContainer;