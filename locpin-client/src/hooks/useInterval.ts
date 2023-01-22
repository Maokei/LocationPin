import {useEffect, useState} from "react";

export default (handler, interval) => {
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

    useEffect(() => {
        const id = setInterval(handler, interval);
        setIntervalId(id);
        return () => clearInterval(id);
    }, []);

    return () => clearInterval(intervalId);
};