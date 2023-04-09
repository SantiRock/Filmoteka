import { watchedLocalStorage, queueLocalStorage } from "./localstorage";

function displayMovieDetails(film) {
  const posterPath = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` 
  : 'https://via.placeholder.com/500x750?text=No+poster+available';
  const title = film.title.toUpperCase();
  const rate = film.vote_average.toFixed(1);
  let genres = film.genres.map(genre => genre.name).join(', ');
    
  const modal = document.querySelector(".modalw");

  const modalContent = `
      <div class="modal-header">
        <button class="modal-close">&times;</button>
      </div>
      <div>
        <img class="modal-poster" src="${posterPath}" alt="${title}">
      </div>
      <div>
        <h2 class="modal-title">${title}</h2>
        <p class="modal-info">Vote Count: ${rate} | ${film.vote_count}<br>Popularity: ${
        film.popularity
      }<br>Original Title: ${film.original_title}<br>Genre: ${genres}</p>
        <p class="modal-about"><b>ABOUT</b><br>${film.overview}</p>
        <div class="modal-buttons">
          <button class="watch-btn">ADD TO WATCHED</button>
          <button class="queue-btn">ADD TO QUEUE</button>
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
  
    const watchButton = modalContentWrapper.querySelector(".watch-btn");
    const queueButton = modalContentWrapper.querySelector(".queue-btn");
    watchButton.disabled;
    queueButton.disabled;

    watchButton.addEventListener("click", () => {
    });
    queueButton.addEventListener("click", () => {
    });
  
    // Hide the modal window when the user clicks on the background or the close button
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "flex";
        modalContentWrapper.remove();
      }
    });
  }

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
  
  export default displayMovieDetails;