// Main JavaScript for BGMI Birthday Website

// Sound effects and music
let backgroundMusic = null;
let soundEnabled = true;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeAudio();
    setupEventListeners();
    startAirdropSequence();
});

// Initialize audio system
function initializeAudio() {
    // Create background music
    backgroundMusic = new Audio('assets/music.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    
    // Set start time to 50 seconds if possible
    backgroundMusic.addEventListener('loadedmetadata', function() {
        if (backgroundMusic.duration > 50) {
            backgroundMusic.currentTime = 50;
        }
    });
    
    // Handle audio loading errors gracefully
    backgroundMusic.addEventListener('error', function() {
        console.log('Background music not available');
    });
}

// Setup event listeners
function setupEventListeners() {
    // Open drop button
    const openDropBtn = document.getElementById('open-drop-btn');
    if (openDropBtn) {
        openDropBtn.addEventListener('click', openAirdrop);
    }
    
    // Add click sound to all buttons
    const buttons = document.querySelectorAll('button, .clickable');
    buttons.forEach(button => {
        button.addEventListener('click', playClickSound);
    });
    
    // Add hover effects
    const interactiveElements = document.querySelectorAll('.memory-card, .stat-card, .achievement, .profile-section');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', playHoverSound);
    });
}

// Start the airdrop sequence
function startAirdropSequence() {
    const airdropScreen = document.getElementById('airdrop-screen');
    const airdropCrate = document.getElementById('airdrop-crate');
    const smokeEffect = document.getElementById('smoke-effect');
    const airdropUI = document.getElementById('airdrop-ui');
    
    // Show airdrop screen
    airdropScreen.classList.add('active');
    
    // Start crate animation
    setTimeout(() => {
        if (airdropCrate) {
            airdropCrate.style.animation = 'airdropFall 4s ease-in forwards';
        }
    }, 500);
    
    // Show smoke effect
    setTimeout(() => {
        if (smokeEffect) {
            smokeEffect.style.opacity = '0.7';
            smokeEffect.style.animation = 'smokeFloat 2s ease-in-out infinite';
        }
        playLandingSound();
    }, 4500);
    
    // Show UI
    setTimeout(() => {
        if (airdropUI) {
            airdropUI.style.opacity = '1';
            airdropUI.style.animation = 'uiAppear 1s ease-out forwards';
        }
    }, 5500);
}

// Open airdrop and transition to lobby
function openAirdrop() {
    playOpenSound();
    
    const airdropScreen = document.getElementById('airdrop-screen');
    const lobbyScreen = document.getElementById('lobby-screen');
    
    // Add opening animation
    const openDropBtn = document.getElementById('open-drop-btn');
    if (openDropBtn) {
        openDropBtn.style.transform = 'scale(1.2)';
        openDropBtn.style.opacity = '0';
    }
    
    // Transition to lobby
    setTimeout(() => {
        if (airdropScreen) {
            airdropScreen.classList.remove('active');
        }
        if (lobbyScreen) {
            lobbyScreen.classList.add('active');
        }
        
        // Start background music
        if (backgroundMusic && soundEnabled) {
            backgroundMusic.play().catch(e => {
                console.log('Could not play background music:', e);
            });
        }
        
        // Show welcome message
        showWelcomeMessage();
    }, 1000);
}

// Show welcome message in lobby
function showWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        welcomeMessage.style.opacity = '1';
        welcomeMessage.style.animation = 'welcomeAppear 1s ease-out forwards';
        
        // Add celebration effect
        setTimeout(() => {
            createCelebrationParticles();
        }, 500);
    }
}

// Create celebration particles
function createCelebrationParticles() {
    const particles = ['🎉', '🎂', '🎮', '🏆', '✨'];
    const container = document.body;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.position = 'fixed';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = '-50px';
            particle.style.fontSize = '2rem';
            particle.style.zIndex = '1000';
            particle.style.pointerEvents = 'none';
            particle.style.animation = `particleFall ${2 + Math.random() * 3}s ease-in forwards`;
            
            container.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 5000);
        }, i * 100);
    }
    
    // Add particle animation CSS if not exists
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFall {
                0% {
                    transform: translateY(-50px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Navigation functions
function goToDropzone() {
    playClickSound();
    window.location.href = 'dropzone.html';
}

function goToStats() {
    playClickSound();
    window.location.href = 'stats.html';
}

function goBack() {
    playClickSound();
    window.location.href = 'index.html';
}

// Sound effect functions
function playClickSound() {
    if (!soundEnabled) return;
    
    // Create a simple click sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Could not play click sound');
    }
}

function playHoverSound() {
    if (!soundEnabled) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
        console.log('Could not play hover sound');
    }
}

function playLandingSound() {
    if (!soundEnabled) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log('Could not play landing sound');
    }
}

function playOpenSound() {
    if (!soundEnabled) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.4);
        
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
    } catch (e) {
        console.log('Could not play open sound');
    }
}

// Toggle sound
function toggleSound() {
    soundEnabled = !soundEnabled;
    
    if (backgroundMusic) {
        if (soundEnabled) {
            backgroundMusic.play().catch(e => console.log('Could not play music'));
        } else {
            backgroundMusic.pause();
        }
    }
    
    // Update UI if sound toggle button exists
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
    }
}

// Utility functions
function addGlowEffect(element) {
    element.classList.add('glow-pulse');
    setTimeout(() => {
        element.classList.remove('glow-pulse');
    }, 2000);
}

function animateElement(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', function() {
        element.classList.remove(animationClass);
    }, { once: true });
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Responsive handling
function handleResize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', debounce(handleResize, 250));
handleResize(); // Initial call

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic = null;
    }
});

// Export functions for global access
window.goToDropzone = goToDropzone;
window.goToStats = goToStats;
window.goBack = goBack;
window.toggleSound = toggleSound;
