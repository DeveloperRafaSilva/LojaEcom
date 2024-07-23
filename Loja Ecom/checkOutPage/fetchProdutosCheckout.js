import formatarMoeda from "../modulosJs/formatarMoeda.js"
export default function checkOutProdutos(){
  const produtosLocalStorgae = JSON.parse(localStorage.getItem("itemCarrinho"))
  console.log(produtosLocalStorgae)
  const conteudoAppend = document.querySelector("[conteudo-produtos-checkout]")
  const dataSubtotal = document.querySelector("[data-subtotal]")

  conteudoAppend.innerHTML = ""
  produtosLocalStorgae.forEach(item =>{
    console.log(item.src[0])
    const criarDiv = document.createElement("div")
    criarDiv.innerHTML  = `
    <div class="produtos-checkout">
      <div class="imagem-produto-checkout">
        <img src="../${item.src[0]}" alt="${item.alt[0]}" />
        <p>${item.nome}</p>
      </div>
      <div class="preco-card">
        <p>quanty ${item.quantidade}<p>
        <p>${formatarMoeda(item.preco * item.quantidade)}</p>
      <div>
    </div>
    `
    conteudoAppend.appendChild(criarDiv)
  })
  const total = produtosLocalStorgae.reduce((item,produto) =>{
    return item + (produto.quantidade * produto.preco)
  },0)
  dataSubtotal.innerHTML = formatarMoeda(total)
}