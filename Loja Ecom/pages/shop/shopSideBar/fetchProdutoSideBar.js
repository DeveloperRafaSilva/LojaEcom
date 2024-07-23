import carrinhoDeCompras from "../../../modulosJs/CarrinhoDeCompras.js"
import formatarMoeda from "../../../modulosJs/formatarMoeda.js"
export default async function produtosSideBar(){
  const response = await fetch("../../../ProdutosApi/ProdutoSideBar.json")
  const dados = await response.json()
  const dataPreco = document.querySelectorAll("[data-preco]")
  const dataCashback = document.querySelectorAll("[data-cashback]")
  const dataAvaliacao = document.querySelectorAll("[data-avaliacao]")
  const appendProdutosSidebar = document.querySelector("[append-produtos-sidebar]")
const arrayDosProdutosAdicionados = []

  function  pegarProdutosFiltardos(produtos){
    appendProdutosSidebar.innerHTML = ""
    produtos.forEach((item,index) =>{
      const criarDiv = document.createElement("div")
      criarDiv.innerHTML =  `
      <div class="produtos-users">
        <div class="imagem-produto-usuario">
          <img src="../../../${item.src[0]}" alt="produto usuario" />
        </div>
        <div>
          <div class="nome-produto-user">
            <p>${item.nome}</p>
          </div>
          <div class="moeda-color flex-item">
            <p>${formatarMoeda(item.preco)}</p>
            <p class="flex-item" data-produtos-avaliacao></P>
          </div>
          <div class="flex-item descricao">
            <p>${item.descricao}</p>
          </div>
          <div class="flex-item icones-usuario">
            <img data-carrinho-add="${index}" src="../../../src/imagens/iconesProdutosHover/cartIcone.svg" alt="carrinho de compras icone" />
            <img src="../../../src/imagens/iconesProdutosHover/IconeSeacrh.svg" alt="carrinho de compras icone" />
            <img src="../../../src/imagens/iconesProdutosHover/WhislistIcone.svg" alt="carrinho de compras icone" />
          </div>
        </div>
      </div>
    `
    appendProdutosSidebar.appendChild(criarDiv)
  })
  const carrinhoAddicone = document.querySelectorAll(`[data-carrinho-add]`)
  carrinhoAddicone.forEach((itemClick,index) =>{
    itemClick.addEventListener("click",()=>{
      ativarFuncao(produtos[index])
    })
  })
  }
  function ativarFuncao(produtoClicado){
    const produtoAtual = produtoClicado
    const verificarSeJaTem = arrayDosProdutosAdicionados.find(item => item.nome === produtoAtual.nome)
    if(verificarSeJaTem){
      verificarSeJaTem.quantidade++
    }else{
      produtoAtual.quatidade = 1
      arrayDosProdutosAdicionados.push(produtoAtual)
    }
    localStorage.setItem("itemCarrinho",JSON.stringify(arrayDosProdutosAdicionados))
    carrinhoDeCompras()
  }


  dataPreco.forEach(itemClick =>{
    let filtrarPrecoProdutos = []
    filtrarPrecoProdutos = dados.filter(item => item.preco > 0 && item.preco <= 150)       
    itemClick.addEventListener("click",()=>{
      const dataPreco = itemClick.getAttribute("data-preco")
      if(dataPreco === "150"){
         filtrarPrecoProdutos = dados.filter(item => item.preco > 0 && item.preco <= 150)       
      }else if(dataPreco === "350"){
         filtrarPrecoProdutos = dados.filter(item => item.preco > 150 && item.preco <= 350)       
      }else{
         filtrarPrecoProdutos = dados.filter(item => item.preco > 350 && item.preco <= 500)       
      }
      pegarProdutosFiltardos(filtrarPrecoProdutos)
    })
    pegarProdutosFiltardos(filtrarPrecoProdutos)
  })

  dataCashback.forEach(itemClick =>{
    itemClick.addEventListener("click",()=>{
    let filtrarCashback = []
    const dataCashback = itemClick.getAttribute("data-cashback")
     if(dataCashback === "25"){
       filtrarCashback = dados.filter(item => item.porcentagem >= 25)
     }else if(dataCashback === "5"){
       filtrarCashback = dados.filter(item => item.porcentagem >= 0 && item.porcentagem <= 5)
     }else{
       filtrarCashback = dados.filter(item => item.porcentagem >= 20 && item.porcentagem < 25)
     }
     pegarProdutosFiltardos(filtrarCashback)
    })
  })
  dataAvaliacao.forEach(itemClick =>{
    itemClick.addEventListener("click",()=>{
      let filtrarAvaliacao = []
      const dataCashback = itemClick.getAttribute("data-avaliacao")
     if(dataCashback === "5"){
       filtrarAvaliacao = dados.filter(item => item.avaliacao >= 5  )
     }else if(dataCashback === "4"){
       filtrarAvaliacao = dados.filter(item => item.avaliacao >= 4 && item.avaliacao <= 4)  
     }else if(dataCashback === "3"){
       filtrarAvaliacao = dados.filter(item => item.avaliacao >= 3 && item.avaliacao <= 3 ) 
     }else{
       filtrarAvaliacao = dados.filter(item => item.avaliacao >= 20 && item.avaliacao < 25 ) 
     }
     pegarProdutosFiltardos(filtrarAvaliacao)
    })
  })
}