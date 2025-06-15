// Passo 1: Pegar elementos do HTML
function pegarElementos() {
  const botaoFiltrar = document.querySelector('.btn-filtrar');
  const campoCategoria = document.querySelector('#categoria');
  const campoPreco = document.querySelector('#preco');
  const cartas = document.querySelectorAll('.carta');

  return {
    botaoFiltrar,
    campoCategoria,
    campoPreco,
    cartas
  };
}

// Passo 2: Verificar se a carta passa no filtro de categoria
function filtrarPorCategoria(carta, categoriaSelecionada) {
  // Se não foi selecionada categoria, não precisa filtrar
  if (categoriaSelecionada === '') return true;

  const categoriaCarta = carta.dataset.categoria.toLowerCase();
  const categoriaFiltro = categoriaSelecionada.toLowerCase();

  return categoriaCarta === categoriaFiltro;
}

// Passo 3: Verificar se a carta passa no filtro de preço
function filtrarPorPreco(carta, precoMaximo) {
  // Se não foi definido preço máximo, não precisa filtrar
  if (precoMaximo === '') return true;

  const precoCarta = parseFloat(carta.dataset.preco);
  const precoFiltro = parseFloat(precoMaximo);

  return precoCarta <= precoFiltro;
}

// Passo 4: Mostrar ou esconder a carta baseado nos filtros
function atualizarVisibilidadeCarta(carta, mostrar) {
  if (mostrar) {
    carta.classList.add('mostrar');
    carta.classList.remove('esconder');
  } else {
    carta.classList.remove('mostrar');
    carta.classList.add('esconder');
  }
}

// Passo 5: Função principal que aplica todos os filtros
function aplicarFiltros() {
  // Pegar os valores selecionados nos campos
  const categoriaSelecionada = document.querySelector('#categoria').value;
  const precoMaximoSelecionado = document.querySelector('#preco').value;

  // Pegar todas as cartas
  const cartas = document.querySelectorAll('.carta');

  // Para cada carta, verificar se deve ser mostrada
  cartas.forEach(function (carta) {
    const passaNoFiltroCategoria = filtrarPorCategoria(carta, categoriaSelecionada);
    const passaNoFiltroPreco = filtrarPorPreco(carta, precoMaximoSelecionado);

    // A carta só será mostrada se passar em ambos os filtros
    const mostrarCarta = passaNoFiltroCategoria && passaNoFiltroPreco;

    atualizarVisibilidadeCarta(carta, mostrarCarta);
  });
}

// Passo 6: Configurar o evento de clique no botão
function configurarBotaoFiltrar() {
  const elementos = pegarElementos();
  elementos.botaoFiltrar.addEventListener('click', aplicarFiltros);
}

// Quando a página carregar, configurar o botão
window.addEventListener('DOMContentLoaded', configurarBotaoFiltrar);