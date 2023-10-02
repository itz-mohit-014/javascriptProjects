const figure = document.querySelectorAll('figure');


figure.forEach(element => {
    element.addEventListener('click', expandCrausel =>{

        defaultCrausel();
        // use current target to prevent click effect on img
        expandCrausel.currentTarget.classList.toggle('expand');
    })
});

// for removing Class
const defaultCrausel= () => {
    figure.forEach(el=>{
        el.classList.remove('expand');
    })
}

