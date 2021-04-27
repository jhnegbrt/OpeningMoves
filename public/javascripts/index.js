const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {

    let symbol = "TSLA"
    let resolution = "60"
    let from = "1618712882"
    let to = "1619465282"
    let token = "c23h2raad3ieeb1lcqf0"
    
    let query = `symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${token}`
    axios.get(`/search?${query}`)
    .then((response) => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })

    let p = document.createElement("p")
    let text = document.createTextNode("This is our text change")
    p.appendChild(text)
    let element = document.getElementById("main")
    element.appendChild(p)

    let svgWidth = 500;
    let svgHeight = 300;

    let svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("class", "bar-chart")
    
    let dataset = [80, 100, 120, 180]
    let barPadding = 5
    let barWidth = (svgWidth / dataset.length)

    let barChart = svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append("rect")
      .attr("y", function(d) {
        return svgHeight - d
      })
      .attr("height", function(d){
        return d
      })
      .attr("width", barWidth - barPadding)  
      .attr("transform", function (d, i) {  
           var translate = [barWidth * i, 0];  
           return "translate("+ translate +")";  
      });
    
})