const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalContainer = document.getElementById('modal-container');
const cleanstorage = document.querySelector('.cleanls')


function openModal() {
    modalContainer.style.display = 'flex';
}

function closeModal() {
    modalContainer.style.display = 'none';
}

openModalBtn.addEventListener('click', () => {
    openModal();
});

closeModalBtn.addEventListener('click', () => {
    closeModal();
});

modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        closeModal();
    }
});

cleanstorage.addEventListener('click', (event) => {
    //event.preventDefault();
    localStorage.clear();
    window.location.reload();
    console.log(localStorage);
})