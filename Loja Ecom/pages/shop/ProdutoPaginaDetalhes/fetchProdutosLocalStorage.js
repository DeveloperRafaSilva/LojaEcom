import formataNumero from "../../../modulosJs/formatarMoeda.js"
export default function pegarProdutosLocalStorage(){
  const produto = JSON.parse(localStorage.getItem("dadosProduto"))
  console.log(produto)

  const produtoElementoHtml = document.querySelector("[produto-pagina-append]")
  const criarElemento = document.createElement("div")

  criarElemento.innerHTML = `
  <div class="produto-item-pagina">
      <div class="imagem-principal">
        <img src="../../../${produto.src[0]}" alt="${produto.alt[0]}" />
      </div>
      <div class="conteudo-produto-item">
        <h1>${produto.nome}</h1>
        <div class="avaliacao-icones">
          <img src="../../../src/imagens/avaliacaoIcones/Vector.svg" alt="icone estrela" />
          <img src="../../../src/imagens/avaliacaoIcones/Vector.svg" alt="icone estrela" />
          <img src="../../../src/imagens/avaliacaoIcones/Vector.svg" alt="icone estrela" />
          <img src="../../../src/imagens/avaliacaoIcones/Vector.svg" alt="icone estrela" />
        </div>
        <div>
          <p>${formataNumero(produto.preco)}</p>
        </div>
        <div class="btn-adicionarCart">
          <a href="#">Add to Cart</a>
        </div>
        <div class="compartilhar">
          <p>Share</p>
          <div class="icones-redes-sociais">
            <img src="../../../src/imagens/redesSociais/facebook.svg" alt="icone facebook " />
            <img src="../../../src/imagens/redesSociais/instagram.svg" alt="icone instagram " />
            <img src="../../../src/imagens/redesSociais/x.svg" alt="icone x" />
          </div>
        </div>
      </div>
  </div>
  `

  produtoElementoHtml.appendChild(criarElemento)


}