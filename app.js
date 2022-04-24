document.querySelector(".submit").addEventListener("click", addBookToLibrary);
document.querySelector(".btn-add").addEventListener("click", showAddForm);

let myLibrary = [
  new Book(
    0,
    "The Hobbit",
    "J.R.R. Tolkien",
    295,
    true,
    "https://i.harperapps.com/hcanz/covers/9780261102668/y648.jpg"
  ),
  new Book(
    1,
    "The Three-Body Problem",
    "Liu Cixin",
    399,
    true,
    "https://images-na.ssl-images-amazon.com/images/I/919XM42JQlL.jpg"
  ),
  new Book(
    2,
    "The Three-Body Problem",
    "Liu Cixin",
    399,
    true,
    "https://booksbyproxy.files.wordpress.com/2018/03/gardens-of-the-moon-subterranean-press1.jpg"
  ),
];

function Book(id, title, author, pages, read, img) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.img = img;
}

function showBooks() {
  /* --- Get library div and clear it --- */
  const libraryDiv = document.querySelector(".library");
  libraryDiv.innerHTML = "";

  for (const i of myLibrary) {
    let id = document.createElement("div");
    let book = document.createElement("div");
    let title = document.createElement("div");
    let author = document.createElement("div");
    let pages = document.createElement("div");
    let read = document.createElement("div");
    let btnDelete = document.createElement("div");

    id.className = "book-id";
    title.className = "title";
    author.className = "author";
    pages.className = "pages";
    read.className = "read";
    btnDelete.className = "btn-delete";

    id.dataset.bookId = i.id;
    title.innerHTML = i.title;
    author.innerHTML = i.author;
    pages.innerHTML = i.pages;
    read.innerHTML = "Read";
    btnDelete.innerHTML = "Remove";
    btnDelete.addEventListener("click", deleteBook);

    book.appendChild(id);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    book.appendChild(btnDelete);

    /* --- Handle img --- */
    if (i.img === undefined) {
      book.className = "book--no-img";
    } else {
      let img = document.createElement("img");
      book.appendChild(img);
      img.src = i.img;
      book.className = "book";
    }

    libraryDiv.appendChild(book);
  }
}

function addBookToLibrary() {
  /* --- Set book id --- */
  let newId = 0;
  for (const i of myLibrary) {
    if (i.id > newId) {
      newId = i.id;
    }
  }
  newId++;

  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").value;
  let img = document.querySelector("#img").value;

  console.log(img);
  let book;
  if (img === undefined) {
    book = new Book(newId, title, author, pages, read);
  } else {
    book = new Book(newId, title, author, pages, read, img);
  }

  myLibrary.push(book);
  let modal = (document.querySelector(".modal").style.display = "none");
  showBooks();
}

function deleteBook(e) {
  let idToDelete = e.target.parentNode.querySelector(".book-id").dataset.bookId;
  myLibrary = myLibrary.filter((book) => book.id != idToDelete);
  console.log(myLibrary);
  showBooks();
}

function showAddForm() {
  let modal = (document.querySelector(".modal").style.display = "flex");
}

showBooks();
