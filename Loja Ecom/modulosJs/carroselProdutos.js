export default function carroselProdutos() {
  const dataprodutoslide = document.querySelector(".produto-item");
  const spansSlide = document.querySelectorAll(".navegacao-slide span")
  let slideIntervalo 
  let index = 0
  function slide(){
    index++
    if(index >= 4 ){
      index = 0
    }
      spansSlide.forEach(itemSpan =>{
        itemSpan.classList.remove("img-carrosel-index")
      })
      spansSlide[index].classList.add("img-carrosel-index")
      dataprodutoslide.style.transform = `translateX(${-index * 550}px)`
  }

  function slideAtivar(){
    slideIntervalo = setInterval(slide,2500)
  }

  function pararCarrosel(){
    clearInterval(slideIntervalo)
  }
  
  function reiniciar(){
    pararCarrosel()
    slideAtivar()
  }

  document.addEventListener("DOMContentLoaded",() =>{
    const dataProdutoSlideIntervalo = document.querySelector("[data-produto-slide-intervalo]")
    slideAtivar()
    dataProdutoSlideIntervalo.addEventListener("mouseover",pararCarrosel)
    dataProdutoSlideIntervalo.addEventListener("mouseout",reiniciar)
  })
}
