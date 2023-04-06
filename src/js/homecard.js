const filmsContainer = document.querySelector('.films');

const moviesPerPage = 12;

function makeMoviesPosters(arr) {
  filmsContainer.innerHTML = '';
  const moviesToDisplay = arr.results.slice(0, moviesPerPage);

  const moviesList = moviesToDisplay
    .map(movie => {
      return `
      <div class='films__card'>
        <img class= "films__poster" src='https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }'></> 
        <p class= "films__title">${movie.title || movie.name}</p>
        <p class= "films__details">${movie.genre_ids} | ${
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
