import {removeCharts, removeOverview, removeSelectedTab, removeInstructions} from "../util/remove"
import createDateString from '../util/date'

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

  let dates = Object.keys(master.mornings)
  let firstDay = dates[0]
  let lastDay = dates[dates.length-1]

  firstDay = createDateString(firstDay)
  lastDay = createDateString(lastDay)

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
  let volatilePercent = (Object.keys(master.charts).length/Object.keys(master.mornings).length * 100).toFixed(2)
  let string = `Of the ${Object.keys(master.mornings).length} trading days within your data range, ${master.ticker} moved 
  ${master.percentChange}% or more within the first ${master.timeFrame * 5} minutes of the stock market open ${Object.keys(master.charts).length} times (${volatilePercent}% of days).`
  let textNode = document.createTextNode(string)
  let element = document.createElement("h3")
  element.appendChild(textNode)
  overviewContainer.appendChild(element)
}

function addAverageExcursion(master, overviewContainer){

  let positiveCount = 0
  let negativeCount = 0

  let positiveExcursions = []
  let negativeExcursions = []

  let mornings = master.mornings
  for(const day in mornings){
    let open = mornings[day].open
    let positiveChange = ((mornings[day].high - open) / open) * 100
    let negativeChange = ((open - mornings[day].low) / open) * 100
    if (positiveChange >= parseInt(master.percentChange)){
      positiveExcursions.push(day)
      positiveCount += positiveChange
    }
    if (negativeChange >= parseInt(master.percentChange)){
      negativeExcursions.push(day)
      negativeCount += negativeChange
    }
  }

  if (negativeExcursions.length + positiveExcursions.length > 0){
    let aNExcursion = (negativeCount / negativeExcursions.length)
    let aPExcursion = (positiveCount / positiveExcursions.length)
    let avgExcursion = (((positiveCount + negativeCount)) / Object.keys(master.charts).length)
    
    let averageText = document.createTextNode(`The average 'Morning Move' across all ${Object.keys(master.charts).length} selected days was ${avgExcursion.toFixed(2)}%`)
    let positiveText = document.createTextNode(`The average 'Morning Move' when ${master.ticker} moved upward, across ${positiveExcursions.length} days was ${aPExcursion.toFixed(2)}%`)
    let negativeText = document.createTextNode(`The average 'Morning Move' when ${master.ticker} moved downward, across ${negativeExcursions.length} days was ${aNExcursion.toFixed(2)}%`)
    let average = document.createElement("li")
    average.appendChild(averageText)
    let negative = document.createElement("li")
    negative.appendChild(negativeText)
    let positive = document.createElement("li")
    positive.appendChild(positiveText)
    let averages = document.createElement("ul")
    averages.appendChild(average)
    averages.appendChild(positive)
    averages.appendChild(negative)
    overviewContainer.appendChild(averages)

  }
  
}

function addAverageDailyChange(){

}

function addData(master, overviewContainer){


  addSummary(master, overviewContainer)

  addAverageExcursion(master, overviewContainer)
  
  addAverageDailyChange()

}

export default function renderOverview(master){

  removeCharts()
  removeOverview()
  removeInstructions()
  removeSelectedTab()

  let overview = document.querySelector(".chart-tab")
  overview.classList.add("selected")

  let overviewContainer = document.createElement("div")
  overviewContainer.classList.add("charts-overview")
  
  addHeader(overviewContainer, master.ticker)

  addDate(master, overviewContainer)

  addData(master, overviewContainer)

  addClickTabInstructions(overviewContainer)

  let chartContainer = document.getElementById("chart-container")
  chartContainer.appendChild(overviewContainer)

}