
// CONFIG

let numberOfRounds = 5;
let runSec = 2;
let walkSec = 4;

// DOM ELEMENTS

let wrapper = document.getElementById("wrapper");
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let test = document.getElementById("test");
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

let runCounter = 0;
let runTimeLeft = runSec;
let walkCounter = 0;
let walkTimeLeft = walkSec;


function excercise() {

    console.log(numberOfRounds);
    stop.disabled = false;

    stop.addEventListener("click", function() {
        clearInterval(excercise);
        console.log('e');
    })
    
    //container.style.opacity = "1";


        function run() {
            container.innerText = 'Bieg: ' + convertSeconds(runTimeLeft - runCounter);
        
            runTimer = () => {
                runCounter++;
                container.innerText = 'Bieg: ' + convertSeconds(runTimeLeft - runCounter);
        
                if (runCounter == runTimeLeft) {
                    clearInterval(running);
                    runCounter = 0;
                    setTimeout(walk, 1000);
                }
            }
        
            let running = setInterval(runTimer, 1000);
        
            //setTimeout(walk, runSec * 1000 + 1000);
            
            stop.addEventListener("click", function() {

                clearInterval(running);
            
            })

        
        }
    
        run();

    
    function walk() {


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

        stop.addEventListener("click", function() {

            clearInterval(walking);
        
        })

        test.addEventListener("click", function() {

            walk();

        
        })
    
        let walking = setInterval(walkTimer, 1000);
       
    }

    let excercise = setInterval(run, (runSec + walkSec) * 1000 + 2000);
    

}

// START EXCERCISE 


start.addEventListener("click", function() {

    excercise();

})


test.addEventListener("click", function() {

    setTimeout(excercise, walkTimeLeft * 1000);


})


