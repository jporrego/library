document.querySelector(".submit").addEventListener("click", addBookToLibrary);

let myLibrary = [
  new Book(
    "The Hobbit",
    "J.R.R. Tolkien",
    295,
    true,
    "https://i.harperapps.com/hcanz/covers/9780261102668/y648.jpg"
  ),
  new Book(
    "The Three-Body Problem",
    "Liu Cixin",
    399,
    true,
    "https://images-na.ssl-images-amazon.com/images/I/919XM42JQlL.jpg"
  ),
  new Book("The Three-Body Problem", "Liu Cixin", 399, true),
];

function Book(title, author, pages, read, img) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.img = img;
}

function showBooks() {
  const library = document.querySelector(".library");

  for (const i of myLibrary) {
    let book = document.createElement("div");
    let title = document.createElement("div");
    let author = document.createElement("div");
    let pages = document.createElement("div");
    let read = document.createElement("div");

    title.className = "title";
    author.className = "author";
    pages.className = "pages";
    read.className = "read";

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);

    title.innerHTML = i.title;
    author.innerHTML = i.author;
    pages.innerHTML = i.pages;
    read.innerHTML = "Read";

    /* Handle img */
    if (i.img === undefined) {
      book.className = "book--no-img";
    } else {
      let img = document.createElement("img");
      book.appendChild(img);
      img.src = i.img;
      book.className = "book";
    }

    library.appendChild(book);
  }
}

function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").value;
  let img = document.querySelector("#img").value;
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  let modal = document.querySelector(".modal");
  modal.stlye.display = "none";
}

//addBookToLibrary();
showBooks();
addBookToLibrary();
console.log(myLibrary);
