const myLibrary = [{
  title: "The Hobbit",
  author: "Tolkien",
  pages: 123,
  readStatus: "read",
},];

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
  myLibrary.push(new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readStatusValue
  ));
  renderBooks(myLibrary);
  form.reset();
  dialog.close();
});


// BOOK CONSTRUCTOR
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${readStatus}`;
  }
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
    bookDiv.classList.add('book');

    // title
      const title = document.createElement('p');
      title.classList.add('title');
      title.textContent = `Title: ${book.title}`;
      bookDiv.appendChild(title);
    // author
      const author = document.createElement('p');
      author.classList.add('author');
      author.textContent = `Author: ${book.author}`;
      bookDiv.appendChild(author);
    // pages
      const pages = document.createElement('p');
      pages.classList.add('pages');
      pages.textContent = `Pages: ${book.pages}`;
      bookDiv.appendChild(pages);
    // read status
      const readStatus = document.createElement('p');
      readStatus.classList.add('readStatus');
      readStatus.textContent = `Read status: ${book.readStatus}`;
      bookDiv.appendChild(readStatus);
    // remove button
      const removeBtn = createRemoveBtn(index);
      bookDiv.appendChild(removeBtn);

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