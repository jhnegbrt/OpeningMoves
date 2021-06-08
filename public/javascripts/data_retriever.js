const axios = require('axios');

async function query(queryString){

  // let token = "c23h2raad3ieeb1lcqf0"
  // let query = queryString.concat(`&from=${from}&to=${to}&token=${token}`)
  // let response = await axios.get(`/search?${query}`)


  let response = await axios.get(`/alphaVantage?${queryString}`)
  .then((response) => {
    return(response.data)
  })
  .catch(error => {
    return(error) 
  })
  return response
}

async function queryHelper(queryString, times){

  let results = []
  for(let i = 1; i <= times; i++){
    let month = i
    let year = 1
    if (i === 13){
      month = 1
      year = 2
    }
    let slice = `&slice=year${year}month${month}`
    let fullString = queryString.concat(slice)
    let queryResult = await query(fullString)
    results = results.concat(queryResult)
  }
  return results
}

export default async function retrieveData(ticker, dataRange) {
    
    let symbol = ticker
    let interval = "5min"
    let queryString = `&symbol=${symbol}&interval=${interval}`

    if (dataRange === "3m"){
      return queryHelper(queryString, 3)
    } else if (dataRange === "6m"){
      return queryHelper(queryString, 6)
    } else if (dataRange === "1y"){
      return queryHelper(queryString, 12)
    }    
  
}

