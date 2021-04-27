import retrieveData from './data_retriever'
import {convertData, filterData} from './data_handler'

document.addEventListener('DOMContentLoaded', loadPage)

async function loadPage(){
  let data;
  data = await retrieveData()
      
  let candles = convertData(data)

  // let candles = {
  //   1615334400: "blah",
  //   1615420800: "blah",
  //   1615334400: "blah",
  //   1615334400: "blah",
  //   1615334400: "blah",
  // }
  let filteredCandles = filterData(candles)

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
    
}