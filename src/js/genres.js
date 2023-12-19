require('dotenv').config();
const apiKey = process.env.API_KEY;

let genresArr = [];

function loadGenres() {
    return fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
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

  export { genresArr, loadGenres};