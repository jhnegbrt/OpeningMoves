export default function validateInput(ticker, percent){
  debugger
  let validated = true
  let errors = []
  if (window.symbols[ticker] === undefined){
    validated = false
    errors.push("Please enter a valid ticker!")
  }

  if ((/^[\d]*(\.[\d]+)?$/).test(percent) === false){
    validated = false
    errors.push("Please enter a valid percentage, excluding '%'")
  }
  return {valid: validated, errors: errors}

}