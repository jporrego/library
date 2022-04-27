class Book {
  constructor(id, title, author, pages, read, img) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.img = img;
  }
}

class libraryManager {
  showBooks = () => {
    /* --- Get library div and clear it --- */
    const libraryDiv = document.querySelector(".library");
    libraryDiv.innerHTML = "";

    for (const i of libraryDatabase) {
      /* --- id --- */
      let id = document.createElement("div");
      id.className = "book-id";
      id.dataset.bookId = i.id;

      /* --- Book --- */
      let book = document.createElement("div");

      /* --- Title --- */
      let title = document.createElement("div");
      title.className = "title";
      title.innerHTML = i.title;

      /* --- Author --- */
      let author = document.createElement("div");
      author.className = "author";
      author.innerHTML = i.author;

      /* --- Pages --- */
      let pages = document.createElement("div");
      pages.className = "pages";
      pages.innerHTML = i.pages + " pages";

      /* --- Read --- */
      let read = document.createElement("div");
      read.className = "read";
      read.addEventListener("click", this.changeReadStatus);

      /* --- Delete button --- */
      let btnDelete = document.createElement("div");
      btnDelete.className = "btn-delete";
      btnDelete.innerHTML = "x";
      btnDelete.addEventListener("click", (e) => this.deleteBook(e, this));

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

      /* --- Handle read status --- */
      if (i.read) {
        read.innerHTML = "Read";
      } else {
        read.innerHTML = "Not read";
      }

      libraryDiv.appendChild(book);
    }
  };

  addBookToLibrary(event, t) {
    /* --- Get form data --- */
    let form = document.getElementById("form");
    let formData = new FormData(form);

    /* --- Set book id --- */
    let newId = 0;
    for (const i of libraryDatabase) {
      if (i.id > newId) {
        newId = i.id;
      }
    }
    newId++;

    /* --- Variables --- */
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

    /* --- Handle cover img --- */
    if (img === "") {
      book = new Book(newId, title, author, pages, read);
    } else {
      book = new Book(newId, title, author, pages, read, img);
    }

    libraryDatabase.push(book);
    document.querySelector(".modal").style.display = "none";
    document.querySelector(".btn-show-form").classList.remove("blur");
    document.querySelector(".library").classList.remove("blur");
    t.showBooks();
  }

  deleteBook(e, t) {
    let idToDelete =
      e.target.parentNode.querySelector(".book-id").dataset.bookId;
    libraryDatabase = libraryDatabase.filter((book) => book.id != idToDelete);
    t.showBooks();
  }

  changeReadStatus(e) {
    const idToChange =
      e.target.parentNode.querySelector(".book-id").dataset.bookId;

    let updatedBook = libraryDatabase.filter(
      (book) => book.id === parseInt(idToChange)
    )[0];

    if (updatedBook.read) {
      updatedBook.read = false;
    } else {
      updatedBook.read = true;
    }

    /* --- Update status in library --- */
    libraryDatabase.filter((book) =>
      book.id == parseInt(idToChange) ? updatedBook : book
    );

    /* --- Update status in html element to avoid reloading all books to show the change. --- */
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
  }

  showAddForm() {
    document.querySelector(".modal").style.display = "flex";
    document.querySelector(".btn-show-form").classList.add("blur");
    document.querySelector(".library").classList.add("blur");
  }

  hideAddForm(e) {
    if (e.target.className === "modal") {
      document.querySelector(".modal").style.display = "none";
      document.querySelector(".btn-show-form").classList.remove("blur");
      document.querySelector(".library").classList.remove("blur");
    }
  }

  setupEventListeners() {
    document
      .querySelector(".btn-submit")
      .addEventListener("click", (e) => this.addBookToLibrary(e, this));

    document
      .querySelector(".btn-show-form")
      .addEventListener("click", this.showAddForm);

    document
      .querySelector(".modal")
      .addEventListener("click", this.hideAddForm);
  }
}

let libraryDatabase = [
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

const library = new libraryManager();
library.showBooks();
library.setupEventListeners();
console.log(library);
