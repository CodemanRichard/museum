import React, { useEffect, useState, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import './collection.css'

const Collection = ({ museumName}) => {
  const [pieData, setPieData] = useState([]);

  const sortedPieData = Object.entries(pieData)
      .sort((a, b) => b[1] - a[1])
      .map(([country, count]) => ({ name: country, value: count }));

  const pieOption = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
          orient: 'vertical',
          left: 10,
          data: sortedPieData.map(({ name }) => name)
      },
      series: [
          {
              name: 'Country',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data: sortedPieData
          }
      ]
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch("http://localhost:5000/get_data");
          const data = await response.json();

          // Filter the data based on the museum name
          const filteredData = data.filter((item) => item['博物馆'] === museumName);

          const counts = filteredData.length;
          console.log('Total number of items: ', counts);

          const countryCounts = filteredData.reduce((counts, item) => {
              const country = item['country'];
              counts[country] = (counts[country] || 0) + 1;
              return counts;
          }, {});

          delete countryCounts['——'];
          delete countryCounts['null'];

          setPieData(countryCounts)

          console.log('Country counts: ', countryCounts);


      } catch (error) {
          console.error('Error fetching data: ', error);
      }
  };

  fetchData();
}, [museumName]);

return (
  <div>
      <div className='title'>藏品来源国家</div>
      <ReactEcharts option={pieOption} />
  </div>
)}

export default Collection;