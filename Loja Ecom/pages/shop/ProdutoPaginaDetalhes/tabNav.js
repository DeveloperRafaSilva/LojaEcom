export default function tabNav(){
  const dataTituloDescricao = document.querySelectorAll("[data-titulo-descricao]")
  const dataConteudo = document.querySelectorAll("[data-conteudo]")

  
  function tabNav(index){
    dataConteudo.forEach(itemAddClass =>{
      itemAddClass.classList.remove("on")
    })
    dataConteudo[index].classList.add("on")
  }
  dataTituloDescricao.forEach((itemClick,index) =>{
      itemClick.addEventListener("click",()=>{
        console.log(index)
        tabNav(index)
      })
    })

}