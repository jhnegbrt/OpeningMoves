import submitForm from './submit_form'
import {renderModalClose,renderLoadingModal} from './components/loading_modal'  
import renderInstructionsModal from './components/instructionsModal'

document.addEventListener('DOMContentLoaded', loadPage)

function loadPage(){
  renderInstructionsModal()
  let form = document.querySelector("form")
  form.onsubmit = submitForm
  // renderLoadingModal()
  // renderModalClose()
}



