import submitForm from './submit_form'
import {renderModalClose,renderLoadingModal} from './components/loading_modal'  
import activateEnterButton from './components/instructions_modal'

document.addEventListener('DOMContentLoaded', loadPage)

function loadPage(){
  activateEnterButton()
  let form = document.querySelector("form")
  form.onsubmit = submitForm
  // renderLoadingModal()
  // renderModalClose()
}



