(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`2993`,t=`https://api.tvmaze.com`,n=async e=>{let n=`${t}/shows/${e}`;try{let e=await fetch(n);if(!e.ok)throw Error(`HTTP Error: ${e.status}`);let t=await e.json();return{id:t.id,name:t.name,rating:t.rating,image:t.image?.original??t.image?.medium??`https://placehold.co/210x295/1a1a2e/eee?text=Sin+imagen`,summary:t.summary??``,genres:t.genres??[],premiered:t.premiered??``,ended:t.ended??null,status:t.status??``,network:t.network?.name??t.webChannel?.name??`Desconocida`,language:t.language??``,runtime:t.averageRuntime??t.runtime??null,officialSite:t.officialSite??null}}catch(e){throw console.error(`Error al obtener datos de la serie:`,e),e}},r=async e=>{let n=`${t}/shows/${e}/episodes`;try{let e=await fetch(n);if(!e.ok)throw Error(`HTTP Error: ${e.status}`);let t=(await e.json()).map(e=>({number:e.number,season:e.season,name:e.name,rating:e.rating?.average??0,airdate:e.airdate}));return Object.groupBy(t,e=>e.season)}catch(e){throw console.error(`Error al obtener la lista de episodios:`,e),e}},i=async e=>{let n=`${t}/search/shows?q=${encodeURIComponent(e)}`;try{let e=await fetch(n);if(!e.ok)throw Error(`HTTP Error: ${e.status}`);return(await e.json()).map(e=>({id:e.show.id,name:e.show.name,image:e.show.image?.medium??`https://placehold.co/210x295/1a1a2e/eee?text=Sin+imagen`,rating:e.show.rating?.average??null,premiered:e.show.premiered??``,genres:e.show.genres??[],summary:e.show.summary??``}))}catch(e){throw console.error(`Error al buscar series:`,e),e}},a=e=>{let t=e.rating?.average??`N/A`,n=e.genres.length?e.genres.map(e=>`<span class="tag">${e}</span>`).join(``):``,r=e.ended?`${e.premiered?.slice(0,4)} - ${e.ended.slice(0,4)}`:e.premiered?`${e.premiered.slice(0,4)} - Presente`:``,i=e.summary?e.summary.replace(/<[^>]+>/g,``):`Sin descripción disponible.`;return`
    <div class="show-card">
      <img class="poster" src="${e.image}" alt="Poster de ${e.name}" />
      <div class="show-info">
        <div class="show-meta">
          <span class="status-badge status-${e.status?.toLowerCase()}">${e.status}</span>
          <span class="meta-item">📅 ${r}</span>
          ${e.runtime?`<span class="meta-item">⏱️ ${e.runtime} min</span>`:``}
          <span class="meta-item">📡 ${e.network}</span>
        </div>
        <h1 class="show-title">${e.name}</h1>
        <div class="show-rating-block">
          <span class="big-rating">⭐ ${t}</span>
          <div class="genres">${n}</div>
        </div>
        <p class="show-summary">${i}</p>
        ${e.officialSite?`<a href="${e.officialSite}" target="_blank" rel="noopener" class="official-link">🔗 Sitio oficial</a>`:``}
      </div>
    </div>
  `},o=e=>e?`rating-${Math.min(Math.floor(e),10)}`:`rating-0`,s=e=>{let t=o(e.rating),n=e.rating?e.rating.toFixed(1):`N/A`;return`
    <div class="episode ${t}" title="${`T${e.season}E${e.number} · ${e.name} · ⭐ ${n}`}">
      ${e.number}
    </div>
  `},c=(e,t)=>{let n=e.map(s).join(``),r=(e.reduce((e,t)=>e+(t.rating||0),0)/e.filter(e=>e.rating).length).toFixed(1);return`
    <article class="season">
      <header class="season-header" title="Promedio temporada: ${r}">
        T${t}
      </header>
      <div class="season-episodes">
        ${n}
      </div>
      <span class="season-avg">${r}</span>
    </article>
  `},l=e=>{let t=e.summary?e.summary.replace(/<[^>]+>/g,``).slice(0,120)+`...`:`Sin descripción.`,n=e.rating?`⭐ ${e.rating}`:`Sin rating`,r=e.premiered?e.premiered.slice(0,4):`—`,i=e.genres.slice(0,2).join(` · `)||`Sin género`;return`
    <article class="result-card" data-id="${e.id}">
      <img src="${e.image}" alt="${e.name}" class="result-poster" />
      <div class="result-info">
        <h3 class="result-title">${e.name}</h3>
        <div class="result-meta">
          <span>${r}</span>
          <span>${n}</span>
        </div>
        <p class="result-genres">${i}</p>
        <p class="result-summary">${t}</p>
        <button class="result-btn">Ver detalles →</button>
      </div>
    </article>
  `},u=(e,t)=>{if(!e.length)return`
      <div class="no-results">
        <p>😕 No se encontraron series para "<strong>${t}</strong>"</p>
      </div>
    `;let n=e.map(l).join(``);return`
    <h2 class="section-title">Resultados para "${t}" (${e.length})</h2>
    <div class="results-grid">${n}</div>
  `},d=document.getElementById(`search-form`),f=document.getElementById(`search-input`),p=document.getElementById(`search-results`),m=document.getElementById(`show-header`),h=document.getElementById(`episodes`),g=document.getElementById(`section-title`),_=document.getElementById(`legend`),v=document.getElementById(`loader`),y=()=>v.hidden=!1,b=()=>v.hidden=!0,x=()=>{m.innerHTML=``,h.innerHTML=``,g.hidden=!0,_.hidden=!0},S=()=>{p.hidden=!0,p.innerHTML=``},C=async e=>{S(),x(),y();try{let[t,i]=await Promise.all([n(e),r(e)]);m.innerHTML=a(t),h.innerHTML=Object.values(i).map((e,t)=>c(e,t+1)).join(``),g.hidden=!1,_.hidden=!1,window.scrollTo({top:0,behavior:`smooth`})}catch(e){m.innerHTML=`
      <div class="error">
        ⚠️ Error al cargar la serie. Intenta otra búsqueda.
      </div>
    `,console.error(e)}finally{b()}},w=async e=>{x(),y();try{p.innerHTML=u(await i(e),e),p.hidden=!1}catch(e){p.innerHTML=`<div class="error">⚠️ Error al buscar.</div>`,p.hidden=!1,console.error(e)}finally{b()}};d.addEventListener(`submit`,e=>{e.preventDefault();let t=f.value.trim();t&&w(t)}),p.addEventListener(`click`,e=>{let t=e.target.closest(`.result-card`);if(!t)return;let n=t.dataset.id;n&&C(n)}),C(e);