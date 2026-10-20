const pesquisa = document.querySelector('#pesquisa');
const limparBusca = document.querySelector('#limpar-busca');
const botoesCategoria = document.querySelectorAll('.categoria');
const livros = document.querySelectorAll('.livro-card');
const contador = document.querySelector('#contador');
const semResultados = document.querySelector('#sem-resultados');
const aviso = document.querySelector('#aviso');
let categoriaAtual = 'Todos';
let temporizadorAviso;

function mostrarAviso(mensagem) {
  aviso.textContent = mensagem;
  aviso.classList.add('visivel');
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.remove('visivel'), 2400);
}

function filtrarLivros() {
  const termo = pesquisa.value.trim().toLocaleLowerCase('pt-BR');
  let quantidade = 0;
  livros.forEach((livro) => {
    const texto = `${livro.dataset.titulo} ${livro.dataset.autor} ${livro.dataset.categoria}`.toLocaleLowerCase('pt-BR');
    const correspondeCategoria = categoriaAtual === 'Todos' || livro.dataset.categoria === categoriaAtual;
    const correspondeBusca = texto.includes(termo);
    const visivel = correspondeCategoria && correspondeBusca;
    livro.hidden = !visivel;
    if (visivel) quantidade++;
  });
  contador.textContent = `${String(quantidade).padStart(2, '0')} ${quantidade === 1 ? 'livro' : 'livros'}`;
  semResultados.hidden = quantidade !== 0;
  limparBusca.style.display = pesquisa.value ? 'block' : 'none';
}

pesquisa.addEventListener('input', filtrarLivros);
limparBusca.addEventListener('click', () => {
  pesquisa.value = '';
  filtrarLivros();
  pesquisa.focus();
});

botoesCategoria.forEach((botao) => {
  botao.addEventListener('click', () => {
    categoriaAtual = botao.dataset.categoria;
    botoesCategoria.forEach((item) => item.classList.toggle('selecionada', item === botao));
    filtrarLivros();
  });
});

document.querySelectorAll('.favorito').forEach((botao) => {
  botao.addEventListener('click', () => {
    const salvo = botao.classList.toggle('salvo');
    botao.textContent = salvo ? '♥' : '♡';
    const titulo = botao.closest('.livro-card').dataset.titulo;
    mostrarAviso(salvo ? `“${titulo}” foi adicionado à sua lista.` : `“${titulo}” foi removido da sua lista.`);
  });
});

document.querySelectorAll('.botao-detalhes').forEach((botao) => {
  botao.addEventListener('click', () => {
    const livro = botao.closest('.livro-card');
    mostrarAviso(`${livro.dataset.titulo} — ${livro.dataset.autor}. Detalhes demonstrativos da biblioteca.`);
  });
});
