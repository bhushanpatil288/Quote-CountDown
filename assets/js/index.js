// constants
const countDownCounter = document.querySelector("#countDown");
const setBtn = document.querySelector("#set");

document.addEventListener('DOMContentLoaded', ()=>{

    setBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        
        const TimeData = getCounterValues();

        startCountDown(TimeData);
    })


})

const getCounterValues = () =>{
    return {
        hour: Number(document.querySelector("#hour").value),
        minute: Number(document.querySelector("#minute").value),
        second: Number(document.querySelector("#second").value)
    }
}

const startCountDown = (TimeData) =>{
    let {hour, minute, second} = TimeData;
    const totalMiliSeconds = ((hour*60*60) + (minute*60) + second)*1000;

    
    startClock(hour, minute, second, totalMiliSeconds);
}

const startClock = (hour, minute, second, totalMiliSeconds) =>{
    const interval = setInterval(()=>{
        if (totalMiliSeconds <= 1000){
            fireConfetti();
            clearInterval(interval);

        }
        if(second === 0){
            if(minute == 0){
                hour--;
                minute = 59;
            } else {
                minute--;
                second = 59;
            }
        } else {
            second--;
        }

        countDownCounter.textContent = `${hour}:${minute}:${second}`
        totalMiliSeconds-=1000;
        console.log(totalMiliSeconds);
    }, 1000)
}

function fireConfetti(){
    var end = Date.now() + (15 * 1000);

    // go Buckeyes!
    var colors = ['#bb0000', '#ffffff'];

    (function frame() {
    confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
    });
    confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
    }());
}