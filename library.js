
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
    const book = new Book(title, author, pages, read)
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

    const info = document.createElement('div')
    info.classList.add('info')

    info.appendChild(title)
    info.appendChild(author)
    info.appendChild(pages)

    newCard.appendChild(info)

    const controls = document.createElement('div')
    controls.classList.add('controls')

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.innerText = 'Edit'
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerText = 'Delete'

    editBtn.addEventListener('click', editCard)
    deleteBtn.addEventListener('click', deleteCard)


    controls.appendChild(editBtn)
    controls.appendChild(deleteBtn)

    newCard.appendChild(controls)

    booksContainer.appendChild(newCard)

    newCard.addEventListener('click', function (e) {
        e.target.classList.toggle('selected')
    })
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
    addEventListenersToCards()

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

function addEventListenersToCards() {
    const allCards = document.querySelectorAll('.card');
    Array.from(allCards).forEach(card => {
        card.addEventListener('click', function (e) {
            e.target.classList.toggle('selected')
        })
    })
}

function deleteSelected() {
    const selectedCards = document.querySelectorAll('.card.selected')
    console.log(selectedCards)
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

function editCard(event) {
    console.log(event)
}

function deleteCard(event) {
    const cardToDelete = event.target.parentElement.parentElement
    const title = cardToDelete.children[0].children[0].innerText
    const author = cardToDelete.children[0].children[1].innerText

    const bookToDelete = myLibrary.find(element => element.title === title && element.author === author)
    myLibrary.splice(myLibrary.indexOf(bookToDelete), 1)

    cardToDelete.parentNode.removeChild(cardToDelete)
    setNoContentVisibility()
}