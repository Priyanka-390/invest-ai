  //  =================== HERO VIDEOS ========================
function setupVideoControls(videoId, playIconId) {
  var video = document.getElementById(videoId);
  var playIcon = document.getElementById(playIconId);

  playIcon.addEventListener("click", function () {
    video.play();
    this.style.display = "none";
  });

  video.addEventListener("play", function () {
    this.controls = true;
  });

  video.addEventListener("pause", function () {
    playIcon.style.display = "block";
  });

  video.addEventListener("ended", function () {
    playIcon.style.display = "block";
  });
}

setupVideoControls("aiVideo", "playIcon");

const playIcons = document.querySelectorAll('.pause-icon');  // Select all play icons
const videoElements = document.querySelectorAll('video');    // Select all video elements
let currentPlayingVideo = null;  // Track the currently playing video

function playPauseVideo(videoElement, playIcon) {
    // If another video is currently playing, pause and reset it
    if (currentPlayingVideo && currentPlayingVideo !== videoElement) {
        currentPlayingVideo.pause();
        currentPlayingVideo.currentTime = 0;
        currentPlayingVideo.removeAttribute('controls');
        currentPlayingVideo.parentElement.querySelector('.pause-icon').style.display = 'block';
    }

    // Play the current video or pause it if it's already playing
    if (videoElement.paused) {
        videoElement.play();  // Play the video
        videoElement.setAttribute('controls', 'true');  // Show video controls
        playIcon.style.display = 'none';  // Hide the play icon
        currentPlayingVideo = videoElement;  // Set this video as the currently playing one
    } else {
        videoElement.pause();  // Pause the video
        videoElement.removeAttribute('controls');  // Hide video controls
        playIcon.style.display = 'block';  // Show the play icon
        currentPlayingVideo = null;  // No video is currently playing
    }
}

// Add event listener to each play icon
playIcons.forEach(playIcon => {
    playIcon.addEventListener('click', function (e) {
        e.stopPropagation();  // Prevent the video click event from triggering
        const videoId = this.getAttribute('data-video-id');  // Get the associated video ID
        const videoElement = document.getElementById(videoId);  // Find the video element
        playPauseVideo(videoElement, this);  // Play/pause the video
    });
});

// Add event listener to each video element
videoElements.forEach(videoElement => {
    videoElement.addEventListener('click', function () {
        const playIcon = this.parentElement.querySelector('.pause-icon');  // Find the associated play icon
        playPauseVideo(this, playIcon);  // Play/pause the video
    });
});

