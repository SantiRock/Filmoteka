import { watchedLocalStorage } from "./localstorage";
import { genresArr } from "./genres";


function displayMovieDetails(movie) {
  const modal = document.querySelector(".modalw");
  const title1 = movie.title || movie.name;
  const title = title1.toUpperCase();
  const orgtitle1 = movie.original_title || movie.name;
  const orgtitle = orgtitle1.toUpperCase();
  const popularity = movie.popularity.toFixed(1);
  const rate = movie.vote_average.toFixed(1);
  const year = movie.release_date && movie.release_date.slice(0, 4) || movie.first_air_date.slice(0, 4);


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
            <th class='t1'>Year</th>
            <th>${year}</th>
          </tr>
          <tr>
            <th class='t1'>Genre</th>
            <th>${gNames}</th>
          </tr>
        </table>
          <p>ABOUT</p>
          <p class='about'>${movie.overview}</p>
          <div class="modal-btns">
            <button class="btnmodal addw">ADD TO LIBRARY</button>
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

    const watchButton = modalContentWrapper.querySelector(".addw");
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
        watchButton.textContent = 'ADD TO LIBRARY';
        modal.style.display = 'none';
        modalContentWrapper.remove();
        //console.log(localStorage);
      });} else {
        watchButton.addEventListener("click", () => {
          wls.push(movie.id);
          localStorage.setItem('watched', JSON.stringify(watchedLocalStorage));
          watchButton.classList.add('btnmodal2')
          watchButton.classList.remove('btnmodal');
          watchButton.textContent = 'REMOVE FROM LIBRARY'; 
          modal.style.display = 'none';
          modalContentWrapper.remove();
          //console.log(localStorage);
        });
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



