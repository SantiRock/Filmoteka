!function(){function e(e,t,n,a){Object.defineProperty(e,t,{get:n,set:a,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},t.parcelRequired7c6=o),o.register("5TAx9",(function(t,n){e(t.exports,"render",(function(){return d})),e(t.exports,"paginationH",(function(){return l}));var a=o("4iEUr");console.log(localStorage);var r=1,c=50,i=document.querySelector(".screen");var d=function(){(i.style.display="flex",fetch("https://api.themoviedb.org/3/trending/".concat("all","/").concat("week","?api_key=0a3a4e00d84de20a8f1b6dfc8a7cdfd5&per_page=18&page=").concat(r)).then((function(e){if(!e.ok)throw i.style.display="none",new Error(e.status);return e.json()})).finally((function(){return i.style.display="none"}))).then((function(e){return(0,a.default)(e)}))};d();var s=document.querySelector(".pages"),l=function(){var e=function(e){var t=document.createElement("button");t.classList.add("page"),t.textContent=e,t.disabled=e===r,e===r?t.classList.add("activePage"):t.classList.remove("activePage"),t.addEventListener("click",(function(){r=e,d(),l()})),s.append(t)};s.innerHTML="";var t=document.createElement("button");t.textContent="←",t.classList.add("pagebtn"),t.disabled=1===r,t.addEventListener("click",(function(){r--,d(),l()})),s.append(t);var n=document.createElement("button");n.textContent="1",n.classList.add("page"),n.disabled=1===r,n.addEventListener("click",(function(){r=1,d(),l()})),s.append(n);var a=document.createElement("div");a.textContent="...",a.classList.add("dots"),s.append(a);var o,i=Math.max(r-Math.floor(2.5),1),u=Math.max(r-5+1,1),f=Math.max(r-5+2,1);o=r===c?u:49===r?f:i;for(var p=Math.min(o+5-1,c),g=o;g<=p;g++)e(g);var v=document.createElement("div");v.textContent="...",v.classList.add("dots"),s.append(v);var m=document.createElement("button");m.textContent=c,m.classList.add("page"),m.disabled=r===c,m.addEventListener("click",(function(){r=c,d(),l()})),s.append(m);var h=document.createElement("button");h.textContent="→",h.classList.add("pagebtn"),h.disabled=r===c,h.addEventListener("click",(function(){r++,d(),l()})),s.append(h)};l()})),o.register("4iEUr",(function(t,n){e(t.exports,"default",(function(){return i}));var a=o("twtVq"),r=o("5xtVg"),c=document.querySelector(".films");var i=function e(t){c.innerHTML="",0===a.genresArr.length&&(0,a.loadGenres)().then((function(){e(t)})),t.results.slice(0,12).map((function(e){for(var t=function(e){var t=a.genresArr.find((function(t){return t.id===n[e]}));if(!t)return"continue";o.push(t.name)},n=e.genre_ids,o=[],i=0;i<n.length;i++)t(i);var d=o.join(", "),s=e.poster_path?"https://image.tmdb.org/t/p/w500".concat(e.poster_path):"https://via.placeholder.com/500x750?text=No+poster+available",l=document.createElement("div");l.classList.add("films__card"),l.innerHTML='\n        <img class= "films__poster" src='.concat(s,'></> \n        <p class= "films__title">').concat(e.title||e.name,'</p>\n        <p class= "films__details">').concat(d," | ").concat(e.release_date&&e.release_date.slice(0,4)||e.first_air_date.slice(0,4),"</p>\n        <div class='films__rate'>").concat(e.vote_average.toFixed(1),"</div>\n    "),c.appendChild(l),l.addEventListener("click",(function(){(0,r.default)(e)}))})).join("")}})),o.register("twtVq",(function(t,n){e(t.exports,"genresArr",(function(){return a})),e(t.exports,"loadGenres",(function(){return o}));var a=[];function o(){return fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=0a3a4e00d84de20a8f1b6dfc8a7cdfd5&language=en-US").then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then((function(e){return a=e.genres}))}})),o.register("5xtVg",(function(t,n){e(t.exports,"default",(function(){return c}));var a=o("6Sco9"),r=o("twtVq");var c=function(e){for(var t=function(e){var t=r.genresArr.find((function(t){return t.id===s[e]}));if(!t)return"continue";l.push(t.name)},n=document.querySelector(".modalw"),o=(e.title||e.name).toUpperCase(),c=(e.original_title||e.name).toUpperCase(),i=e.popularity.toFixed(1),d=e.vote_average.toFixed(1),s=e.genre_ids,l=[],u=0;u<s.length;u++)t(u);var f=l.join(", "),p='\n      <div class="modal-header">\n        \n        <button class="modal-close">&times;</button>\n      </div>\n      <div class=\'poster_container\'>\n        <img class="modal-poster" src="https://image.tmdb.org/t/p/w500'.concat(e.poster_path,'" alt="').concat(o,'">\n      </div>\n      <div class=\'info\'>\n        <h3 class="modal-title">').concat(o,"</h3>\n\n        <table>\n          <tr>\n            <th class='t1'>Vote / Votes</th>\n            <th><span class='films__rate'>").concat(d,"</span> / ").concat(e.vote_count,"</th>\n          </tr>\n          <tr>\n            <th class='t1'>Popularity</th>\n            <th>").concat(i,"</th>\n          </tr>\n          <tr>\n            <th class='t1'>Original Title</th>\n            <th>").concat(c,"</th>\n          </tr>\n          <tr>\n            <th class='t1'>Genre</th>\n            <th>").concat(f,"</th>\n          </tr>\n        </table>\n          <p>ABOUT</p>\n          <p class='about'>").concat(e.overview,'</p>\n          <div class="modal-btns">\n            <button class="addw">ADD TO WATCHED</button>\n            <button class="addq">ADD TO QUEUE</button>\n        </div>\n      </div>\n    '),g=document.createElement("div");g.innerHTML=p,g.classList.add("modal-content"),n.appendChild(g),n.style.display="flex",g.querySelector(".modal-close").addEventListener("click",(function(){n.style.display="none",g.remove()}));var v=a.watchedLocalStorage.watchedId,m=a.queueLocalStorage.queueId,h=g.querySelector(".addw"),b=g.querySelector(".addq");v.includes(e.id)&&(h.style.backgroundColor="rgba(255, 107, 1, 0.5)",h.style.cursor="default",b.style.cursor="default"),m.includes(e.id)&&(b.style.cursor="default"),h.disabled=v.includes(e.id),h.addEventListener("click",(function(){if(v.push(e.id),localStorage.setItem("watched",JSON.stringify(a.watchedLocalStorage)),h.style.backgroundColor="rgba(255, 107, 1, 0.5)",h.disabled=v.includes(e.id),b.disabled=m.includes(e.id)||v.includes(e.id),m.includes(e.id)){var t=m.indexOf(e.id);m.splice(t,1),localStorage.setItem("queue",JSON.stringify(a.queueLocalStorage))}h.style.cursor="default",b.style.cursor="default",console.log(localStorage)})),b.disabled=m.includes(e.id)||v.includes(e.id),b.addEventListener("click",(function(){m.push(e.id),localStorage.setItem("queue",JSON.stringify(a.queueLocalStorage)),b.disabled=m.includes(e.id)||v.includes(e.id),b.style.cursor="default",console.log(localStorage)})),document.addEventListener("keydown",(function(e){"Escape"===e.key&&(n.style.display="none",g.remove())})),document.addEventListener("click",(function(e){e.target===n&&(n.style.display="none",g.remove())}))}})),o.register("6Sco9",(function(t,n){e(t.exports,"watchedLocalStorage",(function(){return a})),e(t.exports,"queueLocalStorage",(function(){return o})),e(t.exports,"getLocalq",(function(){return r})),e(t.exports,"getLocalw",(function(){return c}));var a={watchedId:[]},o={queueId:[]};function r(){null===localStorage.getItem("queue")?o.watchedId=[]:o.queueId=JSON.parse(localStorage.getItem("queue")).queueId}function c(){null===localStorage.getItem("watched")?a.watchedId=[]:a.watchedId=JSON.parse(localStorage.getItem("watched")).watchedId}r(),c()})),o("5TAx9")}();
//# sourceMappingURL=index.0a022b00.js.map