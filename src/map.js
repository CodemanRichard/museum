import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Circle,
  CircleMarker,
  LayersControl,
  LayerGroup
} from "react-leaflet";
import L, { marker,circle } from "leaflet";

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

import logo1b from "./logos/logo 1b.png"
import logo2b from "./logos/logo 2b.png"
import logo3b from "./logos/logo 3b.png"
import logo4b from "./logos/logo 4b.png"
import logo5b from "./logos/logo 5b.png"
import logo6b from "./logos/logo 6b.png"
import logo7b from "./logos/logo 7b.png"
import logo8b from "./logos/logo 8b.png"
import logo9b from "./logos/logo 9b.png"
import logo10b from "./logos/logo 10b.png"


import { useEffect, useState, useRef } from 'react';
import { color } from "d3";

import Dot_Tree from "./Dot_Tree"


const customIcon = new L.Icon({
  iconUrl: logo,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, 0],
});

const logo_img_list_b=[
  logo0,
  logo1b,
  logo2b,
  logo3b,
  logo4b,
  logo5b,
  logo6b,
  logo7b,
  logo8b,
  logo9b,
  logo10b
]

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

const circ_opt={
  fillColor:"red",
  // color:"red"
}


function size_mapping(count){
  if(count>70){
    return 70
  }
  if(count<5){
    count=5
  }
  return count
}

function zoom_depth_mapping(zoom){
  let depth=Math.floor(Math.pow(zoom,1.2))
  if(depth<2){
    depth=2
  }
  return depth
}


function Map({museumName, changeProps }) {
  const [item_num, set_item_num] = useState([0,0,0,0,0,0,0,0]);
  const [shina_item_num, set_china_item_num] = useState([0,0,0,0,0,0,0,0]);
  const [icon_list,set_icon_list]=useState([customIcon,customIcon,customIcon,customIcon,customIcon,customIcon,customIcon,customIcon])
  const [china_icon_list,set_china_icon_list]=useState([customIcon,customIcon,customIcon,customIcon,customIcon,customIcon,customIcon,customIcon])

  const [dotmap,set_dotmap]=useState([])


  const [dt,set_dt]=useState(null)

  function zoom_to_dot_list(zoom){
    let depth=zoom_depth_mapping(zoom)
    if(dt==null){
      console.log("null dt")
      return
    }
    let rt=dt.Report(depth)
    set_dotmap(rt)
    console.log(`${zoom}-->${rt.length}\t\tdepth: ${depth}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch("http://localhost:5000/get_museum_sum");
          const data = await response.json();
          const response_c=await fetch("http://localhost:5000//get_museum_sum_China");
          const data_c = await response_c.json();

          // console.log(data)
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
                iconUrl: logo_img_list_b[Math.ceil(Math.log(data[p[0]]+1))],
                iconSize: [logo_size, logo_size],
                iconAnchor: [logo_size/2, logo_size/2],
                popupAnchor: [logo_size/2, logo_size/2],
              })
          
            )
          }
          
          // console.log(data_c)

          let china_item=[]
          let new_china_icon_list=[]
          for(let p of points){
            china_item.push(data_c[p[0]])
            let ratio=(data_c[p[0]]/data[p[0]])
            // console.log(ratio)
            new_china_icon_list.push(
              new L.Icon({
                iconUrl: logo_img_list[Math.ceil(ratio*Math.ceil(Math.log(data[p[0]]+1)))],
                iconSize: [logo_size, logo_size],
                iconAnchor: [logo_size/2, logo_size/2],
                popupAnchor: [0, -10],
              })
            )
          }

          
          set_china_item_num(china_item)
          set_china_icon_list(new_china_icon_list)
          // console.log(china_item)

          set_item_num(items)
          set_icon_list(new_icon_list)
          
          

          
      }catch(e){
        console.log(e)
      }
    }
    fetchData();
  },[urls])

  useEffect(() => {
    const ff=async ()=>{
      try{
        const response=await fetch("http://localhost:5000//get_dot_map");
        // console.log(response)
        const data = await response.json();
        

        let rt=[]
        let l_b=[data[0][0],data[0][1]]
        let r_t=[data[0][0],data[0][1]]
        for(let d of data){
          let ss=d[3].split("(")
          // console.log(ss)
          l_b[0]=Math.min(l_b[0],d[0])
          l_b[1]=Math.min(l_b[1],d[1])

          r_t[0]=Math.max(r_t[0],d[0])
          r_t[1]=Math.max(r_t[1],d[1])

          rt.push([d[0],d[1],d[2],ss[0].split("\n")[0]])
        }

        let new_dt=new Dot_Tree(l_b,r_t)

        rt.forEach((val)=>{
          new_dt.Register(val)
        })

        set_dt(new_dt)

        let new_dotmap=new_dt.Report(zoom_depth_mapping(2))

        set_dotmap(new_dotmap)

        // zoom_to_dot_list(2)

      }catch(e){
        console.log(e)
      }
    }
    ff()
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
    zoom_to_dot_list(newZoom)
    // console.log(newZoom)
    
    
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
      <LayersControl position="topright">
      <LayersControl.Overlay checked  name="博物馆">
      <LayerGroup>
      {points.map((point, index) => (
        <>
        <Marker 
        key={index+100}
        position={[point[1], point[2]]}
        icon={icon_list[index]}
        
        riseOnHover={false}
      >
      </Marker>
        <Marker
          key={index}
          position={[point[1], point[2]]}
          icon={china_icon_list[index]}
          eventHandlers={{ click: () => clickHandler(point[0]) }}
          riseOnHover={true}
        >
          
          <Popup>
            <a href={urls[index]}>{point[0]}</a>
            <p>藏品 {item_num[index]} 件</p>
            <p>{shina_item_num[index]} 件来自中国</p>
          </Popup>
        </Marker>

        
      </>
      ))}
</LayerGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay checked  name="文物发现地点">
      <LayerGroup>
      {dotmap.map((dot,index)=>(
        
        <CircleMarker
    
          key={index*109}
          center={[dot[0],dot[1]]}
          radius={size_mapping(dot[2])}
          pathOptions={circ_opt}
        >
          <Popup>{dot[2]} 件来自 {dot[3]}</Popup>
        </CircleMarker>
      ))}
</LayerGroup>
      </LayersControl.Overlay>
    </LayersControl>
      
      
      
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
