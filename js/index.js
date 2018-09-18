'use strict';

let input = document.querySelector('input');
const form = document.querySelector(".js-form");
const result = document.querySelector(".js-result");
const gallery = document.querySelector(".gallery");
const showMore = document.querySelector(".showMore");
const favorites = document.querySelector(".favorites");
const favorite = document.querySelector(".favorite");
const modalContent = document.querySelector(".modal-content");
const modalImg = document.querySelector(".modal-img");
const imgBig = document.querySelector(".imgBig");
const controls = document.querySelector(".controls");
const btnPrevew = document.querySelector(".prevew");
const btnNext = document.querySelector(".next");
let length = localStorage.length;
let page = 1;
let newPhotos = [];
let photos = [];
let favoritePhotos = [];
let index;

let modal = document.querySelector(".modal");
let btn = document.getElementById("myBtn");
let close = document.querySelector(".close");


const API_KEY = '10006985-c8819f0a36f4216b1e874a3ec';

const resetResult = () => {
    gallery.innerHTML = '';
};

const resetModal = () => {
    modalImg.innerHTML = '';
};

const handleFormSumit = e => {
    e.preventDefault();

    resetResult();

    let value = input.value;
    console.log(value); 
    fetchPhoto(value);
};

const morePhotos = () => {
    let value = input.value;
    console.log(value); 
    page = page + 1;
    fetchPhoto(value);
};

const fetchPhoto = value => 
    fetch(
       `https://pixabay.com/api/?key=10006985-c8819f0a36f4216b1e874a3ec&q=${value}&image_type=photo&page=${page}&per_page=12`
    )
    .then(res => res.json())
    .then(data => {

        console.log(data);

        let hits = data.hits;

       hits.forEach(function(elem, index) {
            newPhotos[index] = {
                imgPreviewURL: elem.previewURL,
                imgLargeURL: elem.largeImageURL,
            }
        })

        photos = photos.concat(newPhotos);
        console.log(photos);

        showPhotos(newPhotos);
    })
    .catch(err => console.log(err));


const showPhotos = (newPhotos) => {
    console.log (newPhotos);

    const source = document.querySelector('#card-temp').innerHTML.trim();
    const template = Handlebars.compile(source);

    const markup = newPhotos.reduce((acc, photo) => acc + template(photo), '');
    gallery.insertAdjacentHTML('beforeEnd', markup); 
}

const clickPhoto = e => {

    e.preventDefault();

    resetModal();

    const target = e.target;
    let newUrl = target.parentElement.getAttribute('href');
    console.log("event target: ", target);

    index = findElement(photos, newUrl);
    console.log(index);

    showPhoto(photos, index);

    modal.style.display = "block";

    modalImg.style.background = "transparent";
    modal.style.height = "28rem";
}

const showPhoto = (photos, index) => {

    let newUrl = photos[index].imgLargeURL;

    console.log(newUrl);

    const source = document.querySelector('#modal-temp').innerHTML.trim();
    const template = Handlebars.compile(source);
    const src = {imgSrc: newUrl};
    const newPhoto = template(src);
    modalImg.insertAdjacentHTML('afterbegin', newPhoto);
}

const showPrevewPhoto = e => {
    e.preventDefault();

    resetModal();

    index = index - 1;

    if (index == -1) {
        index = photos.length - 1;
    };

    console.log(index);

    showPhoto(photos, index);

}

const showNextPhoto = e => {
    e.preventDefault();

    resetModal();

    index = index + 1;

    if (index == photos.length) {
        index = 0;
    };

    console.log(index);

    showPhoto(photos, index);

}

const findElement = (photos, imgLargeURL) => {
    let length = photos.length;
    for ( let i = 0; i < length; i++){
        if (photos[i].imgLargeURL == imgLargeURL) {
            return i;
        } 
    }
    return -1;
}

const closeModal = e => {
    modal.style.display = "none";
}

const closeModalWindow = e => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

const addFavoritePhoto = () => {
    favoritePhotos.push(photos[index]);
}

const showFavorites = (e) => {
    e.preventDefault();
    resetResult();

    showPhotos(favoritePhotos);

    showMore.style.display = "none";
}


form.addEventListener('submit', handleFormSumit);
showMore.addEventListener('click', morePhotos);
gallery.addEventListener('click', clickPhoto);
favorites.addEventListener('click', showFavorites);
close.addEventListener('click', closeModal);
window.addEventListener('click', closeModalWindow);
showMore.addEventListener('click', morePhotos);
btnPrevew.addEventListener('click', showPrevewPhoto);
btnNext.addEventListener('click', showNextPhoto);
favorite.addEventListener('click', addFavoritePhoto);