import { genresArr, loadGenres } from "./genres";
import displayMovieDetails from './modal';


const filmsContainer = document.querySelector('.films');
const moviesPerPage = 12;

// Diseño de tarjetas (posters)

function makeMoviesPosters(arr) {
  filmsContainer.innerHTML = '';

  if (genresArr.length === 0) {
    loadGenres().then(() => {
      makeMoviesPosters(arr);
    });
  }

  const moviesToDisplay = arr.results.slice(0, moviesPerPage);
 
  const moviesList = moviesToDisplay
    .map(movie => {
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

      const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+poster+available';

      const filmCard = document.createElement('div');
      filmCard.classList.add('films__card');
      filmCard.innerHTML = `
        <img class= "films__poster" src=${posterPath}></> 
        <p class= "films__title">${movie.title || movie.name}</p>
        <p class= "films__details">${gNames} | ${
        (movie.release_date && movie.release_date.slice(0, 4)) ||
        movie.first_air_date.slice(0, 4)
      }</p>
        <div class='films__rate'>${movie.vote_average.toFixed(1)}</div>
    `;
    filmsContainer.appendChild(filmCard);
    filmCard.addEventListener("click", () => {
      displayMovieDetails(movie);
      })
    })
    .join('');
}

export default makeMoviesPosters;
