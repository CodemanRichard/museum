import React, { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import Window from "./Window";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./Gallery.css";

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

const fetchData = async (museumName) => {
  const response = await fetch("http://localhost:5000/get_data");
  const data = await response.json();
  const filteredData = data.filter((item) => item["博物馆"] === museumName);
  return filteredData;
};

function Gallery({ museumName }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetchData(museumName).then((data) => {
      let newImages = [];
      data.forEach((item, index) => {
        let imageProperties = {};
        properties.forEach((property) => {
          if (
            item[property] == null ||
            item[property] == undefined ||
            item[property] == "" ||
            item[property] == "——"
          ) {
            imageProperties[property] = "无";
          } else {
            imageProperties[property] = item[property];
          }
        });
        imageProperties["src"] = require("./pictures/" + item["ID"] + ".jpg");
        if (
          item["藏品名称_ZN"] == null ||
          item["藏品名称_ZN"] == undefined ||
          item["藏品名称_ZN"] == "" ||
          item["藏品名称_ZN"] == "——"
        ) {
          imageProperties["alt"] = "无名";
        } else {
          imageProperties["alt"] = item["藏品名称_ZN"];
        }
        newImages.push(imageProperties);
      });
      setImages(newImages);
    });
  }, [museumName]);

  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesPerPage = 4;
  const startIndex = currentPage * imagesPerPage;
  const selectedImages = images.slice(startIndex, startIndex + imagesPerPage);

  const handleNextPage = () => {
    if (startIndex + imagesPerPage < images.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeWindow = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <ImageGallery
        className="gallery"
        images={selectedImages}
        onImageClick={handleImageClick}
      />
      <LeftOutlined className="left-button" onClick={handlePrevPage} />
      <RightOutlined className="right-button" onClick={handleNextPage} />
      {isOpen && <Window image={selectedImage} onClose={closeWindow} />}
    </div>
  );
}

export default Gallery;
