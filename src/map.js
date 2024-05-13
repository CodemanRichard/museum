import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import "./map.css";
import "leaflet/dist/leaflet.css";
import logo from "./logo.png";

const customIcon = new L.Icon({
  iconUrl: logo,
  iconSize: [20, 20],
  iconAnchor: [10, 20],
  popupAnchor: [0, -10],
});

const points = [
  ["the V&A", 51.509648, -0.099076],
  ["澳大利亚国家博物馆", -35.280901, 149.129269],
  ["北京故宫博物院（故宫专题）", 39.937967, 116.417592],
  ["京都国立博物馆", 34.986533, 135.744161],
  ["正仓院", 34.327889, 135.891749],
  ["大都会艺术博物馆", 40.779344, -73.962486],
  ["卢浮宫博物馆", 48.860098, 2.33162],
  ["台北故宫博物馆", 25.04776, 121.53185],
];

const urls = [
  "https://www.vam.ac.uk/",
  "https://www.nma.gov.au/",
  "https://www.dpm.org.cn/",
  "https://www.kyohaku.go.jp/",
  "https://shosoin.kunaicho.go.jp/",
  "https://www.metmuseum.org/",
  "https://www.louvre.fr/",
  "https://www.npm.gov.tw/",
];

function Map({ changeProps }) {
  const handleMuseumChange = (museum) => {
    changeProps(museum);
  };
  const handleZoom = (map) => {
    const newZoom = map.getZoom();
    const scaleFactor = newZoom / 2;
    let markers = document.getElementsByClassName("leaflet-marker-icon");
    for (let i = 0; i < markers.length; i++) {
      markers[i].style.width = `${20 * scaleFactor}px`;
      markers[i].style.height = `${20 * scaleFactor}px`;
    }
  };
  function clickHandler(name) {
    handleMuseumChange(name);
  }

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {points.map((point, index) => (
        <Marker
          key={index}
          position={[point[1], point[2]]}
          icon={customIcon}
          eventHandlers={{ click: () => clickHandler(point[0]) }}
        >
          <Popup>
            <a href={urls[index]}>{point[0]}</a>
          </Popup>
        </Marker>
      ))}
      <ZoomHandler onZoomEnd={handleZoom} />
    </MapContainer>
  );
}

function ZoomHandler({ onZoomEnd }) {
  const map = useMapEvents({
    zoomend: () => {
      onZoomEnd(map);
    },
  });

  return null;
}

export default Map;
