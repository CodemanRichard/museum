import React, { useEffect, useState } from "react";
import { Select } from "antd";
import DisplayData from "./DisplayData";

// key->[china_id, foreign_id]
const keywords = {
  海报: [100941, 317576],
  花瓶: [10488, 114053],
  瓷器: [10780, 10621],
  家庭用品: [8453, 48023],
  石器: [12656, 113723],
  碗: [112394, 10854],
  珠宝首饰: [1110, 112811],
  科学: [114541, 119202],
  神话与传说: [38373, 114480],
  纸张: [115111, 119486],
  丝绸: [66413, 11593],
};

// return [china_data, foreign_data]
const fetchData = async (china_id, foreign_id) => {
  const response = await fetch("http://localhost:5000/get_data");
  const data = await response.json();
  let filteredData = [null, null];
  data.forEach((item) => {
    if (item["ID"] === china_id) {
      filteredData[0] = item;
    }
    if (item["ID"] === foreign_id) {
      filteredData[1] = item;
    }
  });
  return filteredData;
};

const onChange = (value) => {
  let china_id = keywords[value][0];
  let foreign_id = keywords[value][1];
  fetchData(china_id, foreign_id).then((data) => {
    let china_data = data[0];
    let foreign_data = data[1];
  });
};

function Compare() {
  const [china_data, setChinaData] = useState(null);
  const [foreign_data, setForeignData] = useState(null);

  const onChange = (value) => {
    let china_id = keywords[value][0];
    let foreign_id = keywords[value][1];
    fetchData(china_id, foreign_id).then((data) => {
      setChinaData(data[0]);
      setForeignData(data[1]);
    });
  };

  return (
    <>
      <Select
        style={{ width: 180 }}
        placeholder="请选择要筛选的元素"
        onChange={onChange}
        options={[
          {
            value: "海报",
            label: "海报",
          },
          {
            value: "花瓶",
            label: "花瓶",
          },
          {
            value: "瓷器",
            label: "瓷器",
          },
          {
            value: "家庭用品",
            label: "家庭用品",
          },
          {
            value: "石器",
            label: "石器",
          },
          {
            value: "碗",
            label: "碗",
          },
          {
            value: "珠宝首饰",
            label: "珠宝首饰",
          },
          {
            value: "科学",
            label: "科学",
          },
          {
            value: "神话与传说",
            label: "神话与传说",
          },
          {
            value: "纸张",
            label: "纸张",
          },
          {
            value: "丝绸",
            label: "丝绸",
          },
        ]}
      />
      <DisplayData china_data={china_data} foreign_data={foreign_data} />
    </>
  );
}

export default Compare;
