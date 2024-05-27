import React, { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import Window from "./Window";
import { Pagination } from "antd";  // 引入 Pagination 组件
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

  const [currentPage, setCurrentPage] = useState(1);  // 现在使用从1开始的页码
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesPerPage = 4;
  const startIndex = (currentPage - 1) * imagesPerPage;  // 计算起始索引时减去1
  const selectedImages = images.slice(startIndex, startIndex + imagesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      <Pagination
        current={currentPage}
        pageSize={imagesPerPage}
        total={images.length}
        onChange={handlePageChange}
        showQuickJumper
        showSizeChanger={false}
        className="pagination"
      />
      {isOpen && <Window image={selectedImage} onClose={closeWindow} />}
    </div>
  );
}

export default Gallery;
