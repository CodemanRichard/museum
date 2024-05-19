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
        let copyright, credit, museumIndex, author, source, period, size, category, material, technique, metaData, keyword, name, description;
        if(item['版权声明'] === null || item['版权声明'] === undefined || item['版权声明'] === "" || item['版权声明'] === "——") {
          copyright = "无";
        } else {
          copyright = item['版权声明'];
        }
        if(item['Credit Line'] === null || item['Credit Line'] === undefined || item['Credit Line'] === "" || item['Credit Line'] === "——") {
          credit = "无";
        } else {
          credit = item['Credit Line'];
        }
        if(item['博物馆索引'] === null || item['博物馆索引'] === undefined || item['博物馆索引'] === "" || item['博物馆索引'] === "——") {
          museumIndex = "无";
        } else {
          museumIndex = item['博物馆索引'];
        }
        if(item['作者'] === null || item['作者'] === undefined || item['作者'] === "" || item['作者'] === "——") {
          author = "无";
        } else {
          author = item['作者'];
        }
        if(item['来源地'] === null || item['来源地'] === undefined || item['来源地'] === "" || item['来源地'] === "——") {
          source = "无";
        } else {
          source = item['来源地'];
        }
        if(item['年代'] === null || item['年代'] === undefined || item['年代'] === "" || item['年代'] === "——") {
          period = "无";
        } else {
          period = item['年代'];
        }
        if(item['尺寸'] === null || item['尺寸'] === undefined || item['尺寸'] === "" || item['尺寸'] === "——") {
          size = "无";
        } else {
          size = item['尺寸'];
        }
        if(item['分类_ZN'] === null || item['分类_ZN'] === undefined || item['分类_ZN'] === "" || item['分类_ZN'] === "——") {
          category = "无";
        } else {
          category = item['分类_ZN'];
        }
        if(item['材质_ZN'] === null || item['材质_ZN'] === undefined || item['材质_ZN'] === "" || item['材质_ZN'] === "——") {
          material = "无";
        } else {
          material = item['材质_ZN'];
        }
        if(item['技法_ZN'] === null || item['技法_ZN'] === undefined || item['技法_ZN'] === "" || item['技法_ZN'] === "——") {
          technique = "无";
        } else {
          technique = item['技法_ZN'];
        }
        if(item['Metadata_ZN'] === null || item['Metadata_ZN'] === undefined || item['Metadata_ZN'] === "" || item['Metadata_ZN'] === "——") {
          metaData = "无";
        } else {
          metaData = item['Metadata_ZN'];
        }
        if(item['AAT_keyword_ZN'] === null || item['AAT_keyword_ZN'] === undefined || item['AAT_keyword_ZN'] === "" || item['AAT_keyword_ZN'] === "——") {
          keyword = "无";
        } else {
          keyword = item['AAT_keyword_ZN'];
        }
        if(item['藏品名称_ZN'] === null || item['藏品名称_ZN'] === undefined || item['藏品名称_ZN'] === "" || item['藏品名称_ZN'] === "——") {
          name = "无";
        } else {
          name = item['藏品名称_ZN'];
        }
        if(item['描述_ZN'] === null || item['描述_ZN'] === undefined || item['描述_ZN'] === "" || item['描述_ZN'] === "——") {
          description = "无";
        } else {
          description = item['描述_ZN'];
        }
        newImages.push({
          id: index,
          src: require("./pictures/"+item['ID']+".jpg"),  // 路径，例如：require("./pictures/1_Robe_01.jpg")
          alt: name,
          copyright: copyright,
          credit: credit,
          museumIndex: museumIndex,
          author: author,
          source: source,
          period: period,
          size: size,
          category: category,
          material: material,
          technique: technique,
          metaData: metaData,
          keyword: keyword,
          name: name,
          description: description,
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
