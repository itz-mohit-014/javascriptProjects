const hours = document.querySelector('.hour');
const minutes = document.querySelector('.mins');
const seconds = document.querySelector('.secs');

function currentTime(){
    const date = new Date();

// for minutes
    const currentSec = date.getSeconds();
    const secDeg = (currentSec / 60 )* 360;
    seconds.style.transform = `rotate(${secDeg}deg)`

    // for seconds
    const currentMins = date.getMinutes();
    const minDeg = (currentMins / 60) * 360;
    minutes.style.transform= `rotate(${minDeg}deg)`

// for hours
    const currentHours = date.getHours();
    const hourDeg = (currentHours / 24) * 360;
    hours.style.transform= `rotate(${hourDeg}deg)`
}

setInterval(currentTime, 1000);
