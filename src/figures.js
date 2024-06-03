import React, { useEffect, useState, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Button, Pagination, Select } from "antd";
import './figures.css';

const dimensions = [
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


const Figures = ({ museumName}) => {
  const [selectedDimension, setSelectedDimension] = useState(dimensions[0].value);
  const [wordData_cn, setWordData_cn] = useState([]);
  const [wordData_en, setWordData_en] = useState([]);

  const changeDimension = (value) => {
    // update selected dimension
    setSelectedDimension(value);
  };

    useEffect(() => {
      setSelectedDimension(selectedDimension);
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/get_data");
                const data = await response.json();

                // Filter the data based on the museum name
                const filteredData_cn = data.filter((item) => item['博物馆'] === museumName && item['country'] === 'China');
                const filteredData_en = data.filter((item) => item['博物馆'] === museumName && item['country'] != 'China');
                const words_cn = filteredData_cn.flatMap(item => item[selectedDimension]);
                const words_en = filteredData_en.flatMap(item => item[selectedDimension]);
                const wordCounts_cn = words_cn.reduce((counts, word) => {
                  const splitWords_cn = word.split(";");
                  splitWords_cn.forEach((splitWord) => {
                      counts[splitWord.trim()] = (counts[splitWord.trim()] || 0) + 1;
                  });
                    return counts;
                }, {});
                delete wordCounts_cn['——'];

                const wordCounts_en = words_en.reduce((counts, word) => {
                  const splitWords_en = word.split(";");
                  splitWords_en.forEach((splitWord) => {
                      counts[splitWord.trim()] = (counts[splitWord.trim()] || 0) + 1;
                  });
                    return counts;
                }, {});
                delete wordCounts_en['——'];

                const sortedWordCounts_cn = Object.entries(wordCounts_cn).sort((a, b) => b[1] - a[1]);
                const top9WordCounts_cn = sortedWordCounts_cn.slice(0, 9);
                const otherCount_cn = top9WordCounts_cn.reduce((sum, [, count]) => sum + count, 0);
                const top9Words_cn = top9WordCounts_cn.map(([word, count]) => ({ name: word, value: count }));

                // 对wordCounts_en进行排序并获取前9名
                const sortedWordCounts_en = Object.entries(wordCounts_en).sort((a, b) => b[1] - a[1]);
                const top9WordCounts_en = sortedWordCounts_en.slice(0, 9);
                const otherCount_en = top9WordCounts_en.reduce((sum, [, count]) => sum + count, 0);
                const top9Words_en = top9WordCounts_en.map(([word, count]) => ({ name: word, value: count }));

                // 将剩下的元素归类为“其他”
                if (sortedWordCounts_cn.length > 9) {
                  top9Words_cn.push({ name: '其他', value: otherCount_cn });
                }
                if (sortedWordCounts_en.length > 9) {
                  top9Words_en.push({ name: '其他', value: otherCount_en });
                }
                setWordData_cn(top9Words_cn)
                setWordData_en(top9Words_en)

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [museumName, selectedDimension]);

    const getOption = (dataCn, dataEn) => {
      return {
        series: {
          type: 'sunburst',
          data: [
            {
              name: '中国',
              children: dataCn,
            },
            {
              name: '外国',
              children: dataEn,
            },
          ],
          radius: [0, '90%'],
          label: {
            rotate: 'radial',
          },
        },
      };
    };
  
    return (
        <div>
            <div className='title'>统计</div>
            <div>
                  <div>
                  <Select
                      value={selectedDimension}
                      className="selector"
                      onChange={changeDimension}
                      options={dimensions}
                  />
                  </div>
                  <div style={{ width: '100%' }}>
                    <ReactEcharts option={getOption(wordData_cn, wordData_en)} />
                  </div>
            </div>
        </div>
    )}
   

export default Figures;