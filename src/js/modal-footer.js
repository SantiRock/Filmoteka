const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalContainer = document.getElementById('modal-container');

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