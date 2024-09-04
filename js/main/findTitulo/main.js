//variaveis

import renderCardsTitulo from "../../functions/renderCardsTitulo/renderCardsTitulo.js";
import RequestAPI from "../../functions/requestAPI/requestAPI.js";

const $btnSelectFilmes = document.querySelector("#selectFilmes");
const $btnSelectSeries = document.querySelector("#selectSeries");
const $selectGenre = document.querySelector("#selectGenre");
const $selectSearch = document.querySelector("#selectSearch");
const $inputPesquisa = document.querySelector("#inputPesquisa");
const $conteinerGeneros = document.querySelector("#conteinerGeneros");
const $conteinerRenderPesquisa = document.querySelector(
  "#conteinerRenderPesquisa"
);
//const $ = document.querySelector("");
const requestsAPI = new RequestAPI();

let parametroBusca = "movie";

const generosFilmes = new Map([
  [28, "Ação"],
  [12, "Aventura"],
  [16, "Animação"],
  [35, "Comédia"],
  [80, "Crime"],
  [18, "Drama"],
]);

const generosSeries = new Map([
  [10759, "Ação e Aventura"],
  [16, "Animação"],
  [35, "Comédia"],
  [80, "Crime"],
  [18, "Drama"],
  [9648, "Mistério"],
]);

//eventos

$btnSelectFilmes.addEventListener("click", selecionarFilmes);
$btnSelectSeries.addEventListener("click", selecionarSeries);
$selectGenre.addEventListener("click", mostrarGeneros);
$selectSearch.addEventListener("click", fecharGeneros);
$inputPesquisa.addEventListener("input", (e) => {
  renderizarTitulos(e);
});

//funções

async function renderizarTitulos(e) {
  $btnSelectFilmes.scrollIntoView({ behavior: "smooth" });
  let arrayTitulos = await requestsAPI.requestSearch(
    parametroBusca,
    e.target.value
  );
  renderCardsTitulo($conteinerRenderPesquisa, arrayTitulos.results);
}

function fecharGeneros() {
  $conteinerGeneros.classList.add("hide");
  $selectSearch.classList.add("hide");
  $selectGenre.classList.remove("hide");
  $inputPesquisa.classList.remove("hide");
  $conteinerGeneros.innerHTML = "";
}

function selecionarFilmes() {
  if (parametroBusca !== "movie") {
    $btnSelectFilmes.classList.remove("desactive");
    $btnSelectFilmes.classList.add("active");
    $btnSelectSeries.classList.remove("active");
    $btnSelectSeries.classList.add("desactive");
    parametroBusca = "movie";
  }
}

function selecionarSeries() {
  if (parametroBusca !== "tv") {
    $btnSelectSeries.classList.remove("desactive");
    $btnSelectSeries.classList.add("active");
    $btnSelectFilmes.classList.remove("active");
    $btnSelectFilmes.classList.add("desactive");
    parametroBusca = "tv";
  }
}

function mostrarGeneros() {
  $conteinerGeneros.classList.remove("hide");
  $inputPesquisa.classList.add("hide");
  $conteinerGeneros.innerHTML = "";
  $selectGenre.classList.add("hide");
  $selectSearch.classList.remove("hide");

  const generos = parametroBusca === "movie" ? generosFilmes : generosSeries;

  generos.forEach((genero, id) => {
    const button = document.createElement("button");
    button.textContent = genero;
    button.classList.add("genero-button");
    $conteinerGeneros.appendChild(button);
  });
}
