// constants
const countDownCounter = document.querySelector("#countDown");
const setBtn = document.querySelector("#set");
const quoteSection = document.querySelector(".quote-section")
let quote = document.querySelector("#quote");
let author = document.querySelector("#author");
const audio = document.querySelector("audio");
// keeping reference to stop confetti if user starts another timer
let confettiFrame;
// I am using this array of object to randomly select quote.
const quotes = [
  {
    "quote": "Progress begins the moment you decide that yesterday’s limits don’t define today.",
    "conclusion": "Your potential resets every day.",
    "author": "Unknown",
    "theme": "growth"
  },
  {
    "quote": "The fastest way to lose yourself is to live by someone else’s expectations.",
    "conclusion": "Authenticity protects your direction in life.",
    "author": "Unknown",
    "theme": "identity"
  },
  {
    "quote": "Big changes often come from choices that felt insignificant in the moment.",
    "conclusion": "Small decisions compound into large outcomes.",
    "author": "Unknown",
    "theme": "habit"
  },
  {
    "quote": "You don’t need the whole path to take the first step.",
    "conclusion": "Action reveals clarity more than planning does.",
    "author": "Unknown",
    "theme": "courage"
  },
  {
    "quote": "A calm mind notices opportunities that a restless one overlooks.",
    "conclusion": "Stillness improves judgment.",
    "author": "Unknown",
    "theme": "mindfulness"
  },
  {
    "quote": "Strength isn’t built by avoiding the storm but by learning how to stand in it.",
    "conclusion": "Resilience forms through adversity.",
    "author": "Unknown",
    "theme": "resilience"
  },
  {
    "quote": "You grow faster when you stop trying to look successful and start trying to be useful.",
    "conclusion": "Impact is more meaningful than appearance.",
    "author": "Unknown",
    "theme": "purpose"
  },
  {
    "quote": "Your direction matters more than your speed.",
    "conclusion": "Going slowly toward the right goal beats rushing toward the wrong one.",
    "author": "Unknown",
    "theme": "focus"
  },
  {
    "quote": "If you wait for the perfect moment, you’ll wait forever.",
    "conclusion": "Progress is built on imperfect beginnings.",
    "author": "Unknown",
    "theme": "motivation"
  },
  {
    "quote": "Failure is not the opposite of progress—it is evidence that you’re trying.",
    "conclusion": "Mistakes validate effort and fuel improvement.",
    "author": "Unknown",
    "theme": "learning"
  },
  {
    "quote": "You become what you repeatedly choose, not what you occasionally desire.",
    "conclusion": "Identity is shaped by consistent action.",
    "author": "Unknown",
    "theme": "discipline"
  },
  {
    "quote": "Letting go is sometimes the bravest path forward.",
    "conclusion": "Releasing what weighs you down creates space for growth.",
    "author": "Unknown",
    "theme": "healing"
  },
  {
    "quote": "Your mind expands every time you challenge a belief you once assumed was true.",
    "conclusion": "Growth requires questioning old patterns.",
    "author": "Unknown",
    "theme": "self-awareness"
  },
  {
    "quote": "Confidence grows when you keep promises to yourself.",
    "conclusion": "Self-trust is built through consistent follow-through.",
    "author": "Unknown",
    "theme": "confidence"
  },
  {
    "quote": "Not every day will feel productive, but every day can teach you something.",
    "conclusion": "Reflection turns ordinary days into meaningful ones.",
    "author": "Unknown",
    "theme": "reflection"
  },
  {
    "quote": "When you shift your perspective, the problem often changes with it.",
    "conclusion": "A new view can reveal solutions.",
    "author": "Unknown",
    "theme": "perspective"
  },
  {
    "quote": "People rarely remember your mistakes, but they always remember your kindness.",
    "conclusion": "Compassion leaves the strongest impression.",
    "author": "Unknown",
    "theme": "kindness"
  },
  {
    "quote": "You don’t need louder dreams, you need quieter doubts.",
    "conclusion": "Self-belief grows when inner resistance fades.",
    "author": "Unknown",
    "theme": "mindset"
  },
  {
    "quote": "A meaningful life is built on choices aligned with your values, not someone else’s approval.",
    "conclusion": "Integrity is more valuable than validation.",
    "author": "Unknown",
    "theme": "values"
  },
  {
    "quote": "Rest is not the opposite of productivity; it is the foundation for it.",
    "conclusion": "Recovery enables sustainable effort.",
    "author": "Unknown",
    "theme": "well-being"
  },
  {
    "quote": "Hope is not optimism—it’s the decision to try again anyway.",
    "conclusion": "Persistence keeps hope alive.",
    "author": "Unknown",
    "theme": "hope"
  },
  {
    "quote": "Your environment shapes your energy more than your motivation does.",
    "conclusion": "Surroundings influence behavior and mindset.",
    "author": "Unknown",
    "theme": "environment"
  },
  {
    "quote": "The person you’re becoming is more important than the goal you’re pursuing.",
    "conclusion": "Growth is the real achievement.",
    "author": "Unknown",
    "theme": "self-development"
  },
  {
    "quote": "Joy grows in the spaces where you stop comparing yourself to others.",
    "conclusion": "Comparison steals appreciation.",
    "author": "Unknown",
    "theme": "happiness"
  },
  {
    "quote": "Every step forward feels small until you look back and see how far you’ve come.",
    "conclusion": "Progress is clearer in hindsight.",
    "author": "Unknown",
    "theme": "progress"
  }
]


document.addEventListener('DOMContentLoaded', ()=>{
    setBtn.addEventListener("click", throttle(function(e){
      clearInterval(interval);
      e.preventDefault();
        stopConfetti();
        hideQuote();
        
        const TimeData = getCounterValues();

        startCountDown(TimeData);
        pauseAudio();
        resetFields();
    },0))

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

let interval;

const startClock = (hour, minute, second, totalMiliSeconds) =>{
  interval = setInterval(()=>{
        if (totalMiliSeconds < 1000){
            playAudio();
            fireConfetti();
            showQuote();
            clearInterval(interval);
            return;
        }
        let remaining = totalMiliSeconds;

        const h = Math.floor(remaining / (1000 * 60 * 60));
        remaining %= (1000 * 60 * 60);

        const m = Math.floor(remaining / (1000 * 60));
        remaining %= (1000 * 60);

        const s = Math.floor(remaining / 1000);

        countDownCounter.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

        totalMiliSeconds-=1000;
    }, 1000)
}

const hideQuote = () =>{
    quoteSection.classList.add("d-none");
}

const showQuote = () => {
    const randQuote = quotes[parseInt(Math.random()*25)];
    quote.innerHTML = randQuote.quote;
    author.innerHTML = randQuote.author;
    quoteSection.classList.remove("d-none");
    reset();
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
        confettiFrame = requestAnimationFrame(frame);
    }
    }());
}

function stopConfetti(){
    cancelAnimationFrame(confettiFrame);
}

const resetFields=()=>{
    document.querySelector("#hour").value = '';
    document.querySelector("#minute").value = '';
    document.querySelector("#second").value = '';
}

const reset = () =>{
    
    setTimeout(()=>{
        countDownCounter.innerHTML = "hh:mm:ss";
    },200)
}

function throttle(func, delay){
    let timer = 0;
    return function(...args){
        let now = Date.now();
        if (now - timer >= delay){
            timer = now;
            func(...args);
        }
    }
}

const playAudio = () =>{
  audio.play();
}

const pauseAudio = () =>{
  audio.pause();
  audio.currentTime = 0;
}
