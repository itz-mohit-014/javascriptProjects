const allInputs = document.querySelectorAll('input');
const selectRatio = document.querySelectorAll('select');

function updateValue (){
    const dataUnit = this.dataset.valueUnit || '';

    document.documentElement.style.setProperty(`--${this.name}`, this.value + dataUnit);



}


function changeRatio(ratio){

   let output =  document.documentElement.style.setProperty(`--aspect-ratio`, ratio.target.value);

    console.log(output)

}
allInputs.forEach(input => input.addEventListener('change', updateValue));
allInputs.forEach(input => input.addEventListener('mousemove', updateValue));
selectRatio.forEach(input => input.addEventListener('change', changeRatio));


