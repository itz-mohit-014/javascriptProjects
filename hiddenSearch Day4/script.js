const searchInputBox = document.querySelector('#search-input-box');
const btn = document.querySelector('#submit-btn');
const searchBoxWrapper = document.querySelector('.search-box-wrapper');

btn.addEventListener('click', ()=>{
    searchBoxWrapper.classList.toggle('show');
    searchInputBox.focus()

})

