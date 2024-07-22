"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PlusIcon } from "@heroicons/react/solid";
import * as ReactDOM from "react-dom/client";
import CustomMarker from "./CustomMarker";
import LocationInput from "./LocationInput";
import DayNavigation from "./DayNavigation";
import BoroughCard from "./BoroughCard";
import { fetchLocations } from "../utils/fetchLocations";
import { formatAddress } from "../utils/formatAddress";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { Borough, Card, Items } from "../types";

const MapBox: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [card, setCard] = useState<Card>({ title: "", location: "" });
  const [boroughs, setBoroughs] = useState<Borough>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<number>(1);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [72.88, 19.08],
      zoom: 9,
    });
  }, []);

  const dayBoroughs = useMemo(
    () => boroughs[currentDay] || [],
    [boroughs, currentDay]
  );

  useEffect(() => {
    if (!mapRef.current) return;
    const markers: mapboxgl.Marker[] = [];

    dayBoroughs.forEach(({ lngLat }, index) => {
      const markerElement = document.createElement("div");
      const root = ReactDOM.createRoot(markerElement);
      root.render(<CustomMarker count={index + 1} />);

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(lngLat)
        .addTo(mapRef.current!);

      markers.push(marker);
    });

    if (dayBoroughs.length > 0) {
      const lastMarker = dayBoroughs[dayBoroughs.length - 1];
      mapRef.current.flyTo({ center: lastMarker.lngLat, zoom: 12 });
    }

    return () => markers.forEach((marker) => marker.remove());
  }, [dayBoroughs]);

  const handleLocationInputChange = useCallback(
    debounce(async (value: string) => {
      if (value.length > 1) {
        try {
          const searchResponse = await fetchLocations(value);
          const fetchedSuggestions = searchResponse.features.map(
            (feature: any) => formatAddress(feature.properties.context)
          );
          setSuggestions(fetchedSuggestions);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  const handleAddMarker = useCallback(async () => {
    if (!mapRef.current || !card.location) return;

    try {
      const searchResponse = await fetchLocations(card.location);
      const feature = searchResponse.features[0];
      const [lng, lat] = feature.geometry.coordinates;

      const newBorough: Items = {
        name: card.title || formatAddress(feature.properties.context),
        lngLat: [lng, lat],
        location: card.location,
      };

      setBoroughs((prevBoroughs) => {
        const updatedBoroughs = { ...prevBoroughs };
        if (!updatedBoroughs[currentDay]) {
          updatedBoroughs[currentDay] = [];
        }
        updatedBoroughs[currentDay] = [
          ...updatedBoroughs[currentDay],
          newBorough,
        ];
        return updatedBoroughs;
      });

      setCard({ title: "", location: "" });
      setSuggestions([]);
      setShowInput(false);
    } catch (error) {
      console.error("Error adding marker:", error);
    }
  }, [card, currentDay]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCard((prevCard) => ({ ...prevCard, [name]: value }));
      if (name === "location") {
        handleLocationInputChange(value);
      }
    },
    [handleLocationInputChange]
  );

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setCard((prevCard) => ({ ...prevCard, location: suggestion }));
    setSuggestions([]);
  }, []);

  const handleDayChange = useCallback((direction: "left" | "right") => {
    setCurrentDay((prevDay) => {
      if (direction === "left" && prevDay > 1) return prevDay - 1;
      if (direction === "right" && prevDay < 2) return prevDay + 1;
      return prevDay;
    });
  }, []);

  const flyToLocation = useCallback((lngLat: [number, number]) => {
    mapRef.current?.flyTo({
      center: lngLat,
      zoom: 12,
    });
  }, []);

  const toggleInput = useCallback(() => {
    setShowInput((prev) => !prev);
  }, []);

  const MemoizedBoroughCard = useMemo(() => React.memo(BoroughCard), []);

  return (
    <div className="h-screen w-screen bg-white flex flex-col md:flex-row">
      <motion.div className="relative flex flex-col md:w-1/3 p-6 bg-white shadow-lg items-center justify-start">
        <DayNavigation currentDay={currentDay} onDayChange={handleDayChange} />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleInput}
          className="flex items-center justify-center p-2 xl:p-3 mb-6 w-1/2 rounded-full bg-yellow-500 text-white shadow-md transition-colors hover:bg-yellow-600"
        >
          <PlusIcon className="h-5 w-5 mr-2" /> Add New
        </motion.button>

        {showInput && (
          <LocationInput
            title={card.title}
            location={card.location}
            suggestions={suggestions}
            onTitleChange={handleInputChange}
            onLocationChange={handleInputChange}
            onSuggestionClick={handleSuggestionClick}
            onAddMarker={handleAddMarker}
            onClose={toggleInput}
          />
        )}

        <motion.div
          className="space-y-4 overflow-hidden p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {dayBoroughs.map((borough, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MemoizedBoroughCard
                borough={borough}
                index={index}
                onCardClick={() => flyToLocation(borough.lngLat)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        ref={mapContainerRef}
        className="flex-grow h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </div>
  );
};

export default MapBox;
