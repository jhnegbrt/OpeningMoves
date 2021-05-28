import {removeCharts, removeOverview} from "../util/remove"

function addClickTabInstructions(overviewContainer){
  let text = document.createTextNode("Use tabs on right to select individual days")
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

  let dateString = `From ${firstDay} to ${lastDay}`
  dateString = document.createTextNode(dateString)
  let date = document.createElement("h3")
  date.appendChild(dateString)
  overviewContainer.appendChild(date)

}

function addHeader(overviewContainer, ticker){

  ticker = document.createTextNode(ticker)
  let overviewHeader = document.createElement("h2")
  overviewHeader.appendChild(ticker)
  overviewContainer.appendChild(overviewHeader)

}

function addData(master, overviewContainer){

  let volatilePercent = (master.charts.length/master.openingCandles.length * 100).toFixed(2)

  

  debugger

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