import { useEffect, useState } from "react";

export function useFetch(url, token) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            setError("Token topilmadi. Iltimos, tizimga qaytadan kiring.");
            setLoading(false);
            return;
        }

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Xatolik: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                setData(result?.data || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [url, token]);

    return { data, loading, error };
}