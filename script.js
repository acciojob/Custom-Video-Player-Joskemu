// Get references to DOM elements
const video = document.querySelector('.viewer');
const playPauseButton = document.querySelector('.player__button.toggle');
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const skipButtons = document.querySelectorAll('.skip');
const volumeSlider = document.querySelector('.volume');
const speedSlider = document.querySelector('.speed');
const errorMessage = document.querySelector('#error-message');

// Toggle play/pause functionality
function togglePlay() {
  if (video.paused) {
    video.play();
    playPauseButton.textContent = '❚❚';  // Change to pause symbol
  } else {
    video.pause();
    playPauseButton.textContent = '►';  // Change to play symbol
  }
}

// Update progress bar
function updateProgress() {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.value = progress;
  progressFilled.style.width = `${progress}%`;
}

// Scrubbing: Click on progress bar to seek video
function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Skip functionality for buttons (10s backward, 25s forward)
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Adjust volume
function adjustVolume() {
  video.volume = volumeSlider.value;
}

// Adjust playback speed
function adjustSpeed() {
  video.playbackRate = speedSlider.value;
}

// Handle video load error
function handleVideoError() {
  errorMessage.style.display = 'block';
}

// Event listeners
playPauseButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay); // Toggle play/pause on video click
video.addEventListener('timeupdate', updateProgress); // Update progress bar as video plays
progressBar.addEventListener('click', scrub); // Scrubbing functionality
skipButtons.forEach(button => button.addEventListener('click', skip)); // Skip buttons functionality
volumeSlider.addEventListener('input', adjustVolume); // Volume control
speedSlider.addEventListener('input', adjustSpeed); // Playback speed control

// Error handling
video.addEventListener('error', handleVideoError);
