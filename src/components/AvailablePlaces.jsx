import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchPlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const places = await fetchPlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setPlaces(sortedPlaces);
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  if (error) {
    return <Error title="Error" message={error} />;
  }

  return (
    <Places
      title="Available Places"
      places={places}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={isLoading}
    />
  );
}
