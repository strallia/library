const myLibrary = [{
  title: "The Hobbit",
  author: "Tolkien",
  readStatus: "currently reading",
  totalPages: 123,
  currentPage: 50,
},];

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
    if (book.readStatus === 'currently reading') {
      const [progressBar, editProgressBtn] = createProgressBar(book);
      bookDiv.appendChild(progressBar);
      bookDiv.appendChild(editProgressBtn);
    };
    // complete status
    if (book.readStatus === 'not started yet'
    || book.readStatus === 'completed') {
      const completeStatusDiv = createCompleteStatus();
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
function createProgressBar(book) {
  const progressBar = document.createElement('progress');
  progressBar.classList.add('progress-bar');
  progressBar.setAttribute('max', `${book.totalPages}`);
  progressBar.setAttribute('value', `${book.currentPage}`);

  const editProgressBtn = document.createElement('button');
  editProgressBtn.classList.add('edit-progress');
  editProgressBtn.textContent = 'Edit';
  editProgressBtn.addEventListener('click', editProgress);
  return [progressBar, editProgressBtn];
}
function editProgress() {
  console.log('clicked editProgress button')
}
function createCompleteStatus() {
  const completeStatusDiv = document.createElement('div');
  completeStatusDiv.classList.add('complete');
  completeStatusDiv.textContent = 'complete';

  const checkmark = document.createElement('p');
  checkmark.textContent = '✔';
  completeStatusDiv.appendChild(checkmark);
  return completeStatusDiv;
}