import createChart from '../create_chart'
import renderOverview from './render_overview'

function createOverviewTab(master, chartTabs){

  let tab = document.createElement("li")
  tab.classList.add("chart-tab")
  let overviewText = document.createTextNode("Overview")
  tab.appendChild(overviewText)
  tab.addEventListener("click", ()=>renderOverview(master))
  chartTabs.appendChild(tab)
}

export default function createTabs(master){

  let oldTabs = document.querySelectorAll(".chart-tab")
  oldTabs.forEach((oldTab) =>{
    return oldTab.parentElement.removeChild(oldTab)
  })

  function handleClick(e){
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
  master.charts.forEach((chart, i) =>{
    let tab = document.createElement("li")
    tab.setAttribute("data-value", i)
    let unix = parseInt(Object.keys(chart)[0])
    let date = new Date(unix * 1000)
    let dateString = String(date.getMonth() + 1) + "/" + String(date.getDate()) + "/" + String(date.getFullYear())
    let dateNode = document.createTextNode(dateString)
    tab.appendChild(dateNode)
    tab.addEventListener("click", handleClick)
    tab.classList.add("chart-tab")
    chartTabs.appendChild(tab)
  })



  

}
