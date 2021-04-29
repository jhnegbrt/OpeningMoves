import retrieveData from './data_retriever'
import {convertData, filterData} from './data_handler'
import generateChartData from './generate_chart_data'
import createChart from './create_chart'
import createTabs from './components/create_tabs'


export default async function submitForm(form){

  debugger

  let ticker = form.target.ticker.value
  let percentChange = form.target.percentChange.value
  let dataRange = form.target.dataRange.value
  let timeFrame = form.target.timeFrame.value

  let data;
  data = await retrieveData(ticker, timeFrame)
  let allCandles = convertData(data)

  // percentChange, dataRange, 

  let selectedCandles = filterData(allCandles)

  let charts = generateChartData(selectedCandles, allCandles)

  createTabs(charts)

  
  let chartDataArray = []
  let chart = charts[0]
  for (const candle in chart){
    chartDataArray.push(chart[candle])
  }

  createChart(chartDataArray)
  

}
