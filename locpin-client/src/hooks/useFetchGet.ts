import {useEffect, useState} from "react";

export interface UseFetchProps<T> {
    data: T | undefined;
    error: any;
    loading: boolean;
};

export default function useFetchGet<T>(path: string): UseFetchProps<T> {
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState(true);

    const fetchData = async (): Promise<void> => {
        setLoading(true);
        try {
            const res = await fetch(path);
            const json = await res.json();

            setData(json);
            setLoading(false);
        } catch (error: any) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData().catch(error => error.log(error));
    }, []);

    return {loading, error, data};
}