const URL = 'https://thesimpsonsquoteapi.glitch.me/quotes';

const quoteEl = document.querySelector('.quote q');
const authorEl = document.querySelector('.author span');
const imageEl = document.querySelector('.image');
const quoteContainerEl = document.querySelector('.quote-container');
const loaderEl = document.querySelector('.loader');
const textEl = document.querySelector('.text');
const errorEl = document.querySelector('.error');

const buttonEl = document.querySelector('button');

function getQuote(){
    buttonEl.classList.add('hide');
    quoteContainerEl.classList.add('hide');
    loaderEl.classList.remove('hide');
    fetch(URL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            addToDOM(data);
        })
        .catch(e => {
            quoteContainerEl.classList.add('hide');
            loaderEl.classList.add('hide');
            errorEl.classList.remove('hide');
            errorEl.textContent = `Error: ${e.message}.`;
        })
}

function addToDOM(data){
    quoteEl.textContent = data[0].quote;
    authorEl.textContent = data[0].character;
    imageEl.src = data[0].image;
    if (data[0].characterDirection === 'Left'){
        quoteContainerEl.classList.remove('picRight');
        textEl.classList.remove('textLeft');
        quoteContainerEl.classList.add('picLeft');
        textEl.classList.add('textRight');
    } else {
        quoteContainerEl.classList.remove('picLeft');
        textEl.classList.remove('textRight');
        quoteContainerEl.classList.add('picRight');
        textEl.classList.add('textLeft');
    }
    quoteContainerEl.classList.remove('hide');
    loaderEl.classList.add('hide');
    buttonEl.classList.remove('hide');
}

buttonEl.addEventListener('click', getQuote);

getQuote();