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

function addAverageExcursion(master, overviewContainer){

  let positiveCount = 0
  let negativeCount = 0

  let positiveExcursions = []
  let negativeExcursions = []

  
  master.selectedCandles.forEach(day =>{
    let array = Object.values(day)[0]
    let positiveChange = ((array[1] - array[0]) / array[0]) * 100
    let negativeChange = ((array[0] - array[2]) / array[0]) * 100
    if (positiveChange >= parseInt(master.percentChange)){
      positiveExcursions.push(array)
      positiveCount += (positiveChange / array[0]) * 100
    }
    if (negativeChange >= parseInt(master.percentChange)){
      negativeExcursions.push(array)
      negativeCount += (negativeChange / array[0]) * 100
    }
  })

  let aNExcursion = (negativeCount / negativeExcursions.length) * 100
  let aPExcursion = (positiveCount / positiveExcursions.length) * 100
  let avgExcursion = (((positiveCount + negativeCount)) / master.selectedCandles.length) * 100
  
  let averageText = document.createTextNode(`The average 'Morning Move' across all ${master.selectedCandles.length} selected days was ${avgExcursion.toFixed(2)}%`)
  let positiveText = document.createTextNode(`The average 'Morning Move' when ${master.ticker} moved upward, across ${positiveExcursions.length} days was ${aPExcursion.toFixed(2)}%`)
  let negativeText = document.createTextNode(`The average 'Morning Move' when ${master.ticker} moved downward, across ${negativeExcursions.length} days was ${aNExcursion.toFixed(2)}%`)
  let average = document.createElement("p").appendChild(averageText)
  let negative = document.createElement("p").appendChild(negativeText)
  let positive = document.createElement("p").appendChild(positiveText)
  overviewContainer.appendChild(average)
  overviewContainer.appendChild(positive)
  overviewContainer.appendChild(negative)
  
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
  
  let overviewContainer = document.createElement("div")
  overviewContainer.classList.add("charts-overview")
  
  addHeader(overviewContainer, master.ticker)

  addDate(master, overviewContainer)

  addData(master, overviewContainer)

  addClickTabInstructions(overviewContainer)

  let chartContainer = document.getElementById("chartContainer")
  chartContainer.appendChild(overviewContainer)

}