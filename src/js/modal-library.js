import { watchedLocalStorage, queueLocalStorage } from "./localstorage";


function displayMovieDetails(movie) {
  const modal = document.querySelector(".modalw");
  const title1 = movie.title || movie.name;
  const title = title1.toUpperCase();
  const orgtitle1 = movie.original_title || movie.name;
  const orgtitle = orgtitle1.toUpperCase();
  //const orgtitle = 'hello'; 
  const popularity = movie.popularity.toFixed(1);
  const rate = movie.vote_average.toFixed(1);
  const genres = movie.genres.map(genre => genre.name).join(', ');
    
    const modalContent = `
      <div class="modal-header">
        
        <button class="modal-close">&times;</button>
      </div>
      <div class='poster_container'>
        <img class="modal-poster" src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.title}">
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
            <th>${genres}</th>
          </tr>
        </table>
          <p>ABOUT</p>
          <p class='about'>${movie.overview}</p>
          <div class="modal-btns">
            <button class="addw">ADD TO WATCHED</button>
            <button class="addq">ADD TO QUEUE</button>
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
    //console.log(wls.includes(movie.id));

    if (wls.includes(movie.id)) {
      watchButton.style.backgroundColor = 'rgba(255, 107, 1, 0.5)'
    };

    if (qls.includes(movie.id)) {
      //console.log('yes');
      //console.log(qls.findIndex(movie.id));
    }
    
    watchButton.disabled = wls.includes(movie.id);
    watchButton.addEventListener("click", () => {
      wls.push(movie.id);
      localStorage.setItem('watched', JSON.stringify(watchedLocalStorage));
      watchButton.style.backgroundColor = 'rgba(255, 107, 1, 0.5)'
      watchButton.disabled = wls.includes(movie.id);
      queueButton.disabled = qls.includes(movie.id) || wls.includes(movie.id);
      console.log(localStorage);
    });

    const queueButton = modalContentWrapper.querySelector(".addq");
    
    queueButton.disabled = qls.includes(movie.id) || wls.includes(movie.id);
    queueButton.addEventListener("click", () => {
      qls.push(movie.id)
      localStorage.setItem('queue', JSON.stringify(queueLocalStorage));
      queueButton.disabled = qls.includes(movie.id) || wls.includes(movie.id);
      console.log(localStorage)
    });
  

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

/*
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
  }*/
  
  export default displayMovieDetails;