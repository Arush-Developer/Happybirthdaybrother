// script.js

function enterLobby() {
  const intro = document.querySelector('.intro');
  const lobby = document.querySelector('.lobby');
  const audio = document.getElementById('bgm');
  const parachute = document.getElementById('parachute');

  // Fade out intro, show lobby
  intro.classList.add('hidden');
  lobby.classList.remove('hidden');

  // Start music from 50s
  audio.currentTime = 50;
  audio.play().catch(() => {
    console.log("Autoplay blocked. User must interact.");
  });

  // Trigger parachute drop
  if (parachute) {
    parachute.classList.add('drop');
  }
}

// Toggle mute/unmute
function toggleMute() {
  const audio = document.getElementById('bgm');
  const btn = document.getElementById('muteBtn');
  if (audio.muted) {
    audio.muted = false;
    btn.innerText = '🔊';
  } else {
    audio.muted = true;
    btn.innerText = '🔇';
  }
}
