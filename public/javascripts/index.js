import retrieveData from './data_retriever'
import {convertData, filterData} from './data_handler'
import createCharts from './create_charts'

document.addEventListener('DOMContentLoaded', loadPage)

async function loadPage(){
  let data;
  data = await retrieveData()
      
  let allCandles = convertData(data)

  let selectedCandles = filterData(allCandles)

  let charts = createCharts(selectedCandles, allCandles)

  let chart = []
  let chart1 = charts[0]
  let chartArray = []
  for(const candle in chart1){
    chartArray.push(chart1[candle])
  }
  console.log(chartArray)

  

  const container = d3.select('#second')
    .style('border', '1px solid blue')
    .classed('container', true)

  const candles = container
    .selectAll('.candle')
    .data(chartArray)


  let svgWidth = 250;
  let svgHeight = 300;

  let svg = d3.select('#first')
    .classed('container', true)
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