import './imageContainer.css';

const ImageContainer = ({
                            width,
                            height,
                            borderRadius = "0",
                            boxShadow = "none",
                            margin = "0",
                            src,
                            alt = "image",
                        }) => {
    const style = {
        width: width,
        height: height,
        borderRadius: borderRadius,
        boxShadow: boxShadow,
        margin: margin,
    }
    return (
        <div className="imageContainer" style={{...style}}>
            <img src={src} alt={alt}/>
        </div>
    );
}

export default ImageContainer;