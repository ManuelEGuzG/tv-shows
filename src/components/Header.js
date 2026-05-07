const ICONS = {
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  network: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M8.5 16.42a6 6 0 0 1 7 0"/><line x1="12" y1="20" x2="12" y2="20"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`
};

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

  const summary = show.summary
    ? show.summary.replace(/<[^>]+>/g, "")
    : "Sin descripción disponible.";

  return `
    <div class="show-card">
      <img class="poster" src="${show.image}" alt="Poster de ${show.name}" />
      <div class="show-info">
        <div class="show-meta">
          <span class="status-badge status-${show.status?.toLowerCase()}">${show.status}</span>
          ${yearRange ? `<span class="meta-item">${ICONS.calendar} ${yearRange}</span>` : ""}
          ${show.runtime ? `<span class="meta-item">${ICONS.clock} ${show.runtime} min</span>` : ""}
          <span class="meta-item">${ICONS.network} ${show.network}</span>
        </div>
        <h1 class="show-title">${show.name}</h1>
        <div class="show-rating-block">
          <span class="big-rating">${ICONS.star} ${avgRating}</span>
          <div class="genres">${genres}</div>
        </div>
        <p class="show-summary">${summary}</p>
        ${show.officialSite ? `<a href="${show.officialSite}" target="_blank" rel="noopener" class="official-link">${ICONS.link} Sitio oficial</a>` : ""}
      </div>
    </div>
  `;
};