// BOOK CLASS
class Book {
  constructor(title, author, readStatus, totalPages, currentPage) {
    this.title = title;
    this.author = author;
    this.readStatus = readStatus;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }
  
  get title() {
    return this._title;
  }

  set title(string) {
    this._title = string;
  }

  toggleReadStatus(btnClicked, book) {
    if (btnClicked === 'complete') {
      book.readStatus = "completed";
      book.currentPage = book.totalPages;
    } else if (btnClicked === 'read again') {
      book.readStatus = "not started yet";
      book.currentPage = "";
    };
    renderBooks(myLibrary);
  }

  displayEditProgressInput(book) {
    book.readStatus = '.edit progress';
    renderBooks(myLibrary);
  }

  updateProgressBar(book, currentPage) {
    book.readStatus = 'currently reading';
    book.currentPage = currentPage;
    renderBooks(myLibrary);
  }
};

const myLibrary = [
  new Book("The Hobbit", "J.R.R. Tolkien", "currently reading", 310, 100),
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
const hiddenAsterisk = document.querySelector('span.hidden');

openDialogBtn.addEventListener('click', () => dialog.showModal());
function resetForm() {
  form.reset();
  currentPageInput.setAttribute('disabled', '');
  hiddenAsterisk.classList.add('hidden');
};
closeDialogBtn.addEventListener('click', (event) => {
  event.preventDefault();
  resetForm();
  dialog.close();
});
addBookBtn.addEventListener('click', (event) => {
  if (form.checkValidity()) {
  event.preventDefault();
  myLibrary.push(new Book(
    titleInput.value,
    authorInput.value,
    readStatusInput.value,
    totalPagesInput.value,
    currentPageInput.value
  ));
  renderBooks(myLibrary);
  resetForm();
  dialog.close();
};
});
readStatusInput.addEventListener('change', () => {
  currentPageInput.setAttribute('disabled', '');
  hiddenAsterisk.classList.add('hidden');
  if (readStatusInput.value === 'currently reading') {
    currentPageInput.removeAttribute('disabled', '');
    hiddenAsterisk.classList.remove('hidden');
  };
});
totalPagesInput.addEventListener('change', () => {
  currentPageInput.setAttribute('max', `${totalPagesInput.value}`);
});


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
    bookDiv.appendChild(createRemoveBtn(index));
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
    // edit progress
    if (book.readStatus === '.edit progress') {
      const [editProgressDiv, enterBtn] = createEditProgress(book);
      bookDiv.appendChild(editProgressDiv);
      bookDiv.appendChild(enterBtn);
    }
    // complete status
    if (book.readStatus === 'completed') {
      const [completeStatusDiv, readAgainBtn] = createCompleteStatus(book);
      bookDiv.appendChild(completeStatusDiv);
      bookDiv.appendChild(readAgainBtn);
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
  editProgressBtn.textContent = 'Edit progress';
  editProgressBtn.addEventListener('click', () => {
    book.displayEditProgressInput(book);
  });
  progressBtnsDiv.appendChild(editProgressBtn);

  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Complete';
  completeBtn.addEventListener('click', () => {
    book.toggleReadStatus('complete', book);
  });
  progressBtnsDiv.appendChild(completeBtn);

  return [progressBar, progressBtnsDiv];
}
function createEditProgress(book) {
  const editProgressDiv = document.createElement('div');
  editProgressDiv.classList.add('edit-progress-div');

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  const para = document.createElement('p');
  para.textContent = ` / ${book.totalPages} pages`;
  const enterBtn = document.createElement('button');
  enterBtn.textContent = 'Enter';
  enterBtn.addEventListener('click', () => { 
    book.updateProgressBar(book, input.value);
  });

  editProgressDiv.appendChild(input);
  editProgressDiv.appendChild(para);
  return [editProgressDiv, enterBtn];
}
function createCompleteStatus(book) {
  const completeStatusDiv = document.createElement('div');
  completeStatusDiv.classList.add('complete-status-div', 'parent');
  completeStatusDiv.textContent = 'complete';

  const checkmark = document.createElement('p');
  checkmark.textContent = '✔';
  completeStatusDiv.appendChild(checkmark);

  const readAgainBtn = document.createElement('button');
  readAgainBtn.textContent = 'Read again';
  readAgainBtn.addEventListener('click', () => {
    book.toggleReadStatus('read again', book);
  });

  return [completeStatusDiv, readAgainBtn];
}