import makeMoviesPosters from './homecard.js';
import '../sass/index.scss';

// Variables ----
const media_type = 'all';
const time_window = 'week';
let currentPage = 1;
let totalPages = 50;

// Fetch & Render ----
function uploadMovies() {
  return fetch(
    `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=0a3a4e00d84de20a8f1b6dfc8a7cdfd5&per_page=18&page=${currentPage}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

const render = () => {
  uploadMovies().then(trendingMovies => {
    //totalPages = trendingMovies.total_pages;
    return makeMoviesPosters(trendingMovies);
  });
};

render();
export default render;

// Paginación ----

const pages = document.querySelector('.pages');
const pagesToShow = 5;

const pagination = () => {
    pages.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '<';
    prevBtn.classList.add('pagebtn');
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        currentPage--;
        render();
        pagination();
    });
    pages.append(prevBtn);

    const first = document.createElement('button');
    first.textContent = '1';
    first.classList.add('page');
    first.disable = currentPage === 1;
    first.addEventListener('click', () => {
      currentPage = 1;
      render();
      pagination();
    });
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
      pageButton.textContent = i;
      pageButton.disable = i === currentPage;

      i === currentPage ? pageButton.classList.add('activePage') : pageButton.classList.remove('activePage');

      pageButton.addEventListener('click', () => {
        currentPage = i;
        render();
        pagination();
      });
      pages.append(pageButton);
    };

    const dots1 = document.createElement('div');
    dots1.textContent = '...';
    dots1.classList.add('dots');
    pages.append(dots1);

    const last = document.createElement('button');
    last.textContent = totalPages;
    last.classList.add('page');
    last.disable = currentPage === totalPages
    last.addEventListener('click', () => {
      currentPage = totalPages;
      render();
      pagination();
    });
    pages.append(last);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '>';
    nextBtn.classList.add('pagebtn');
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        currentPage++;
        render();
        pagination();
    });
    pages.append(nextBtn);
}

pagination();

