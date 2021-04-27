const axios = require('axios');

async function retrieveData() {

    let symbol = "TSLA"
    let resolution = "60"
    let from = "1618712882"
    let to = "1619465282"
    let token = "c23h2raad3ieeb1lcqf0"
    
    let query = `symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${token}`
    let response = await axios.get(`/search?${query}`)
    .then((response) => {
      return(response.data)
    })
    .catch(error => {
      return(error) 
    })

    // console.log(response)

    return response

}

export default retrieveData