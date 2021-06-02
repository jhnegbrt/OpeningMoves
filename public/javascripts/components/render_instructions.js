import {removeCharts, removeOverview, removeInstructions} from "../util/remove"

export default function renderInstructions(){

  let directionsList = [
    "Input the Ticker representation of a stock or index you are interested in exploring: e.g., TSLA (Tesla Inc.).",
    "Then, enter a minimum percent-change you are interested in and a timeframe across which you believe this percent change may appear.",
    "For example, if you are interested in all of the days that a certain stock moved more than 1.4% within the first 10 minutes, enter '1.4' for % change, and select 10 minutes.",
    "Finally, enter the date range from which you are interested in retreiving data.",
    "OpeningMoves will then display the daily-chart for each day that meets your selection criterion. Use the tabs on the right to toggle between charts"
  ]


  removeCharts()
  removeOverview()
  removeInstructions()

  let instructionsContainer = document.createElement("div")
  instructionsContainer.classList.add("charts-instructions")
  let headerText = document.createTextNode("Instructions")
  let header = document.createElement("h2")
  header.appendChild(headerText)
  instructionsContainer.appendChild(header)
  let chartContainer = document.getElementById("chart-container")
  let list = document.createElement("ol")
  directionsList.forEach(item =>{
    let text = document.createTextNode(item)
    let listItem = document.createElement("li")
    listItem.appendChild(text)
    list.appendChild(listItem)
  })
  instructionsContainer.appendChild(list)
  chartContainer.appendChild(instructionsContainer)

}

