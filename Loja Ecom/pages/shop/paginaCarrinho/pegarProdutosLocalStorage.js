import formatarMoeda from "../../../modulosJs/formatarMoeda.js"
export default function paginaCarrinho(){
  const produtosLocalStorage2 = JSON.parse(localStorage.getItem("itemCarrinho"))
  const mensagemCart = document.querySelector("[data-mensagem-cart]")
  if(produtosLocalStorage2.length === 0){
    mensagemCart.style.display = "block"
  }else{
    mensagemCart.style.display = "none"

  }
  const appendProdutosCarrinho = document.querySelector("[append-produtos-carrinho]")
  const excluirBtn = document.querySelector("[data-excluir-produtos]")
  function paginaCarrinhoDeCompras(){
  appendProdutosCarrinho.innerHTML = ""
  produtosLocalStorage2.forEach((item, index) =>{
  const criarDiv = document.createElement("div")
  criarDiv.innerHTML = `
  <div class="container-carrinho-cart">
    <div class="imagem-cart-cart">
      <img src="../../../${item.src[0]}" alt="${item.alt[0]}" />
      <p>${item.nome}</p>
    </div>
    <p>${formatarMoeda(item.preco)}</p>
      <div class="contador">
        <span data-contador-menor-cart data-index="${index}">-</span>
        <span data-quantidade>${item.quantidade}</span>
        <span data-contador-mais-cart data-index="${index}">+</span>
    </div>
    <div>
      <p>${formatarMoeda(item.preco * item.quantidade)}</p>
    </div>
  </div>
  `
      appendProdutosCarrinho.appendChild(criarDiv)
    })
    const remover = document.querySelectorAll("[data-contador-menor-cart]");
    removerProdutos(remover);

    const adicionar = document.querySelectorAll("[data-contador-mais-cart]");
    adicionarProdutos(adicionar);
    const totalHtml =  document.querySelector("[data-total]")

    const somarTotal = produtosLocalStorage2.reduce((total,produto) =>{
      return total + (produto.preco * produto.quantidade)
    },0)
    totalHtml.innerHTML = formatarMoeda(somarTotal)
  }
  
    excluirBtn.addEventListener("click",(index) =>{
      produtosLocalStorage2.forEach(itemExluir =>{
        produtosLocalStorage2.splice(index,itemExluir.quantidade)
        localStorage.setItem("itemCarrinho", JSON.stringify(produtosLocalStorage2));
        paginaCarrinhoDeCompras();
      })
    })
  function removerProdutos(remover) {
    remover.forEach((itemClick,index) =>{
      itemClick.addEventListener("click",()=>{
        --produtosLocalStorage2[index].quantidade
        console.log(produtosLocalStorage2[index].quantidade)
        if(produtosLocalStorage2[index].quantidade <= 0){
          produtosLocalStorage2.splice(index,1)
        }
        localStorage.setItem("itemCarrinho", JSON.stringify(produtosLocalStorage2));
        paginaCarrinhoDeCompras()
      })
    })
    }
  
    function adicionarProdutos(adicionar) {
      adicionar.forEach((itemClick) => {
        itemClick.addEventListener("click", () => {
          const index = itemClick.getAttribute("data-index");
          produtosLocalStorage2[index].quantidade++;
          localStorage.setItem("itemCarrinho", JSON.stringify(produtosLocalStorage2));
          paginaCarrinhoDeCompras();
        });
      });
  }
  paginaCarrinhoDeCompras()
}