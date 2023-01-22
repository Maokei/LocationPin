import {useEffect, useState} from 'react';

export default (handler, interval) => {
    const [startT, setStartT] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
    useEffect(() => {
        if (startT) {
            console.log("starting timer")
            const id = setTimeout(handler, interval)
            setIntervalId(id);
            return () => clearInterval(id);
        }

    }, [startT]);
    const clear = () => {
        clearInterval(intervalId)
    }
    const start = () => {
        setStartT(true)
    }
    return {start, clear, intervalId}
};