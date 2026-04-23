import React, { useRef, useEffect } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { HiMapPin } from "react-icons/hi2";

const MapComponent = ({ latitude, longitude, zoom = 13 }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = mapRef.current?.getMap?.();
    if (!map) return;
    map.flyTo({ center: [longitude, latitude], zoom: Math.max(zoom, 14) });
  }, [latitude, longitude, zoom]);

  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  if (!mapboxToken) {
    return (
      <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-600 flex items-center justify-center bg-gray-950">
        <div className="text-center px-4">
          <p className="text-sm text-gray-300">Map unavailable</p>
          <p className="text-xs text-gray-500">
            Set VITE_MAPBOX_TOKEN in Frontend/.env
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-600">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxToken}
      >
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <div className="text-red-500">
            <HiMapPin className="w-8 h-8" />
          </div>
        </Marker>
        <NavigationControl />
      </Map>
    </div>
  );
};

export default MapComponent;
