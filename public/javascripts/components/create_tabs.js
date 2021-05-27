import createChart from '../create_chart'

function createOverviewTab(charts, chartTabs){
  d3.select("#second").selectAll('.body').remove()
  d3.select("#second").selectAll('.wick').remove()
  d3.select("#second").selectAll('g').remove()

  let tab = document.createElement("li")
  let overviewText = document.createTextNode("Overview")
  tab.appendChild(overviewText)
  chartTabs.appendChild(tab)
}

export default function createTabs(charts){

  let oldTabs = document.querySelectorAll(".chart-tab")
  oldTabs.forEach((oldTab) =>{
    return oldTab.parentElement.removeChild(oldTab)
  })

  function handleClick(e){
    let newChartDataArray = []
    let newChart = charts[parseInt(e.target.dataset.value)]
    for (const candle in newChart){
      newChartDataArray.push(newChart[candle])
    }
    d3.select("#second").selectAll('.body').remove()
    d3.select("#second").selectAll('.wick').remove()
    d3.select("#second").selectAll('g').remove()
    createChart(newChartDataArray)

  }

  let chartTabs = document.getElementById("chartTabs")

  createOverviewTab(charts, chartTabs)
  charts.forEach((chart, i) =>{
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

//what data do we want in the dashboard?
//how many days searched
//how many days we returned
// the date range
// the title of the stock
//  

[1, 2, 3]
[2, 3]