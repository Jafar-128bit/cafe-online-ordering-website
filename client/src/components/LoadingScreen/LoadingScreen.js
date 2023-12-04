import './loadingScreen.css';

const LoadingScreen = ({
                           width = 50,
                           height = 50,
                           loadingThickness = 5,
                           size = "full",
                           color = "var(--color07)"
                       }) => {
    const loadingStyle = {
        width: `${width}px`,
        height: `${height}px`,
        border: `${loadingThickness}px solid ${color}`,
        borderTop: `${loadingThickness}px solid transparent`,
    }

    return (
        <section className={`loading ${size}`}>
            <div className="loading__outer" style={{...loadingStyle}}/>
        </section>
    );
}

export default LoadingScreen;