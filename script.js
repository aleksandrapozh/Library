const myLibrary = [];

function Book(title, author, pages){
    if(!new.target){
        throw Error ("You must use the 'new' operator to call the constructor")
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
    }

}

function addBookToLibrary(title, author, pages){
    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
    return newBook;
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310);
addBookToLibrary('1984', 'George Orwell', 328);
addBookToLibrary('To kill a Mockingbird', 'Harper Lee', 293);

function displayBooks(){
    const container = document.getElementById('library-container');

    container.innerHTML = '';
    if(myLibrary.length === 0){
        container.innerHTML = '<p style = text-align: center>No books in library yet. Add some</p>';
        return;
    }

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    const thead = document.createElement('thead')
    thead.innerHTML = `
        <tr>
            <th style = 'padding: 10px; text-align: center'>Title</th>
            <th style = 'padding: 10px; text-align: center'>Author</th>
            <th style = 'padding: 10px; text-align: center'>Pages</th>
        
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody')
    myLibrary.forEach(book => {
        const tr = document.createElement('tr');
        tr.dataset.id = book.id;
        tr.style.border = '1px solid black';

        tr.innerHTML = `
            <td style = 'padding: 10px; text-align: center'>${book.title}</td>
            <td style = 'padding: 10px; text-align: center'>${book.author}</td>
            <td style = 'padding: 10px; text-align: center'>${book.pages}</td>
        `
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    container.appendChild(table);
}

displayBooks()

const newBookBtn = document.getElementById('new-book-btn');
const dialog = document.getElementById('book-dialog');
const bookForm = document.getElementById('book-form');
const cancelBtn = document.getElementById('cancel-btn');


newBookBtn.addEventListener('click', () => {
    dialog.showModal(); 
    bookForm.reset(); 
});

cancelBtn.addEventListener('click', () => {
    dialog.close();
});

bookForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    
    addBookToLibrary(title, author, pages);
    
    displayBooks();
    
    dialog.close();
    
    bookForm.reset();
});