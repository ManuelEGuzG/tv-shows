const ICONS = {
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
};

const createResultCard = (show) => {
  const summary = show.summary
    ? show.summary.replace(/<[^>]+>/g, "").slice(0, 120) + "..."
    : "Sin descripción.";
  const rating = show.rating
    ? `<span>${ICONS.star} ${show.rating}</span>`
    : `<span>Sin rating</span>`;
  const year = show.premiered ? show.premiered.slice(0, 4) : "—";
  const genres = show.genres.slice(0, 2).join(" · ") || "Sin género";

  return `
    <article class="result-card" data-id="${show.id}">
      <img src="${show.image}" alt="${show.name}" class="result-poster" />
      <div class="result-info">
        <h3 class="result-title">${show.name}</h3>
        <div class="result-meta">
          <span>${year}</span>
          ${rating}
        </div>
        <p class="result-genres">${genres}</p>
        <p class="result-summary">${summary}</p>
        <button class="result-btn">Ver detalles</button>
      </div>
    </article>
  `;
};

export const createSearchResultsHTML = (results, query) => {
  if (!results.length) {
    return `
      <div class="no-results">
        <p>No se encontraron series para "<strong>${query}</strong>"</p>
      </div>
    `;
  }

  const cards = results.map(createResultCard).join("");
  return `
    <h2 class="section-title">Resultados para "${query}" (${results.length})</h2>
    <div class="results-grid">${cards}</div>
  `;
};