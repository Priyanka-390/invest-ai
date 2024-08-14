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

const playIcons = document.querySelectorAll(".pause-icon");
const videoElements = document.querySelectorAll("video");
let currentPlayingVideo = null;

function playPauseVideo(videoElement, playIcon) {
  // If another video is currently playing, pause and reset it
  if (currentPlayingVideo && currentPlayingVideo !== videoElement) {
    currentPlayingVideo.pause();
    currentPlayingVideo.currentTime = 0;
    currentPlayingVideo.removeAttribute("controls");
    currentPlayingVideo.parentElement.querySelector(
      ".pause-icon"
    ).style.display = "block";
  }

  // Play the current video or pause it if it's already playing
  if (videoElement.paused) {
    videoElement.play();
    videoElement.setAttribute("controls", "true");
    playIcon.style.display = "none";
    currentPlayingVideo = videoElement;
  } else {
    videoElement.pause();
    videoElement.removeAttribute("controls");
    playIcon.style.display = "block";
    currentPlayingVideo = null;
  }
}

// Add event listener to each play icon
playIcons.forEach((playIcon) => {
  playIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    const videoId = this.getAttribute("data-video-id");
    const videoElement = document.getElementById(videoId);
    playPauseVideo(videoElement, this);
  });
});

// Add event listener to each video element
videoElements.forEach((videoElement) => {
  videoElement.addEventListener("click", function () {
    const playIcon = this.parentElement.querySelector(".pause-icon");
    playPauseVideo(this, playIcon);
  });
});

// Get all video elements except the background video
const videos = document.querySelectorAll("video:not(#backgroundVideo)");
videos.forEach((video) => {
  video.addEventListener("play", function () {
    videos.forEach((otherVideo) => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });
  });
});

// slider
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  slideToScroll: 1,
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
      },
  breakpoints: {
    1920: {
      slidesPerView: 4.6,
      spaceBetween: 32,
    },
   
     1320: {
      slidesPerView: 3.2,
      spaceBetween: 20,
    },
    1044: {
      slidesPerView: 2.3,
      spaceBetween: 16,
    },
    700: {
      slidesPerView: 1.4,
      spaceBetween: 10,
    },
    600: {
      slidesPerView: 1.1,
      spaceBetween: 10,
    },
    1280: {
       slidesPerView: 2.3,
      spaceBetween: 12,
    },
    900: {
      slidesPerView: 2.2,
      spaceBetween: 12,
    },
  },
});
