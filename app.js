const wrapper = document.getElementById("wrapper");
const controlss = document.getElementById("controls");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const test = document.getElementById("test");

const weeks = document.getElementById('weeks-wrapper');
const title = document.getElementById('title');
const image = document.getElementById('jogging-img');
const totalTimeContainer = document.getElementById('time-left');
const mainHeader = document.getElementById('main-header');
const timeTotalContainer = document.getElementById('time-total');

const weekOne = document.getElementById("week-one");
const weekTwo = document.getElementById("week-two");
const weekThree = document.getElementById("week-three");
const weekFour = document.getElementById("week-four");
const weekFive = document.getElementById("week-five");
const weekSix = document.getElementById("week-six");
const weekSeven = document.getElementById("week-seven");
const weekEight = document.getElementById("week-eight");
const weekNine = document.getElementById("week-nine");
const weekTen = document.getElementById("week-ten");

const buttons = document.querySelectorAll('button');

const container = document.createElement("DIV");
const time = document.createElement("SPAN");
const mode = document.createElement("SPAN");

container.classList.add("container");
time.classList.add("time");
mode.classList.add("mode");
mainHeader.appendChild(container);
container.appendChild(time);
container.appendChild(mode);


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


let isRunning = false;
let isWalking = false;
let isWalkingStopped = false;

let runCounter = 0;
let walkCounter = 0;
let totalTime = 0;

let numberOfRounds = 0;
let runTimeLeft = 0;
let walkTimeLeft = 0;
let totalTimeLeft = 1800;


[...buttons].forEach((button) => {
    button.addEventListener('click', () => {
        weeks.style.display = "none";
        image.style.display = "none";
        totalTimeContainer.style.display = "block";
        title.style.fontSize = "21px";
        controls.style.display = "block";
    });
});

weekOne.addEventListener("click", function() {
    runTimeLeft = 120;
    walkTimeLeft = 240;
    numberOfRounds = 5;
    title.innerText = "Tydzień 1";
});

weekTwo.addEventListener("click", function() {
    runTimeLeft = 180;
    walkTimeLeft = 180;
    numberOfRounds = 5;
    title.innerText = "Tydzień 2";
});

weekThree.addEventListener("click", function() {
    numberOfRounds = 4;
    runTimeLeft = 180;
    walkTimeLeft = 150;
    title.innerText = "Tydzień 3";
});

weekFour.addEventListener("click", function() {
    numberOfRounds = 3;
    runTimeLeft = 420;
    walkTimeLeft = 180;
    title.innerText = "Tydzień 4";
});

weekFive.addEventListener("click", function() {
    numberOfRounds = 3;
    runTimeLeft = 480;
    walkTimeLeft = 120;
    title.innerText = "Tydzień 5";
});

weekSix.addEventListener("click", function() {
    numberOfRounds = 3;
    runTimeLeft = 540;
    walkTimeLeft = 120;
    title.innerText = "Tydzień 6";
});

weekSeven.addEventListener("click", function() {
    numberOfRounds = 3;
    runTimeLeft = 540;
    walkTimeLeft = 60;
    title.innerText = "Tydzień 7";
});

weekEight.addEventListener("click", function() {
    numberOfRounds = 2;
    runTimeLeft = 780;
    walkTimeLeft = 120;
    title.innerText = "Tydzień 8";
});

weekNine.addEventListener("click", function() {
    numberOfRounds = 2;
    runTimeLeft = 840;
    walkTimeLeft = 60;
    title.innerText = "Tydzień 1";
});

weekTen.addEventListener("click", function() {
    numberOfRounds = 1;
    runTimeLeft = 1800;
    walkTimeLeft = 0;
    title.innerText = "Tydzień 10";
});




function excercise() {

    stop.addEventListener("click", function() {
        clearInterval(excercise);
    })

    container.style.opacity = "1";

    function run() {
        isRunning = true;
        isWalking = false;
        time.innerText = convertSeconds(runTimeLeft - runCounter);
        mode.innerText = "bieg";

        runTimer = () => {
            runCounter++;
            time.innerText = convertSeconds(runTimeLeft - runCounter);

            if (runCounter == runTimeLeft && isRunning) {
                clearInterval(running);
                runCounter = 0;
                setTimeout(walk, 1000);

            }
        }



        let running = setInterval(runTimer, 1000);


        stop.addEventListener("click", function() {
            clearInterval(running);
        })


    }

    run();



    function walk() {

        isWalking = true;
        isRunning = false;

        time.innerText = convertSeconds(walkTimeLeft - walkCounter);
        mode.innerText = "marsz";

        walkTimer = () => {

            walkCounter++;
            time.innerText = convertSeconds(walkTimeLeft - walkCounter);


            if (walkCounter == walkTimeLeft) {
                clearInterval(walking);
                walkCounter = 0;
                numberOfRounds = numberOfRounds - 1;


                if (numberOfRounds == 0) {
                    clearInterval(excercise)
                }

            }

        }

        stop.addEventListener("click", function() {
            if (isWalking) {
                clearInterval(walking);
            }
            isWalkingStopped = true;
        })

        start.addEventListener("click", function() {
            if (isWalkingStopped && isWalking) {
                walk();
            }
            isWalkingStopped = false;

        })

        let walking = setInterval(walkTimer, 1000);

    }

    let excercise = setInterval(run, (runTimeLeft + walkTimeLeft) * 1000 + 2000);
    if (numberOfRounds == 0) {
        clearInterval(excercise)
    }


    totalTimeCount = () => {

        totalTime++;
        timeTotalContainer.innerText = convertSeconds(totalTimeLeft - totalTime);


        if (totalTime == totalTimeLeft) {
            clearInterval(timeCount);
            totalTime = 0;
        }

    }

    let timeCount = setInterval(totalTimeCount, 1000);

    stop.addEventListener("click", function() {
        clearInterval(timeCount);
    })


}


start.addEventListener("click", function() {

    if (isWalkingStopped) {
        setTimeout(excercise, walkTimeLeft * 1000);
    } else {
        excercise();
    }
    stop.disabled = false;
    start.disabled = true;
})


stop.addEventListener("click", function() {
    start.disabled = false;
    stop.disabled = true;
})