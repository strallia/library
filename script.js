const myLibrary = [];

// DIALOG BUTTONS
const dialog = document.querySelector("dialog");
const openDialogBtn = document.querySelector(".open-dialog");
const closeDialogBtn = document.querySelector(".close-dialog");
const addBookBtn = document.querySelector(".add-book");


// FORM INPUTS
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readStatusInput = document.querySelector("#read-status");


// EVENT LISTENERS
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
  myLibrary.push( new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readStatusValue
  ));
  form.reset();
  dialog.close();
});


function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${readStatus}`;
  }
}