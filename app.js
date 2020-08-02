const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //TimeDisplay
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  //Get the length of outline
  const outlineLength = outline.getTotalLength();
  //Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Pick different sound
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaing(song);
    });
  });

  //play sound
  play.addEventListener("click", () => {
    checkPlaing(song);
  });

  //Select sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  //Create a function specific to play and stop the sounds
  const checkPlaing = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.png";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.png";
    }
  };

  //We can animated the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Animated the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.png";
      video.pause();
    }
  };
};
app();
