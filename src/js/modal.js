import { watchedLocalStorage, queueLocalStorage } from "./localstorage";
import { genresArr } from "./genres";


function displayMovieDetails(movie) {
  const modal = document.querySelector(".modalw");
  const title1 = movie.title || movie.name;
  const title = title1.toUpperCase();
  const orgtitle1 = movie.original_title || movie.name;
  const orgtitle = orgtitle1.toUpperCase();
  const popularity = movie.popularity.toFixed(1);
  const rate = movie.vote_average.toFixed(1);

  const genreNames = movie.genre_ids;
      const names = [];
  
      for (let i = 0; i < genreNames.length; i++) {
        let genre = genresArr.find(g => g.id === genreNames[i]);
        if (genre) {
          names.push(genre.name);
        } else { 
          continue;
        }
      }
      const gNames = names.join(', ');
    
    const modalContent = `
      <div class="modal-header">
        
        <button class="modal-close">&times;</button>
      </div>
      <div class='poster_container'>
        <img class="modal-poster" src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${title}">
      </div>
      <div class='info'>
        <h3 class="modal-title">${title}</h3>

        <table>
          <tr>
            <th class='t1'>Vote / Votes</th>
            <th><span class='films__rate'>${rate}</span> / ${movie.vote_count}</th>
          </tr>
          <tr>
            <th class='t1'>Popularity</th>
            <th>${popularity}</th>
          </tr>
          <tr>
            <th class='t1'>Original Title</th>
            <th>${orgtitle}</th>
          </tr>
          <tr>
            <th class='t1'>Genre</th>
            <th>${gNames}</th>
          </tr>
        </table>
          <p>ABOUT</p>
          <p class='about'>${movie.overview}</p>
          <div class="modal-btns">
            <button class="btnmodal addw">ADD TO WATCHED</button>
            <button class="btnmodal addq">ADD TO QUEUE</button>
        </div>
      </div>
    `;

    const modalContentWrapper = document.createElement("div");
    modalContentWrapper.innerHTML = modalContent;
    modalContentWrapper.classList.add("modal-content");
    modal.appendChild(modalContentWrapper);
    modal.style.display = "flex";
  
    const closeButton = modalContentWrapper.querySelector(".modal-close");
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
      modalContentWrapper.remove();
    });

    const wls = watchedLocalStorage.watchedId;
    const qls = queueLocalStorage.queueId;
  
    const watchButton = modalContentWrapper.querySelector(".addw");
    const queueButton = modalContentWrapper.querySelector(".addq");
    //console.log(wls.includes(movie.id));

    if (wls.includes(movie.id)) {
      watchButton.classList.add('btnmodal2')
      watchButton.classList.remove('btnmodal');
      watchButton.textContent = 'REMOVE FROM WATCHED';
      watchButton.addEventListener('click', () => {
        const i = wls.indexOf(movie.id);
        wls.splice(i, 1);
        localStorage.setItem('watched', JSON.stringify(watchedLocalStorage));
        watchButton.classList.add('btnmodal')
        watchButton.classList.remove('btnmodal2');
        watchButton.textContent = 'ADD TO WATCHED';
        modal.style.display = 'none';
        modalContentWrapper.remove();
        console.log(localStorage);
      });} else {
        watchButton.addEventListener("click", () => {
          wls.push(movie.id);
          localStorage.setItem('watched', JSON.stringify(watchedLocalStorage));
          if (qls.includes(movie.id)) {
            const i = qls.indexOf(movie.id);
            qls.splice(i, 1);
            localStorage.setItem('queue', JSON.stringify(queueLocalStorage));
          }
          watchButton.classList.add('btnmodal2')
          watchButton.classList.remove('btnmodal');
          watchButton.textContent = 'REMOVE FROM WATCHED'; 
          modal.style.display = 'none';
          modalContentWrapper.remove();
          console.log(localStorage);
        });
      };

    if (qls.includes(movie.id)) {
      queueButton.classList.add('btnmodal2')
      queueButton.classList.remove('btnmodal');
      queueButton.textContent = 'REMOVE FROM QUEUE';
      queueButton.addEventListener('click', () => {
        const i = qls.indexOf(movie.id);
        qls.splice(i, 1);
        localStorage.setItem('queue', JSON.stringify(queueLocalStorage));
        queueButton.classList.add('btnmodal')
        queueButton.classList.remove('btnmodal2');
        queueButton.textContent = 'ADD TO QUEUE';
        modal.style.display = 'none';
        modalContentWrapper.remove();
        console.log(localStorage)
      })} else {
        queueButton.addEventListener("click", () => {
          qls.push(movie.id)
          localStorage.setItem('queue', JSON.stringify(queueLocalStorage));
          queueButton.classList.add('btnmodal2')
          queueButton.classList.remove('btnmodal');
          queueButton.textContent = 'REMOVE FORM QUEUE';
          if (wls.includes(movie.id)) {
            const i = wls.indexOf(movie.id);
            wls.splice(i, 1);
            localStorage.setItem('watched', JSON.stringify(watchedLocalStorage))
          }
          modal.style.display = 'none';
          modalContentWrapper.remove();
          console.log(localStorage)
        })
      };
    
  
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        modal.style.display = 'none';
        modalContentWrapper.remove();
      }
    });

    document.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        modalContentWrapper.remove();
      }
    })
  }

  export default displayMovieDetails;


  function getGenres(genreIds) {
    const genres = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    return genreIds.map((id) => genres[id]).join(", ");
  }
  


