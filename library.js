
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

function showAddBookModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}