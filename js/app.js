//Unsplash API
const count = 10;
const apiKey= 'brXEP8iJHpzp9Hv2Io3jXEY3Z1iC8txErjTLdd78vw0'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//get the necessary elements

const imageContainer = document.querySelector('#img-container')
const loader = document.querySelector('.loader')

//create a global array to store the data from the API
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//check if images are loaded

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

////create elements for each element in the array and add it to them
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run a function for each element in the Array
    //template of the element using template literals
    photosArray.forEach((photo) => {
        //create anchor tag
        const item = document.createElement('a')
        item.setAttribute('href', photo.links.html)
        item.setAttribute('target', '_blank');

        //create an img tag
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);


        img.addEventListener('load', imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item)

    });
}

//get photos from Unsplash

async function getPhotos(){
    try {
        const response = await fetch(apiURL)
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //catch the error here
        console.log(error)

    }
}


//check for scroll event

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos()
    }
})
//onload 
getPhotos()