var initalBooksList = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    price: 25.99,
    rate: 0,
    imageUrl:
      "https://media.glamour.com/photos/56e1f3c462b398fa64cbd304/master/w_1600%2Cc_limit/entertainment-2016-02-18-main.jpg",
  },
  {
    id: 2,
    title: "1984",
    price: 19.49,
    rate: 0,
    imageUrl:
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b468d093312907.5e6139cf2ab03.png",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    price: 14.99,
    rate: 0,
    imageUrl:
      "https://almabooks.com/wp-content/uploads/2016/10/9781847493699.jpg",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    price: 22.5,
    rate: 0,
    imageUrl:
      "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1",
  },
  {
    id: 5,
    title: "Moby Dick",
    price: 18.75,
    rate: 0,
    imageUrl: "https://images.penguinrandomhouse.com/cover/9780143105954",
  },
  {
    id: 6,
    title: "War and Peace",
    price: 30.0,
    rate: 0,
    imageUrl:
      "https://m.media-amazon.com/images/I/513l4nDQYyL._SY445_SX342_.jpg",
  },
  {
    id: 7,
    title: "Crime and Punishment",
    price: 17.99,
    rate: 0,
    imageUrl: "https://images.penguinrandomhouse.com/cover/9780451530066",
  },
  {
    id: 8,
    title: "The Catcher in the Rye",
    price: 21.5,
    rate: 0,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg",
  },
  {
    id: 9,
    title: "The Lord of the Rings",
    price: 35.0,
    rate: 0,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHai3dmalh_-zQhXV1QrpFkXZTW87Ls3Vo3Xoo5S-7RPgO3w2qyOnpA5_ZeTU5Oy_lQL0&usqp=CAU",
  },
  {
    id: 10,
    title: "The Hobbit",
    price: 16.99,
    rate: 0,
    imageUrl:
      "https://tolkienlibrary.com/press/images/movie-tie-in-the-hobbit.jpg",
  },
];

var nextId;
var gBooks = [];
const cardsPerPage = 4;
var totalPages; 
var currentPage = 1; 
var sortBy;
let language = "en";

const translations = {
  en: {
    h1: "Bookshop ERP",
    createBookBtn: "+ New Book",
    loadDataBtn: "Load Data",
    tableId: "Id",
    tableTitle: "Title",
    tablePrice: "Price",
    tableActions: "Actions",
    readBookBtn: "Read",
    updateBookBtn: "Update",
    bookRate: "Rate",
    createBookTitle: "Add Book",
    createSubmitBtn: "Add",
    updateBookTitle: "Update Book",
    updateSubmitBtn: "Update",
    bookFormTitlePlaceholder: "title",
    bookFormPricePlaceholder:"price",
    bookFormImgUrlPlaceholder:"image url",
    prevPageBtn: "Previous",
    nextPageBtn: "Next",
  },
  he: {
    h1: "חנות ספרים ERP",
    createBookBtn: "+ספר חדש",
    loadDataBtn:" טען את המידע",
    tableId: "מספר מזהה",
    tableTitle: "כותרת",
    tablePrice: "מחיר",
    tableActions: "פעולות",
    readBookBtn: "הצגה",
    updateBookBtn: "עדכון",
    bookRate: "דירוג",
    createBookTitle: "הוסף ספר",
    updateBookTitle: "עדכן ספר",
    createSubmitBtn: "הוסף",
    updateSubmitBtn: "עדכן",
    bookFormTitlePlaceholder: "כותרת",
    bookFormPricePlaceholder:"מחיר",
    bookFormImgUrlPlaceholder:"קישור של תמונה",
    prevPageBtn: "הקודם",
    nextPageBtn: "הבא",
  },
};