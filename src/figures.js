import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import ReactEcharts from 'echarts-for-react';
import ReactWordcloud from 'react-wordcloud';
import './figures.css';

const Figures = ({ museumName, figureNo }) => {
    const [pieData, setPieData] = useState([]);

    const pieOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: Object.keys(pieData)
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
                data: Object.entries(pieData).map(([country, count]) => ({ name: country, value: count }))
            }
        ]
    };



    const [wordCloudData, setWordCloudData] = useState([]);
    const [wordCloudDataEn, setWordCloudDataEn] = useState([]);

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
            axisLabel: {},
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
                data: ChinaData
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
                data: ForeignData
            }
        ]
    };
    useEffect(() => {
        if (figureNo === 1) {
            console.log('Figure 1');
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
        }


        else if (figureNo === 2) {
            console.log('Figure 2');

            // Fetch data from the server
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

        }

        else if (figureNo === 3) {
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
                    console.log(withChina_count_data)
                    console.log(withoutChina_count_data)
                    setChinaData(withChina_count_data)
                    setForeignData(withoutChina_count_data)
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };
            fetchData();

        }
    }, [figureNo]);


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

    if (figureNo === 1) {
        return (
            <div>
                <div className='title'>藏品来源国家</div>
                <ReactEcharts option={pieOption} />
            </div>
        )
    }
    else if (figureNo === 2) {
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
        );
    }
    else if (figureNo === 3) {
        return (
            <div>
                <div className='title'>生产年代</div>
                <ReactEcharts option={option} />
            </div>
        )
    }
}

export default Figures;