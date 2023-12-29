const myLibrary = [];

// DIALOG and FORM
const dialog = document.querySelector("dialog");
const openDialogBtn = document.querySelector(".open-dialog");
const closeDialogBtn = document.querySelector(".close-dialog");
const addBookBtn = document.querySelector(".add-book");

const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readStatusInput = document.querySelector("#read-status");

openDialogBtn.addEventListener('click', () => dialog.showModal());
closeDialogBtn.addEventListener('click', () => {
  form.reset();
  dialog.close();
});
addBookBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let readStatusValue;
  if (readStatusInput.checked) { 
    readStatusValue = readStatusInput.value; 
  } else {
    readStatusValue = "";
  };
  myLibrary.unshift(new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readStatusValue
  ));
  renderBooks(myLibrary);
  form.reset();
  dialog.close();
});


// BOOKS
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${readStatus}`;
  }
}

const shelfDiv = document.querySelector('.shelf');
function renderBooks(myLibrary) {
  // clear shelf
  const currentBooks = document.querySelectorAll('.book');
  if (currentBooks) {
    currentBooks.forEach((book) => {
      shelfDiv.removeChild(book);
    });
  };
  
  // render each book
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.textContent = `
      Title: ${book.title},
      Author: ${book.author},
      Pages: ${book.pages},
      Read Status: ${book.readStatus}
    `;
    bookDiv.classList.add('book');
    shelfDiv.appendChild(bookDiv);
  });
}