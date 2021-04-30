import submitForm from './submit_form'
import {renderModalClose,renderLoadingModal} from './components/loading_modal'  

document.addEventListener('DOMContentLoaded', loadPage)

function loadPage(){
  let form = document.querySelector("form")
  form.onsubmit = submitForm
}



