const watchedLocalStorage = { watchedId: [] };
const queueLocalStorage = { queueId: [] };

function getLocalq () {
    if (localStorage.getItem('queue') === null) {
        queueLocalStorage.watchedId = [];
    } else {
        queueLocalStorage.queueId = JSON.parse(localStorage.getItem('queue')).queueId;
    }
}

function getLocalw () {
    if (localStorage.getItem('watched') === null) {
        watchedLocalStorage.watchedId = [];
    } else {
        watchedLocalStorage.watchedId = JSON.parse(localStorage.getItem('watched')).watchedId;
    }
}

getLocalq();
getLocalw();


export {watchedLocalStorage, queueLocalStorage, getLocalw, getLocalq};