
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function () {
    const readStr = this.isRead ? 'already read' : 'not yet read';
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStr}`;
}

let myLibrary = [];

function addBookToLibrary(book) {
    myLibrary.push(book);
}
const modal = document.getElementById("modal");

function showAddBookModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function addBook(book) {
}