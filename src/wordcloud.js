import React, { useEffect, useState, useRef } from 'react';
import ReactWordcloud from 'react-wordcloud';
import * as d3 from 'd3';
// import './years.css'

const WordCloud = ({ museumName}) => {
    const [wordCloudData, setWordCloudData] = useState([]);
    const [wordCloudDataEn, setWordCloudDataEn] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch("http://localhost:5000/get_data");
          const data = await response.json();

          // console.log('Data fetched: ', data);
          // [{博物馆: 'the V&A', ID: 1003, Main_ID: 1003, 版权声明: 'Copyright: © Victor...}, ...]

          // Filter the data based on the museum name
          const filteredData = data.filter((item) => item['博物馆'] === museumName && item['country'] === 'China');
          const filteredDataEn = data.filter((item) => item['博物馆'] === museumName && item['country'] !== 'China');


          // Split the keywords and count their occurrences
          const keywords = filteredData.flatMap(item => item['Metadata_ZN']);
          const keywordsEn = filteredDataEn.flatMap(item => item['Metadata_ZN']);
          // console.log(keywords);
          const keywordCounts = keywords.reduce((counts, keyword) => {
              const splitKeywords = keyword.split(";");
              splitKeywords.forEach((splitKeyword) => {
                  counts[splitKeyword.trim()] = (counts[splitKeyword.trim()] || 0) + 1;
              });
              return counts;
          }, {});
          // Remove —— item from keywordCounts
          delete keywordCounts['——'];
          // console.log(keywordCounts);

          const keywordCountsEn = keywordsEn.reduce((counts, keyword) => {
              const splitKeywords = keyword.split(";");
              splitKeywords.forEach((splitKeyword) => {
                  counts[splitKeyword.trim()] = (counts[splitKeyword.trim()] || 0) + 1;
              });
              return counts;
          }, {});
          delete keywordCountsEn['——'];

          // Convert keyword counts to word cloud data
          const wordCloudData = Object.entries(keywordCounts)
              .map(([text, count]) => ({ text, value: count }))
              .sort((a, b) => b.value - a.value)
              .slice(0, 20);

          const wordCloudDataEn = Object.entries(keywordCountsEn)
              .map(([text, count]) => ({ text, value: count }))
              .sort((a, b) => b.value - a.value)
              .slice(0, 20);

          // Get the maximum size from the keywordArray
          const maxSize = Math.max(...wordCloudData.map((keyword) => keyword.value));
          const maxSizeEn = Math.max(...wordCloudDataEn.map((keyword) => keyword.value));

          // Scale the sizes of the keywords to fit the word cloud
          const sizeScale = d3.scaleLinear().domain([0, maxSize]).range([10, 100]);
          const sizeScaleEn = d3.scaleLinear().domain([0, maxSizeEn]).range([10, 100]);

          // Update the size property of each keyword object
          wordCloudData.forEach((keyword) => {
              keyword.value = sizeScale(keyword.value);
          });
          wordCloudDataEn.forEach((keyword) => {
              keyword.value = sizeScaleEn(keyword.value);
          });

          setWordCloudData(wordCloudData);
          setWordCloudDataEn(wordCloudDataEn);

          console.log('Word cloud data: ', wordCloudData);
          console.log('Word cloud data En: ', wordCloudDataEn);

      } catch (error) {
          console.error('Error fetching data: ', error);
      }
  };

  fetchData();

}, [museumName]);

const callbacks = {
  getWordColor: word => {
      const colorScale = d3.scaleLinear()
          .domain([0, 100])
          .range(["blue", "darkblue"]);
      return colorScale(word.value);
  },
}
const options = {
  rotations: 2,
  rotationAngles: [-45, 0, 45],
};
const size = [500, 400];

return (
  <div style={{ display: 'flex' }}>
  <div style={{ width: '50%' }}>
      <div className='title'>中国馆藏关键词</div>
      <ReactWordcloud
          callbacks={callbacks}
          options={{
              ...options,
              fontFamily: 'Arial',
              fontWeight: 'bold',
              fontSizes: [30, 80],
          }}
          size={size}
          words={wordCloudData}
      />
  </div>
  <div style={{ width: '50%' }}>
      <div className='title'>外国馆藏关键词</div>
      <ReactWordcloud
          callbacks={callbacks}
          options={{
              ...options,
              fontFamily: 'Arial',
              fontWeight: 'bold',
              fontSizes: [30, 80],
          }}
          size={size}
          words={wordCloudDataEn}
      />
  </div>
</div>
)}

export default WordCloud;