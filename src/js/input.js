
import debounce from "lodash/debounce";
import { genresArr, loadGenres } from "./genres";
import { render, paginationH} from "./index";

const apiKey = '0a3a4e00d84de20a8f1b6dfc8a7cdfd5';
const searchInput = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-button')
const errorp = document.querySelector('.errormsn');
const moviesContainer = document.querySelector('.films');
const pages = document.querySelector('.pages');
const DEBOUNCE_DELAY = 300;

let word = '';
let currentPage = 1;
let totalPages = 50;
const pagesToShow = 5;
const moviesPerPage = 12;


// Fetch ------
function searchMovies() {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${word}&page=${currentPage}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.total_results === 0) {
            pages.innerHTML = '';
            errorp.textContent = 'Search result not successful. Enter the correct movie name and try again';
            moviesContainer.innerHTML = '';
        } else {
            totalPages = data.total_pages;
            errorp.textContent = '';
            prerender(data);
            pagination();
        }
    })
    .catch(error => console.error(error));
}

searchInput.addEventListener('keydown',
    debounce(() => {
        currentPage = 1;
        word = searchInput.value.trim();
        if(word === '') {
            errorp.textContent = '';
            render();
            paginationH();
        } else {
            searchMovies()    
        }
    }, DEBOUNCE_DELAY)
);

// Función que crea un elemento de película

function prerender (data) {
    moviesContainer.innerHTML = '';
    const moviesToDisplay = data.results.slice(0, moviesPerPage);

    if (genresArr.length === 0) {
        loadGenres().then(() => {
          prerender(data);
        });
      }

    moviesToDisplay.forEach(movie => {
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

        const movieElement = document.createElement('div');
        movieElement.classList.add('films__card');
        let genres = movie.genre_ids.map(id => id).join(', ');
        const year = movie.release_date.slice(0,4);
        const rate = movie.vote_average.toFixed(1);
        const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+poster+available';

        movieElement.innerHTML = `
        <img src="${posterPath}" alt="${movie.title}" class="films__poster">
        <p class="films__title">${movie.title}</p>
        <p class='films__details'>${gNames} | ${year}</p>
        <div class='films__rate'>${rate}</div>
        `;

        moviesContainer.appendChild(movieElement);
    })
}

// Pagination

pages.addEventListener('click', event => {
    const btn = event.target;
    if (btn.tagName !== 'BUTTON') return;
    if (btn.id === 'prev' && currentPage > 1) {
        currentPage--;
        searchMovies();
    } else if (btn.id === 'first' && currentPage > 1) {
        currentPage = 1;
        searchMovies();
    } else if (btn.id === 'next' && currentPage < totalPages) {
        currentPage++;
        searchMovies();
    } else if (btn.id === 'last' && currentPage < totalPages) {
        currentPage = totalPages;
        searchMovies();
    } else if (btn.id !== 'prev' && btn.id !== 'next' && btn.id) {
        currentPage = Number(btn.id);
        searchMovies();
    }
});

const pagination = () => {
    pages.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '<';
    prevBtn.classList.add('pagebtn');
    prevBtn.id = 'prev';
    prevBtn.disabled = currentPage === 1;
    pages.append(prevBtn);

    const first = document.createElement('button');
    first.textContent = '1';
    first.classList.add('page');
    first.id = 'first';
    first.disable = currentPage === 1;
    pages.append(first);

    const dots = document.createElement('div');
    dots.textContent = '...';
    dots.classList.add('dots');
    pages.append(dots);

    const st1 = Math.max(currentPage - Math.floor(pagesToShow/2), 1);
    const st2 = Math.max(currentPage - pagesToShow + 1, 1);
    const st3 = Math.max(currentPage - pagesToShow + 2, 1);

    let startPage;
    currentPage === totalPages ? startPage = st2 
    : currentPage === totalPages - 1 ? startPage = st3 : startPage = st1;

    const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
    for(let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.classList.add('page');
      pageButton.id = i;
      pageButton.textContent = i;
      pageButton.disable = i === currentPage;

      i === currentPage ? pageButton.classList.add('activePage') : pageButton.classList.remove('activePage');
      pages.append(pageButton);
    };

    const dots1 = document.createElement('div');
    dots1.textContent = '...';
    dots1.classList.add('dots');
    pages.append(dots1);

    const last = document.createElement('button');
    last.textContent = totalPages;
    last.classList.add('page');
    last.id = 'last';
    last.disable = currentPage === totalPages
    pages.append(last);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '>';
    nextBtn.classList.add('pagebtn');
    nextBtn.id = 'next';
    nextBtn.disabled = currentPage === totalPages;
    pages.append(nextBtn);
}

//----

searchBtn.addEventListener('click', event => {
    event.preventDefault();
})
