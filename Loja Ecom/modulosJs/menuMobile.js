export default function menuMobile(){
  const modalLinksNav = document.querySelector("[data-modal-links]")
  const containerMenuMobile = document.querySelector("[data-menu-mobile]")

  containerMenuMobile.addEventListener("click", (event) =>{
    modalLinksNav.classList.toggle("onMenuMobile")
    containerMenuMobile.classList.toggle("close")
    console.log(event)
    event.stopPropagation()
  })

  document.addEventListener("click",(event) =>{
    if(!modalLinksNav.contains(event.target) && event.target !== containerMenuMobile ){
      containerMenuMobile.classList.remove("close")
      modalLinksNav.classList.remove("onMenuMobile")
    }
  })

}