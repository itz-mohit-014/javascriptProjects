const progressStepsLine = document.querySelector('.progress-steps-wrapper');
const nextBtn = document.querySelector('.btn:nth-child(2)');
const prevBtn = document.querySelector('.btn:nth-child(1)');
const steps = document.querySelectorAll('.steps')

let currentStep = 1;

function nextSteps (){
    currentStep++
    if(currentStep > steps.length){
        currentStep = steps.length
    }
    updateSteps();
}

function lastSteps(){
    currentStep--
    if(currentStep< 1){
        currentStep = 1;
    }
    updateSteps();
}


function updateSteps(){
    steps.forEach(el, index , ()=>{
        {
            if(index < currentStep ){
                steps.classList.add('active')
            }else{
                steps.classList.remove('active');
            }
        }
    })
}

nextBtn.addEventListener('click', nextSteps);
prevBtn.addEventListener('click', lastSteps);

