const steps = document.querySelectorAll('.steps');
const nextBtn = document.querySelector('button:nth-child(2)');
const prevBtn = document.querySelector('button:nth-child(1)');
const progressDisplayLine = document.querySelector('.progress-line');


let currentStatus = 1;
function completeSteps ( ) {
    currentStatus++;

    if(currentStatus>steps.length){
        currentStatus= steps.length;
    }
   
    updateStatus();
}

function unCompleteSteps ( ) {
    currentStatus--;

    if(currentStatus<1){
        currentStatus=1;
    }

    updateStatus();
    
}

function updateStatus(){
    steps.forEach((steps, index)=>{
        if(index<currentStatus){
            steps.classList.add('active')
        }else{
            steps.classList.remove('active')
        }
    })

    // for desable and enable btn

    if(currentStatus === 1){
        prevBtn.disabled = true;
    }else if(currentStatus === steps.length){
        nextBtn.disabled = true;
    }else{
        nextBtn.disabled= false;
        prevBtn.disabled= false;
    }


}

nextBtn.addEventListener('click', completeSteps)
prevBtn.addEventListener('click', unCompleteSteps)