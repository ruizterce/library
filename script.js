const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let infoMsg = this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ';

        if (read === true) {
            infoMsg += 'already read.';
        } else {
            infoMsg += 'not read yet.';
        }
        return infoMsg;
    }
    this.toggleRead = function (){
        this.read = !this.read;
    }
}
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const foundation = new Book('Foundation', 'Isaac Asimov', 230, true);
const aHappyWorld = new Book('A Happy World', 'Aldous Huxley', 249, true);

function addBookToLibrary(book) {
    myLibrary.push(book);
}




//Refresh Book Showcase DOM Elements with the current books in myLibrary
function refreshBookShowcase() {
    const bookCards = document.querySelector('#book-cards');
    //Clear and regenerate"#-book-cards" content.
    bookCards.innerHTML = '';
    myLibrary.forEach((element, i) => {
        const newBook = document.createElement('div');
        newBook.className = 'book-card';
        newBook.dataset.index = i;
        newBook.innerHTML = '<h3>' + element.title + '</h3>' + '<h4>' + element.author + '</h4>' + '<p>' + element.pages + ' pages</p>'
        if (element.read === true) {
            newBook.innerHTML += '<p>Already read.</p>';
        } else {
            newBook.innerHTML += '<p>Not read yet.</p>';
        }
        newBook.innerHTML += '<button type="button" class="toggle-read-btn">Read</button>'
        newBook.innerHTML += '<button type="button" class="delete-btn">Delete</button>'

        bookCards.appendChild(newBook);
    })

    //Event listeners for the card buttons.
    const toggleReadBtns = document.querySelectorAll('.toggle-read-btn');
    for (i = 0; i < toggleReadBtns.length; i++) {
        toggleReadBtns[i].addEventListener('click', (e) => {
            const index = e.target.parentNode.dataset.index;
            myLibrary[index].toggleRead();
            refreshBookShowcase();
        });
    }

    const deleteBtns = document.querySelectorAll('.delete-btn');
    for (i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', (e) => {
            const index = e.target.parentNode.dataset.index;
            if (index > -1) {
                myLibrary.splice(index, 1);
            }
            refreshBookShowcase();
        });
    }

    //"Add book" button added as the last element
    const addBookBtn = document.createElement('button');
    addBookBtn.id = 'add-book-btn';
    addBookBtn.innerHTML = '+'
    bookCards.appendChild(addBookBtn);
    addBookBtn.addEventListener('click', () => {
        document.querySelector('#add-book-sidebar').style = "display:block";
    });
}

//Initialize
addBookToLibrary(theHobbit);
addBookToLibrary(foundation);
addBookToLibrary(aHappyWorld);
refreshBookShowcase();


//Sidebar form to add new books
addBookForm = document.querySelector('#add-book-form')

addBookForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addBookToLibrary(new Book(addBookForm.bookTitle.value, addBookForm.bookAuthor.value, addBookForm.bookPages.value, addBookForm.bookRead.checked));
    refreshBookShowcase();
    addBookForm.reset();
    document.querySelector('#add-book-sidebar').style = "display:none";
})

document.querySelector('#close-sidebar-btn').addEventListener('click', () => {
    addBookForm.reset();
    document.querySelector('#add-book-sidebar').style = "display:none";
})