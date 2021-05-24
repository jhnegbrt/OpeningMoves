import retrieveData from './data_retriever'
import {convertData, filterData} from './data_handler'
import generateChartData from './generate_chart_data'
import createChart from './create_chart'
import createTabs from './components/create_tabs'
import {renderModalClose, renderLoadingModal} from './components/loading_modal'
import validateInput from './validate_input'

async function validInput(){

}

async function inValidInput(dataRange, ticker, percentChange){
  let modalInterval = await renderLoadingModal(dataRange, ticker)
  let data = await retrieveData(ticker, dataRange)
  let allCandles = convertData(data)
  let selectedCandles = filterData(allCandles, percentChange)
  let charts = generateChartData(selectedCandles, allCandles)
  createTabs(charts)

  let chartDataArray = []
  let chart = charts[0]
  for (const candle in chart){
    chartDataArray.push(chart[candle])
  }

  createChart(chartDataArray, ticker)

  renderModalClose(modalInterval)

}


export default async function submitForm(form){

  
  form.preventDefault()
  let ticker = form.target.ticker.value
  let percentChange = form.target.percentChange.value
  let dataRange = form.target.dataRange.value
  let timeFrame = form.target.timeFrame.value

  let validated = validateInput(ticker)

  if (validated){
    validInput(dataRange, ticker, percentChange)
  } else {
    inValidInput()
  }
   
}
