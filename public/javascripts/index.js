import submitForm from './submit_form' 
import activateEnterButton from './components/instructions_modal'
import createInstructions from './components/create_instructions_tab'
const axios = require('axios');


document.addEventListener('DOMContentLoaded', loadPage)

async function loadPage(){
  activateEnterButton()
  let form = document.querySelector("form")
  form.onsubmit = submitForm
  createInstructions()
  let symbols = await axios.get('/symbols')
  window.symbols = {}
  symbols.data.forEach(symbol =>{
    return window.symbols[symbol.displaySymbol] = true
  })
}



