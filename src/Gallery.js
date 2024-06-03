import React, { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import Window from "./Window";
import { Button, Pagination, Select } from "antd"; // 引入 Pagination 组件
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

const dimensions = [
  {
    value: "country",
    label: "国家",
  },
  {
    value: "Metadata_ZN",
    label: "关键词",
  },
  {
    value: "起始年",
    label: "生产年代",
  },
  {
    value: "尺寸",
    label: "尺寸",
  },
  {
    value: "分类_ZN",
    label: "分类",
  },
  {
    value: "材质_ZN",
    label: "材质",
  },
  {
    value: "技法_ZN",
    label: "技法",
  },
];

const fetchData = async (museumName) => {
  const response = await fetch("http://localhost:5000/get_data");
  const data = await response.json();
  const filteredData = data.filter((item) => item["博物馆"] === museumName);
  return filteredData;
};

function Gallery({ museumName, newDimension, newContent }) {
  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);

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
      setImageCount(newImages.length);
    });
  }, [museumName]);

  const [currentPage, setCurrentPage] = useState(1); // 现在使用从1开始的页码
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesPerPage = 4;
  const startIndex = (currentPage - 1) * imagesPerPage; // 计算起始索引时减去1
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

  const [contents, setContents] = useState([]);

  const [selectedDimension, setSelectedDimension] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  const changeDimension = (value) => {
    // update selected dimension
    setSelectedDimension(value);
    // update contents
    let contents = [];
    fetchData(museumName).then((data) => {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let words = item[value];
        if (
          words == null ||
          words == undefined ||
          words == "" ||
          words == "——"
        ) {
          continue;
        }
        if (value === "起始年") {
          words = String(words);
        }
        let wordList = words.split(";");
        for (let j = 0; j < wordList.length; j++) {
          let word = wordList[j];
          if (!contents.includes(word)) {
            contents.push(word);
          }
        }
      }
      let finalContents = [];
      for (let i = 0; i < contents.length; i++) {
        finalContents.push({
          value: contents[i],
          label: contents[i],
        });
      }
      setContents(finalContents);
    });
  };

  const changeContent = async (value) => {
    // update selected content
    await setSelectedContent(value);
    // update images
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
        if (item[selectedDimension] == null || item[selectedDimension] == undefined || item[selectedDimension] == "" || item[selectedDimension] == "——") {
          return;
        }
        if (selectedDimension === "起始年") {
          item[selectedDimension] = String(item[selectedDimension]);
        }
        let values = item[selectedDimension].split(";");
        if (values.includes(value)) {
          newImages.push(imageProperties);
        }
      });
      setImages(newImages);
      setImageCount(newImages.length);
    });
  };

    // update selected dimension and content
    /*useEffect(() => {
      if (newDimension !== null && newContent !== null
        && newDimension != undefined && newContent != undefined
        && newDimension !== "" && newContent !== ""
        && newDimension !== "——" && newContent !== "——"
      ) {
        changeDimension(newDimension);
      }
    }, [newContent]);
    useEffect(() => {
      if (newDimension !== null && newContent !== null
        && newDimension != undefined && newContent != undefined
        && newDimension !== "" && newContent !== ""
        && newDimension !== "——" && newContent !== "——"
      ) {
        changeContent(newContent);
      }
    }, [selectedDimension]);*/
    useEffect(() => {
      if (newDimension !== null && newContent !== null
        && newDimension != undefined && newContent != undefined
        && newDimension !== "" && newContent !== ""
        && newDimension !== "——" && newContent !== "——"
      ) {
        changeDimension(newDimension);
      }
    }, [newDimension]);
    useEffect(() => {
      if (newDimension !== null && newContent !== null
        && newDimension != undefined && newContent != undefined
        && newDimension !== "" && newContent !== ""
        && newDimension !== "——" && newContent !== "——"
      ) {
        changeContent(newContent);
      }
    }, [newContent]);
    useEffect(() => {
      if (newDimension !== null && newContent !== null
        && newDimension != undefined && newContent != undefined
        && newDimension !== "" && newContent !== ""
        && newDimension !== "——" && newContent !== "——"
      ) {
        changeContent(newContent);
      }
    }, [selectedDimension]);
    useEffect(() => {
      if (newDimension !== null && newContent !== null
        && newDimension != undefined && newContent != undefined
        && newDimension !== "" && newContent !== ""
        && newDimension !== "——" && newContent !== "——"
      ) {
        changeContent(selectedContent);
      }
    }, [selectedContent]);

      
    

  return (
    <div className="App">
      <div className="u-flex">
        <div className="flex-div">
          <Select
            value={selectedDimension}
            className="selector1"
            placeholder="首先选择要筛选的维度"
            onChange={changeDimension}
            options={dimensions}
          />
        </div>
        <div className="flex-div">
          <Select
            value={selectedContent}
            className="selector2"
            placeholder="然后选择要筛选的内容"
            onChange={changeContent}
            options={contents}
          />
        </div>
        <div className="number-count">藏品数量：{imageCount}</div>
      </div>
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
