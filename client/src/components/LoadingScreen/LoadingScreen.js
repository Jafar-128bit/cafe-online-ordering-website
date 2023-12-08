import './loadingScreen.css';

const LoadingScreen = ({
                           width = 50,
                           height = 50,
                           loadingThickness = 5,
                           size = "full",
                           color = "var(--masterColor)"
                       }) => {
    const loadingStyle = {
        width: `${width}px`,
        height: `${height}px`,
        border: `${loadingThickness}px solid ${color}`,
        borderTop: `${loadingThickness}px solid transparent`,
    }

    return (
        <div className={`loading ${size}`}>
            <div className="loading__outer" style={{...loadingStyle}}/>
        </div>
    );
}

export default LoadingScreen;