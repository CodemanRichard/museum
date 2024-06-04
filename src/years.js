import React, { useEffect, useState} from 'react';
import ReactEcharts from 'echarts-for-react';
import './years.css'

const Years = ({museumName}) => {
  const [ChinaData, setChinaData] = useState([]);
    const [ForeignData, setForeignData] = useState([]);
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'rgba(0,0,0,0.2)',
                    width: 1,
                    type: 'solid'
                }
            }
        },
        legend: {
            data: ['中国', '国外']
        },
        singleAxis: {
            top: 5,
            bottom: 5,
            axisTick: {},
            axisLabel: {
                show: true,
                formatter: function(value, index) {
                  return index % 500 === 0 ? value : ''; 
                }
              },
            type: 'value',
            axisPointer: {
                animation: true,
                label: {
                    show: true
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    opacity: 0.2
                }
            },
        },
        series: [
            {
                type: 'themeRiver',
                smooth: true,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.8)'
                    }
                },
                data: ChinaData,
                color: ['#6bae91'] // Change the color for China
            },
            {
                type: 'themeRiver',
                smooth: true,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.8)'
                    }
                },
                data: ForeignData,
                color: ['#ecc92e'] // Change the color for Foreign
            }
        ]
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/get_data");
            const data = await response.json();
            var filteredData = []
            if (museumName) {
                filteredData = data.filter((item) => item['博物馆'] === museumName);
            } else {
                filteredData = data
            }
            const withChina = [];
            const withoutChina = [];

            filteredData.forEach(item => {
                if (item['country'] && item['country'].includes('China')) {
                    withChina.push(item);
                } else {
                    withoutChina.push(item);
                }
            });
            const withChina_data = withChina.flatMap(item => item['起始年']);
            const withoutChina_data = withoutChina.flatMap(item => item['起始年']);
            const withChina_yearCounts = withChina_data.reduce((accumulator, year) => {
                accumulator[year] = (accumulator[year] || 0) + 1;
                return accumulator;
            }, {})
            const withoutChina_yearCounts = withoutChina_data.reduce((accumulator, year) => {
                accumulator[year] = (accumulator[year] || 0) + 1;
                return accumulator;
            }, {})
            const withChina_count_data = Object.keys(withChina_yearCounts).map(key => [key, withChina_yearCounts[key], '中国']);
            const withoutChina_count_data = Object.keys(withoutChina_yearCounts).map(key => [key, withoutChina_yearCounts[key], '国外']);
            // console.log(withChina_count_data)
            // console.log(withoutChina_count_data)
            setChinaData(withChina_count_data)
            setForeignData(withoutChina_count_data)
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    fetchData();
}, [museumName]);

return (
  <div className='container'>
    <div className='title1' style={{width:'5%'}}>生产年代</div>
    <div style={{ width: '95%', height: '100%'}}><ReactEcharts option={option} style={{ width: '100%', height: '250%' }}/></div>
  </div>
)}
export default Years;