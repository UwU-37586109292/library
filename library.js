
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

Book.prototype.toggleReadStatus = function () {
    this.isRead = !this.isRead
}

Book.prototype.updateBook = function (title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.getReadText = function () {
    return this.isRead ? 'Read' : 'Not read'
}

let myLibrary = [];

const modal = document.getElementById("modal");

function showAddBookModal() {
    modal.style.display = "block";
    document.getElementById('save').style.display = 'block'
    document.querySelector('.update').style.display = 'none'
}

function showEditBookModal() {
    modal.style.display = "block";
    document.getElementById('save').style.display = 'none'
    document.querySelector('.update').style.display = 'block'
}

function closeModal() {
    modal.style.display = "none";
}

function addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read === "true")
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
    newCard.setAttribute('data-index', myLibrary.length - 1)

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

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerText = 'Delete'

    deleteBtn.addEventListener('click', deleteCard)
    controls.appendChild(deleteBtn)

    const read = document.createElement('button')
    read.classList.add('read')
    read.innerText = book.getReadText()
    read.addEventListener('click', toggleReadStatus)

    const editBtn = document.createElement('button')
    editBtn.innerText = 'Edit'
    editBtn.addEventListener('click', editCurrentCard)

    controls.appendChild(read)
    controls.appendChild(editBtn)

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
    removeAllBookCards()
    setNoContentVisibility()
}

function setNoContentVisibility() {
    const noContentPlaceholder = document.querySelector('.no-content')

    if (myLibrary.length === 0) {
        noContentPlaceholder.style.display = 'block'
    } else {
        noContentPlaceholder.style.display = 'none'
    }
}

function deleteCard(event) {
    const cardToDelete = event.target.parentElement.parentElement

    const bookIndex = cardToDelete.getAttribute('data-index')
    myLibrary.splice(bookIndex, 1)

    //update following cards indexes
    const cards = document.querySelectorAll('.card')

    cards.forEach(card => {
        let prevIndex = +card.getAttribute('data-index')
        if (prevIndex > bookIndex) {
            card.setAttribute('data-index', prevIndex - 1)
        }
    })

    cardToDelete.parentNode.removeChild(cardToDelete)
    setNoContentVisibility()
}

function toggleReadStatus(event) {
    const card = event.target.parentElement.parentElement
    const bookIndex = card.getAttribute('data-index')
    console.log(myLibrary[bookIndex])

    const book = myLibrary[bookIndex]
    book.toggleReadStatus()

    card.querySelector('.read').innerText = myLibrary[bookIndex].isRead ? 'Read' : 'Not read'
}

function editCurrentCard(event) {
    const card = event.target.parentElement.parentElement
    const bookIndex = card.getAttribute('data-index')
    const book = myLibrary[bookIndex]
    //prefill data

    showEditBookModal()
    document.getElementById('bookTitle').value = book.title
    document.getElementById('author').value = book.author
    document.getElementById('pages').value = book.pages
    document.getElementById('yes').checked = book.isRead
    document.getElementById('no').checked = !book.isRead

    document.querySelector('button.update')
        .addEventListener('click', function handler() {
            const newBook = new Book(document.getElementById('bookTitle').value,
                document.getElementById('author').value,
                document.getElementById('pages').value,
                document.getElementById('yes').checked)
            updateBook(bookIndex, newBook)

            closeModal()
            document.getElementById("add-book-form").reset()
            document.querySelector('button.update')
            this.removeEventListener('click', handler)
        })

}

function updateBook(bookId, book) {
    const currentBook = myLibrary[bookId]
    const existingBook = myLibrary.find(element => element.title === book.title && element.author === book.author)
    if (existingBook !== currentBook) { alert('Book already exists!') }
    else {
        currentBook.updateBook(book.title, book.author, book.pages, book.isRead)

        document.querySelectorAll('.card')[bookId].querySelector('.title').innerText = currentBook.title
        document.querySelectorAll('.card')[bookId].querySelector('.author').innerText = currentBook.author
        document.querySelectorAll('.card')[bookId].querySelector('.pages').innerText = currentBook.pages
        document.querySelectorAll('.card')[bookId].querySelector('.read').innerText = currentBook.getReadText()
    }
}