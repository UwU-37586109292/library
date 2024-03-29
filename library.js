class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  changeReadStatus() {
    this.isRead = !this.isRead;
  }

  updateBook(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  getReadText() {
    return this.isRead ? "Read" : "Not read";
  }
}

let myLibrary = [];

const modal = document.getElementById("modal");
const deleteAllModal = document.getElementById("delete-all-modal");

document
  .getElementById("confirm-deletion")
  .addEventListener("click", clearLibrary);
document
  .getElementsByClassName("add")[0]
  .addEventListener("click", showAddBookModal);
document
  .getElementsByClassName("delete-all-btn")[0]
  .addEventListener("click", showDeleteAllBooksModal);
Array.from(document.getElementsByClassName("close")).forEach((element) => {
  element.addEventListener("click", closeModal);
});
Array.from(document.getElementsByClassName("cancel")).forEach((element) => {
  element.addEventListener("click", closeModal);
});
document
  .getElementById("add-book-form")
  .addEventListener("submit", function handler(e) {
    e.preventDefault();
    if (e.target.checkValidity()) {
      addBook(
        document.getElementById("bookTitle").value,
        document.getElementById("author").value,
        document.getElementById("pages").value,
        document.getElementById("yes").checked
      );
    } else {
      showAllErrors();
    }
  });

const allInputs = document.getElementsByTagName("input");
for (let currInput of allInputs) {
  if (currInput.type !== "radio") {
    currInput.addEventListener("input", () => {
      if (currInput.validity.valid) {
        hideError(currInput);
      } else {
        showError(currInput);
      }
    });
  }
}

function showAllErrors() {
  const form = document.getElementById("add-book-form");
  const formInputs = form.getElementsByTagName("input");
  for (let currFormInput of formInputs) {
    if (currFormInput.type !== "radio") {
      if (!currFormInput.validity.valid) {
        showError(currFormInput);
      } else {
        hideError(currFormInput);
      }
    }
  }
}

function hideAllErrors(){
  const form = document.getElementById("add-book-form");
  const formInputs = form.getElementsByTagName("input");
  for (let currFormInput of formInputs) {
    if (currFormInput.type !== "radio") {
        hideError(currFormInput);
    }
  }
}

function hideError(element) {
  element.nextElementSibling.textContent = "";
  element.nextElementSibling.classList = "error";
}

function showError(element) {
  let errorMessage = "";
  if (element.validity.tooLong) {
    errorMessage = `Text too long, maximum: ${element.maxLength}`;
  } else if (element.validity.valueMissing) {
    errorMessage = "Field required";
  } else if (element.validity.rangeOverflow) {
    errorMessage = `Maximum value: ${element.max}`;
  } else if (element.validity.rangeUnderflow) {
    errorMessage = `Minimum value: ${element.min}`;
  } else {
    errorMessage = "Incorrect value";
  }
  element.nextElementSibling.textContent = errorMessage;
  element.nextElementSibling.classList = "error active";
}

function showAddBookModal() {
  modal.style.display = "block";
  document.getElementById("save").style.display = "block";
  document.querySelector(".update").style.display = "none";
}

function showEditBookModal() {
  modal.style.display = "block";
  document.getElementById("save").style.display = "none";
  document.querySelector(".update").style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  document.getElementById("add-book-form").reset();
  hideAllErrors();
  deleteAllModal.style.display = "none";
}

function addBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read === true);
  const existingBook = myLibrary.find(
    (element) => element.title === book.title && element.author === book.author
  );
  if (existingBook) {
    alert("The book already exists!");
  } else {
    myLibrary.push(book);
    addNewBookCard(book);
    closeModal();
    document.getElementById("add-book-form").reset();
  }
}

function addNewBookCard(book) {
  const booksContainer = document.querySelector(".books-container");
  const newCard = document.createElement("div");

  newCard.classList.add("card");
  newCard.setAttribute("data-index", myLibrary.length - 1);

  // Elements that contain book information on the card

  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = `Title: ${book.title}`;

  const author = document.createElement("div");
  author.classList.add("author");
  author.textContent = `Author: ${book.author}`;

  const pages = document.createElement("div");
  pages.classList.add("pages");
  pages.textContent = `Pages: ${book.pages}`;

  const info = document.createElement("div");
  info.classList.add("info");

  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Toggle slider for read status
  const toggleBtn = document.createElement("input");
  toggleBtn.setAttribute("type", "checkbox");
  toggleBtn.setAttribute("name", "toggle");
  toggleBtn.setAttribute("id", "toggle-button");
  toggleBtn.classList.add("toggle-button");

  toggleBtn.checked = book.isRead;

  toggleBtn.addEventListener("change", toggleReadStatus);

  const toggleLabel = document.createElement("label");
  toggleLabel.setAttribute("for", "toggle-button");
  toggleLabel.classList.add("readText");
  toggleLabel.textContent = book.getReadText();

  toggleContainer.appendChild(toggleBtn);
  toggleContainer.appendChild(toggleLabel);

  info.appendChild(title);
  info.appendChild(author);
  info.appendChild(pages);
  info.appendChild(toggleContainer);

  newCard.appendChild(info);

  // Buttons to change book state
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", deleteCard);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", editCurrentCard);

  const controls = document.createElement("div");
  controls.classList.add("controls");

  controls.appendChild(deleteBtn);
  controls.appendChild(editBtn);

  newCard.appendChild(controls);

  booksContainer.appendChild(newCard);
  setNoContentVisibility();
}

function removeAllBookCards() {
  const cards = document.getElementsByClassName("card");
  Array.from(cards).forEach((element) => {
    element.remove();
  });
  setNoContentVisibility();
}

function clearLibrary() {
  myLibrary = [];
  removeAllBookCards();
  setNoContentVisibility();
  deleteAllModal.style.display = "none";
}

function setNoContentVisibility() {
  const noContentPlaceholder = document.querySelector(".no-content");

  if (myLibrary.length === 0) {
    noContentPlaceholder.style.display = "block";
  } else {
    noContentPlaceholder.style.display = "none";
  }
}

function deleteCard(event) {
  const cardToDelete = event.target.parentElement.parentElement;

  const bookIndex = cardToDelete.getAttribute("data-index");
  myLibrary.splice(bookIndex, 1);

  //update following cards indexes
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let prevIndex = +card.getAttribute("data-index");
    if (prevIndex > bookIndex) {
      card.setAttribute("data-index", prevIndex - 1);
    }
  });

  cardToDelete.parentNode.removeChild(cardToDelete);
  setNoContentVisibility();
}

function toggleReadStatus(event) {
  const card = event.target.parentElement.parentElement.parentElement;
  const bookIndex = card.getAttribute("data-index");

  const book = myLibrary[bookIndex];
  book.changeReadStatus();

  card.querySelector(".readText").textContent =
    myLibrary[bookIndex].getReadText();
}

function editCurrentCard(event) {
  const card = event.target.parentElement.parentElement;
  const bookIndex = card.getAttribute("data-index");
  const book = myLibrary[bookIndex];
  //prefill data

  showEditBookModal();
  document.getElementById("bookTitle").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("pages").value = book.pages;
  document.getElementById("yes").checked = book.isRead;
  document.getElementById("no").checked = !book.isRead;

  document
    .querySelector("button.update")
    .addEventListener("click", function handler() {
      const newBook = new Book(
        document.getElementById("bookTitle").value,
        document.getElementById("author").value,
        document.getElementById("pages").value,
        document.getElementById("yes").checked
      );
      updateBook(bookIndex, newBook);

      closeModal();
      document.getElementById("add-book-form").reset();
      document.querySelector("button.update");
      this.removeEventListener("click", handler);
    });
}

function updateBook(bookId, book) {
  const currentBook = myLibrary[bookId];
  const existingBook = myLibrary.find(
    (element) =>
      element.title === book.title &&
      element.author === book.author &&
      element.pages === book.pages &&
      element.isRead === book.isRead
  );
  if (existingBook === currentBook) {
    alert("Book already exists!");
  } else {
    currentBook.updateBook(book.title, book.author, book.pages, book.isRead);

    document
      .querySelectorAll(".card")
      [bookId].querySelector(
        ".title"
      ).textContent = `Title: ${currentBook.title}`;
    document
      .querySelectorAll(".card")
      [bookId].querySelector(
        ".author"
      ).textContent = `Author: ${currentBook.author}`;
    document
      .querySelectorAll(".card")
      [bookId].querySelector(
        ".pages"
      ).textContent = `Pages: ${currentBook.pages}`;
    document
      .querySelectorAll(".card")
      [bookId].querySelector(".readText").textContent =
      currentBook.getReadText();
  }
}

function showDeleteAllBooksModal() {
  deleteAllModal.style.display = "block";
}
