document.querySelector(".submit").addEventListener("submit", addBookToLibrary);
document.querySelector(".btn-add").addEventListener("click", showAddForm);
document.querySelector(".modal").addEventListener("click", hideAddForm);

let myLibrary = [
  new Book(0, "The Hobbit", "J.R.R. Tolkien", 295, true, "./img/hobbit.jpg"),
  new Book(
    1,
    "The Dark Forest",
    "Liu Cixin",
    528,
    true,
    "./img/darkforest.jpg"
  ),
  new Book(
    2,
    "Gardens of the Moon",
    "Steven Erikson",
    712,
    true,
    "./img/gardens.jpg"
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
    read.addEventListener("click", changeReadStatus);
    btnDelete.className = "btn-delete";

    id.dataset.bookId = i.id;
    title.innerHTML = i.title;
    author.innerHTML = i.author;
    pages.innerHTML = i.pages;
    btnDelete.innerHTML = "x";
    btnDelete.addEventListener("click", deleteBook);

    book.appendChild(id);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    book.appendChild(btnDelete);

    /* --- Handle img --- */
    if (i.img === undefined) {
      let img = document.createElement("img");
      img.src = "./img/cover.jpg";
      book.appendChild(img);
      book.className = "book dark-cover";
    } else {
      let img = document.createElement("img");
      book.appendChild(img);
      img.src = i.img;
      book.className = "book hide-details";
    }

    /* --- Handle read --- */
    if (i.read) {
      read.innerHTML = "Read";
    } else {
      read.innerHTML = "Not read";
    }

    libraryDiv.appendChild(book);
  }
}

function addBookToLibrary(event) {
  event.preventDefault();
  let form = document.getElementById("form");
  let formData = new FormData(form);
  /* --- Set book id --- */
  let newId = 0;
  for (const i of myLibrary) {
    if (i.id > newId) {
      newId = i.id;
    }
  }
  newId++;

  let book;
  let title = formData.get("title");
  let author = formData.get("author");
  let pages = formData.get("pages");
  let img = formData.get("img");
  let read;

  /* --- Handle read status --- */
  const radioButtons = document.querySelectorAll('input[name="read"]');
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      if (radioButton.value === "yes") {
        read = true;
      } else {
        read = false;
      }
      break;
    }
  }

  if (img === "") {
    book = new Book(newId, title, author, pages, read);
  } else {
    book = new Book(newId, title, author, pages, read, img);
  }

  myLibrary.push(book);
  document.querySelector(".modal").style.display = "none";
  document.querySelector(".btn-add").classList.remove("blur");
  document.querySelector(".library").classList.remove("blur");
  showBooks();
}

function deleteBook(e) {
  let idToDelete = e.target.parentNode.querySelector(".book-id").dataset.bookId;
  myLibrary = myLibrary.filter((book) => book.id != idToDelete);
  showBooks();
}

function changeReadStatus(e) {
  const idToChange =
    e.target.parentNode.querySelector(".book-id").dataset.bookId;
  let updatedBook = myLibrary.filter(
    (book) => book.id === parseInt(idToChange)
  )[0];

  if (updatedBook.read) {
    updatedBook.read = false;
  } else {
    updatedBook.read = true;
  }

  myLibrary.filter((book) =>
    book.id == parseInt(idToChange) ? updatedBook : book
  );

  let booksDivs = document.querySelectorAll(".book");
  for (const div of booksDivs) {
    if (div.querySelector(".book-id").dataset.bookId == idToChange) {
      if (updatedBook.read) {
        div.querySelector(".read").innerHTML = "Read";
      } else {
        div.querySelector(".read").innerHTML = "Not read";
      }
    }
  }
  //showBooks();
}

function showAddForm() {
  document.querySelector(".modal").style.display = "flex";
  document.querySelector(".btn-add").classList.add("blur");
  document.querySelector(".library").classList.add("blur");
}

function hideAddForm(e) {
  if (e.target.className === "modal") {
    document.querySelector(".modal").style.display = "none";
    document.querySelector(".btn-add").classList.remove("blur");
    document.querySelector(".library").classList.remove("blur");
  }
}

showBooks();
