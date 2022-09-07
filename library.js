
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

function addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    addBookToLibrary(book)
    closeModal()

    document.getElementById("add-book-form").reset()

    refreshBookCards()
}

function removeAllBookCards() {
    const cards = document.getElementsByClassName('card')
    Array.from(cards).forEach(element => {
        element.remove()
    });
}

function clearLibrary() {
    myLibrary = []
    refreshBookCards()
}

function refreshBookCards() {
    removeAllBookCards()
    const booksContainer = document.querySelector('.books-container')
    myLibrary.forEach(element => {
        const newCard = document.createElement('div')
        newCard.classList.add('card')
        newCard.innerText = element.info()

        booksContainer.appendChild(newCard)
    });

    if (myLibrary.length === 0) {
        setNoContentVisibility('visible')
    } else {
        setNoContentVisibility('hidden')
    }
}

function setNoContentVisibility(flag) {
    const noContentPlaceholder = document.querySelector('.no-content')
    const addButtonOnDashboard = document.querySelector('.books-dashboard > button')

    if (flag === 'visible') {
        noContentPlaceholder.style.display = 'block'
        addButtonOnDashboard.style.display = 'block'
    } else {
        noContentPlaceholder.style.display = 'none'
        addButtonOnDashboard.style.display = 'none'
    }
}

function addDummy() {
    addBook('title', 'author', 'pages', 'read')
}