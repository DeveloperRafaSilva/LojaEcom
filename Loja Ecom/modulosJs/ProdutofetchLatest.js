import formatarMoeda from "./formatarMoeda.js";
export default async function produtoLatest(){
  const response = await fetch("../ProdutosApi/ProdutoLatest.json")
  const dados = await response.json()
  console.log(dados)
  const dataAppendLatest = document.querySelector("[data-produtos-latest]")
  
  dados.forEach(itemProdutos =>{
    const criarDiv = document.createElement("div")
    criarDiv.innerHTML = `
    <div class="container-latest">
      <div class="imagem-produto">
          <div class="icones-hover">
          <img src="../src/imagens/iconesProdutosHover/cartIcone.svg" alt="icone Carrinho de compras" />
          <img src="../src/imagens/iconesProdutosHover/WhislistIcone.svg" alt="icone Carrinho de compras" />
          <img src="../src/imagens/iconesProdutosHover/iconeSeacrh.svg" alt="icone Carrinho de compras" />
          </div>
          <img class="imagem-latest" src="${itemProdutos.src}" alt="${itemProdutos.alt}" />
        </div>
      <div class="infos-produto">
        <div>
          <a href="#" class="nome-produto-latest">${itemProdutos.nome}</a>
        </div>
        <div class="preco-div">
          <p class="preco-produto">${formatarMoeda(itemProdutos.preco)}</p>
          <p class="preco-produto preco-anterior">${formatarMoeda(itemProdutos.precoAnterior)}</p>
        </div>
      </div> 
    </div>
    `  
    dataAppendLatest.appendChild(criarDiv)
  })


}