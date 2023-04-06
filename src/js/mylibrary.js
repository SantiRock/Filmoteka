import '../sass/index.scss';
import renderFilms from './librarycard';

// DOM -----
const watched = document.querySelector('.watched');
const queue = document.querySelector('.queue');
const films = document.querySelector('.films');
const itemsPerPage = 6;
let currentPage = 1;


// Event Listeners ---
watched.addEventListener('click', (event) => {
    event.preventDefault();
    watched.classList.add('selected');
    queue.classList.remove('selected');
    getLocalStorage(watchedIds, currentPage);
    pagination(watchedIds, totalPagesW, currentPage);
});

queue.addEventListener('click', (event) => {
    event.preventDefault();
    queue.classList.add('selected');
    watched.classList.remove('selected');
    getLocalStorage(queueIds, currentPage);
    pagination(queueIds, totalPagesQ, currentPage);
});

// Local Storage Example
const watchedLocalStorage = { watchedId: [76600, 726759, 638974, 677179, 849869, 603692, 493529, 447365, 83121, 816904, 997317, 346698, 739405, 932430] };
const queueLocalStorage = { queueId: [447365, 83121, 816904, 997317, 346698, 739405, 932430] };
localStorage.setItem('watched', JSON.stringify(watchedLocalStorage));
localStorage.setItem('queue', JSON.stringify(queueLocalStorage));


// Local Storage Manage  ---

const queueIds = JSON.parse(localStorage.getItem('queue')).queueId;
const watchedIds = JSON.parse(localStorage.getItem('watched')).watchedId;
const apiKey = '0a3a4e00d84de20a8f1b6dfc8a7cdfd5';

function getLocalStorage(arr, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = arr.slice(startIndex, endIndex)
    films.innerHTML = '';
    itemsToDisplay.forEach(movie_id => {
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .then(film => renderFilms(film))
        .catch(error => console.error(error));
    })
 }

// Render by default
getLocalStorage(watchedIds, currentPage);

// Pagination

let markup = `
<svg class="psvg">
  <use href="./images/symbol-defs.svg#icon-Arrow-left">
</svg>
`;

const totalPagesW = Math.ceil(watchedIds.length / itemsPerPage);
const totalPagesQ = Math.ceil(queueIds.length / itemsPerPage);
const pagesToShow = 5;
const pages = document.querySelector('.pages');
const pbtn = document.querySelector('.prevbtn');

const pagination = (arr, totalPages, currentPage) => {
    pages.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '<';
    //prevBtn.innerHTML = markup;
    prevBtn.classList.add('pagebtn');
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        currentPage--;
        getLocalStorage(arr, currentPage);
        pagination(arr, totalPages, currentPage);
    });
    pages.append(prevBtn);

    const first = document.createElement('button');
    first.textContent = '1';
    first.classList.add('page');
    first.disable = currentPage === 1;
    first.addEventListener('click', () => {
        currentPage = 1;
        getLocalStorage(arr, currentPage);
        pagination(arr, totalPages, currentPage);
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
        getLocalStorage(arr, currentPage);
        pagination(arr, totalPages, currentPage);
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
        getLocalStorage(arr, currentPage);
        pagination(arr, totalPages, currentPage);
    });
    pages.append(last);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '>';
    nextBtn.classList.add('pagebtn');
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        currentPage++;
        getLocalStorage(arr, currentPage);
        pagination(arr, totalPages, currentPage);
    });
    pages.append(nextBtn);
}

pagination(watchedIds, totalPagesW, currentPage);



// Tests
/*
 const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;
 fetch(url)
 .then(response => response.json())
 .then(data => getID(data.results))
 .catch(error => console.error(error));

function getID(data) {
    data.forEach(film => console.log(film.id))
}
*/

