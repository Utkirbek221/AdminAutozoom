import { useEffect, useState } from "react";

export function useFetch(url, token) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ma'lumotlarni qayta yuklash funksiyasi
  const fetchData = async () => {
    if (!token) {
      setError("Token topilmadi. Iltimos, tizimga qaytadan kiring.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Xatolik: ${response.status}`);
      }

      const result = await response.json();
      setData(result?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect orqali ma'lumotlarni yuklash
  useEffect(() => {
    fetchData();
  }, [url, token]);

  return { data, loading, error, fetchData }; // fetchData ni ham qaytarish
}