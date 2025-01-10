const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('darkMode', html.classList.contains('dark'));
});

if (localStorage.getItem('darkMode') === 'true') {
    html.classList.add('dark');
}

// Timer functionality
const timerDisplay = document.getElementById('timer');
const timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('startbtn');
const pauseButton = document.getElementById('pausebtn');
const stopButton = document.getElementById('stopbtn');
const alertSound = document.getElementById('alertSound');

let timerInterval;
let remainingTime;
let initialTime;
let isPaused = false;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    initialTime = parseInt(timeInput.value);
    if (isNaN(initialTime) || initialTime <= 0) {
        alert("Please enter a valid positive number.");
        return;
    }

    remainingTime = initialTime;
    timerDisplay.textContent = formatTime(remainingTime);

    pauseButton.disabled = false;
    stopButton.disabled = false;
    startButton.disabled = true;
    timeInput.disabled = true;

    // Add visual feedback classes
    timerDisplay.classList.add('running');
    timerDisplay.classList.remove('ending');

    // Start the interval to decrease time every second
    timerInterval = setInterval(() => {
        if (!isPaused) {
            remainingTime -= 1;
            timerDisplay.textContent = formatTime(remainingTime);

            // Add ending animation when 10 seconds or less remain
            if (remainingTime <= 10) {
                timerDisplay.classList.add('ending');
            }

            if (remainingTime <= 0) {
                playAlertSound();
                alert("Time's up! Drink water now! 💧");
                resetAndStartTimer();
            }
        }
    }, 1000);
}

function resetAndStartTimer() {
    remainingTime = initialTime;
    timerDisplay.textContent = formatTime(remainingTime);
    timerDisplay.classList.remove('ending');
}

function playAlertSound() {
    alertSound.currentTime = 0;
    alertSound.play().catch(error => {
        console.log('Audio playback failed:', error);
    });
}

function pauseTimer() {
    isPaused = true;
    pauseButton.textContent = "Resume";
    timerDisplay.classList.remove('running');
}

function resumeTimer() {
    isPaused = false;
    pauseButton.textContent = "Pause";
    timerDisplay.classList.add('running');
}

function stopTimer() {
    clearInterval(timerInterval);
    timerDisplay.textContent = "00:00";
    timeInput.disabled = false;
    timeInput.value = '';
    pauseButton.disabled = true;
    stopButton.disabled = true;
    startButton.disabled = false;
    alertSound.pause();
    alertSound.currentTime = 0;
    
    // Remove all visual feedback classes
    timerDisplay.classList.remove('running', 'ending');
    pauseButton.textContent = "Pause";
    isPaused = false;
}

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', () => {
    if (isPaused) {
        resumeTimer();
    } else {
        pauseTimer();
    }
});
stopButton.addEventListener('click', stopTimer);