const timerDisplay = document.getElementById('timer')
const timeInput = document.getElementById('timeInput');
const startbutton = document.getElementById('startbtn');
const  pauseButton= document.getElementById('pausebtn')
const stopButton = document.getElementById('stopbtn')

let timeInterval;
let remainingTime;
let isPause=false;
function formatTime(sec){
    const min= Math.floor(sec/60);
   const secs=sec%60;
   return`${String(min).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
};
function startTime(){
    let time= parseInt(timeInput.value)
    if(isNaN(time) || time<=0){
        alert("Please enter a valid positive number.")
    
    return;
}
timerDisplay.textContent=formatTime(time)
const timeInterval = setInterval (()=>{
    time-=1
    timerDisplay.textContent=formatTime(time)
    if(time<=0){
        clearInterval(timeInterval)
        alert("Time's up! Drink water now! 💧")
    }
},1000)
}
startbutton.addEventListener('click',startTime)
