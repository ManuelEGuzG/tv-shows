(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`2993`,t=`https://api.tvmaze.com`,n=async e=>{let n=`${t}/shows/${e}`;try{let e=await fetch(n);if(!e.ok)throw Error(`HTTP Error: ${e.status}`);let t=await e.json();return{id:t.id,name:t.name,rating:t.rating,image:t.image?.original??t.image?.medium??`https://placehold.co/210x295/1a1a2e/eee?text=Sin+imagen`,summary:t.summary??``,genres:t.genres??[],premiered:t.premiered??``,ended:t.ended??null,status:t.status??``,network:t.network?.name??t.webChannel?.name??`Desconocida`,language:t.language??``,runtime:t.averageRuntime??t.runtime??null,officialSite:t.officialSite??null}}catch(e){throw console.error(`Error al obtener datos de la serie:`,e),e}},r=async e=>{let n=`${t}/shows/${e}/episodes`;try{let e=await fetch(n);if(!e.ok)throw Error(`HTTP Error: ${e.status}`);let t=(await e.json()).map(e=>({number:e.number,season:e.season,name:e.name,rating:e.rating?.average??0,airdate:e.airdate}));return Object.groupBy(t,e=>e.season)}catch(e){throw console.error(`Error al obtener la lista de episodios:`,e),e}},i=async e=>{let n=`${t}/search/shows?q=${encodeURIComponent(e)}`;try{let e=await fetch(n);if(!e.ok)throw Error(`HTTP Error: ${e.status}`);return(await e.json()).map(e=>({id:e.show.id,name:e.show.name,image:e.show.image?.medium??`https://placehold.co/210x295/1a1a2e/eee?text=Sin+imagen`,rating:e.show.rating?.average??null,premiered:e.show.premiered??``,genres:e.show.genres??[],summary:e.show.summary??``}))}catch(e){throw console.error(`Error al buscar series:`,e),e}},a={calendar:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,clock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,network:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M8.5 16.42a6 6 0 0 1 7 0"/><line x1="12" y1="20" x2="12" y2="20"/></svg>`,star:`<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,link:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`},o=e=>{let t=e.rating?.average??`N/A`,n=e.genres.length?e.genres.map(e=>`<span class="tag">${e}</span>`).join(``):``,r=e.ended?`${e.premiered?.slice(0,4)} - ${e.ended.slice(0,4)}`:e.premiered?`${e.premiered.slice(0,4)} - Presente`:``,i=e.summary?e.summary.replace(/<[^>]+>/g,``):`Sin descripción disponible.`;return`
    <div class="show-card">
      <img class="poster" src="${e.image}" alt="Poster de ${e.name}" />
      <div class="show-info">
        <div class="show-meta">
          <span class="status-badge status-${e.status?.toLowerCase()}">${e.status}</span>
          ${r?`<span class="meta-item">${a.calendar} ${r}</span>`:``}
          ${e.runtime?`<span class="meta-item">${a.clock} ${e.runtime} min</span>`:``}
          <span class="meta-item">${a.network} ${e.network}</span>
        </div>
        <h1 class="show-title">${e.name}</h1>
        <div class="show-rating-block">
          <span class="big-rating">${a.star} ${t}</span>
          <div class="genres">${n}</div>
        </div>
        <p class="show-summary">${i}</p>
        ${e.officialSite?`<a href="${e.officialSite}" target="_blank" rel="noopener" class="official-link">${a.link} Sitio oficial</a>`:``}
      </div>
    </div>
  `},s=e=>e?`rating-${Math.min(Math.floor(e),10)}`:`rating-0`,c=e=>{let t=s(e.rating),n=e.rating?e.rating.toFixed(1):`N/A`;return`
    <div class="episode ${t}" title="${`T${e.season}E${e.number} · ${e.name} · ⭐ ${n}`}">
      ${e.number}
    </div>
  `},l=(e,t)=>{let n=e.map(c).join(``),r=(e.reduce((e,t)=>e+(t.rating||0),0)/e.filter(e=>e.rating).length).toFixed(1);return`
    <article class="season">
      <header class="season-header" title="Promedio temporada: ${r}">
        T${t}
      </header>
      <div class="season-episodes">
        ${n}
      </div>
      <span class="season-avg">${r}</span>
    </article>
  `},u={star:`<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`},d=e=>{let t=e.summary?e.summary.replace(/<[^>]+>/g,``).slice(0,120)+`...`:`Sin descripción.`,n=e.rating?`<span>${u.star} ${e.rating}</span>`:`<span>Sin rating</span>`,r=e.premiered?e.premiered.slice(0,4):`—`,i=e.genres.slice(0,2).join(` · `)||`Sin género`;return`
    <article class="result-card" data-id="${e.id}">
      <img src="${e.image}" alt="${e.name}" class="result-poster" />
      <div class="result-info">
        <h3 class="result-title">${e.name}</h3>
        <div class="result-meta">
          <span>${r}</span>
          ${n}
        </div>
        <p class="result-genres">${i}</p>
        <p class="result-summary">${t}</p>
        <button class="result-btn">Ver detalles</button>
      </div>
    </article>
  `},f=(e,t)=>{if(!e.length)return`
      <div class="no-results">
        <p>No se encontraron series para "<strong>${t}</strong>"</p>
      </div>
    `;let n=e.map(d).join(``);return`
    <h2 class="section-title">Resultados para "${t}" (${e.length})</h2>
    <div class="results-grid">${n}</div>
  `},p=document.getElementById(`search-form`),m=document.getElementById(`search-input`),h=document.getElementById(`search-results`),g=document.getElementById(`show-header`),_=document.getElementById(`episodes`),v=document.getElementById(`section-title`),y=document.getElementById(`legend`),b=document.getElementById(`loader`),x=()=>b.hidden=!1,S=()=>b.hidden=!0,C=()=>{g.innerHTML=``,_.innerHTML=``,v.hidden=!0,y.hidden=!0},w=()=>{h.hidden=!0,h.innerHTML=``},T=async e=>{w(),C(),x();try{let[t,i]=await Promise.all([n(e),r(e)]);g.innerHTML=o(t),_.innerHTML=Object.values(i).map((e,t)=>l(e,t+1)).join(``),v.hidden=!1,y.hidden=!1,window.scrollTo({top:0,behavior:`smooth`})}catch(e){g.innerHTML=`
      <div class="error">
        ⚠️ Error al cargar la serie. Intenta otra búsqueda.
      </div>
    `,console.error(e)}finally{S()}},E=async e=>{C(),x();try{h.innerHTML=f(await i(e),e),h.hidden=!1}catch(e){h.innerHTML=`<div class="error">⚠️ Error al buscar.</div>`,h.hidden=!1,console.error(e)}finally{S()}};p.addEventListener(`submit`,e=>{e.preventDefault();let t=m.value.trim();t&&E(t)}),h.addEventListener(`click`,e=>{let t=e.target.closest(`.result-card`);if(!t)return;let n=t.dataset.id;n&&T(n)}),T(e);