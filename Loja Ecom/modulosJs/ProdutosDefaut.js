import formatarMoeda from "../modulosJs/formatarMoeda.js";
import carrinhoDeCompras from "./CarrinhoDeCompras.js";
export default async function produtosDefault() {
  const arrayProdutosadd = JSON.parse(window.localStorage.getItem("itemCarrinho")) || []
  const response = await fetch("../../ProdutosApi/ProdutosShopDefault.json");
  const dados = await response.json();
  const quantidadeDePaginasHtml = document.querySelector("#pagina-infos")
  const paginaAnterior = document.querySelector("#prev-page")
  const proximaPagina = document.querySelector("#next-page")
  let produtoPorPagina = 3
  const containerAppendProdutos = document.querySelector("[data-conteudo-produtos-append]");
  let somaQuantidadeDePaginas = Math.ceil(dados.length / produtoPorPagina)
  let paginaAtual = 1
  function paginacao(){
   let inicioPagina = (paginaAtual - 1) * produtoPorPagina
   const final = inicioPagina + produtoPorPagina
   const arrayProdutos = dados.slice(inicioPagina,final)
   containerAppendProdutos.innerHTML =""
    arrayProdutos.forEach((itemProdutos,index)  =>{
      const criarDivProdutos = document.createElement("div");
      criarDivProdutos.classList.add("container-carrinho")
      criarDivProdutos.innerHTML = `
        <div data-click-fora class="produtos-item-default ">
          <div class="imagem-produtos">
            <div class="hover-icones">
            <img data-adicionar-no-carrinho=${inicioPagina + index} src="../../src/imagens/iconesProdutosHover/cartIcone.svg" alt="" />
            <img src="../../src/imagens/iconesProdutosHover/IconeSeacrh.svg" alt="" />
            <img src="../../src/imagens/iconesProdutosHover/WhislistIcone.svg" alt="" />

            </div>
            <img src="${itemProdutos.src}" alt="" />
          </div>
          <div class="texto-produtos">
            <p>${itemProdutos.nome}</p>
            <div class="detalhes">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>${formatarMoeda(itemProdutos.preco)}</p>
          </div>
        </div>
      `;
      containerAppendProdutos.appendChild(criarDivProdutos);
      const iconeCartAdd = document.querySelectorAll(`[data-adicionar-no-carrinho="${inicioPagina + index}"]`)
      adicionarAoCarrinho(iconeCartAdd,inicioPagina + index)
    });   
    quantidadeDePaginasHtml.innerHTML = `${ paginaAtual} / ${somaQuantidadeDePaginas}`
  }

  function adicionarAoCarrinho(iconeCartAdd,produtoIndex){
    iconeCartAdd.forEach((itemClick) => {
      itemClick.addEventListener("click", () => {
        const produtoAtual = dados[produtoIndex];
        const verificarSeJaTem = arrayProdutosadd.find(item => item.nome === produtoAtual.nome);
        if (verificarSeJaTem) {
          verificarSeJaTem.quantidade++;
        } else {
          produtoAtual.quantidade = 1;
          arrayProdutosadd.push(produtoAtual);
        }
        window.localStorage.setItem("itemCarrinho",JSON.stringify(arrayProdutosadd))
        carrinhoDeCompras()
      });
    });
  }
  
  function anteriorPaginaFunc(){
    if(paginaAtual > 1){
      paginaAtual--
      paginacao(paginaAtual)
    }
  }
  
  function proximaPaginaFunc(){
    if(paginaAtual < somaQuantidadeDePaginas){
      paginaAtual++
      paginacao(paginaAtual)
    }
  }

  function paginaParada(){
    const paginaParada = paginaAtual = somaQuantidadeDePaginas
    console.log(paginaParada)
      quantidadeDePaginasHtml.innerHTML = `${ paginaParada} / ${somaQuantidadeDePaginas}`
  }

  paginaAnterior.addEventListener("click", () =>{
    anteriorPaginaFunc()
  })
  
  proximaPagina.addEventListener("click", () =>{
    proximaPaginaFunc()
  })
  document.body.onresize = function(){
    if(document.body.clientWidth < 770){
      produtoPorPagina = 4
      paginacao()
      paginaParada()
      somaQuantidadeDePaginas = Math.ceil(dados.length / produtoPorPagina)
    }else{
      produtoPorPagina = 3
      paginacao()
      somaQuantidadeDePaginas = Math.ceil(dados.length / produtoPorPagina)
    }
  }
  paginacao()
}
