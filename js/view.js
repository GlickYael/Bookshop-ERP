function renderInitialDB() {
    gBooks = [...initalBooksList];
    localStorage.setItem("BookshopERP_nextId", JSON.stringify(gBooks.length + 1));
    localStorage.setItem("BookshopERP_data", JSON.stringify(gBooks));
    renderPage(1);
}

function addEvents(){
    document.getElementById("addBookBtn").addEventListener('click', ()=>{renderCreateBookForm()});
    document.getElementById("initDB_Btn").addEventListener('click', ()=>{renderInitialDB()});
    document.getElementById("titleSort").addEventListener('click', ()=>{
        sortBy = 'title'
        renderSortList()});
    document.getElementById("priceSort").addEventListener('click', ()=>{
        sortBy = 'price'
        renderSortList()});
    document.getElementById('prevPageBtn').addEventListener('click',()=>prevPage())
    document.getElementById('nextPageBtn').addEventListener('click',()=>nextPage())
    document.getElementById('languageSelect').addEventListener('change', function() {
        language = this.value;
        changeLanguage();
    })
}

function renderBooks(books) {
    const booksList = document.getElementById("booksList");
    booksList.innerHTML = "";
    let endIndex = currentPage*cardsPerPage>gBooks.length?gBooks.length:currentPage*cardsPerPage;
    for (let index = (currentPage-1)*cardsPerPage; index < endIndex; index++) {
        booksList.innerHTML+=getBookInList(gBooks[index]);
    }
    renderPageButtons();
}

function renderPageButtons(){
    const pagesButtons = document.getElementById("pagesButtons");
    const prevBtn = document.getElementById("prevPageBtn");
    const nextBtn = document.getElementById("nextPageBtn");
    pagesButtons.innerHTML = "";
    let startPage;
    let endIndex;
    if(currentPage!=totalPages&&currentPage!=1){
        startPage = currentPage - 1;
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        endIndex = currentPage +1<= totalPages?currentPage+1:totalPages;

    }else if(currentPage===1&&currentPage!=totalPages){
        startPage = 1;
        prevBtn.disabled = true;
        nextBtn.disabled = false;
        endIndex = currentPage +2<= totalPages?currentPage+2:totalPages;
    }
    else if(currentPage===1){
        startPage = currentPage;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        endIndex = currentPage;
    }
    if(currentPage===totalPages&&currentPage!=1){
        prevBtn.disabled = false;
        nextBtn.disabled = true;
        startPage = currentPage-2>=1?currentPage-2:currentPage-1;
        endIndex = totalPages;
    }
    for (let i = startPage; i <= endIndex; i++) {
        if(i===currentPage){
            pagesButtons.innerHTML += `<button class="currentPageBtn" onclick="renderPage(${i})">${i}</button>`;
        }else{
            pagesButtons.innerHTML += `<button onclick="renderPage(${i})">${i}</button>`;
        }
    }
}

function renderPage(page){
    totalPages = Math.ceil(gBooks.length / cardsPerPage);
    currentPage = page;
    if(currentPage < 1){
        currentPage = 1;
    }
    if(currentPage > totalPages){
        currentPage = totalPages;
    }
    renderBooks(gBooks);
}

function getBookInList(book) {
    return `<div class="bookInList">
        <p class="idInTable">${book.id}</p>
        <p class="titleInTable titleInList" onclick="readBook(${book.id})">${book.title}</p>
        <p class="priceInTable">${book.price}</p>
        <button class="readBookBtn" onclick="readBook(${book.id})">read</button>
        <button class="updateBookBtn" onclick="renderUpdateBookForm(${book.id}, '${book.title}', ${book.price},${book.id})">update</button>
        <button onclick="deleteBook(${book.id})">🗑️</button>
    </div>`;
}

function readBook(id) {
    const sideShow = document.getElementById("sideShow");
    let bookToPresent = gBooks[gBooks.findIndex((b) => b.id === id)];
    sideShow.innerHTML = `
    <div id="bookPresentation">
        <h2>${bookToPresent.title}</h2>
        <img src="${bookToPresent.imageUrl}" alt="${bookToPresent.title}"> 
        <div class="rateUpdateDiv">       
        <button class="rateDecreaseBtn" onclick="updateRate(${id},'decrease')">-</button>
        <p id="bookRate">Rate: </p><p class="rateElement">${bookToPresent.rate}</p>
        <button class="rateIncreaseBtn" onclick="updateRate(${id},'increase')">+</button>
        </div>
        </div>
    `;
    document.getElementById('bookRate').textContent = translations[language].bookRate;

}

function renderCreateBookForm() {
    document.getElementById(
        "sideShow"
    ).innerHTML = `<div class="createBookContainer">
    <button class="closeCreateBookFormBtn" onclick="removeCreateBookForm()">x</button>
    <h2 id='createBookTitle'>Add Book</h2>
    <form class="createBookForm" >
    <input class="createTitleInput" id="bookFormTitlePlaceholder" type="text" name="title" placeholder="title" required>
    <input class="createPriceInput" id="bookFormPricePlaceholder" type="number" name="price" placeholder="price" required>
    <input class="createImageUrlInput" id="bookFormImgUrlPlaceholder" type="text" name="imageUrl" placeholder="image url" required>
    <button type="submit" id="createSubmitBtn">Add</button>
    </form>
    </div>
    `;
    document
        .getElementsByClassName("createBookForm")[0]
        .addEventListener("submit", createBook);
        document.getElementById('bookFormImgUrlPlaceholder').placeholder = translations[language].bookFormImgUrlPlaceholder;
        document.getElementById('bookFormPricePlaceholder').placeholder = translations[language].bookFormPricePlaceholder;
        document.getElementById('bookFormTitlePlaceholder').placeholder = translations[language].bookFormTitlePlaceholder;
        document.getElementById('createBookTitle').textContent = translations[language].createBookTitle;
        document.getElementById('createSubmitBtn').textContent = translations[language].createSubmitBtn;
    
}

function removeCreateBookForm() {
    document.getElementsByClassName("createBookContainer")[0].remove();
}

function renderUpdateBookForm(imageUrl, title, price, id) {
    document.getElementById(
        "sideShow"
    ).innerHTML = `<div class="updateBookContainer" onsubmit="">
    <button class="closeUpdateBookFormBtn" onclick="removeUpdateBookForm()">x</button>
    <h2 id="updateBookTitle">Update Book</h2>
    <form class="updateBookForm">
    <input value="${title}" id="bookFormTitlePlaceholder" class="updateTitleInput" type="text" name="title" placeholder="title" required>
    <input value="${price}" id="bookFormPricePlaceholder" class="updatePriceInput" type="number" name="price" placeholder="price" required>
    <input value="${imageUrl}" id="bookFormImgUrlPlaceholder" class="updateImageUrlInput" type="text" name="imageUrl" placeholder="image url" required>
    <button type="submit" id="updateSubmitBtn">Update</button>
    </form>
    </div>
    `;
    document
        .getElementsByClassName("updateBookForm")[0]
        .addEventListener("submit", (e) => updateBook(e, id));
        document.getElementById('bookFormImgUrlPlaceholder').placeholder = translations[language].bookFormImgUrlPlaceholder;
        document.getElementById('bookFormPricePlaceholder').placeholder = translations[language].bookFormPricePlaceholder;
        document.getElementById('bookFormTitlePlaceholder').placeholder = translations[language].bookFormTitlePlaceholder;
        document.getElementById('updateSubmitBtn').textContent = translations[language].updateSubmitBtn;
        document.getElementById('updateBookTitle').textContent = translations[language].updateBookTitle;
}

function removeUpdateBookForm() {
    document.getElementsByClassName("updateBookContainer")[0].remove();
}

function renderSortList() {
    switch (sortBy) {
        case 'title':
            gBooks.sort((a, b) => {
                let aTitle = a.title;
                let bTitle = b.title;
                if (aTitle < bTitle) return -1;
                if (aTitle > bTitle) return 1;
                return 0;
            })
            document.getElementById('titleSort').innerHTML = '↓';
            document.getElementById('priceSort').innerHTML = '↑';
            break;
        case 'price':
            gBooks.sort((a,b) => {
                let aPrice = a.price;
                let bPrice = b.price;
                return aPrice - bPrice;
            })
            document.getElementById('priceSort').innerHTML = '↓';
            document.getElementById('titleSort').innerHTML = '↑';
            break;
        default:
            break;
    }
    renderPage(currentPage);
}

function changeLanguage(){
    if(language==='he'){
        document.body.style.direction='rtl';
    }
    else{
        document.body.style.direction='ltr';
    }
    document.getElementsByTagName('h1')[0].textContent = translations[language].h1;
    document.getElementById('addBookBtn').textContent = translations[language].createBookBtn;
    document.getElementById('initDB_Btn').textContent = translations[language].loadDataBtn;
    document.getElementById('tableId').textContent = translations[language].tableId;
    document.getElementById('tableTitle').textContent = translations[language].tableTitle;
    document.getElementById('tablePrice').textContent = translations[language].tablePrice;
    document.getElementById('tableActions').textContent = translations[language].tableActions;
    document.getElementById('nextPageBtn').textContent = translations[language].nextPageBtn
    document.getElementById('prevPageBtn').textContent = translations[language].prevPageBtn;
    
    let bookRate = document.getElementById('bookRate');
    if(bookRate!==null){
        bookRate.textContent = translations[language].bookRate;
    }
    let bookFormImgUrlPlaceholder = document.getElementById('bookFormImgUrlPlaceholder');
    if(bookFormImgUrlPlaceholder!==null){
        bookFormImgUrlPlaceholder.placeholder = translations[language].bookFormImgUrlPlaceholder;
    }
    let bookFormPricePlaceholder = document.getElementById('bookFormPricePlaceholder');
    if(bookFormPricePlaceholder!==null){
        bookFormPricePlaceholder.placeholder = translations[language].bookFormPricePlaceholder;
    }
    let bookFormTitlePlaceholder = document.getElementById('bookFormTitlePlaceholder');
    if(bookFormTitlePlaceholder!==null){
        bookFormTitlePlaceholder.placeholder = translations[language].bookFormTitlePlaceholder;
    }
    let createBookTitle = document.getElementById('createBookTitle');
    if(createBookTitle!==null){
        createBookTitle.textContent = translations[language].createBookTitle;
    }
    let createSubmitBtn = document.getElementById('createSubmitBtn');
    if(createSubmitBtn!==null){
        createSubmitBtn.textContent = translations[language].createSubmitBtn;
    }
    let updateSubmitBtn = document.getElementById('updateSubmitBtn');
    if(updateSubmitBtn!==null){
        updateSubmitBtn.textContent = translations[language].updateSubmitBtn;
    }
    let updateBookTitle = document.getElementById('updateBookTitle');
    if(updateBookTitle!==null){
        updateBookTitle.textContent = translations[language].updateBookTitle;
    }
}
