import { useState } from "react";

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const useDestinationAutocomplete = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 2) {
      setOptions([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query,
        )}&limit=5&type=city&apiKey=${API_KEY}`,
      );

      const data = await res.json();

      // Safe parsing
      const results =
        data?.features?.map((item: any) => {
          const city = item?.properties?.city;
          const country = item?.properties?.country;

          return city && country
            ? `${city}, ${country}`
            : item?.properties?.formatted;
        }) || [];

      setOptions(results);
    } catch (err) {
      console.error("Geoapify error:", err);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    options,
    loading,
    fetchSuggestions,
  };
};
