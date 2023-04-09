const pages = document.querySelector('.pages');
const pagesToShow = 5;


const pagination = (arr, totalPages, currentPage) => {
    pages.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '←';
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
    first.disabled = currentPage === 1;
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
      pageButton.disabled = i === currentPage;

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
    last.disabled = currentPage === totalPages
    last.addEventListener('click', () => {
        currentPage = totalPages;
        getLocalStorage(arr, currentPage);
        pagination(arr, totalPages, currentPage);
    });
    pages.append(last);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '→';
    nextBtn.classList.add('pagebtn');
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        currentPage++;
        getLocalStorage(arr, currentPage);
        pagination(arr, totalPages, currentPage);
    });
    pages.append(nextBtn);
}

export default pagination;