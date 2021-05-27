import {removeCharts, removeOverview} from "../util/remove"

export default function renderOverview(master, firstRender){

  removeCharts()
  if (!firstRender){
    removeOverview()
  }
  let overviewContainer = document.createElement("div")
  let ticker = document.createTextNode(master.ticker)
  let overviewHeader = document.createElement("h2")
  overviewHeader.appendChild(ticker)
  overviewContainer.appendChild(overviewHeader)
  overviewContainer.classList.add("charts-overview")
  let chartContainer = document.getElementById("chartContainer")
  chartContainer.appendChild(overviewContainer)

}