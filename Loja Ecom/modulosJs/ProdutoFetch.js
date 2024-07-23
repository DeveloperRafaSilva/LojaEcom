import produtoBtnVer from "./VerProduto.js";
import formatarMoeda from "./formatarMoeda.js";
import carrinhoDeCompras from "./CarrinhoDeCompras.js";

export default function produtoFetch() {
  const appendElementoHtml = document.querySelector("[data-produto-item]");

  async function fetchApi() {
    const response = await fetch("../ProdutosApi/Produtos.json");
    const dados = await response.json();
    const arrayDosProdutosAdicionados = [];

    dados.forEach(dadosApi => {
      let elementoCriadoJs = document.createElement("div");
      elementoCriadoJs.innerHTML = `
        <div data-produto-slide class="produtos-div">
          <div class="imagem-produto">
            <div class="icones-hover">
              <img data-carrinho-click src="../src/imagens/iconesProdutosHover/cartIcone.svg" alt="icone Carrinho de compras" />
              <img src="../src/imagens/iconesProdutosHover/WhislistIcone.svg" alt="icone Whislist" />
              <img src="../src/imagens/iconesProdutosHover/iconeSeacrh.svg" alt="icone Search" />
            </div>
            <div data-ver-produto class="btn-ver-produto">
              <a href="#">View Details</a>
            </div>
            <img src="${dadosApi.src[0]}" alt="${dadosApi.alt[0]}" />
          </div>
          <div class="card-texto-produto">
            <p class="nome-produto">${dadosApi.nome}</p>
            <div class="detalhe-produto">
              <span class="detalhe1"></span>
              <span class="detalhe2"></span>
              <span class="detalhe3"></span>
            </div>
            <p class="codigo-produto">${dadosApi.code}</p>
            <p class="preco-produto">${formatarMoeda(dadosApi.preco)}</p>
          </div>
        </div>
      `;
      appendElementoHtml.appendChild(elementoCriadoJs);
    });

    const carrinho = document.querySelectorAll("[data-carrinho-click]");
    carrinho.forEach((itemClick, index) => {
      itemClick.addEventListener("click", () => {
        const produtoAtual = dados[index];
        const verificarSeJaTem = arrayDosProdutosAdicionados.find(item => item.nome === produtoAtual.nome);
        if (verificarSeJaTem) {
          verificarSeJaTem.quantidade++;
        } else {
          produtoAtual.quantidade = 1;
          arrayDosProdutosAdicionados.push(produtoAtual);
        }
        window.localStorage.setItem("itemCarrinho",JSON.stringify(arrayDosProdutosAdicionados))
        carrinhoDeCompras();
      });
    });

    const verProdutoBtn = document.querySelectorAll("[data-ver-produto]");
    produtoBtnVer(verProdutoBtn);
  }

  fetchApi();
}
