const films = document.querySelector('.films');

function renderFilms(film) {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const posterSize = 'w500';
    // 'w92', 'w185', 'w500',
    const poster = baseUrl + posterSize + film.poster_path;
    const title = film.title.toUpperCase();
    const rate = film.vote_average.toFixed(1);
    const year = film.release_date.slice(0,4);
    let genres = film.genres.map(genre => genre.name).join(', ');

    const card = document.createElement('div');
    //card.classList.add('card');
    films.append(card);

    let markup = `
    <img class='films__poster' src=${poster} alt=${title} loading='lazy' class='poster'>
    <p class='films__title'>${title}</p>
    <p class='films__details'>${genres} | ${year}</p>
    <div class='films__rate'>${rate}</div>
    `;

    card.innerHTML = markup;     
};

export default renderFilms;