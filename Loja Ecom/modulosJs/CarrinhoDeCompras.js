import formatarMoeda from "./formatarMoeda.js";
import checkOutProdutos from "../checkOutPage/fetchProdutosCheckout.js";
export default function carrinhoDeCompras() {
  const produtosLocalStorage = JSON.parse(localStorage.getItem("itemCarrinho"))
  function atualizarCarrinho() {
    const paragrafoTotalSoma = document.querySelector("[data-total-produtos]");
    const appendHtmlCarrinho = document.querySelector("[data-conteudo-append-carrinho]");
    appendHtmlCarrinho.innerHTML =""
    if(produtosLocalStorage !== null){
    produtosLocalStorage.forEach((item, index) => {
      const criarDiv = document.createElement("div");
      criarDiv.innerHTML = `
        <div class="container-carrinho">
          <div class="imagem-cart">
            <img src="../../../${item.src[0]}" alt="${item.alt[0]}" />
          </div>
          <div class="conteudo-carrinho">
            <p>${item.nome}</p>
            <p>${formatarMoeda(item.preco)}</p>
            <div class="contador">
              <span data-contador-menor data-index="${index}">-</span>
              <span data-quantidade>${item.quantidade}</span>
              <span data-contador-mais data-index="${index}">+</span>
            </div>
          </div>
        </div>
      `;
      appendHtmlCarrinho.appendChild(criarDiv);
    });
    const remover = document.querySelectorAll("[data-contador-menor]");
    removerProdutos(remover);

    const adicionar = document.querySelectorAll("[data-contador-mais]");
    adicionarProdutos(adicionar);

    const somar = produtosLocalStorage.reduce((total, produto) => {
      return total + (produto.preco * produto.quantidade);
    }, 0);
    paragrafoTotalSoma.innerHTML = `${formatarMoeda(somar)}`;
  }
  }
  

  function removerProdutos(remover) {
  remover.forEach((itemClick,index) =>{
    itemClick.addEventListener("click",()=>{
      produtosLocalStorage[index].quantidade--
      if(produtosLocalStorage[index].quantidade <= 0){
        produtosLocalStorage.splice(index,1)
      }
      localStorage.setItem("itemCarrinho", JSON.stringify(produtosLocalStorage));
      atualizarCarrinho()
      checkOutProdutos()
    })
  })
  }
  

  function adicionarProdutos(adicionar) {
    adicionar.forEach((itemClick) => {
      itemClick.addEventListener("click", () => {
        const index = itemClick.getAttribute("data-index");
        produtosLocalStorage[index].quantidade++;
        localStorage.setItem("itemCarrinho", JSON.stringify(produtosLocalStorage));
        atualizarCarrinho();
        checkOutProdutos()
      });
      
    });
  }
  atualizarCarrinho();
}
