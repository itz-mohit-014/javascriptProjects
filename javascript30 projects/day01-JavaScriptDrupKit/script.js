function playingMusic(e){
    const audio =  document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

    if(!audio) return ;
    
    audio.currentTime= 0;
    audio.play();

    key.classList.add('play-sound')
    // setTimeout(()=>{    
    //     // key.classList.remove('play-sound')
    // }, 600)
    setTimeout(()=>{    
        // key.classList.add('play-sound')
        key.classList.remove('play-sound')
    }, 300)
}

window.addEventListener('keydown', playingMusic);

