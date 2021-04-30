import retrieveData from './data_retriever'
import {convertData, filterData} from './data_handler'
import generateChartData from './generate_chart_data'
import createChart from './create_chart'
import createTabs from './components/create_tabs'
import {removeLoadingModal, renderLoadingModal} from './components/loading_modal'


export default async function submitForm(form){

  
  form.preventDefault()
  let ticker = form.target.ticker.value
  let percentChange = form.target.percentChange.value
  let dataRange = form.target.dataRange.value
  let timeFrame = form.target.timeFrame.value
   
  renderLoadingModal(dataRange, ticker)

  let data;
 
  data = await retrieveData(ticker, dataRange)

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

  // removeLoadingModal()
  

}
