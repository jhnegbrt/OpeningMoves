import retrieveData from './data_retriever'
import {convertData, filterData} from './data_handler'
import generateChartData from './generate_chart_data'
import createChart from './create_chart'
import createTabs from './components/create_tabs'

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

  let newChartDataArray = []
  let newChart = charts[4]
  for (const candle in newChart){
    newChartDataArray.push(newChart[candle])
  }

  setTimeout(newfunc, 15000)

  function newfunc(){
    console.log("CALLING")
    createChart(newChartDataArray)
  }

}
