// script.js

// Function to transition from intro to main lobby
function enterLobby() {
  const intro = document.querySelector('.intro');
  const lobby = document.querySelector('.lobby');
  const audio = document.getElementById('bgm');

  // Fade out intro
  intro.classList.add('hidden');

  // Show lobby with animation
  lobby.classList.remove('hidden');

  // Start background music from 50s
  audio.currentTime = 50;
  audio.play().catch(() => {
    console.log("Autoplay blocked. User must interact.");
  });
}

// Optional: Add click sound or transition effect (future enhancement)
