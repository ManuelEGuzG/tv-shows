export const createHeaderHTML = (show) => {
  const avgRating = show.rating?.average ?? "N/A";
  const genres = show.genres.length
    ? show.genres.map((g) => `<span class="tag">${g}</span>`).join("")
    : "";

  const yearRange = show.ended
    ? `${show.premiered?.slice(0, 4)} - ${show.ended.slice(0, 4)}`
    : show.premiered
      ? `${show.premiered.slice(0, 4)} - Presente`
      : "";

  // Limpiamos el HTML del summary
  const summary = show.summary
    ? show.summary.replace(/<[^>]+>/g, "")
    : "Sin descripción disponible.";

  return `
    <div class="show-card">
      <img class="poster" src="${show.image}" alt="Poster de ${show.name}" />
      <div class="show-info">
        <div class="show-meta">
          <span class="status-badge status-${show.status?.toLowerCase()}">${show.status}</span>
          <span class="meta-item">📅 ${yearRange}</span>
          ${show.runtime ? `<span class="meta-item">⏱️ ${show.runtime} min</span>` : ""}
          <span class="meta-item">📡 ${show.network}</span>
        </div>
        <h1 class="show-title">${show.name}</h1>
        <div class="show-rating-block">
          <span class="big-rating">⭐ ${avgRating}</span>
          <div class="genres">${genres}</div>
        </div>
        <p class="show-summary">${summary}</p>
        ${show.officialSite ? `<a href="${show.officialSite}" target="_blank" rel="noopener" class="official-link">🔗 Sitio oficial</a>` : ""}
      </div>
    </div>
  `;
};