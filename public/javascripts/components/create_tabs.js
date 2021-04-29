export default function createTabs(charts){

  let chartTabs = document.getElementById("chartTabs")
  charts.forEach((chart, i) =>{
    let tab = document.createElement("li")
    tab.setAttribute("data-value", i)
    let text = document.createTextNode(Object.keys(chart)[0])
    tab.appendChild(text)
    chartTabs.appendChild(tab)
  })

}