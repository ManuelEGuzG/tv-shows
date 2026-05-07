/**
 * Genera el HTML de una tarjeta de resultado de búsqueda.
 */
const createResultCard = (show) => {
  const summary = show.summary
    ? show.summary.replace(/<[^>]+>/g, "").slice(0, 120) + "..."
    : "Sin descripción.";
  const rating = show.rating ? `⭐ ${show.rating}` : "Sin rating";
  const year = show.premiered ? show.premiered.slice(0, 4) : "—";
  const genres = show.genres.slice(0, 2).join(" · ") || "Sin género";

  return `
    <article class="result-card" data-id="${show.id}">
      <img src="${show.image}" alt="${show.name}" class="result-poster" />
      <div class="result-info">
        <h3 class="result-title">${show.name}</h3>
        <div class="result-meta">
          <span>${year}</span>
          <span>${rating}</span>
        </div>
        <p class="result-genres">${genres}</p>
        <p class="result-summary">${summary}</p>
        <button class="result-btn">Ver detalles →</button>
      </div>
    </article>
  `;
};

/**
 * Genera el HTML completo del listado de resultados.
 */
export const createSearchResultsHTML = (results, query) => {
  if (!results.length) {
    return `
      <div class="no-results">
        <p>😕 No se encontraron series para "<strong>${query}</strong>"</p>
      </div>
    `;
  }

  const cards = results.map(createResultCard).join("");
  return `
    <h2 class="section-title">Resultados para "${query}" (${results.length})</h2>
    <div class="results-grid">${cards}</div>
  `;
};