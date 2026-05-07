const getRatingClass = (rating) => {
  if (!rating) return "rating-0";
  return `rating-${Math.min(Math.floor(rating), 10)}`;
};

export const createEpisodeHTML = (episode) => {
  const ratingClass = getRatingClass(episode.rating);
  const ratingText = episode.rating ? episode.rating.toFixed(1) : "N/A";
  const tooltip = `T${episode.season}E${episode.number} · ${episode.name} · ⭐ ${ratingText}`;

  return `
    <div class="episode ${ratingClass}" title="${tooltip}">
      ${episode.number}
    </div>
  `;
};