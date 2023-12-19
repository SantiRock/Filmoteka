require('dotenv').config();
import makeMoviesPosters from './homecard.js';
import '../sass/index.scss';

// Variables ----
const apiKey = process.env.API_KEY;
const media_type = 'movie';
const time_window = 'week';
let currentPage = 1;
let totalPages = 500;
const screen = document.querySelector('.screen');

// Fetch & Render ----
function uploadMovies() {
  screen.style.display = 'flex';
  return fetch(
    `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=${apiKey}&per_page=18&page=${currentPage}`
  ).then(response => {
    if (!response.ok) {
      screen.style.display = 'none';
      throw new Error(response.status);
    }
    return response.json();
  })
  .finally(() => screen.style.display = 'none')
}

const render = () => {
  uploadMovies().then(trendingMovies => {
    //totalPages = trendingMovies.total_pages;
    return makeMoviesPosters(trendingMovies);
  });
};

render();

// Paginación ----

const pages = document.querySelector('.pages');
const pagesToShow = 5;

const paginationH = () => {
    pages.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '←';
    prevBtn.classList.add('pagebtn');
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        currentPage--;
        render();
        paginationH();
    });
    pages.append(prevBtn);

    if( currentPage > 3) {
    const first = document.createElement('button');
    first.textContent = '1';
    first.classList.add('page');
    first.disabled = currentPage === 1;
    first.addEventListener('click', () => {
      currentPage = 1;
      render();
      paginationH();
    });
    pages.append(first);
    }

    if( currentPage > 4) {
      const dots = document.createElement('div');
      dots.textContent = '...';
      dots.classList.add('dots');
      pages.append(dots);
    }

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
      pageButton.textContent = i;
      pageButton.disabled = i === currentPage;

      i === currentPage ? pageButton.classList.add('activePage') : pageButton.classList.remove('activePage');

      pageButton.addEventListener('click', () => {
        currentPage = i;
        render();
        paginationH();
      });
      pages.append(pageButton);
    };

    if( currentPage < 497 ){
    const dots1 = document.createElement('div');
    dots1.textContent = '...';
    dots1.classList.add('dots');
    pages.append(dots1);

    }

    if(currentPage < 498) {
      const last = document.createElement('button');
      last.textContent = totalPages;
      last.classList.add('page');
      last.disabled = currentPage === totalPages
      last.addEventListener('click', () => {
        currentPage = totalPages;
        render();
        paginationH();
      });
      pages.append(last);
    }

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '→';
    nextBtn.classList.add('pagebtn');
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        currentPage++;
        render();
        paginationH();
    });
    pages.append(nextBtn);
}

paginationH();

export { render, paginationH};

