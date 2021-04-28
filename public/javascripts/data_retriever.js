const axios = require('axios');

async function retrieveData() {

    let symbol = "TSLA"
    let resolution = "5"
    let from = "1612166400"
    let to = "1614499200"
    let token = "c23h2raad3ieeb1lcqf0"
    
    let query = `symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${token}`
    let response = await axios.get(`/search?${query}`)
    .then((response) => {
      return(response.data)
    })
    .catch(error => {
      return(error) 
    })

    return response

}

export default retrieveData


///////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//alphvantage////////////////////////


    // let symbol = "TSLA"
    // let interval = "60min"
    // let response = {};
    // for(let i = 1; i < 13; i++){
    //   let query = `symbol=${symbol}&interval=${interval}&index=${i}`
    //   let slice = await axios.get(`/search?${query}`)
    //   .then((response) => {
    //     return(response.data)
    //   })
    //   .catch(error => {
    //     return(error) 
    //   })
    //   response = Object.assign({}, response, slice)
    // }
    // console.log(response)
    // return response