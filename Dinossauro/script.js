const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let dinoPosition = 0;
let isJumping = false;

let handleKeyUp = (event) => {
    if(event.keyCode === 32) {
        if(!isJumping)
            jump();
    }
}

let jump = () => {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (dinoPosition >= 150) {
            clearInterval(upInterval);
    
            //Descendo
            let downInterval = setInterval(() => {
                if(dinoPosition <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else {
                    dinoPosition -= 20;
                    dino.style.bottom  = dinoPosition + 'px';
                }
            }, 20);
        }
        //Subindo
        else{
            dinoPosition += 20;
            dino.style.bottom  = dinoPosition + 'px';
        }
    }, 20);
}

createCactus = () => {
    const cactus = document.createElement('div');
    let cactusPosition = 1450;
    let randomTime = (Math.random() + 0.1) * 4000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1>Game Over!<\h1>';
        }
        else
        {
            cactusPosition -= 7;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 10);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);