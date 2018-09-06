'use strict';

let input = document.querySelector('input');
const form = document.querySelector(".js-form");
const result = document.querySelector(".js-result");
const showMore = document.querySelector(".showMore");
let length = localStorage.length;
let page = 1;

const API_KEY = '10006985-c8819f0a36f4216b1e874a3ec';

const resetResult = () => {
    result.innerHTML = '';
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

        let newPhotos = [];

       hits.forEach(function(elem, index) {
            newPhotos[index] = {
                imgPreviewURL: elem.previewURL,
                imgLargeURL: elem.largeImageURL,
            }
        })

        showPhotos(newPhotos);
    })
    .catch(err => console.log(err));


const showPhotos = (newPhotos) => {
    console.log (newPhotos);

    const source = document.querySelector('#card-temp').innerHTML.trim();
    const template = Handlebars.compile(source);

    const markup = newPhotos.reduce((acc, photo) => acc + template(photo), '');;

    result.insertAdjacentHTML('afterbegin', markup); 
}


form.addEventListener('submit', handleFormSumit);
showMore.addEventListener('click', morePhotos);
/*result.addEventListener('click', delCard);*/