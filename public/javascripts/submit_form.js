import retrieveData from './data_retriever'
import {cleanData, filterData} from './data_handler'
import generateChartData from './generate_chart_data'
import createChart from './create_chart'
import createTabs from './components/create_tabs'
import {renderModalClose, renderLoadingModal} from './components/loading_modal'
import validateInput from './validate_input'
import renderOverview from './components/render_overview'

async function inValidInput(errors){

  errors = errors.map((el)=>{
    let errorText = document.createTextNode(el)
    let error = document.createElement("li")
    error.appendChild(errorText)
    return error
  })
  let form = document.getElementById("data-range")
  let errorList = document.createElement("ul")
  errors.forEach((error)=>{
    return errorList.appendChild(error)
  })
  errorList.classList.add("errors-list")
  form.insertAdjacentElement("afterend", errorList)

}

async function validInput(dataRange, ticker, percentChange, timeFrame){
  let modalInterval = await renderLoadingModal(dataRange, ticker)
  let data = await retrieveData(ticker, dataRange)
  let filteredData = filterData(data, percentChange, timeFrame)
  let mornings = filteredData.mornings
  let volatileMornings = filteredData.volatileMornings
  let charts = generateChartData(volatileMornings, data)
  let master = {charts, ticker, percentChange, timeFrame, mornings, volatileMornings}
  debugger
  createTabs(master)
  renderOverview(master)
  renderModalClose(modalInterval)

}

function clearErrors(){
  let errors = Array.from(document.getElementsByClassName("errors-list"))
  errors.forEach(error =>{
    return error.remove()
  })
}


export default async function submitForm(form){

  
  form.preventDefault()
  let ticker = form.target.ticker.value
  let percentChange = parseInt(form.target.percentChange.value)
  let dataRange = form.target.dataRange.value
  let timeFrame = parseInt(form.target.timeFrame.value) / 5
  clearErrors()
  let {valid, errors} = validateInput(ticker, percentChange)

  if (valid){
    validInput(dataRange, ticker, percentChange, timeFrame)
  } else {
    inValidInput(errors)
  }
   
}
