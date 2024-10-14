function main() {
    initialRead();
}   
main();

function createBook(e) {
    e.preventDefault();
    let title = document.getElementsByClassName("createTitleInput")[0].value;
    let price = document.getElementsByClassName("createPriceInput")[0].value;
    let imageUrl = document.getElementsByClassName("createImageUrlInput")[0].value;
    let book = { id: nextId._id, title: title, price: price, imageUrl: imageUrl, rate: 0 };
    gBooks.push(book);
    localStorage.setItem("BookshopERP_data", JSON.stringify(gBooks));
    localStorage.setItem("BookshopERP_nextId", JSON.stringify(book.id + 1));
    renderSortList();
    removeCreateBookForm();
}

function updateBook(e, id) {
    e.preventDefault();
    let index = gBooks.findIndex((b) => b.id === id);
    gBooks[index].title = document.getElementsByClassName("updateTitleInput")[0].value;
    gBooks[index].price = document.getElementsByClassName("updatePriceInput")[0].value;
    gBooks[index].imageUrl = document.getElementsByClassName("updateImageUrlInput")[0].value;
    localStorage.setItem("BookshopERP_data", JSON.stringify(gBooks));
    renderSortList();
    removeUpdateBookForm();
}

function deleteBook(id) {
    let index = gBooks.findIndex((b) => b.id === id);
    gBooks.splice(index, 1);
    localStorage.setItem("BookshopERP_data", JSON.stringify(gBooks));
    renderPage(currentPage);
}

function prevPage(){
    renderPage(currentPage-1);
}

function nextPage(){
    renderPage(currentPage+1);
}

function updateRate(id,operation){
    let index = gBooks.findIndex(b=>b.id===id)
    switch (operation) {
        case 'increase':
            gBooks[index].rate++;
            break;
        case 'decrease':
            gBooks[index].rate--;
            break;
        default:
            break;
    }
    localStorage.setItem("BookshopERP_data",JSON.stringify(gBooks));
    readBook(id);
}

function initialRead() {
    let data = JSON.parse(localStorage.getItem("BookshopERP_data"));
    if (data === null) {
        gBooks = [...initalBooksList];
        renderPage(1);
        nextId = new NextId(gBooks.length + 1);
        localStorage.setItem("BookshopERP_data", JSON.stringify(gBooks));
        console.log(gBooks);
        localStorage.setItem("BookshopERP_nextId", JSON.stringify(gBooks.length + 1));
    } else {
        gBooks = data;
        renderPage(1);
        nextId = new NextId(JSON.parse(localStorage.getItem("BookshopERP_nextId")));
    }
    addEvents();
}
