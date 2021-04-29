import retrieveData from './data_retriever'
import {convertData, filterData} from './data_handler'
import generateChartData from './generate_chart_data'
import createChart from './create_chart'
import createTabs from './components/create_tabs'
import { getChartMax, getChartMin } from './chart_util'

document.addEventListener('DOMContentLoaded', loadPage)

async function loadPage(){
  let data;
  data = await retrieveData()
  let allCandles = convertData(data)

  let selectedCandles = filterData(allCandles)

  let charts = generateChartData(selectedCandles, allCandles)

  createTabs(charts)

  
  let chartDataArray = []
  let chart = charts[0]
  for (const candle in chart){
    chartDataArray.push(chart[candle])
  }

  createChart(chartDataArray)

  // let newChartDataArray = []
  // let newChart = charts[4]
  // for (const candle in newChart){
  //   newChartDataArray.push(newChart[candle])
  // }

  // setTimeout(newfunc, 15000)

  // function newfunc(){

  //   let chartMax = getChartMax(chartDataArray)
  //   let chartMin = getChartMin(chartDataArray)

  //   const yScale = d3
  //   .scaleLinear()
  //   .domain([0, chartMax-chartMin])
  //   .range([0, 300]);

  //   const xScale = d3
  //   .scaleBand()
  //   .domain(chartDataArray.map((dataPoint) => dataPoint.t))
  //   .rangeRound([0, 500])
  //   .padding(0.1)

  //   console.log("CALLING")
    
      
  //     // .data(newChartDataArray)
  //     // .exit().remove()
  //     // 
  //     // .enter()
  //     // .append('rect')
  //     // .attr('height', data => yScale(data.h - data.l))
  //     // .attr('x', data => xScale(data.t))
  //     // .attr('y', data => yScale(chartMax - data.h))
      
  //   createChart(newChartDataArray)
  // }

  

}
