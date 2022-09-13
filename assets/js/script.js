(function() {  
  const tabButtonWrapper = document.querySelector(".tab-button-wrapper");
  const tabButtons = document.querySelectorAll(".tab-buttons");

  tabButtonWrapper.addEventListener("click", e => {
    if(e.target.classList.contains("tab-buttons")) {
      tabButtons.forEach(button => {
        button.className = "tab-buttons";
      });

      e.target.classList.add("active");
    }
  });

  window.addEventListener("load", () => document.location.hash = "#uncompleted");
})();


(function() {
  const books = [];
  const RENDER_BOOK = "render-book";

  const STORAGE_KEY = "BOOK_STORAGE";

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-input");
    const bookId = document.querySelector(".idBook");
    const btnSubmit = document.querySelector(".button-submit");

    form.addEventListener("submit", e => {
      e.preventDefault();
      
      (bookId.value.length === 0) ? addBook() : editBook(bookId.value);

      bookId.value = "";
      btnSubmit.innerText = "Tambah Data";
      btnSubmit.classList.replace("button-edit", "button-submit");
    });

    bookActionButtons();
    searchBook();

    if(isStorageExist()) {
      loadDataFromStorage();
    }
  });

  function isStorageExist() {
    if(typeof Storage === undefined) {
      alert("browser yang anda gunakan tidak mendukung web storage");
      return false;
    }
  
    return true;
  }

  function saveBook() {
    if(isStorageExist()) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
  }

  function loadDataFromStorage() {
    const getDataBooks = localStorage.getItem(STORAGE_KEY);
    const items = JSON.parse(getDataBooks);

    if(items !== null) {
      items.map(item => books.push(item));
    }

    document.dispatchEvent(new Event(RENDER_BOOK));
  }

  function addBook() {
    const id = +new Date();
    const title = document.querySelector(".title");
    const author = document.querySelector(".author");
    const year = document.querySelector(".year");
    const isCompleted = document.querySelector(".isCompleted");
    const bookList = { 
      id, 
      title: title.value, 
      author: author.value, 
      year: year.value, 
      isCompleted: isCompleted.checked 
    };

    books.unshift(bookList);

    title.value = "";
    author.value = "";
    year.value = "";
    isCompleted.checked = false;

    document.dispatchEvent(new Event(RENDER_BOOK));
    saveBook();
  }

  function createBook(book) {
    const { id, title, author, year, isCompleted } = book;

    return `
      <tr id="${id}">
        <td class="title">${title}</td>
        <td>${author}</td>
        <td>${year}</td>
        <td>
          ${
            (!isCompleted) ? 
              `<button class="check-book" data-bookid="${id}"><i class="fas fa-check"></i></button>` 
            : 
              `<button class="undo-book" data-bookid="${id}"><i class="fas fa-undo"></i></button>`
          }
          <button class="edit-book" data-bookid="${id}"><i class="fas fa-edit"></i></button>
          <button class="remove-book" data-bookid="${id}"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  }

  function searchBook() {
    const booksTabContent = document.querySelector("#allBook");
    
    booksTabContent.addEventListener("keyup", function(e) {
      if(e.target.classList.contains("keyword")) {
        const tRows = document.querySelectorAll(".all-results-table tbody tr");
        const value = e.target.value.toLowerCase();

        tRows.forEach(row => {
          if(row.querySelector(".title").textContent.toLowerCase().startsWith(value)) {
            row.style.display = "table-row";
          } else {
            row.style.display = "none";
          }
        });
      }
    });
  }

  function editBook(id) {
    const title = document.querySelector(".title");
    const author = document.querySelector(".author");
    const year = document.querySelector(".year");
    const isCompleted = document.querySelector(".isCompleted");
    
    const item = books.find(book => book.id == id);

    item.title = title.value;
    item.author = author.value;
    item.year = year.value;
    item.isCompleted = isCompleted.checked;

    title.value = "";
    author.value = "";
    year.value = "";
    isCompleted.checked = false;

    document.dispatchEvent(new Event(RENDER_BOOK));
    saveBook();
  }

  function bookActionButtons() {
    const booksItem = document.querySelectorAll(".books-item");

    const idBook = document.querySelector(".idBook");
    const title = document.querySelector(".title");
    const author = document.querySelector(".author");
    const year = document.querySelector(".year");
    const isCompleted = document.querySelector(".isCompleted");

    booksItem.forEach(buttonAction => {
      buttonAction.addEventListener("click", e => {
        if(e.target.classList.contains("check-book")) {
          const bookId = e.target.dataset.bookid;
          const bookTarget = books.find(book => book.id == bookId);
          
          bookTarget.isCompleted = true;
          saveBook();
        } 
        
        if(e.target.classList.contains("undo-book")) {
          const bookId = e.target.dataset.bookid;
          const bookTarget = books.find(book => book.id == bookId);
          
          bookTarget.isCompleted = false;
          saveBook();
        }

        if(e.target.classList.contains("remove-book")) {
          const confirmRemove = confirm("Yakin ingin menghapus..?");

          if(confirmRemove) {
            const bookId = e.target.dataset.bookid;
            const bookTarget = books.findIndex(book => book.id == bookId);
  
            books.splice(bookTarget, 1);
            saveBook();
          } else {
            return;
          }
        }

        if(e.target.classList.contains("edit-book")) {
          const btnSubmit = document.querySelector(".button-submit");
          const bookId = e.target.dataset.bookid;
          const bookTarget = books.find(book => book.id == bookId);

          idBook.value = bookTarget.id;
          title.value = bookTarget.title;
          author.value = bookTarget.author;
          year.value = bookTarget.year;
          isCompleted.checked = bookTarget.isCompleted;
          btnSubmit.innerText = "Edit Data";
          btnSubmit.classList.replace("button-submit", "button-edit");
        }

        document.dispatchEvent(new Event(RENDER_BOOK));
      });
    });
  };

  document.addEventListener(RENDER_BOOK, () => {    
    const uncompletedBooks = document.querySelector(".books-item.uncompletedBook");
    const completedBooks = document.querySelector(".books-item.completedBook");
    const allBooks = document.querySelector(".books-item.allBook");

    uncompletedBooks.innerHTML = "";
    completedBooks.innerHTML = "";
    allBooks.innerHTML = "";

    books.map(book => {
      const bookElement = createBook(book);

      if(book.isCompleted || !book.isCompleted) {
        allBooks.innerHTML += bookElement;
      }

      if(book.isCompleted) {
        completedBooks.innerHTML += bookElement;
      }

      if (!book.isCompleted) {
        uncompletedBooks.innerHTML += bookElement;
      }
    });

    
  });

})();

document.querySelector('#contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.elements.name.value = '';
  e.target.elements.email.value = '';
  e.target.elements.message.value = '';
});
