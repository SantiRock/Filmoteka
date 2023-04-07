const filmsContainer = document.querySelector('.films');

const moviesPerPage = 12;
let genresArr = [];

// Cargar géneros
function loadGenres() {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=0a3a4e00d84de20a8f1b6dfc8a7cdfd5&language=en-US`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(array => {
      genresArr = array.genres;
      return genresArr;
    });
}

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
      const genreNames = movie.genre_ids
        .map(genreId => {
          const genre = genresArr.find(g => g.id === genreId);
          return genre ? genre.name : '';
        })
        .join(', ');
      return `
      <div class='films__card'>
        <img class= "films__poster" src='https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }'></> 
        <p class= "films__title">${movie.title || movie.name}</p>
        <p class= "films__details">${genreNames} | ${
        (movie.release_date && movie.release_date.slice(0, 4)) ||
        movie.first_air_date.slice(0, 4)
      }</p>
        <div class='films__rate'>${movie.vote_average.toFixed(1)}</div>
      </div>
    `;
    })
    .join('');

  filmsContainer.innerHTML = moviesList;
}

export default makeMoviesPosters;
