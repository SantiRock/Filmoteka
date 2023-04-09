import '../sass/index.scss';
import renderFilms from './librarycard';
import pagination from './pagination';
import { watchedLocalStorage, queueLocalStorage, getLocalq, getLocalw } from "./localstorage";

// DOM -----
const watched = document.querySelector('.watched');
const queue = document.querySelector('.queue');
const films = document.querySelector('.films');
const msn = document.querySelector('.msn');
const pages = document.querySelector('.pages');
const screen = document.querySelector('.screen');
const itemsPerPage = 12;
let currentPage = 1;

console.log(localStorage);
getLocalq();
getLocalw();

//console.log(watchedLocalStorage.watchedId);
let queueIds = queueLocalStorage.queueId;
let watchedIds = watchedLocalStorage.watchedId;


if (localStorage.getItem('queue') === null) {
    queueIds = [];
} else {
 queueIds = JSON.parse(localStorage.getItem('queue')).queueId;
};

if (localStorage.getItem('watched') === null) {
    watchedIds = [];
} else {
 watchedIds = JSON.parse(localStorage.getItem('watched')).watchedId;
};



// Event Listeners ---

watched.addEventListener('click', (event) => {
    event.preventDefault();
    watched.classList.add('selected');
    queue.classList.remove('selected');
    if (watchedIds.length === 0) {
        films.innerHTML = '';
        msn.textContent = 'No movies have been added to Watched list yet';
        pages.innerHTML = '';
    } else {
        getLocalStorage(watchedIds, currentPage, 'Watched');
        pagination(watchedIds, totalPagesW, currentPage);  
    }
});


queue.addEventListener('click', (event) => {
    event.preventDefault();
    queue.classList.add('selected');
    watched.classList.remove('selected');
    if (queueIds.length === 0) {
        films.innerHTML = '';
        msn.textContent = 'No movies have been added to Queue list yet';
        pages.innerHTML = '';
    } else {
        getLocalStorage(queueIds, currentPage);
        pagination(queueIds, totalPagesQ, currentPage);
    }
});



// Local Storage Manage  ---

const apiKey = '0a3a4e00d84de20a8f1b6dfc8a7cdfd5';




function getLocalStorage(arr, page) {
    if (arr.length === 0 ) {
        msn.textContent = 'No movies have been added to Watched list yet';
    } else {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToDisplay = arr.slice(startIndex, endIndex);
        films.innerHTML = '';
        itemsToDisplay.forEach(movie_id => {
            screen.style.display = 'flex';
            fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`)
            .then(response => response.json())
            .then(film => renderFilms(film))
            .catch(error => console.error(error))
            .finally(() => screen.style.display = 'none')
        })
        pagination(watchedIds, totalPagesW, currentPage);       
    }
}

//Pages
const totalPagesW = Math.ceil(watchedIds.length / itemsPerPage);
const totalPagesQ = Math.ceil(queueIds.length / itemsPerPage);

// Render by default

pages.innerHTML = '';
getLocalStorage(watchedIds, currentPage);





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

