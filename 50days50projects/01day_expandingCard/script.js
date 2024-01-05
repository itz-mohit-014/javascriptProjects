const cards = document.querySelectorAll('.cards')

cards.forEach( (card)=>{
        card.addEventListener('click', ()=> {
            removeExpandCards();
            card.classList.add('expand')}
        )
})


function removeExpandCards (){
    cards.forEach((e)=>{
        e.classList.remove('expand')
    })
}
