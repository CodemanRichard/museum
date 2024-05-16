import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as cloud from 'd3-cloud';

const Figures = ({ museumName, figureNo }) => {
    const [totalCount, setTotalCount] = useState(0);
    const [chinaCount, setChinaCount] = useState(0);

    const drawCollection = () => {
        // Select the SVG container
        const svg = d3.select("#collection");

        // Set up the scales for the bar chart

        const xScale = d3.scaleBand()
            .domain(['Total Count', 'China Count'])
            .range([0, 400])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, totalCount])
            .range([400, 0]);

        // Draw the bars
        svg.selectAll("rect")
            .data([totalCount, chinaCount])
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(i === 0 ? 'Total Count' : 'China Count'))
            .attr("y", (d) => yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => 400 - yScale(d))
            .attr("fill", (d, i) => i === 0 ? "blue" : "red");

        // Add labels to the bars
        svg.selectAll("text")
            .data([totalCount, chinaCount])
            .enter()
            .append("text")
            .attr("x", (d, i) => xScale(i === 0 ? 'Total Count' : 'China Count') + xScale.bandwidth() / 2)
            .attr("y", (d) => yScale(d) - 10)
            .attr("text-anchor", "middle")
            .text((d) => d);
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
}

export default Figures;