import React, { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import Window from "./Window";
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import "./Gallery.css";

const fetchData = async (museumName) => {
  const response = await fetch("http://localhost:5000/get_data");
  const data = await response.json();
  const filteredData = data.filter((item) => item['博物馆'] === museumName);
  return filteredData;
}

function Gallery({museumName}) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetchData(museumName).then((data) => {
      let newImages = [];
      data.forEach((item, index) => {
        newImages.push({
          id: index,
          src: require("./pictures/"+item['ID']+".jpg"),  // 路径，例如：require("./pictures/1_Robe_01.jpg")
          alt: item['藏品名称'],
          copyright: item['版权声明'],
          credit: item['Credit Line'],
          museumIndex: item['博物馆索引'],
          author: item['作者'],
          source: item['来源地'],
          period: item['年代'],
          size: item['尺寸'],
          category: item['分类_ZN'],
          material: item['材质_ZN'],
          technique: item['技法_ZN'],
          metaData: item['Metadata_ZN'],
          keyword: item['AAT_keyword_ZN'],
          name: item['藏品名称'],
          description: item['描述_ZN'],
        });
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
      <ImageGallery className="gallery" images={selectedImages} onImageClick={handleImageClick} />
      <LeftOutlined className="left-button" onClick={handlePrevPage}/>
      <RightOutlined className="right-button" onClick={handleNextPage}/>
      {isOpen && <Window image={selectedImage} onClose={closeWindow} />}
    </div>
  );
}

export default Gallery;
