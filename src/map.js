import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "./map.css";
import "leaflet/dist/leaflet.css";
import logo from './logo.png';

const customIcon = new L.Icon({
  iconUrl: logo,
  iconSize: [20, 20],
  iconAnchor: [10, 20],
  popupAnchor: [0, -10],
});

const points = [
  ["ZANZIBAR", -6.13, 39.31],
  ["TOKYO", 35.68, 139.76],
  ["AUCKLAND", -36.85, 174.78],
  ["BANGKOK", 13.75, 100.48],
  ["DELHI", 29.01, 77.38],
  ["SINGAPORE", 1.36, 103.75],
  ["BRASILIA", -15.67, -47.43],
  ["RIO DE JANEIRO", -22.9, -43.24],
  ["TORONTO", 43.64, -79.4],
  ["EASTER ISLAND", -27.11, -109.36],
  ["SEATTLE", 47.61, -122.33],
  ["LONDON", 51.5072, -0.1275],
  ["TAIPEI", 25.105497, 121.597366],
  ["XIAMEN", 24.4798, 118.0894],
];

function Map() {
  const [iconSize, setIconSize] = useState([20, 20]);

  const handleZoom = (event) => {
    const newZoom = event.target._zoom;
    const scaleFactor = newZoom / 2;
    setIconSize([20 * scaleFactor, 20 * scaleFactor]);
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
      onZoomEnd={handleZoom}
    >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {points.map((point, index) => (
        <Marker key={index} position={[point[1], point[2]]} icon={customIcon}>
          <Popup>{point[0]}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
