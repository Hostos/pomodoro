class PomodoroTimer {
    constructor() {
        this.workTime = 20 * 60; // 20 minutes in seconds
        this.breakTime = 5 * 60; // 5 minutes in seconds
        this.timeLeft = this.workTime;
        this.isRunning = false;
        this.isWorkMode = true;
        this.timer = null;
        this.currentTask = '';

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startPauseButton = document.getElementById('startPause');
        this.startPauseIcon = this.startPauseButton.querySelector('i');
        this.resetButton = document.getElementById('reset');
        this.modeToggleButton = document.getElementById('modeToggle');
        this.modeIcon = this.modeToggleButton.querySelector('i');
        this.taskInput = document.getElementById('taskInput');
        this.taskDisplay = document.getElementById('currentTask');

        // Event listeners
        this.startPauseButton.addEventListener('click', () => this.toggleTimer());
        this.resetButton.addEventListener('click', () => this.reset());
        this.modeToggleButton.addEventListener('click', () => this.toggleMode());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.setTask();
            }
        });

        // Initialize display
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    setTask() {
        const task = this.taskInput.value.trim();
        if (task) {
            this.currentTask = task;
            this.taskDisplay.textContent = task;
            this.taskInput.value = '';
            this.taskInput.blur();
        }
    }

    toggleTimer() {
        if (this.isRunning) {
            this.pause();
        } else {
            if (!this.currentTask && this.isWorkMode) {
                this.taskInput.focus();
                return;
            }
            this.start();
        }
    }

    toggleMode() {
        if (this.isWorkMode) {
            this.setBreakMode();
        } else {
            this.setWorkMode();
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startPauseIcon.className = 'fas fa-pause';
            this.startPauseButton.classList.add('running');
            this.taskInput.disabled = true;
            
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft === 0) {
                    this.playAlarm();
                    this.toggleMode();
                }
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.timer);
            this.isRunning = false;
            this.startPauseIcon.className = 'fas fa-play';
            this.startPauseButton.classList.remove('running');
            this.taskInput.disabled = false;
        }
    }

    reset() {
        this.pause();
        this.timeLeft = this.isWorkMode ? this.workTime : this.breakTime;
        this.updateDisplay();
        if (this.isWorkMode) {
            this.currentTask = '';
            this.taskDisplay.textContent = '';
            this.taskInput.value = '';
            this.taskInput.disabled = false;
        }
    }

    setWorkMode() {
        this.pause();
        this.isWorkMode = true;
        this.timeLeft = this.workTime;
        this.updateDisplay();
        this.modeIcon.className = 'fas fa-coffee';
        this.modeToggleButton.classList.remove('break');
        this.taskInput.disabled = false;
    }

    setBreakMode() {
        this.pause();
        this.isWorkMode = false;
        this.timeLeft = this.breakTime;
        this.updateDisplay();
        this.modeIcon.className = 'fas fa-briefcase';
        this.modeToggleButton.classList.add('break');
        this.taskInput.disabled = true;
    }

    playAlarm() {
        // Add alarm sound functionality here if desired
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 