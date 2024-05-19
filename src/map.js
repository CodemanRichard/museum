import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L, { marker } from "leaflet";

import "./map.css";
import "leaflet/dist/leaflet.css";
import logo from "./logo.png";

import logo0 from "./logos/logo 0.png"
import logo1 from "./logos/logo 1.png"
import logo2 from "./logos/logo 2.png"
import logo3 from "./logos/logo 3.png"
import logo4 from "./logos/logo 4.png"
import logo5 from "./logos/logo 5.png"
import logo6 from "./logos/logo 6.png"
import logo7 from "./logos/logo 7.png"
import logo8 from "./logos/logo 8.png"
import logo9 from "./logos/logo 9.png"
import logo10 from "./logos/logo 10.png"


import { useEffect, useState, useRef } from 'react';


const customIcon = new L.Icon({
  iconUrl: logo,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0],
});

const logo_img_list=[
  logo0,
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10
]

const logo_size=70







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

const size_scale=1

const Hover=20
const Gap=20

const Line_cap=5



function Map({ changeProps }) {
  const [item_num, set_item_num] = useState([0,0,0,0,0,0,0,0]);
  const [icon_list,set_icon_list]=useState([customIcon,customIcon,customIcon,customIcon,customIcon,customIcon,customIcon,customIcon])



  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch("http://localhost:5000/get_museum_sum");
          const data = await response.json();
          console.log(data)
          let items=[]
          let new_icon_list=[]
          for(let p of points){
            // console.log(p)
            // let c=[]
            // for(let i=0;i<Math.ceil(Math.log(data[p[0]]));i++){
            //   c.push(1)
            // }
            items.push(data[p[0]])
            new_icon_list.push(
              new L.Icon({
                iconUrl: logo_img_list[Math.ceil(Math.log(data[p[0]]))],
                iconSize: [logo_size, logo_size],
                iconAnchor: [10, 10],
                popupAnchor: [0, 0],
              })
          
            )
          }
          set_item_num(items)
          set_icon_list(new_icon_list)
          console.log(items)
          

          
      }catch(e){
        console.log(e)
      }
    }
    fetchData();
  },[urls])
  


  const handleMuseumChange = (museum) => {
    changeProps(museum);
  };
  const handleZoom = (map) => {
    const newZoom = map.getZoom();
    const scaleFactor = newZoom / 2;
    let markers = document.getElementsByClassName("leaflet-marker-icon");
    for (let i = 0; i < markers.length; i++) {
      markers[i].style.width = `${logo_size * scaleFactor}px`;
      markers[i].style.height = `${logo_size * scaleFactor}px`;
      
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
          icon={icon_list[index]}
          eventHandlers={{ click: () => clickHandler(point[0]) }}
          riseOnHover={true}
        >
          {/* {
            item_num[index].map((val,ind)=>(
              <Marker
                key={index+100*ind}
                position={[point[1], point[2]]}
                icon={customIcon}
                
                riseOnHover={true}
              >
              </Marker>
            ))
          } */}
          <Popup>
            <a href={urls[index]}>{point[0]}</a>
            <p>藏品 {item_num[index]} 件</p>
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
