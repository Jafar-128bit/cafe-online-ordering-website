import './home.css';

import {mediaData} from "../../data/data";

import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {toggleCategories} from "../../store/slices/menuSlice";
import VideoContainer from "../../components/VideoContainer/VideoContainer";

const Home = () => {
    const dispatch = useDispatch();
    const [changeMedia, setChangeMedia] = useState(0);

    useEffect(() => {
        dispatch(toggleCategories({categoriesTab: false}));

        const intervalId = setInterval(() => {
            setTimeout(() => {
                if (changeMedia >= 4) setChangeMedia(0);
                else setChangeMedia(changeMedia + 1);
            }, 9500);
        }, 10000);

        return () => clearInterval(intervalId);
    }, [changeMedia]);

    console.log(`translateX(-${changeMedia}00%)`);

    return (
        <section className="home">
            <section className="home__section-01">
                <h1 className="home__section-01__title">Taste the Difference at Campus'Cafe</h1>
                <article className="home__section-01__article">Welcome to Campus'Cafe, where we turn moments into
                    memories through a menu crafted with passion. From rich coffees to refreshing smoothies,
                    our offerings celebrate taste and quality. Indulge in tempting cakes, snacks, and sandwiches,
                    curated for a elevated dining experience. Join us to discover the essence of cafe indulgence,
                    and order online for flavors delivered to your space.
                </article>
                <div className="home__section-01__media">
                    {mediaData.map((value) => {
                        return <div
                            key={value.id}
                            className="home__section-01__media__container"
                            style={{transform: `translateX(-${changeMedia}00%)`}}
                        >
                            <div className="home__section-01__media__video">
                                <VideoContainer
                                    video={value.video}
                                    width="100%"
                                    height="100%"
                                    borderRadius="0"
                                />
                            </div>
                            <div className="home__section-01__media__shade"/>
                            <p className="home__section-01__media__heading">{value.heading}</p>
                        </div>
                    })}
                </div>
            </section>
            <section className="home__section-02 whiteGlass">
                <h2 className="home__section-02__title">Top Orders</h2>

            </section>
        </section>
    )
}

export default Home;