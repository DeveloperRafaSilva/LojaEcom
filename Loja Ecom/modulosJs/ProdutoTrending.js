import formatarMoeda from "./formatarMoeda.js"
export default async function produtoTrending(){

  const response = await fetch("../ProdutosApi/produtoTrending.json")
  const dados = await response.json()
  
  const dataTrandingProdutos = document.querySelector("[data-tranding-produtos]")

  dados.forEach(itemProdutos =>{
    const criarDiv = document.createElement("div")
    criarDiv.innerHTML = `
    <div class="container-tranding">
      <div class="imagem-produto-latest">
        <img src="${itemProdutos.src}" alt="${itemProdutos.alt}" />
      </div>
      <div class=" info-tranding">
        <p class="nome-produto-trending">${itemProdutos.nome}</p>
        <p class="preco-produto">${formatarMoeda(itemProdutos.preco)}</p>
      </div> 
    </div>
    `  
    dataTrandingProdutos.appendChild(criarDiv)
  })

}