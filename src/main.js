import { getShowData, getEpisodeList, searchShows } from "./services/tvmaze.js";
import { createHeaderHTML } from "./components/Header.js";
import { createSeasonHTML } from "./components/Season.js";
import { createSearchResultsHTML } from "./components/SearchResults.js";
import { DEFAULT_ID } from "./utils/constants.js";

// === Referencias al DOM ===
const $form = document.getElementById("search-form");
const $input = document.getElementById("search-input");
const $searchResults = document.getElementById("search-results");
const $header = document.getElementById("show-header");
const $episodes = document.getElementById("episodes");
const $sectionTitle = document.getElementById("section-title");
const $legend = document.getElementById("legend");
const $loader = document.getElementById("loader");

// === Helpers de UI ===
const showLoader = () => $loader.hidden = false;
const hideLoader = () => $loader.hidden = true;

const clearShow = () => {
  $header.innerHTML = "";
  $episodes.innerHTML = "";
  $sectionTitle.hidden = true;
  $legend.hidden = true;
};

const clearResults = () => {
  $searchResults.hidden = true;
  $searchResults.innerHTML = "";
};

// === Renderizado de una serie completa ===
const renderShow = async (id) => {
  clearResults();
  clearShow();
  showLoader();

  try {
    const [show, seasons] = await Promise.all([
      getShowData(id),
      getEpisodeList(id)
    ]);

    $header.innerHTML = createHeaderHTML(show);

    const seasonsHTML = Object.values(seasons)
      .map((season, index) => createSeasonHTML(season, index + 1))
      .join("");

    $episodes.innerHTML = seasonsHTML;
    $sectionTitle.hidden = false;
    $legend.hidden = false;

    // Scroll al inicio para ver el resultado
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    $header.innerHTML = `
      <div class="error">
        ⚠️ Error al cargar la serie. Intenta otra búsqueda.
      </div>
    `;
    console.error(error);
  } finally {
    hideLoader();
  }
};

// === Renderizado de resultados de búsqueda ===
const renderSearchResults = async (query) => {
  clearShow();
  showLoader();

  try {
    const results = await searchShows(query);
    $searchResults.innerHTML = createSearchResultsHTML(results, query);
    $searchResults.hidden = false;
  } catch (error) {
    $searchResults.innerHTML = `<div class="error">⚠️ Error al buscar.</div>`;
    $searchResults.hidden = false;
    console.error(error);
  } finally {
    hideLoader();
  }
};

// === Listeners ===
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = $input.value.trim();
  if (query) renderSearchResults(query);
});

// Delegación de eventos: clic en cualquier tarjeta de resultado
$searchResults.addEventListener("click", (e) => {
  const card = e.target.closest(".result-card");
  if (!card) return;
  const id = card.dataset.id;
  if (id) renderShow(id);
});

// === Carga inicial ===
renderShow(DEFAULT_ID);