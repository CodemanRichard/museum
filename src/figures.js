import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import ReactEcharts from 'echarts-for-react';
import ReactWordcloud from 'react-wordcloud';
import './figures.css';

const Figures = ({ museumName, figureNo }) => {
    const [totalCount, setTotalCount] = useState(0);
    const [chinaCount, setChinaCount] = useState(0);

    const drawCollection = () => {
        // Select the SVG container
        const svg = d3.select("#collection");
        // Calculate the data for the pie chart
        const pieData = [
            { label: 'China Count', value: chinaCount },
            { label: 'Other Count', value: totalCount - chinaCount }
        ];
        // Create a legend for the pie chart
        const legend = svg
            .selectAll(".legend")
            .data(pieData)
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => `translate(400, ${i * 30})`);

        // Add colored squares to the legend
        legend
            .append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", (d, i) => (i === 0 ? "red" : "blue"));

        // Add labels to the legend
        legend
            .append("text")
            .attr("x", 30)
            .attr("y", 15)
            .text((d) => d.label);
        // Set up the pie chart layout
        const pie = d3.pie().value(d => d.value);

        // Set up the arc generator
        const arc = d3.arc().innerRadius(0).outerRadius(200);

        // Draw the pie slices
        svg.selectAll("path")
            .data(pie(pieData))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => i === 0 ? "red" : "blue")
            .attr("transform", "translate(200, 200)");
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

                    const chinaCounts = filteredData.filter((item) => item['来源地'].includes('China')).length;

                    console.log('Number of items from China: ', chinaCounts);

                    setTotalCount(counts);
                    setChinaCount(chinaCounts);

                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };

            fetchData();

            drawCollection();
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
    const size = [500, 500];


    if (figureNo === 1) {
        return (
            <svg id="collection" width={1000} height={500} style={{ margin: '30px' }}></svg>
        );
    }
    else if (figureNo === 2) {
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <div className='title'>中国馆藏关键词</div>
                    <ReactWordcloud
                        callbacks={callbacks}
                        options={options}
                        size={size}
                        words={wordCloudData}
                    />
                </div>
                <div style={{ width: '50%' }}>
                    <div className='title'>外国馆藏关键词</div>
                    <ReactWordcloud
                        callbacks={callbacks}
                        options={options}
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
                <h3>生产年代</h3>
                <ReactEcharts option={option} />
            </div>
        )
    }
}

export default Figures;