import { API_BASE, PLACEHOLDER_IMAGE } from "../utils/constants.js";

/**
 * Obtiene los datos generales de una serie por su ID.
 */
export const getShowData = async (id) => {
  const URL = `${API_BASE}/shows/${id}`;
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      rating: data.rating,
      image: data.image?.original ?? data.image?.medium ?? PLACEHOLDER_IMAGE,
      summary: data.summary ?? "",
      genres: data.genres ?? [],
      premiered: data.premiered ?? "",
      ended: data.ended ?? null,
      status: data.status ?? "",
      network: data.network?.name ?? data.webChannel?.name ?? "Desconocida",
      language: data.language ?? "",
      runtime: data.averageRuntime ?? data.runtime ?? null,
      officialSite: data.officialSite ?? null
    };
  } catch (error) {
    console.error("Error al obtener datos de la serie:", error);
    throw error;
  }
};

/**
 * Obtiene los episodios agrupados por temporada.
 */
export const getEpisodeList = async (id) => {
  const URL = `${API_BASE}/shows/${id}/episodes`;
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const episodes = await response.json();

    const episodeList = episodes.map((episode) => ({
      number: episode.number,
      season: episode.season,
      name: episode.name,
      rating: episode.rating?.average ?? 0,
      airdate: episode.airdate
    }));

    return Object.groupBy(episodeList, (ep) => ep.season);
  } catch (error) {
    console.error("Error al obtener la lista de episodios:", error);
    throw error;
  }
};

/**
 * Busca series por nombre. Devuelve un array con los resultados.
 */
export const searchShows = async (query) => {
  const URL = `${API_BASE}/search/shows?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const results = await response.json();

    // Aplanamos el resultado para hacerlo más cómodo de consumir
    return results.map((item) => ({
      id: item.show.id,
      name: item.show.name,
      image: item.show.image?.medium ?? PLACEHOLDER_IMAGE,
      rating: item.show.rating?.average ?? null,
      premiered: item.show.premiered ?? "",
      genres: item.show.genres ?? [],
      summary: item.show.summary ?? ""
    }));
  } catch (error) {
    console.error("Error al buscar series:", error);
    throw error;
  }
};