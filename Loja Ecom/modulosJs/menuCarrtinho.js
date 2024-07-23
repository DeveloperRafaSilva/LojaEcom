export default function menuCarrinho() {
  const abrirCarrinho = document.querySelector("[data-abrir-carrinho]");
  const containerCarrinho = document.querySelector("[data-container-carrinho]");
  const fecharCarrinho = document.querySelector("[data-fechar-carrinho]");
  const dataconteudoappendcarrinho = document.querySelector(".container-carrinho");

  abrirCarrinho.addEventListener("click", () => {
    containerCarrinho.classList.add("on");
    document.body.classList.add("semScroll");
  });

  fecharCarrinho.addEventListener("click", () => {
    containerCarrinho.classList.remove("on");
    document.body.classList.remove("semScroll");
  });

  document.addEventListener("click", (event) => {
    if (
      !abrirCarrinho.contains(event.target) &&
      !containerCarrinho.contains(event.target) && !dataconteudoappendcarrinho.contains(event.target)
    ) {
      containerCarrinho.classList.remove("on");
      document.body.classList.remove("semScroll");
    }
  });
}
