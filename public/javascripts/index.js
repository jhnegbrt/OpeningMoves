import retrieveData from './data_retriever'
import {convertData, filterData} from './data_handler'
import generateChartData from './generate_chart_data'
import createChart from './create_chart'

document.addEventListener('DOMContentLoaded', loadPage)

async function loadPage(){
  let data;
  data = await retrieveData()
  let allCandles = convertData(data)

  let selectedCandles = filterData(allCandles)

  let charts = generateChartData(selectedCandles, allCandles)

  let chart = []
  let chart1 = charts[4]
  let chartArray = []
  console.log(chart1)
  for(const candle in chart1){
    chartArray.push(chart1[candle])
  }

  createChart(chartArray)

    
}