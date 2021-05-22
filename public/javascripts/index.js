import submitForm from './submit_form'
import {renderModalClose,renderLoadingModal} from './components/loading_modal'  
import activateEnterButton from './components/instructions_modal'
const axios = require('axios');


document.addEventListener('DOMContentLoaded', loadPage)

async function loadPage(){
  activateEnterButton()
  let form = document.querySelector("form")
  form.onsubmit = submitForm

  let symbols = await axios.get('/symbols')
  window.symbols = {}
  symbols.data.forEach(symbol =>{
    return window.symbols[symbol.displaySymbol] = true
  })
}



