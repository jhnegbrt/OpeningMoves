function removeCharts(){
  d3.select("#second").selectAll('.body').remove()
  d3.select("#second").selectAll('.wick').remove()
  d3.select("#second").selectAll('g').remove()
  d3.select("#second").selectAll('text').remove()
}


function removeO

export default function renderOverview(master){

  removeCharts()
  let overviewContainer = document.createElement("div")
  let ticker = document.createTextNode(master.ticker)
  let overviewHeader = document.createElement("h2")
  overviewHeader.appendChild(ticker)
  overviewContainer.appendChild(overviewHeader)
  overviewContainer.classList.add("charts-overview")
  let chartContainer = document.getElementById("chartContainer")
  chartContainer.appendChild(overviewContainer)

}