import React from "react";
import Window from "./Window";
import "./DisplayData.css";

const properties = [
  "版权声明",
  "Credit Line",
  "博物馆索引",
  "作者",
  "来源地",
  "年代",
  "尺寸",
  "分类_ZN",
  "材质_ZN",
  "技法_ZN",
  "Metadata_ZN",
  "AAT_keyword_ZN",
  "藏品名称_ZN",
  "描述_ZN",
  "src",
  "alt",
];

function DisplayData({ china_data, foreign_data }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageClick = (data) => {
    let imageProperties = {};
    properties.forEach((property) => {
      if (data[property] == null ||
         data[property] == undefined ||
         data[property] == "" ||
         data[property] == "——") {
        imageProperties[property] = "无";
      }
      else {
        imageProperties[property] = data[property];
      }
    });
    imageProperties["src"] = require("./pictures/" + data["ID"] + ".jpg");
    if(data["藏品名称_ZN"]==null || data["藏品名称_ZN"]==undefined || data["藏品名称_ZN"]=="" || data["藏品名称_ZN"]=="——"){
      imageProperties["alt"] = "无名";
    }
    else{
      imageProperties["alt"] = data["藏品名称_ZN"];
    }

    setSelectedImage(imageProperties);
    setIsOpen(true);
  }

  const closeWindow = () => {
    setIsOpen(false);
  }

  if (china_data == null || foreign_data == null) return <div></div>;

  if(china_data["藏品名称_ZN"]==null || china_data["藏品名称_ZN"]==undefined || china_data["藏品名称_ZN"]=="" || china_data["藏品名称_ZN"]=="——"){
    china_data["藏品名称_ZN"] = "无名";
  }
  if(foreign_data["藏品名称_ZN"]==null || foreign_data["藏品名称_ZN"]==undefined || foreign_data["藏品名称_ZN"]=="" || foreign_data["藏品名称_ZN"]=="——"){
    foreign_data["藏品名称_ZN"] = "无名";
  }

  return (
    <div className="u-flex">
      <div className="left-display">
        <h2>中国藏品</h2>
        <img
          src={require("./pictures/" + china_data["ID"] + ".jpg")}
          alt={china_data["藏品名称_ZN"]}
          onClick={() => handleImageClick(china_data)}
          className="image-display"
        />
        <div className="image-name">{china_data["藏品名称_ZN"]}</div>
        <div>来源地：{china_data["来源地"]}</div>
      </div>
      <div className="right-display">
        <h2>外国藏品</h2>
        <img
          src={require("./pictures/" + foreign_data["ID"] + ".jpg")}
          alt={foreign_data["藏品名称_ZN"]}
          onClick={() => handleImageClick(foreign_data)}
          className="image-display"
        />
        <div className="image-name">{foreign_data["藏品名称_ZN"]}</div>
        <div>来源地：{foreign_data["来源地"]}</div>
      </div>
      {isOpen && <Window image={selectedImage} onClose={closeWindow} />}
    </div>
  );
}

export default DisplayData;
