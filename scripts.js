//Object to hold and supply time data to all functions
timeMonitor = {};

// Added to monitor if already the timer event is running
timeMonitor.ifStarted = false;

// Anchor to specific IDs
let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");
let millisecond = document.getElementById("millisecond");

// Function to Monitor Realtime display of timer
function displayTimer() {

    // Initilized all variables needed to calculate and display time
    let hours = '00', minutes = '00', seconds = '00', milliseconds = "00";

    // Retrieving current time stamp by JS Date object
    let current_time = new Date().getTime();

    // Calculating time difference between starting time and current time
    timeMonitor.time_differ = current_time - timeMonitor.start_time;

    // Milliseconds
    if (timeMonitor.time_differ > 10) {

        milliseconds = Math.floor((timeMonitor.time_differ % 1000) / 10);

        // Padding zeros at start
        if (milliseconds < 10) {
            milliseconds = `0${milliseconds}`;
        }

        // Updating Millisecond on display
        millisecond.innerHTML = `<span> ${milliseconds} </span>`;
    }

    // Seconds
    if (timeMonitor.time_differ > 1000) {

        seconds = Math.floor(timeMonitor.time_differ / 1000);

        if (seconds > 60) {
            seconds = seconds % 60;
        }

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        second.innerHTML = `<span> ${seconds} </span>`;
    }

    // Minutes
    if (timeMonitor.time_differ > 60000) {

        minutes = Math.floor(timeMonitor.time_differ / 60000);

        if (minutes > 60) {
            minutes = minutes % 60;
        }

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        minute.innerHTML = `<span> ${minutes} </span>`;
    }

    // Hours
    if (timeMonitor.time_differ > 3600000) {

        hours = Math.floor(T.difference / 3600000);

        if (hours < 10) {
            hours = `0${hours}`;
        }

        hour.innerHTML = `<span> ${hours} </span>`;
    }

}

function startTimer() {

    if (!timeMonitor.ifStarted) {
        // Note the start time
        timeMonitor.start_time = new Date().getTime();

        // Handles if timer was already intialized
        if (timeMonitor.time_differ > 0) {
            timeMonitor.start_time = timeMonitor.start_time - timeMonitor.time_differ;
        }

        // Update the display after every 10 millisecond and saving timer ID to manipulate later
        timeMonitor.timer_id = setInterval(function () {
            displayTimer()
        }, 10);

        timeMonitor.ifStarted = true;
    }
}

function stopTimer() {
    // Pause the timer
    timeMonitor.ifStarted = false;
    clearInterval(timeMonitor.timer_id);
}

function clearTimer() {
    //Making new start
    clearInterval(timeMonitor.timer_id);
    timeMonitor.ifStarted = false;
    timeMonitor.time_differ = 0;

    // Reset timer segments to zero
    hour.innerHTML = `<span>00</span>`;
    minute.innerHTML = `<span>00</span>`;
    second.innerHTML = `<span>00</span>`;
    millisecond.innerHTML = `<span>00</span>`;
}

function theme_change() {
    document.body.classList.toggle('darktheme');
}