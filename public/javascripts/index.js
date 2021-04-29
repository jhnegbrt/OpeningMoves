import submitForm from './submit_form'

document.addEventListener('DOMContentLoaded', loadPage)

function loadPage(){
  let form = document.querySelector("form")
  form.onsubmit = submitForm
}




// let seconds;
// if (timeFrame === "3m"){
//   seonds = 7890000
// } else if (timeFrame === "6m"){
//   seconds = 15780000
// } else if (timeFrame === "1y"){
//   seconds = 31536000
// } else if (timeFrame === "5y"){
//   seconds = 157680000
// }
// let symbol = ticker
// let resolution = "5"
// let to = String(Math.floor(Date.now() / 1000))
// let from = String(Math.floor(Date.now() / 1000)-seconds)
// let token = "c23h2raad3ieeb1lcqf0"

let query = `symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${token}`
let response = await axios.get(`/search?${query}`)
.then((response) => {
  return(response.data)
})
.catch(error => {
  return(error) 
})

return response


