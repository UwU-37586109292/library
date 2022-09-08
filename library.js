
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function () {
    const readStr = this.isRead === "true" ? 'already read' : 'not yet read';
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStr}`;
}

let myLibrary = [];

const modal = document.getElementById("modal");

function showAddBookModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read === true)
    const existingBook = myLibrary.find(element => element.title === book.title && element.author === book.author)
    if (existingBook) { alert('The book already exists!') }
    else {
        myLibrary.push(book)
        addNewBookCard(book)
        closeModal()
        document.getElementById("add-book-form").reset()
    };


}

function addNewBookCard(book) {
    const booksContainer = document.querySelector('.books-container')
    const newCard = document.createElement('div')
    newCard.classList.add('card')

    const title = document.createElement('div')
    title.classList.add('title')
    title.innerText = `${book.title}`
    const author = document.createElement('div')
    author.classList.add('author')
    author.innerText = `${book.author}`
    const pages = document.createElement('div')
    pages.classList.add('pages')
    pages.innerText = `${book.pages}`
    const read = document.createElement('div')
    read.classList.add('read')

    read.innerText = book.isRead ? 'Already read' : 'To be read'

    const info = document.createElement('div')
    info.classList.add('info')

    info.appendChild(title)
    info.appendChild(author)
    info.appendChild(pages)
    info.appendChild(read)

    newCard.appendChild(info)
    newCard.setAttribute("book", book);

    const controls = document.createElement('div')
    controls.classList.add('controls')

    const readBtn = document.createElement('button')
    readBtn.classList.add('read')
    readBtn.innerText = 'Read/Unread'
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerText = 'Delete'

    deleteBtn.addEventListener('click', deleteCard)
    controls.appendChild(deleteBtn)

    readBtn.addEventListener('click', toggleReadStatus)
    controls.appendChild(readBtn)

    newCard.appendChild(controls)

    booksContainer.appendChild(newCard)


    setNoContentVisibility()
}

function removeAllBookCards() {
    const cards = document.getElementsByClassName('card')
    Array.from(cards).forEach(element => {
        element.remove()
    });
    setNoContentVisibility();
}

function clearLibrary() {
    myLibrary = []
    refreshBookCards()
}

function refreshBookCards() {
    removeAllBookCards()
    addAllBooksFromListToCards()

    setNoContentVisibility()
}

function addAllBooksFromListToCards() {
    const booksContainer = document.querySelector('.books-container')

    myLibrary.forEach(element => {
        const newCard = document.createElement('div')
        newCard.classList.add('card')
        newCard.innerText = element.info()

        booksContainer.appendChild(newCard)
    });
}

function setNoContentVisibility() {
    const noContentPlaceholder = document.querySelector('.no-content')

    if (myLibrary.length === 0) {
        noContentPlaceholder.style.display = 'block'
    } else {
        noContentPlaceholder.style.display = 'none'
    }
}

function addDummy() {
    addBook('title', 'author' + Math.floor(Math.random() * 10000), 'pages', 'read')
}

function deleteCard(event) {
    const cardToDelete = event.target.parentElement.parentElement

    const bookToDelete = cardToDelete.book;
    myLibrary.splice(myLibrary.indexOf(bookToDelete), 1)

    cardToDelete.parentNode.removeChild(cardToDelete)
    setNoContentVisibility()
}

function toggleReadStatus(event) {
    const card = event.target.parentElement.parentElement

    const book = myLibrary.find(element => element.title === title && element.author === author)
    book.isRead = !book.isRead

    card.children[0].children[3].innerText = book.isRead ? 'Already read' : 'To be read'
}