
// CONFIG

let numberOfRounds = 2;
let runSec = 2;
let walkSec = 3;

// DOM ELEMENTS

let wrapper = document.getElementById("wrapper");
let start = document.getElementById("start");
let container = document.createElement("DIV");
container.classList.add("container");
wrapper.appendChild(container);

// FUNCTION FOR CONVERTING SECONDS TO MINUTES

function convertSeconds(s) {
    var min = Math.floor(s / 60);
    var sec = s % 60;
    if (min < 10 && sec < 10) {
        return '0' + min + ':0' + sec;
    } else if (min > 10 && sec < 10) {
        return min + ':0' + sec;
    } else if (min < 10 && sec >= 10) {    
        return '0' + min + ':' + sec;
    } else {
        return min + ':' + sec;
    }

}

// EXCERCISE FUNCTION

function excercise() {

    function run() {
        let runCounter = 0;
        let runTimeLeft = runSec;
    
        container.innerText = 'Bieg: ' + convertSeconds(runTimeLeft - runCounter);
    
        
        runTimer = () => {
            runCounter++;
            container.innerText = 'Bieg: ' + convertSeconds(runTimeLeft - runCounter);
    
            if (runCounter == runTimeLeft) {
                clearInterval(running);
                runCounter = 0;
            }
        }
    
        let running = setInterval(runTimer, 1000);
    
        setTimeout(walk, runSec * 1000 + 1000);
    
    }

    run();
    
    
    function walk() {
        let walkCounter = 0;
        let walkTimeLeft = walkSec;
    
        container.innerText = 'Marsz: ' + convertSeconds(walkTimeLeft - walkCounter);
    
        
        walkTimer = () => {
            walkCounter++;
            container.innerText = 'Marsz: ' + convertSeconds(walkTimeLeft - walkCounter);
    
            if (walkCounter == walkTimeLeft) {
                clearInterval(walking);
                walkCounter = 0;
                numberOfRounds = numberOfRounds - 1;
                console.log(numberOfRounds);

                if (numberOfRounds == 0) {
                    clearInterval(excercise)
                }

            }
        }
    
        let walking = setInterval(walkTimer, 1000);
       
    }

    let excercise = setInterval(run, (runSec + walkSec) * 1000 + 2000);
    

}

// START EXCERCISE 

start.addEventListener("click", function() {
    excercise();
})







