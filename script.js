// DIALOG BUTTONS
const dialog = document.querySelector("dialog");
const openDialogBtn = document.querySelector(".open-dialog");
const closeDialogBtn = document.querySelector(".close-dialog");
const addBookBtn = document.querySelector(".add-book");


// FORM INPUTS
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readStatusInput = document.querySelector("#read-status");


// EVENT LISTENERS
openDialogBtn.addEventListener('click', () => dialog.showModal());
closeDialogBtn.addEventListener('click', () => dialog.close());
addBookBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let obj = {};
    obj.title = titleInput.value;
    obj.author = authorInput.value;
    obj.pages = pagesInput.value;
    if (readStatusInput.checked) { 
      obj.readStatus = readStatusInput.value; 
    } else {
      obj.readStatus = "";
    }
  btnTestFunction(obj);
  dialog.close();
})

function btnTestFunction(obj) {
  console.log("Run btnTestFunction with form inputs:", obj);
}

