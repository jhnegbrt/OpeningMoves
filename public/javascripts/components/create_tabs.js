import createChart from '../create_chart'

export default function createTabs(charts){

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
  charts.forEach((chart, i) =>{
    let tab = document.createElement("li")
    tab.setAttribute("data-value", i)
    let text = document.createTextNode(Object.keys(chart)[0])
    tab.appendChild(text)
    tab.addEventListener("click", handleClick)
    chartTabs.appendChild(tab)
  })

}