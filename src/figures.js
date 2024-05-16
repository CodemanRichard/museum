import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import * as cloud from 'd3-cloud';
import ReactEcharts from 'echarts-for-react';

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

    const drawWordCloud = () => {
        // Select the SVG container
        const svg = d3.select("#word-cloud-zn");

        // Define the layout for the word cloud
        const layout = cloud()
            .size([500, 500]) // Set the size of the word cloud
            .words(wordCloudData)
            .padding(5) // Set the padding between words
            .rotate(() => Math.random() * 90) // Randomly rotate the words
            .fontSize((d) => d.size) // Set the font size based on the data

        // Generate the word cloud layout
        layout.start();

        // Render the word cloud
        svg
            .selectAll("text")
            .data(wordCloudData)
            .enter()
            .append("text")
            .style("font-size", (d) => d.size + "px")
            .style("fill", "black")
            .attr("x", (d) => d.x + 250)
            .attr("y", (d) => d.y + 250)
            .attr("text-anchor", "middle")
            .text((d) => d.text);

        //en
        const svgEn = d3.select("#word-cloud-en");

        const layoutEn = cloud()
            .size([500, 500])
            .words(wordCloudDataEn)
            .padding(5)
            .rotate(() => Math.random() * 90)
            .fontSize((d) => d.size)

        layoutEn.start();

        svgEn
            .selectAll("text")
            .data(wordCloudDataEn)
            .enter()
            .append("text")
            .style("font-size", (d) => d.size + "px")
            .style("fill", "black")
            .attr("x", (d) => d.x + 250)
            .attr("y", (d) => d.y + 250)
            .attr("text-anchor", "middle")
            .text((d) => d.text);
    };

    const [startYears, setStartYears] = useState(0);
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
          data: ['DQ']
        },
        singleAxis: {
          top: 50,
          bottom: 50,
          axisTick: {},
          axisLabel: {},
          type: 'time',
          axisPointer: {
            animation: true,
            label: {
              show: true
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              opacity: 0.2
            }
          }
        },
        series: [
          {
            type: 'themeRiver',
            smooth:'true',
            emphasis: {
              itemStyle: {
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.8)'
              }
            },
            data: [
        ['2021/10/25',12950,'DQ'],
      ['2021/10/24',13050,'DQ'],
      ['2021/10/23',13150,'DQ'],
      ['2021/10/22',14800,'DQ'],
      ['2021/10/21',17650,'DQ'],
      ['2021/10/20',18125,'DQ'],
      ['2021/10/19',17150,'DQ'],
      ['2021/10/18',15000,'DQ'],
      ['2021/10/17',14975,'DQ'],
      ['2021/10/16',15050,'DQ'],
      ['2021/10/15',15100,'DQ'],
      ['2021/10/14',15100,'DQ'],
      ['2021/10/13',15175,'DQ'],
      ['2021/10/12',15200,'DQ'],
      ['2021/10/11',17175,'DQ'],
      ['2021/10/10',19375,'DQ'],
      ['2021/10/9',23825,'DQ'],
      ['2021/10/8',24100,'DQ'],
      ['2021/10/7',37425,'DQ'],
      ['2021/10/6',30875,'DQ'],
      ['2021/10/5',18000,'DQ'],
      ['2021/10/4',16500,'DQ'],
      ['2021/10/3',17250,'DQ'],
      ['2021/10/2',18250,'DQ'],
      ['2021/10/1',22500,'DQ'],
      ['2021/9/30',34500,'DQ'],
      ['2021/9/29',36750,'DQ'],
      ['2021/9/28',32125,'DQ'],
      ['2021/9/27',26075,'DQ'],
      ['2021/9/26',24475,'DQ'],
      ['2021/9/25',24375,'DQ'],
      ['2021/9/24',24275,'DQ'],
      ['2021/9/23',24200,'DQ'],
      ['2021/9/22',24200,'DQ'],
      ['2021/9/21',24375,'DQ'],
      ['2021/9/20',24750,'DQ'],
      ['2021/9/19',26325,'DQ'],
      ['2021/9/18',30400,'DQ'],
      ['2021/9/17',31125,'DQ'],
      ['2021/9/16',31500,'DQ'],
      ['2021/9/15',31725,'DQ'],
      ['2021/9/14',31550,'DQ'],
      ['2021/9/13',31025,'DQ'],
      ['2021/9/12',32325,'DQ'],
      ['2021/9/11',33200,'DQ'],
      ['2021/9/10',32950,'DQ'],
      ['2021/9/9',31750,'DQ'],
      ['2021/9/8',31000,'DQ'],
      ['2021/9/7',29475,'DQ'],
      ['2021/9/6',26950,'DQ'],
      ['2021/9/5',26475,'DQ'],
      ['2021/9/4',25450,'DQ'],
      ['2021/9/3',27025,'DQ'],
      ['2021/9/2',27375,'DQ'],
      ['2021/9/1',27525,'DQ'],
      ['2021/8/31',28975,'DQ'],
      ['2021/8/30',28975,'DQ'],
      ['2021/8/29',30100,'DQ'],
      ['2021/8/28',30625,'DQ'],
      ['2021/8/27',30225,'DQ'],
      ['2021/8/26',30925,'DQ'],
      ['2021/8/25',30275,'DQ'],
      ['2021/8/24',30650,'DQ'],
      ['2021/8/23',25600,'DQ'],
      ['2021/8/22',23000,'DQ'],
      ['2021/8/21',23175,'DQ'],
      ['2021/8/20',19650,'DQ'],
      ['2021/8/19',18407.5,'DQ'],
      ['2021/8/18',18175,'DQ'],
      ['2021/8/17',18350,'DQ'],
      ['2021/8/16',25100,'DQ'],
      ['2021/8/15',21525,'DQ'],
      ['2021/8/14',22000,'DQ'],
      ['2021/8/13',24700,'DQ'],
      ['2021/8/12',21800,'DQ'],
      ['2021/8/11',26675,'DQ'],
      ['2021/8/10',24100,'DQ'],
      ['2021/8/9',20150,'DQ'],
      ['2021/8/8',18150,'DQ'],
      ['2021/8/7',15300,'DQ'],
      ['2021/8/6',16775,'DQ'],
      ['2021/8/5',14250,'DQ'],
      ['2021/8/4',15275,'DQ'],
      ['2021/8/3',19800,'DQ'],
      ['2021/8/2',19075,'DQ'],
      ['2021/8/1',15450,'DQ'],
      ['2021/7/31',16175,'DQ'],
      ['2021/7/30',20575,'DQ'],
      ['2021/7/29',20575,'DQ'],
      ['2021/7/28',24300,'DQ'],
      ['2021/7/27',24775,'DQ'],
      ['2021/7/26',22300,'DQ'],
      ['2021/7/25',25225,'DQ'],
      ['2021/7/24',30050,'DQ'],
      ['2021/7/23',30400,'DQ'],
      ['2021/7/22',30425,'DQ'],
      ['2021/7/21',30675,'DQ'],
      ['2021/7/20',29925,'DQ'],
      ['2021/7/19',29800,'DQ'],
      ['2021/7/18',31150,'DQ'],
      ['2021/7/17',31075,'DQ'],
      ['2021/7/16',31125,'DQ'],
      ['2021/7/15',31800,'DQ'],
      ['2021/7/14',30725,'DQ'],
      ['2021/7/13',30425,'DQ'],
      ['2021/7/12',31000,'DQ'],
      ['2021/7/11',26900,'DQ'],
      ['2021/7/10',25125,'DQ'],
      ['2021/7/9',27550,'DQ'],
      ['2021/7/8',29425,'DQ'],
      ['2021/7/7',23025,'DQ'],
      ['2021/7/6',26025,'DQ'],
      ['2021/7/5',23700,'DQ'],
      ['2021/7/4',21875,'DQ'],
      ['2021/7/3',22550,'DQ'],
      ['2021/7/2',18200,'DQ'],
      ['2021/7/1',17600,'DQ'],
      ['2021/6/30',21300,'DQ'],
      ['2021/6/29',19500,'DQ'],
      ['2021/6/28',15050,'DQ'],
      ['2021/6/27',12650,'DQ'],
      ['2021/6/26',12545,'DQ'],
      ['2021/6/25',15125,'DQ'],
      ['2021/6/24',15300,'DQ'],
      ['2021/6/23',18550,'DQ'],
      ['2021/6/22',21925,'DQ'],
      ['2021/6/21',19750,'DQ'],
      ['2021/6/20',18450,'DQ'],
      ['2021/6/19',17800,'DQ'],
      ['2021/6/18',12647.5,'DQ'],
      ['2021/6/17',11165,'DQ'],
      ['2021/6/16',11102.5,'DQ'],
      ['2021/6/15',11077.5,'DQ'],
      ['2021/6/14',9365,'DQ'],
      ['2021/6/13',9385,'DQ'],
      ['2021/6/12',9437.5,'DQ'],
      ['2021/6/11',9652.5,'DQ'],
      ['2021/6/10',9652.5,'DQ'],
      ['2021/6/9',11395,'DQ'],
      ['2021/6/8',13650,'DQ'],
      ['2021/6/7',14050,'DQ'],
      ['2021/6/6',13072.5,'DQ'],
      ['2021/6/5',12925,'DQ'],
      ['2021/6/4',14425,'DQ'],
      ['2021/6/3',15900,'DQ'],
      ['2021/6/2',14550,'DQ'],
      ['2021/6/1',13300,'DQ'],
      ['2021/5/31',12775,'DQ'],
      ['2021/5/30',11577.5,'DQ'],
      ['2021/5/29',10120,'DQ'],
      ['2021/5/28',12085,'DQ'],
      ['2021/5/27',13800,'DQ'],
      ['2021/5/26',13650,'DQ'],
      ['2021/5/25',14700,'DQ'],
      ['2021/5/24',14475,'DQ'],
      ['2021/5/23',13800,'DQ'],
      ['2021/5/22',13675,'DQ'],
      ['2021/5/21',16000,'DQ'],
      ['2021/5/20',17425,'DQ'],
      ['2021/5/19',17800,'DQ'],
      ['2021/5/18',17025,'DQ'],
      ['2021/5/17',16625,'DQ'],
      ['2021/5/16',16375,'DQ'],
      ['2021/5/15',16225,'DQ'],
      ['2021/5/14',17125,'DQ'],
      ['2021/5/13',16450,'DQ'],
      ['2021/5/12',16325,'DQ'],
      ['2021/5/11',16025,'DQ'],
      ['2021/5/10',16100,'DQ'],
      ['2021/5/9',15775,'DQ'],
      ['2021/5/8',14975,'DQ'],
      ['2021/5/7',14200,'DQ'],
      ['2021/5/6',12517.5,'DQ'],
      ['2021/5/5',11337.5,'DQ'],
      ['2021/5/4',10587.5,'DQ'],
      ['2021/5/3',10672.5,'DQ'],
      ['2021/5/2',9335,'DQ'],
      ['2021/5/1',9330,'DQ'],
      ['2021/4/30',12375,'DQ'],
      ['2021/4/29',13750,'DQ'],
      ['2021/4/28',13675,'DQ'],
      ['2021/4/27',13575,'DQ'],
      ['2021/4/26',13550,'DQ'],
      ['2021/4/25',12475,'DQ'],
      ['2021/4/24',12100,'DQ'],
      ['2021/4/23',12125,'DQ'],
      ['2021/4/22',12022.5,'DQ'],
      ['2021/4/21',11812.5,'DQ'],
      ['2021/4/20',10655,'DQ'],
      ['2021/4/19',10260,'DQ'],
      ['2021/4/18',8397.5,'DQ'],
      ['2021/4/17',8397.5,'DQ'],
      ['2021/4/16',10615,'DQ'],
      ['2021/4/15',10617.5,'DQ'],
      ['2021/4/14',10612.5,'DQ'],
      ['2021/4/13',10602.5,'DQ'],
      ['2021/4/12',10527.5,'DQ'],
      ['2021/4/11',8787.5,'DQ'],
      ['2021/4/10',8790,'DQ'],
      ['2021/4/9',10525,'DQ'],
      ['2021/4/8',10527.5,'DQ'],
      ['2021/4/7',10497.5,'DQ'],
      ['2021/4/6',10465,'DQ'],
      ['2021/4/5',9950,'DQ'],
      ['2021/4/4',9897.5,'DQ'],
      ['2021/4/3',9865,'DQ'],
      ['2021/4/2',10312.5,'DQ'],
      ['2021/4/1',10312.5,'DQ'],
      ['2021/3/31',8227.5,'DQ'],
      ['2021/3/30',8195,'DQ'],
      ['2021/3/29',8177.5,'DQ'],
      ['2021/3/28',7970,'DQ'],
      ['2021/3/27',7920,'DQ'],
      ['2021/3/26',8147.5,'DQ'],
      ['2021/3/25',7980,'DQ'],
      ['2021/3/24',7980,'DQ'],
      ['2021/3/23',7465,'DQ'],
      ['2021/3/22',6582.5,'DQ'],
      ['2021/3/21',6537.5,'DQ'],
      ['2021/3/20',6582.5,'DQ'],
      ['2021/3/19',6600,'DQ'],
      ['2021/3/18',6637.5,'DQ'],
      ['2021/3/17',6630,'DQ'],
      ['2021/3/16',6617.5,'DQ'],
      ['2021/3/15',6582.5,'DQ'],
      ['2021/3/14',6412.5,'DQ'],
      ['2021/3/13',6400,'DQ'],
      ['2021/3/12',6640,'DQ'],
      ['2021/3/11',6582.5,'DQ'],
      ['2021/3/10',6567.5,'DQ'],
      ['2021/3/9',6592.5,'DQ'],
      ['2021/3/8',6627.5,'DQ'],
      ['2021/3/7',6380,'DQ'],
      ['2021/3/6',6355,'DQ'],
      ['2021/3/5',6487.5,'DQ'],
      ['2021/3/4',6517.5,'DQ'],
      ['2021/3/3',6542.5,'DQ'],
      ['2021/3/2',7277.5,'DQ'],
      ['2021/3/1',6362.5,'DQ'],
      ['2021/2/28',6370,'DQ'],
      ['2021/2/27',6345,'DQ'],
      ['2021/2/26',6945,'DQ'],
      ['2021/2/25',6945,'DQ'],
      ['2021/2/24',6947.5,'DQ'],
      ['2021/2/23',6970,'DQ'],
      ['2021/2/22',6915,'DQ'],
      ['2021/2/21',6910,'DQ'],
      ['2021/2/20',6935,'DQ'],
      ['2021/2/19',6922.5,'DQ'],
      ['2021/2/18',7020,'DQ'],
      ['2021/2/17',6985,'DQ'],
      ['2021/2/16',6950,'DQ'],
      ['2021/2/15',6965,'DQ'],
      ['2021/2/14',6957.5,'DQ'],
      ['2021/2/13',6957.5,'DQ'],
      ['2021/2/12',6945,'DQ'],
      ['2021/2/11',6947.5,'DQ'],
      ['2021/2/10',6947.5,'DQ'],
      ['2021/2/9',7077.5,'DQ'],
      ['2021/2/8',7027.5,'DQ'],
      ['2021/2/7',7015,'DQ'],
      ['2021/2/6',7000,'DQ'],
      ['2021/2/5',6995,'DQ'],
      ['2021/2/4',7005,'DQ'],
      ['2021/2/3',7002.5,'DQ'],
      ['2021/2/2',7012.5,'DQ'],
      ['2021/2/1',7010,'DQ'],
      ['2021/1/31',6995,'DQ'],
      ['2021/1/30',6975,'DQ'],
      ['2021/1/29',6987.5,'DQ'],
      ['2021/1/28',6990,'DQ'],
      ['2021/1/27',7000,'DQ'],
      ['2021/1/26',6992.5,'DQ'],
      ['2021/1/25',6985,'DQ'],
      ['2021/1/24',6987.5,'DQ'],
      ['2021/1/23',6990,'DQ'],
      ['2021/1/22',7287.5,'DQ'],
      ['2021/1/21',7247.5,'DQ'],
      ['2021/1/20',7532.5,'DQ'],
      ['2021/1/19',7955,'DQ'],
      ['2021/1/18',8642.5,'DQ'],
      ['2021/1/17',8622.5,'DQ'],
      ['2021/1/16',8597.5,'DQ'],
      ['2021/1/15',8620,'DQ'],
      ['2021/1/14',8632.5,'DQ'],
      ['2021/1/13',8972.5,'DQ'],
      ['2021/1/12',9397.5,'DQ'],
      ['2021/1/11',10217.5,'DQ'],
      ['2021/1/10',9225,'DQ'],
      ['2021/1/9',13075,'DQ'],
      ['2021/1/8',13007.5,'DQ'],
      ['2021/1/7',12945,'DQ'],
      ['2021/1/6',9555,'DQ'],
      ['2021/1/5',9035,'DQ'],
      ['2021/1/4',7547.5,'DQ'],
      ['2021/1/3',6712.5,'DQ'],
      ['2021/1/2',6715,'DQ'],
      ['2021/1/1',7230,'DQ'],           
            ]
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
                    const filteredData = data.filter((item) => item['博物馆'] === museumName);


                    // Split the keywords and count their occurrences
                    const keywords = filteredData.flatMap(item => item['Metadata_ZN']);
                    const keywordsEn = filteredData.flatMap(item => item['Metadata_EN']);
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
                        .map(([text, count]) => ({ text, size: count }))
                        .sort((a, b) => b.size - a.size)
                        .slice(0, 20);

                    const wordCloudDataEn = Object.entries(keywordCountsEn)
                        .map(([text, count]) => ({ text, size: count }))
                        .sort((a, b) => b.size - a.size)
                        .slice(0, 20);

                    // Get the maximum size from the keywordArray
                    const maxSize = wordCloudData[0].size;
                    const maxSizeEn = wordCloudDataEn[0].size;

                    // Scale the sizes of the keywords to fit the word cloud
                    const sizeScale = d3.scaleLinear().domain([0, maxSize]).range([10, 100]);
                    const sizeScaleEn = d3.scaleLinear().domain([0, maxSizeEn]).range([10, 100]);

                    // Update the size property of each keyword object
                    wordCloudData.forEach((keyword) => {
                        keyword.size = sizeScale(keyword.size);
                    });
                    wordCloudDataEn.forEach((keyword) => {
                        keyword.size = sizeScaleEn(keyword.size);
                    });

                    console.log('Word cloud data: ', wordCloudData);
                    console.log('Word cloud data en: ', wordCloudDataEn);

                    setWordCloudData(wordCloudData);
                    setWordCloudDataEn(wordCloudDataEn);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };

            fetchData();

            drawWordCloud();

        }

        else if (figureNo === 3) {
            const fetchData = async () => {
                try {
                    const response = await fetch("http://localhost:5000/get_data");
                    const data = await response.json();
                    const startYearsData = data.flatMap(item => item['起始年']);
                    console.log(startYearsData)
                    const yearCounts = startYearsData.reduce((accumulator, year) => {
                        accumulator[year] = (accumulator[year] || 0) + 1;
                        return accumulator;
                    },{})
                    console.log(yearCounts)
                    const startYears = Object.keys(yearCounts).map(year => {
                        return { year: parseInt(year), value: yearCounts[year] };
                      });
                    setStartYears(startYears)
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };
            fetchData();

        }
    }, [figureNo]);

    if (figureNo === 1) {
        return (
            <svg id="collection" width={1000} height={500} style={{margin: '30px'}}></svg>
        );
    }
    else if (figureNo === 2) {
        return (
            <div style={{ display: 'flex' }}>
                <svg id="word-cloud-zn" width={500} height={500}></svg>
                <svg id="word-cloud-en" width={500} height={500}></svg>
            </div>
        );
    }
    else if (figureNo === 3) {
        return(
            <div>
                <h3>生产年代</h3>
                <ReactEcharts option={option}/>
            </div>
        )
    }
}

export default Figures;