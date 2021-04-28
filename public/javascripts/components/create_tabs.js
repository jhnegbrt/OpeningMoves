export default function createTabs(charts){

  let chartTabs = document.getElementById("chartTabs")
  charts.forEach((chart, ) =>{
    let tab = document.createElement("li")
    let text = document.createTextNode(Object.keys(chart)[0])
    tab.appendChild(text)
    chartTabs.appendChild(tab)
  })

}