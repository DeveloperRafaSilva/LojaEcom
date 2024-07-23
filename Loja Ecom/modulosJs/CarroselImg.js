export default function carroselImg(){
  const idImg = document.getElementById("img")
  const img = document.querySelectorAll("#img img")
  const indexSpans = document.querySelectorAll(".index-spans span")
  let index = 1
  
  function proximaImagem(){
    index++
    if(index > img.length - 1){
       index =  0
    }
    indexSpans.forEach(itemSpan =>{
      itemSpan.classList.remove("img-carrosel-index")
    })
    indexSpans[index].classList.add("img-carrosel-index")
    idImg.style.transform = `translateX(${-index * 100}%)`
  }
  window.setInterval(proximaImagem,2000)
}