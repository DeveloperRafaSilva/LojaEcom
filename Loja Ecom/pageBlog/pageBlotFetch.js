export default async function pageBlogFetch() {
  const response = await fetch("../../produtosApi/PageBlogAPI.json");
  const dados = await response.json();
  console.log(dados);
  const produtosPorPagina = 3;
  let paginaAtual = 1;

  const appendBlog = document.querySelector("[append-blog]");
  const paginacaoNav = document.querySelector("[paginacao-nav]");

  const somarQuantidadeDePaginas = Math.ceil(dados.length / produtosPorPagina);

  function paginacaoBlog() {
    const inicio = (paginaAtual - 1) * produtosPorPagina;
    const final = inicio + produtosPorPagina;
    const produtosArray = dados.slice(inicio, final);
    appendBlog.innerHTML = "";
    produtosArray.forEach(item => {
      const criarDiv = document.createElement("div");
      criarDiv.innerHTML = `
      <div class="container-blog">
        <div class="imagem-blog">
          <img src="${item.src[0]}" alt="Imagem Blog" />
        </div>
        <div class="conteudo-pagina">
          <div class="infos-blog">
            <p class="data-postagem">${item.data}</p>
          </div>
          <div class="titulo-blog-paragrafo">
          <h1>${item.titulo}</h1>
          <p>${item.descricao}</p>
          </div>
        </div>
      </div>
      `;
      appendBlog.appendChild(criarDiv);
    });
  }

  function atualizarPaginacao() {
    paginacaoNav.innerHTML = "";
    for (let i = 1; i <= somarQuantidadeDePaginas; i++) {
      const criarItensNav = document.createElement("div");
      criarItensNav.innerHTML = `
      <span data-pagina="${i}">${i}</span>
      `;
      paginacaoNav.appendChild(criarItensNav);
    }

    // Atualiza a classe "pagina-ativa"
    const navPagina = document.querySelectorAll("[data-pagina]");
    navPagina.forEach(itemClick => {
      itemClick.addEventListener("click", () => {
        navPagina.forEach(span => span.classList.remove("pagina-ativa"));
        itemClick.classList.add("pagina-ativa");
        paginaAtual = parseInt(itemClick.getAttribute("data-pagina"));
        paginacaoBlog();
      });
    });

    const paginaAtualElemento = document.querySelector(`[data-pagina="${paginaAtual}"]`);
    if (paginaAtualElemento) {
      paginaAtualElemento.classList.add("pagina-ativa");
    }
  }

  paginacaoBlog();
  atualizarPaginacao();
}
