const myLibrary = [
  new Book("The Hobbit", "J.R.R. Tolkien", "currently reading", 123, 50),
];

// DIALOG and FORM
const dialog = document.querySelector("dialog");
const openDialogBtn = document.querySelector(".open-dialog");
const closeDialogBtn = document.querySelector(".close-dialog");
const addBookBtn = document.querySelector(".add-book");

const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const readStatusInput = document.querySelector("#read-status");
const totalPagesInput = document.querySelector("#total-pages");
const currentPageInput = document.querySelector("#current-page");

openDialogBtn.addEventListener('click', () => dialog.showModal());
closeDialogBtn.addEventListener('click', () => {
  form.reset();
  dialog.close();
});
addBookBtn.addEventListener('click', (event) => {
  event.preventDefault();
  myLibrary.push(new Book(
    titleInput.value,
    authorInput.value,
    readStatusInput.value,
    totalPagesInput.value,
    currentPageInput.value
  ));
  renderBooks(myLibrary);
  form.reset();
  dialog.close();
});
readStatusInput.addEventListener('change', () => {
  currentPageInput.setAttribute('disabled', '');
  if (readStatusInput.value === 'currently reading') {
    currentPageInput.removeAttribute('disabled', '');
  };
})


// BOOK CONSTRUCTOR
function Book(title, author, readStatus, totalPages, currentPage) {
  this.title = title;
  this.author = author;
  this.readStatus = readStatus;
  this.totalPages = totalPages;
  this.currentPage = currentPage;
  this.info = function() {
    return `${title} by ${author}, ${totalPages} pages, ${currentPage/totalPages}`;
  };
}
Book.prototype.toggleReadStatus = function(btnClicked, index) {
  if (btnClicked === 'complete') {
    myLibrary[index].readStatus = "completed";
    myLibrary[index].currentPage = myLibrary[index].totalPages;
  } else if (btnClicked === 'read again') {
    myLibrary[index].readStatus = "not started yet";
    myLibrary[index].currentPage = "";
  };
  renderBooks(myLibrary);
};
Book.prototype.editProgress = function() {
  console.log('clicked editProgress button');
};


// RENDER BOOKS
const shelfDiv = document.querySelector('.shelf');
renderBooks(myLibrary);

function renderBooks(myLibrary) {
  // clear shelf
  const currentBooks = document.querySelectorAll('.book');
  if (currentBooks) {
    currentBooks.forEach((book) => {
      shelfDiv.removeChild(book);
    });
  };
  
  // render each book
  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book', 'parent');

    // remove button
    const removeBtn = createRemoveBtn(index);
    bookDiv.appendChild(removeBtn);
    // title
    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = `${book.title}`;
    bookDiv.appendChild(title);
    // author
    const author = document.createElement('p');
    author.classList.add('author');
    author.textContent = `${book.author}`;
    bookDiv.appendChild(author);
    // total pages
    const totalPages = document.createElement('p');
    totalPages.classList.add('total-pages');
    totalPages.textContent = `${book.totalPages} pages`;
    bookDiv.appendChild(totalPages);
    // progress bar
    if (book.readStatus === 'currently reading'
    || book.readStatus === 'not started yet') {
      const [progressBar, progressBtnsDiv] = createProgressBar(book, index);
      bookDiv.appendChild(progressBar);
      bookDiv.appendChild(progressBtnsDiv);
    };
    // complete status
    if (book.readStatus === 'completed') {
      const completeStatusDiv = createCompleteStatus(index);
      bookDiv.appendChild(completeStatusDiv);
    };
    
    shelfDiv.appendChild(bookDiv);
  });
}
function createRemoveBtn(index) {
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove');
  removeBtn.setAttribute('data-index', index);
  removeBtn.textContent = 'X';
  removeBtn.addEventListener('click', (event) => {
    const clickedBtn = event.target;
    const bookIndex = clickedBtn.getAttribute('data-index');
    myLibrary.splice(bookIndex, 1);
    renderBooks(myLibrary);
  });
  return removeBtn;
}
function createProgressBar(book, index) {
  const progressBar = document.createElement('progress');
  progressBar.classList.add('progress-bar');
  progressBar.setAttribute('max', `${book.totalPages}`);
  progressBar.setAttribute('value', `${book.currentPage}`);

  const progressBtnsDiv = document.createElement('div');
  progressBtnsDiv.classList.add('progress-btns-div');

  const editProgressBtn = document.createElement('button');
  editProgressBtn.textContent = 'Edit';
  editProgressBtn.addEventListener('click', () => {
    myLibrary[index].editProgress();
  });
  progressBtnsDiv.appendChild(editProgressBtn);

  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Complete';
  completeBtn.addEventListener('click', () => {
    myLibrary[index].toggleReadStatus('complete', index);
  });
  progressBtnsDiv.appendChild(completeBtn);

  return [progressBar, progressBtnsDiv];
}
function createCompleteStatus(index) {
  const completeStatusDiv = document.createElement('div');
  completeStatusDiv.classList.add('complete-status-div', 'parent');
  completeStatusDiv.textContent = 'complete';

  const checkmark = document.createElement('p');
  checkmark.textContent = '✔';
  completeStatusDiv.appendChild(checkmark);

  const readAgainBtn = document.createElement('button');
  readAgainBtn.textContent = 'Read again';
  readAgainBtn.addEventListener('click', () => {
    myLibrary[index].toggleReadStatus('read again', index);
  });
  completeStatusDiv.appendChild(readAgainBtn);

  return completeStatusDiv;
}
