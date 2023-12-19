const watchedLocalStorage = { watchedId: [] };


function getLocalw () {
    if (localStorage.getItem('watched') === null) {
        watchedLocalStorage.watchedId = [];
    } else {
        watchedLocalStorage.watchedId = JSON.parse(localStorage.getItem('watched')).watchedId;
    }
}

getLocalw();

export {watchedLocalStorage, getLocalw};