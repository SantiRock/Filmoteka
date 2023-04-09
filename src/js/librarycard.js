import displayMovieDetails from './modal-library';

const films = document.querySelector('.films');

function renderFilms(film) {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const posterSize = 'w500';
    // 'w92', 'w185', 'w500',
    const posterPath = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+poster+available';
    const title = film.title.toUpperCase();
    const rate = film.vote_average.toFixed(1);
    const year = film.release_date.slice(0,4);
    let genres = film.genres.map(genre => genre.name).join(', ');

    const card = document.createElement('div');
    card.classList.add('films__card');
   
    let markup = `
    <img class='films__poster' src=${posterPath} alt=${title} loading='lazy' class='poster'>
    <p class='films__title'>${title}</p>
    <p class='films__details'>${genres} | ${year}</p>
    <div class='films__rate'>${rate}</div>
    `;
    card.innerHTML = markup;

    films.appendChild(card);
    card.addEventListener("click", () => {
        displayMovieDetails(film);
    })
};

export default renderFilms;