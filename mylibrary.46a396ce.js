const e=document.querySelector(".films");var t=function(t){const a="https://image.tmdb.org/t/p/w500"+t.poster_path,n=t.title.toUpperCase(),s=t.vote_average.toFixed(1),c=t.release_date.slice(0,4);let d=t.genres.map((e=>e.name)).join(", ");const l=document.createElement("div");e.append(l);let o=`\n    <img class='films__poster' src=${a} alt=${n} loading='lazy' class='poster'>\n    <p class='films__title'>${n}</p>\n    <p class='films__details'>${d} | ${c}</p>\n    <div class='films__rate'>${s}</div>\n    `;l.innerHTML=o};const a=document.querySelector(".watched"),n=document.querySelector(".queue"),s=document.querySelector(".films");a.addEventListener("click",(e=>{e.preventDefault(),a.classList.add("selected"),n.classList.remove("selected"),l(d,1),m(d,o,1)})),n.addEventListener("click",(e=>{e.preventDefault(),n.classList.add("selected"),a.classList.remove("selected"),l(c,1),m(c,i,1)}));localStorage.setItem("watched",JSON.stringify({watchedId:[76600,726759,638974,677179,849869,603692,493529,447365,83121,816904,997317,346698,739405,932430]})),localStorage.setItem("queue",JSON.stringify({queueId:[447365,83121,816904,997317,346698,739405,932430]}));const c=JSON.parse(localStorage.getItem("queue")).queueId,d=JSON.parse(localStorage.getItem("watched")).watchedId;function l(e,a){const n=12*(a-1),c=n+12,d=e.slice(n,c);s.innerHTML="",d.forEach((e=>{fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=0a3a4e00d84de20a8f1b6dfc8a7cdfd5&language=en-US`).then((e=>e.json())).then((e=>t(e))).catch((e=>console.error(e)))}))}l(d,1);const o=Math.ceil(d.length/12),i=Math.ceil(c.length/12),r=document.querySelector(".pages"),m=(document.querySelector(".prevbtn"),(e,t,a)=>{r.innerHTML="";const n=document.createElement("button");n.textContent="<",n.classList.add("pagebtn"),n.disabled=1===a,n.addEventListener("click",(()=>{a--,l(e,a),m(e,t,a)})),r.append(n);const s=document.createElement("button");s.textContent="1",s.classList.add("page"),s.disable=1===a,s.addEventListener("click",(()=>{l(e,a=1),m(e,t,a)})),r.append(s);const c=document.createElement("div");c.textContent="...",c.classList.add("dots"),r.append(c);const d=Math.max(a-Math.floor(2.5),1),o=Math.max(a-5+1,1),i=Math.max(a-5+2,1);let p;p=a===t?o:a===t-1?i:d;const u=Math.min(p+5-1,t);for(let n=p;n<=u;n++){const s=document.createElement("button");s.classList.add("page"),s.textContent=n,s.disable=n===a,n===a?s.classList.add("activePage"):s.classList.remove("activePage"),s.addEventListener("click",(()=>{l(e,a=n),m(e,t,a)})),r.append(s)}const g=document.createElement("div");g.textContent="...",g.classList.add("dots"),r.append(g);const v=document.createElement("button");v.textContent=t,v.classList.add("page"),v.disable=a===t,v.addEventListener("click",(()=>{l(e,a=t),m(e,t,a)})),r.append(v);const h=document.createElement("button");h.textContent=">",h.classList.add("pagebtn"),h.disabled=a===t,h.addEventListener("click",(()=>{a++,l(e,a),m(e,t,a)})),r.append(h)});m(d,o,1);
//# sourceMappingURL=mylibrary.46a396ce.js.map