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


document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("aiVideo");
    const playVideo = document.getElementById("playvedio");
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.addEventListener("click", function () {
        video.play();
        playVideo.style.display = "none";
    });
    video.addEventListener("play", function () {
        playVideo.style.display = "none"; 
    });

    video.addEventListener("pause", function () {
        playVideo.style.display = "block";
    });
    video.addEventListener("ended", function () {
        playVideo.style.display = "block";
    });
});