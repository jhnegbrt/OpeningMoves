export default function createDateString(date){
  let yr = date.slice(0, 4)
  let month = parseInt(date.slice(5, 7))
  let day = parseInt(date.slice(8, 10))
  return month + "/" + day + "/" + yr
}