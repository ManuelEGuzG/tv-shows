import { createEpisodeHTML } from "./Episode.js";

export const createSeasonHTML = (episodes, seasonNumber) => {
  const episodesHTML = episodes.map(createEpisodeHTML).join("");
  const avgRating = (
    episodes.reduce((acc, ep) => acc + (ep.rating || 0), 0) /
    episodes.filter((ep) => ep.rating).length
  ).toFixed(1);

  return `
    <article class="season">
      <header class="season-header" title="Promedio temporada: ${avgRating}">
        T${seasonNumber}
      </header>
      <div class="season-episodes">
        ${episodesHTML}
      </div>
      <span class="season-avg">${avgRating}</span>
    </article>
  `;
};