let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("show");
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].classList.add("show");
    setTimeout(showSlides, 7000); // Change image every 7 seconds
}

document.getElementById("play-pause-button").addEventListener("click", function() {
    const audio = document.getElementById("background-music");
    const icon = this.querySelector("i");

    if (audio.paused) {
        audio.play();
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
    } else {
        audio.pause();
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    }
});

document.getElementById("fullscreen-button").addEventListener("click", function() {
    const slideshowContainer = document.getElementsByClassName("slideshow-container")[0];
    if (slideshowContainer.requestFullscreen) {
        slideshowContainer.requestFullscreen();
    } else if (slideshowContainer.mozRequestFullScreen) { /* Firefox */
        slideshowContainer.mozRequestFullScreen();
    } else if (slideshowContainer.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        slideshowContainer.webkitRequestFullscreen();
    } else if (slideshowContainer.msRequestFullscreen) { /* IE/Edge */
        slideshowContainer.msRequestFullscreen();
    }
});

// Handle fullscreen change event
document.addEventListener("fullscreenchange", function() {
    const slideshowContainer = document.getElementsByClassName("slideshow-container")[0];
    if (document.fullscreenElement) {
        slideshowContainer.classList.add("fullscreen-mode");
    } else {
        slideshowContainer.classList.remove("fullscreen-mode");
    }
});

// Music files stored in the "music" folder
const musicFiles = [
    'music/music1.mp3',
    'music/music2.mp3',
    'music/music3.mp3'
];
let currentSongIndex = 0;
let isPlaying = false;

const audio = document.getElementById('background-music');
const playPauseButton = document.getElementById('play-pause-button');
const skipNextButton = document.getElementById('skip-next-button');
const skipBackButton = document.getElementById('skip-back-button');

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

function skipNext() {
    currentSongIndex = (currentSongIndex + 1) % musicFiles.length;
    audio.src = musicFiles[currentSongIndex];
    if (isPlaying) {
        audio.play();
    }
}

function skipBack() {
    currentSongIndex = (currentSongIndex - 1 + musicFiles.length) % musicFiles.length;
    audio.src = musicFiles[currentSongIndex];
    if (isPlaying) {
        audio.play();
    }
}

playPauseButton.addEventListener('click', togglePlayPause);
skipNextButton.addEventListener('click', skipNext);
skipBackButton.addEventListener('click', skipBack);

// Stopwatch functionality
let timer;
let isTimerRunning = false;
let elapsedSeconds = 0;

const timerDisplay = document.getElementById("timer");
const playPauseBtn = document.getElementById("playPauseBtn");
const resetBtn = document.getElementById("resetBtn");

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimer() {
    elapsedSeconds++;
    timerDisplay.textContent = formatTime(elapsedSeconds);
}

playPauseBtn.addEventListener("click", function() {
    if (isTimerRunning) {
        clearInterval(timer);
        playPauseBtn.textContent = "Play";
    } else {
        timer = setInterval(updateTimer, 1000);
        playPauseBtn.textContent = "Pause";
    }
    isTimerRunning = !isTimerRunning;
});

resetBtn.addEventListener("click", function() {
    clearInterval(timer);
    elapsedSeconds = 0;
    timerDisplay.textContent = "00:00:00";
    playPauseBtn.textContent = "Play";
    isTimerRunning = false;
});
