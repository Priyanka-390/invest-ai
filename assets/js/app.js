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

// ================== SLIDER =================
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

// ================= FORM VALIDATION =================
document.addEventListener('DOMContentLoaded', function () {
    // Get form elements
    const form = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = form.querySelector('input[type="number"]');
    
    // Get error message elements
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    
    // Get the success popup and close button elements
    const successPopup = document.getElementById('successPopup');
    const closeBtn = successPopup.querySelector('.closeBtn');

    // Add event listeners for real-time validation
    firstNameInput.addEventListener('input', () => validateInput(firstNameInput, firstNameError, isValidName));
    lastNameInput.addEventListener('input', () => validateInput(lastNameInput, lastNameError, isValidName));
    emailInput.addEventListener('input', () => validateInput(emailInput, emailError, isValidEmail));
    phoneInput.addEventListener('input', () => validateInput(phoneInput, phoneError, isValidPhone));
    
    form.addEventListener('submit', function (event) {
        let isValid = true;
        
        // Validate all inputs
        if (!isValidName(firstNameInput.value)) {
            firstNameError.classList.remove('hidden');
            isValid = false;
        }
        
        if (!isValidName(lastNameInput.value)) {
            lastNameError.classList.remove('hidden');
            isValid = false;
        }
        
        if (!isValidEmail(emailInput.value)) {
            emailError.classList.remove('hidden');
            isValid = false;
        }
        
        if (!isValidPhone(phoneInput.value)) {
            phoneError.classList.remove('hidden');
            isValid = false;
        }
        
        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        } else {
            // Form is valid, show success popup
            showSuccessPopup();
        }
    });
    
    function validateInput(inputElement, errorElement, validationFunction) {
        if (validationFunction(inputElement.value)) {
            errorElement.classList.add('hidden');
        } else {
            errorElement.classList.remove('hidden');
        }
    }
    
    function isValidName(name) {
        return name.trim() !== '';
    }
    
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    function isValidPhone(phone) {
        return phone.trim().length >= 7; // Adjust the length requirement based on your need
    }
    
    function showSuccessPopup() {
        successPopup.classList.remove('hidden');
    }
    
    function closePopup() {
        successPopup.classList.add('hidden');
    }
    
    // Attach the closePopup function to the close button's click event only
    closeBtn.addEventListener('click', closePopup);

    // Prevent the popup from closing when clicking anywhere else inside it
    successPopup.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});



// ==================== CURRENT YEAR========================
const currentYear = new Date().getFullYear();

// ============ TIMER =================
 let totalSeconds = 1 * 3600 + 30 * 60; 
        function startTimer() {
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            const interval = setInterval(() => {
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;

                hoursElement.textContent = String(hours).padStart(2, '0');
                minutesElement.textContent = String(minutes).padStart(2, '0');
                secondsElement.textContent = String(seconds).padStart(2, '0');

                if (totalSeconds > 0) {
                    totalSeconds--;
                } else {
                    clearInterval(interval);
                    alert("Time's up!");
                }
            }, 1000);
        }

startTimer();
        
  document.addEventListener('DOMContentLoaded', function () {
            const accordionItems = document.querySelectorAll('.accordion-item');

            accordionItems.forEach((item, index) => {
                const header = item.querySelector('[data-target]');
                const panel = item.querySelector('.panel');
                const plusIcon = item.querySelector('.plus');
                const minusIcon = item.querySelector('.minus');

                // Open the first accordion by default
                if (index === 0) {
                    panel.classList.add('show');
                    item.classList.add('open');
                    plusIcon.style.display = 'none';
                    minusIcon.style.display = 'block';
                }

                header.addEventListener('click', () => {
                    const isOpen = panel.classList.contains('show');

                    accordionItems.forEach(otherItem => {
                        const otherPanel = otherItem.querySelector('.panel');
                        const otherPlusIcon = otherItem.querySelector('.plus');
                        const otherMinusIcon = otherItem.querySelector('.minus');

                        if (otherPanel !== panel) {
                            otherPanel.classList.remove('show');
                            otherItem.classList.remove('open');
                            otherPlusIcon.style.display = 'block';
                            otherMinusIcon.style.display = 'none';
                        }
                    });

                    if (isOpen) {
                        panel.classList.remove('show');
                        item.classList.remove('open');
                        plusIcon.style.display = 'block';
                        minusIcon.style.display = 'none';
                    } else {
                        panel.classList.add('show');
                        item.classList.add('open');
                        plusIcon.style.display = 'none';
                        minusIcon.style.display = 'block';
                    }
                });
            });
  });
        
  const flagImages = {
    'canada': './assets/images/svg/canada_flag.svg',
    'uk': './assets/images/svg/uk-flag.svg',
    'in': './assets/images/svg/india-flag.svg',
    // Add more country codes and image paths here
};

// Function to update the flag image based on the selected country code
document.getElementById('countryCode').addEventListener('change', function() {
    const selectedOption = this.value;
    const flagImage = document.getElementById('flag');

    // Update the flag image source based on the selected country code
    if (flagImages[selectedOption]) {
        flagImage.src = flagImages[selectedOption];
    } else {
        flagImage.src = './assets/images/svg/canada_flag.svg'; // Fallback image if code not found
    }
});