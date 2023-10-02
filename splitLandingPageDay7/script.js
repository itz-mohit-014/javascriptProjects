const rightContainer = document.querySelector('.right');
const leftContainer = document.querySelector('.left');
const mainContainer = document.querySelector('.landing-page');

rightContainer.addEventListener('mouseenter', ()=>{
    mainContainer.classList.add('hovering-right')
})

rightContainer.addEventListener('mouseleave', ()=>{
    mainContainer.classList.remove('hovering-right')
})


leftContainer.addEventListener('mouseenter', ()=>{
    mainContainer.classList.add('hovering-left')
})

leftContainer.addEventListener('mouseleave', ()=>{
    mainContainer.classList.remove('hovering-left')
})

