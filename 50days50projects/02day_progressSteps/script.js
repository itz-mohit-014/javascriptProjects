const progressStepsLine = document.querySelector('.progress-steps-wrapper');
const prevBtn = document.querySelector('.btn:nth-child(1)');
const nextBtn = document.querySelector('.btn:nth-child(2)');
const steps = document.querySelectorAll('.steps')

let currentStep = 1;

function nextSteps (){
    currentStep++ ;
    if(currentStep > steps.length){
        currentStep = steps.length
    }
    updateSteps();
}

function lastSteps(){
    currentStep-- ;
    if(currentStep < 1){
        currentStep = 1;
    }
    updateSteps();
}


function updateSteps(){

// for changing the steps line width 
    const activeSteps = document.querySelector('.progress-steps-wrapper');

   switch (currentStep) {
    case 1:
        activeSteps.style.setProperty('--active-steps-width', `0%`)
        break;
    case 2:
        activeSteps.style.setProperty('--active-steps-width', `30%`)
        break;
    case 3:
        activeSteps.style.setProperty('--active-steps-width', `60%`)
        break;
    case 4:
        activeSteps.style.setProperty('--active-steps-width', `100%`)
        break;
   }
   
    // for moving steps forward
    steps.forEach((el, index)=>{
        {
            if(index < currentStep ){
                el.classList.add('active')
            }else{
                el.classList.remove('active');
            }
        }
    })

    // for controlling btn disabling and working state and steps line
    if(currentStep === 1){
        prevBtn.disabled = true;
    }else if(currentStep === steps.length){
        nextBtn.disabled = true;
    }else{
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }

}

prevBtn.addEventListener('click', lastSteps);
nextBtn.addEventListener('click', nextSteps);

