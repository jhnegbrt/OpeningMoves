import {removeCharts, removeOverview, removeInstructions} from "../util/remove"

export default function renderInstructions(){

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
  chartContainer.appendChild(instructionsContainer)

}