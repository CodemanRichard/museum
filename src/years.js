import React, { useEffect, useState} from 'react';
import ReactEcharts from 'echarts-for-react';
import './years.css'

const Years = ({museumName, changeDimension, changeContent }) => {
    const [ChinaData, setChinaData] = useState([]);
    const [ForeignData, setForeignData] = useState([]);

    const handleClick = ({ data }) => {
        const year = data[0];
        if (year === '其他') {
            return;
        }
        console.log(year)
        // changeDimension('国家');
        changeDimension('起始年');
        changeContent(year);
    };

    const option = {
        tooltip: {
            trigger: 'axis',
            minInterval: 1
          },
        legend: {
            data: ['中国', '国外']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            minInterval: 1
        },
        yAxis: {
            type: 'value',
            position: 'left', 
            scale: true
          },
        series: [
            {
                name: '中国',
                type: 'line',
                data: ChinaData,
                itemStyle: {
                    color: '#6bae91'
                },
            },
            {
                name: '国外',
                type: 'line',
                data: ForeignData,
                itemStyle: {
                    color: '#ecc92e'
                },
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
            const withChina_count_data = Object.keys(withChina_yearCounts).map(key => [key, withChina_yearCounts[key]]);
            const withoutChina_count_data = Object.keys(withoutChina_yearCounts).map(key => [key, withoutChina_yearCounts[key]]);
            withChina_count_data.sort((a, b) => a[0] - b[0]);
            withoutChina_count_data.sort((a, b) => a[0] - b[0]);
            console.log(withChina_count_data)
            console.log(withoutChina_count_data)
            setChinaData(withChina_count_data)
            setForeignData(withoutChina_count_data)
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    fetchData();
}, [museumName]);

return (
  <div className='years-flex'>
    <div className='title1'>生产年代</div>
    <div className='years-graph' style={{ width: '95%', height: '40%'}}><ReactEcharts option={option} onEvents={{ click: handleClick}} style={{ width: '100%', height: '250%' }}/></div>
  </div>
)}
export default Years;