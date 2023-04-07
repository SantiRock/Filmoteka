let genresArr = [];

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

  export { genresArr, loadGenres};