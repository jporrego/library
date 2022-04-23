let myLibrary = [
  new Book(
    "The Hobbit",
    "J.R.R. Tolkien",
    295,
    true,
    "https://i.harperapps.com/hcanz/covers/9780261102668/y648.jpg"
  ),
  new Book(
    "The Hobbit",
    "J.R.R. Tolkien",
    295,
    true,
    "https://i.harperapps.com/hcanz/covers/9780261102668/y648.jpg"
  ),
];

function Book(title, author, pages, read, img) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.img = img;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "read." : "not read yet."
  }`;
};

function addBookToLibrary() {}

function showBooks() {
  const library = document.querySelector(".library");
  for (const i of myLibrary) {
    let book = document.createElement("div");
    let title = document.createElement("div");
    let author = document.createElement("div");
    let pages = document.createElement("div");
    let read = document.createElement("div");

    book.className = "book";
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

    library.appendChild(book);

    console.log(book);
  }
}

showBooks();

console.log(myLibrary);
