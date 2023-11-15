import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3000/places");
      const data = await response.json();
      setPlaces(data.places);
    }
    getData().catch(console.error);
  }, []);

  return (
    <Places
      title="Available Places"
      places={places}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
