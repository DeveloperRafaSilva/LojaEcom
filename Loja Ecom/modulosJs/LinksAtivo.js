export default function LinksAtivo(){
  const linksAtivo = document.querySelectorAll("[data-links-ativo]")
 function ativarLink(index){
  linksAtivo.forEach(itemClick =>{
    itemClick.classList.remove("link-ativo")
  })
  linksAtivo[index].classList.add("link-ativo")
 }
 linksAtivo.forEach((itemAtivar,index )=>{
  itemAtivar.addEventListener("click",() =>{
    ativarLink(index)
  })
 })

}