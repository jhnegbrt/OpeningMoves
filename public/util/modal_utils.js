const axios = require('axios');

export async function getNews(ticker){


  let token = "c23h2raad3ieeb1lcqf0"
  let to = createDateString(Date.now())
  let from = createDateString(Date.now() - 604800000)
  let query = `&symbol=${ticker}&from=${from}&to=${to}&token=${token}`
  let news = await axios.get(`/news?${query}`)
  return news

}

export function renderNews(newsBits){
  debugger
  let newsContainer = document.createElement("div")
  newsContainer.setAttribute("id", "news-container")
  let modal = document.getElementsByClassName("loading-modal")[0]
  modal.appendChild(newsContainer)
  let i = 0;
  switchNews(newsBits, i)
  setInterval(function(){
    if (i > 3){
      i = 0
    } else if (i < 4){
      i++
    }
    switchNews(newsBits, i)
  },2500)
}


function switchNews(newsBits, i){
  debugger
  let oldNews = document.getElementsByClassName("news-snippet")
  if (oldNews.length > 0){
    oldNews[0].parentElement.removeChild(oldNews[0])
  }
  let newsImg = document.createElement("img")
  newsImg.setAttribute("src", newsBits[i].image)
  newsImg.classList.add("news-image")
  let newsBlock = document.createElement("div")
  let news = document.createElement("p")
  let newsText = document.createTextNode(newsBits[i].headline)
  newsBlock.classList.add("news-snippet")
  news.appendChild(newsText)
  newsBlock.appendChild(newsImg)
  newsBlock.appendChild(news)
  let newsContainer = document.getElementById("news-container")
  newsContainer.appendChild(newsBlock)
}

export function createDateString(unix){

  let date = new Date(unix)
  let yyyy = date.getFullYear()
  let mm = ('0' + (date.getMonth() + 1)).slice(-2)
  let dd = ('0' + date.getDate()).slice(-2)
  return yyyy + "-" + mm + "-" + dd

}