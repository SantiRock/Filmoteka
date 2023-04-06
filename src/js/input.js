
import debounce from "lodash/debounce";
import render from "./index";


const apiKey = '0a3a4e00d84de20a8f1b6dfc8a7cdfd5';
const searchInput = document.getElementById('search-input');
const errorp = document.querySelector('.errormsn');
const moviesContainer = document.querySelector('.films');
const DEBOUNCE_DELAY = 300;

// Función que carga películas populares en la página de inicio
/*function loadPopularMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(movie => {
                const movieElement = createMovieElement(movie);
                moviesContainer.appendChild(movieElement);
            })
        })
        .catch(error => console.error(error));
} */

// Función que realiza la búsqueda de películas

function searchMovies1(name) {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${name}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
}


searchInput.addEventListener('input',
    debounce(() => {
        let trim = searchInput.value.trim();
        if(trim === '') {
            errorp.textContent = '';
            render();
        } else {
            searchMovies1(trim)
            .then(data => {
                if (data.total_results === 0) {
                    errorp.textContent = 'Search result not successful. Enter the correct movie name and try again';
                    moviesContainer.innerHTML = '';
                } else {
                    errorp.textContent = '';
                    moviesContainer.innerHTML = '';
                    data.results.forEach(movie => {
                        const movieElement = createMovieElement(movie);
                        moviesContainer.appendChild(movieElement);
                    })
                }
            })
            .catch(error => console.error(error));
        }
    }, DEBOUNCE_DELAY)

);

// Función que crea un elemento de película
function createMovieElement(movie) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('films__card');
    let genres = movie.genre_ids.map(id => id).join(', ');
    const year = movie.release_date.slice(0,4);
    const rate = movie.vote_average.toFixed(1);
    
    const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+poster+available';
    movieElement.innerHTML = `
    <img src="${posterPath}" alt="${movie.title}" class="films__poster">
    <p class="films__title">${movie.title}</p>
    <p class='films__details'>${genres} | ${year}</p>
    <div class='films__rate'>${rate}</div>
    `;
    return movieElement;
}

/*
function searchMovies(event) {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (searchInput.value === '') {
       uploadMovies();
    } else {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.total_results === 0) {
                const errorParagraph = document.createElement('p');
                errorParagraph.innerText = 'Search result not successful. Enter the correct movie name and try again';
                errorParagraph.style.backgroundColor = 'transparent';
                errorParagraph.style.color = '#FF0000';
                errorParagraph.style.position = 'fixed';
                errorParagraph.style.top = '15%';
                errorParagraph.style.left = '50%';
                errorParagraph.style.transform = 'translate(-50%, -50%)';
                document.body.appendChild(errorParagraph);
                setTimeout(() => {
                    errorParagraph.parentNode.removeChild(errorParagraph);
                }, 3000);
                moviesContainer.innerHTML = '';
            } else {
                moviesContainer.innerHTML = '';
                data.results.forEach(movie => {
                    const movieElement = createMovieElement(movie);
                    moviesContainer.appendChild(movieElement);
                })
            }
        })
        .catch(error => console.error(error));
    }
}*/