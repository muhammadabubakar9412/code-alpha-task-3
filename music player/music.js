let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlicon = document.getElementById("ctrlicon");
let songTitle = document.getElementById("song-title");
let songArtist = document.getElementById("song-artist");
let songImg = document.getElementById("song-img");
let volumeIcon = document.getElementById("volume-icon");
let currentTimeSpan = document.getElementById("current-time");
let durationSpan = document.getElementById("duration");

let playlist = [
  {
    title: "4 am",
    artist: "Talha Anjum",
    src: "music/4AM_in_Karachi_-_Talha_Anjum___Prod._Umair__Official_Audio_(256k).mp3",
    img: "images/4 am.jpg",
  },
  {
    title: "LAJAWAB 2",
    artist: "Taimur Baig",
    src: "music/LAJAWAB_2_-_TAIMOUR_BAIG___Prod._Raffey_Anwar__Official_Audio_(256k).mp3",
    img: "images/lajawab22.jpeg",
  },
  {
    title: "LAJAWAB",
    artist: "Taimur Baig",
    src: "music/LAJAWAB_-_TAIMOUR_BAIG___Prod._Cosololo__slowed_reverb_(256k).mp3",
    img: "images/lajawab jpg.jpeg",
  },
  {
    title: "CALM THROUGH",
    artist: "Talha Anjum",
    src: "music/Umair,_Talha_Anjum,_Abdullah_Maharvi_-_COME_THROUGH__Official_Audio_(256k).mp3",
    img: "images/calm through.jpeg",
  },
  {
    title: "KHATTA FLOW",
    artist: "Seedha Maut X KRSNA",
    src: "music/Khatta_Flow_-_Seedhe_Maut_ft_KR$NA(256k).mp3",
    img: "images/seedha 2.jpg",
  },
];

let currentIndex = 0;

function updateSong() {
  let songData = playlist[currentIndex];
  song.src = songData.src;
  songImg.src = songData.img;
  songTitle.textContent = songData.title;
  songArtist.textContent = songData.artist;
  song.play();
  ctrlicon.className = "fa-solid fa-pause";
}

function playpause() {
  if (song.paused) {
    song.play();
    ctrlicon.className = "fa-solid fa-pause";
  } else {
    song.pause();
    ctrlicon.className = "fa-solid fa-play";
  }
}

function prevSong() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  updateSong();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % playlist.length;
  updateSong();
}

song.addEventListener("ended", () => {
  nextSong();
});

song.addEventListener("loadedmetadata", () => {
  // Initialize progress and time displays when metadata is loaded
  progress.value = 0;
  currentTimeSpan.textContent = "0:00";

  let duration = song.duration;
  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);
  durationSpan.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

song.addEventListener("timeupdate", () => {
  let currentTime = song.currentTime;
  let duration = song.duration;
  let progressValue = (currentTime / duration) * 100;
  progress.value = progressValue;

  let minutes = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);
  currentTimeSpan.textContent = `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
});

progress.addEventListener("input", () => {
  let duration = song.duration;
  song.currentTime = (progress.value / 100) * duration;
});

function toggleVolume() {
  if (song.muted) {
    song.muted = false;
    volumeIcon.className = "fa-solid fa-volume-high";
  } else {
    song.muted = true;
    volumeIcon.className = "fa-solid fa-volume-xmark";
  }
}

document.getElementById("volume").addEventListener("click", toggleVolume);
updateSong();
song
  .play()
  .then(() => {
    ctrlicon.className = "fa-solid fa-pause";
  })
  .catch(() => {
    ctrlicon.className = "fa-solid fa-play";
  });
