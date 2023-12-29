import { useEffect, useState } from 'react';
import {calculateTimeDifference} from "../util/utils";

function useTimeDifference(targetTime) {
    const [timeDifference, setTimeDifference] = useState(calculateTimeDifference(targetTime, false));

    useEffect(() => {
        if (timeDifference) {
            const intervalId = setInterval(() => {
                setTimeDifference(calculateTimeDifference(targetTime, false));
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [targetTime, timeDifference]);

    return timeDifference;
}

export default useTimeDifference;
