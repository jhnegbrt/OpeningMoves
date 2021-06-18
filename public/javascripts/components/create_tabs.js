import createChart from '../create_chart'
import renderOverview from './render_overview'
import {removeSelectedTab} from '../util/remove'

function createOverviewTab(master, chartTabs){

  let tab = document.createElement("li")
  tab.classList.add("chart-tab")
  let overviewText = document.createTextNode("Overview")
  tab.appendChild(overviewText)
  tab.addEventListener("click", ()=>renderOverview(master))
  chartTabs.appendChild(tab)
}

function createDateString(date){
  let yr = date.slice(0, 4)
  let month = parseInt(date.slice(5, 7))
  let day = parseInt(date.slice(8, 10))
  return month + "/" + day + "/" + yr
}

export default function createTabs(master){

  //removes tabs from previous query
  let oldTabs = document.querySelectorAll(".chart-tab")
  oldTabs.forEach((oldTab) =>{
    return oldTab.parentElement.removeChild(oldTab)
  })

  function handleClick(e){

    removeSelectedTab()
    e.target.classList.add("selected")

    let newChartDataArray = []
    let newChart = master.charts[parseInt(e.target.dataset.value)]
    for (const candle in newChart){
      newChartDataArray.push(newChart[candle])
    }
    d3.select("#second").selectAll('.body').remove()
    d3.select("#second").selectAll('.wick').remove()
    d3.select("#second").selectAll('g').remove()
    createChart(newChartDataArray, master.ticker)

  }

  let chartTabs = document.getElementById("chart-tabs")

  createOverviewTab(master, chartTabs)
  Object.keys(master.charts).forEach((date, i) =>{
    let tab = document.createElement("li")
    tab.setAttribute("data-value", i)
    let dateString = createDateString(date)
    let dateNode = document.createTextNode(dateString)
    tab.appendChild(dateNode)
    tab.addEventListener("click", handleClick)
    tab.classList.add("chart-tab")
    chartTabs.appendChild(tab)
  })

}
