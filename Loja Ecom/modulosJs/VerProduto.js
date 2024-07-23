import pegarProdutosLocalStorage from "../pages/shop/ProdutoPaginaDetalhes/fetchProdutosLocalStorage.js"
export default async function produtoBtnVer(btnVer){
  const btnClick = btnVer
  const response = await fetch("../ProdutosApi/Produtos.json")
  const dados = await response.json()

  btnClick.forEach((itemClick,index) =>{
    itemClick.addEventListener("click",(event) =>{
      window.location.href = "../../pages/shop/ProdutoPaginaDetalhes/paginaProduto.html"
      event.preventDefault()
      const produtoClicado = dados[index]
      const colocar = window.localStorage.setItem("dadosProduto",JSON.stringify(produtoClicado))
      pegarProdutosLocalStorage(colocar)
    })
  })

}