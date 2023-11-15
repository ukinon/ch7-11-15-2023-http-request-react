import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/places");
        const data = await response.json();
        setPlaces(data.places);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    getData();
  }, []);

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
