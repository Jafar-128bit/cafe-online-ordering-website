import './videoContainer.css';

const VideoContainer = ({video, borderRadius, width, height}) => {
    return (
        <div
            className="videoContainer"
            style={{
                borderRadius: borderRadius,
                width: width,
                height: height,
            }}
        >
            <video
                src={video}
                controls={false}
                loop={true}
                autoPlay={true}
                muted={true}
                disablePictureInPicture={true}
            />
        </div>
    );
}

export default VideoContainer;