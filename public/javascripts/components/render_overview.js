import {removeCharts, removeOverview} from "../util/remove"

function addClickTabInstructions(overviewContainer){
  let text = document.createTextNode("Use tabs on right to view these charts")
  let element = document.createElement("p")
  element.appendChild(text)
  overviewContainer.appendChild(element)
}

function addDate(master, overviewContainer){

  let months = ["January", "February", "March", "April", "May", "June", "July", "August",
  "September", "October", "November", "December"]

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  let firstDay = master.openingCandles[0][0][0]
  let lastDay = master.openingCandles[master.openingCandles.length-1][0][0]

  firstDay = `${days[firstDay.getDay()]}, ${months[firstDay.getMonth()]} ${firstDay.getDate()}, ${firstDay.getFullYear()}`
  lastDay = `${days[lastDay.getDay()]}, ${months[lastDay.getMonth()]} ${lastDay.getDate()}, ${lastDay.getFullYear()}`

  let dateString = `${master.ticker}: ${firstDay} to ${lastDay}`
  dateString = document.createTextNode(dateString)
  let date = document.createElement("h3")
  date.appendChild(dateString)
  overviewContainer.appendChild(date)

}

function addHeader(overviewContainer){

  let overview = document.createTextNode('Overview')
  let overviewHeader = document.createElement("h2")
  overviewHeader.appendChild(overview)
  overviewContainer.appendChild(overviewHeader)

}

function addSummary(master, overviewContainer){
  let volatilePercent = (master.charts.length/master.openingCandles.length * 100).toFixed(2)
  let string = `Of the ${master.openingCandles.length} trading days within your data range, ${master.ticker} moved 
  ${master.percentChange}% or more within the first ${master.timeFrame * 5} minutes of the stock market open ${master.charts.length} times (${volatilePercent}% of days).`
  let textNode = document.createTextNode(string)
  let element = document.createElement("h3")
  element.appendChild(textNode)
  overviewContainer.appendChild(element)
}

function addData(master, overviewContainer){

  debugger

  addSummary(master, overviewContainer)


}

export default function renderOverview(master){

  removeCharts()
  removeOverview()
  
  let overviewContainer = document.createElement("div")
  overviewContainer.classList.add("charts-overview")
  
  addHeader(overviewContainer, master.ticker)

  addDate(master, overviewContainer)

  addData(master, overviewContainer)

  addClickTabInstructions(overviewContainer)

  let chartContainer = document.getElementById("chartContainer")
  chartContainer.appendChild(overviewContainer)

}