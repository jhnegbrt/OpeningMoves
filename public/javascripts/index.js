import retrieveData from './data_retriever'
import {convertData, filterData} from './data_handler'
import createCharts from './create_charts'
import { getChartMax, getChartMin } from './chart_util'

document.addEventListener('DOMContentLoaded', loadPage)

async function loadPage(){
  let data;
  data = await retrieveData()
      
  let allCandles = convertData(data)

  let selectedCandles = filterData(allCandles)

  let charts = createCharts(selectedCandles, allCandles)

  let chart = []
  let chart1 = charts[7]
  let chartArray = []
  for(const candle in chart1){
    chartArray.push(chart1[candle])
  }

  let chartMax = getChartMax(chartArray)
  let chartMin = getChartMin(chartArray)

  console.log(chartMax, chartMin)

  const xScale = d3
    .scaleBand()
    .domain(chartArray.map((dataPoint) => dataPoint.t))
    .rangeRound([0, 500])
    .padding(0.1)

  const yScale = d3
    .scaleLinear()
    .domain([0, chartMax])
    .range([300, 0]);

  const container = d3.select('#second')
    .style('border', '1px solid blue')
    .classed('container', true)

  const candles = container
    .selectAll('.candle')
    .data(chartArray)
    .enter()
    .append('rect')
    .classed('candle', true)
    .style('fill', 'red')
    .attr('width', xScale.bandwidth())
    .attr('height', data => yScale(data.h - data.l))
    .attr('x', data => xScale(data.t))
    // .attr('y', data => yScale(data.h - data.l))
    .attr('y', 0)



  let svgWidth = 250;
  let svgHeight = 300;

  let svg = d3.select('#first')
    .classed('container', true)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "bar-chart")
  
  let dataset = [80, 100, 120, 180]
  let barPadding = 5
  let barWidth = (svgWidth / dataset.length)

  let barChart = svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function(d) {
      return svgHeight - d
    })
    .attr("height", function(d){
      return d
    })
    .attr("width", barWidth - barPadding)  
    .attr("transform", function (d, i) {  
          var translate = [barWidth * i, 0];  
          return "translate("+ translate +")";  
    });
    
}