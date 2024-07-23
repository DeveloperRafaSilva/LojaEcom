import formatarMoeda from "../../../modulosJs/formatarMoeda.js"
export default async function produtosUsuarios(){
  const htmlOndeVaiFicarOsProdutos = document.querySelector("[data-append-produtos-usuarios]")
  const resposta = await fetch("../../../ProdutosApi/ProdutosUsuarios.json")
  const dados = await resposta.json()
  console.log(dados)
  function fetchProdutosItem(){
  dados.forEach(item =>{
    const criarElemento = document.createElement("div")
    criarElemento.innerHTML = `
      <div class="produtos-users">
        <div class="imagem-produto-usuario">
          <img src="${item.imagem}" alt="produto usuario" />
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
            <img src="../../../src/imagens/iconesProdutosHover/cartIcone.svg" alt="carrinho de compras icone" />
            <img src="../../../src/imagens/iconesProdutosHover/IconeSeacrh.svg" alt="carrinho de compras icone" />
            <img src="../../../src/imagens/iconesProdutosHover/WhislistIcone.svg" alt="carrinho de compras icone" />
          </div>
        </div>
      </div>
    `
    const ondeVaiFicarAvaliacao = criarElemento.querySelector("[data-produtos-avaliacao]")

    for(let i = 0;  i < item.avaliacao;i++){
      const criarImgs = document.createElement("div")
      criarImgs.innerHTML = `
        <img src="${item.imagemAvalicao}" alt="icones avaliação" />
      `
      ondeVaiFicarAvaliacao.appendChild(criarImgs)
    }
    htmlOndeVaiFicarOsProdutos.appendChild(criarElemento)
  })
}
fetchProdutosItem()
}