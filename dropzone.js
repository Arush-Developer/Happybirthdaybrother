// Dropzone page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeDropzonePage();
    setupMemoryCardAnimations();
    setupPhotoGallery();
});

function initializeDropzonePage() {
    // Add entrance animations to memory cards
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate final message
    const finalMessage = document.querySelector('.final-message');
    if (finalMessage) {
        finalMessage.style.opacity = '0';
        finalMessage.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            finalMessage.style.transition = 'all 0.8s ease-out';
            finalMessage.style.opacity = '1';
            finalMessage.style.transform = 'translateY(0)';
        }, memoryCards.length * 200 + 500);
    }
    
    // Add sound effects
    setupSoundEffects();
}

function setupMemoryCardAnimations() {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            playHoverSound();
            
            // Add glow effect
            const cardGlow = card.querySelector('.card-glow');
            if (cardGlow) {
                cardGlow.style.opacity = '1';
            }
            
            // Animate memory icon
            const memoryIcon = card.querySelector('.memory-icon');
            if (memoryIcon) {
                memoryIcon.style.transform = 'scale(1.2) rotate(10deg)';
                memoryIcon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const cardGlow = card.querySelector('.card-glow');
            if (cardGlow) {
                cardGlow.style.opacity = '0';
            }
            
            const memoryIcon = card.querySelector('.memory-icon');
            if (memoryIcon) {
                memoryIcon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        card.addEventListener('click', function() {
            playClickSound();
            expandMemoryCard(card);
        });
    });
}

function setupPhotoGallery() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                openPhotoModal(img.src, img.alt);
            });
        }
    });
}

function expandMemoryCard(card) {
    // Create expanded view
    const expandedOverlay = document.createElement('div');
    expandedOverlay.className = 'expanded-overlay';
    expandedOverlay.innerHTML = `
        <div class="expanded-card">
            <button class="close-btn" onclick="closeExpandedCard()">&times;</button>
            <div class="expanded-content">
                ${card.querySelector('.card-content').innerHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(expandedOverlay);
    
    // Add styles for expanded view
    if (!document.getElementById('expanded-styles')) {
        const style = document.createElement('style');
        style.id = 'expanded-styles';
        style.textContent = `
            .expanded-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                animation: fadeIn 0.3s ease-out forwards;
            }
            
            .expanded-card {
                background: var(--card-bg);
                border-radius: 20px;
                padding: 40px;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                border: 3px solid var(--primary-orange);
                backdrop-filter: blur(15px);
                position: relative;
                transform: scale(0.8);
                animation: scaleIn 0.3s ease-out forwards;
            }
            
            .close-btn {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 2rem;
                color: var(--primary-orange);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .close-btn:hover {
                transform: scale(1.2);
                color: var(--electric-blue);
            }
            
            @keyframes scaleIn {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        expandedOverlay.style.opacity = '1';
    }, 10);
}

function closeExpandedCard() {
    const overlay = document.querySelector('.expanded-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

function openPhotoModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="photo-modal-content">
            <button class="close-btn" onclick="closePhotoModal()">&times;</button>
            <img src="${src}" alt="${alt}" class="modal-image">
            <div class="photo-info">
                <h3>${alt}</h3>
                <p>Click and drag to move • Scroll to zoom</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add photo modal styles
    if (!document.getElementById('photo-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'photo-modal-styles';
        style.textContent = `
            .photo-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1001;
                opacity: 0;
                animation: fadeIn 0.3s ease-out forwards;
            }
            
            .photo-modal-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                text-align: center;
            }
            
            .modal-image {
                max-width: 100%;
                max-height: 80vh;
                border-radius: 15px;
                border: 3px solid var(--primary-orange);
                box-shadow: 0 20px 60px rgba(255, 107, 53, 0.4);
                transition: transform 0.3s ease;
                cursor: grab;
            }
            
            .modal-image:active {
                cursor: grabbing;
            }
            
            .photo-info {
                margin-top: 20px;
                color: var(--text-primary);
            }
            
            .photo-info h3 {
                font-family: 'Orbitron', monospace;
                color: var(--primary-orange);
                margin-bottom: 10px;
            }
            
            .photo-info p {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add image interaction
    const modalImage = modal.querySelector('.modal-image');
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0, scale = 1;
    
    modalImage.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        modalImage.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        modalImage.style.cursor = 'grab';
    });
    
    modalImage.addEventListener('wheel', function(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale *= delta;
        scale = Math.max(0.5, Math.min(3, scale));
        modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    });
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closePhotoModal() {
    const modal = document.querySelector('.photo-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function setupSoundEffects() {
    // Add click sounds to all interactive elements
    const clickableElements = document.querySelectorAll('button, .memory-card, .photo-card img');
    clickableElements.forEach(element => {
        element.addEventListener('click', playClickSound);
    });
    
    // Add hover sounds
    const hoverElements = document.querySelectorAll('.memory-card, .back-btn');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', playHoverSound);
    });
}

// Sound functions (simplified versions)
function playClickSound() {
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

// Navigation function
function goBack() {
    playClickSound();
    window.location.href = 'index.html';
}

// Global functions
window.closeExpandedCard = closeExpandedCard;
window.closePhotoModal = closePhotoModal;
window.goBack = goBack;
