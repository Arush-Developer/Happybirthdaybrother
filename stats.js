// Stats page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeStatsPage();
    setupStatCardAnimations();
    setupAchievementAnimations();
    animatePlayerCard();
});

function initializeStatsPage() {
    // Add entrance animations to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 150);
    });
    
    // Animate achievements section
    const achievementsSection = document.querySelector('.achievements-section');
    if (achievementsSection) {
        achievementsSection.style.opacity = '0';
        achievementsSection.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            achievementsSection.style.transition = 'all 0.8s ease-out';
            achievementsSection.style.opacity = '1';
            achievementsSection.style.transform = 'translateY(0)';
        }, statCards.length * 150 + 300);
    }
    
    // Animate fun quote
    const funQuote = document.querySelector('.fun-quote');
    if (funQuote) {
        funQuote.style.opacity = '0';
        funQuote.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            funQuote.style.transition = 'all 0.8s ease-out';
            funQuote.style.opacity = '1';
            funQuote.style.transform = 'translateY(0)';
        }, statCards.length * 150 + 600);
    }
    
    // Setup sound effects
    setupSoundEffects();
}

function setupStatCardAnimations() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            playHoverSound();
            
            // Animate stat icon
            const statIcon = card.querySelector('.stat-icon');
            if (statIcon) {
                statIcon.style.transform = 'scale(1.3) rotate(15deg)';
                statIcon.style.transition = 'transform 0.3s ease';
            }
            
            // Add glow effect
            card.style.boxShadow = '0 15px 40px rgba(255, 107, 53, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            const statIcon = card.querySelector('.stat-icon');
            if (statIcon) {
                statIcon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            // Reset glow
            if (card.classList.contains('special')) {
                card.style.boxShadow = '';
            } else {
                card.style.boxShadow = '';
            }
        });
        
        card.addEventListener('click', function() {
            playClickSound();
            expandStatCard(card);
        });
    });
}

function setupAchievementAnimations() {
    const achievements = document.querySelectorAll('.achievement');
    
    achievements.forEach((achievement, index) => {
        // Stagger the initial animation
        achievement.style.opacity = '0';
        achievement.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            achievement.style.transition = 'all 0.5s ease-out';
            achievement.style.opacity = '1';
            achievement.style.transform = 'scale(1)';
        }, 2000 + index * 100);
        
        achievement.addEventListener('mouseenter', function() {
            playHoverSound();
            
            const achievementIcon = achievement.querySelector('.achievement-icon');
            if (achievementIcon) {
                achievementIcon.style.transform = 'scale(1.5) rotate(360deg)';
                achievementIcon.style.transition = 'transform 0.5s ease';
            }
            
            // Add celebration effect
            createMiniCelebration(achievement);
        });
        
        achievement.addEventListener('mouseleave', function() {
            const achievementIcon = achievement.querySelector('.achievement-icon');
            if (achievementIcon) {
                achievementIcon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        achievement.addEventListener('click', function() {
            playClickSound();
            showAchievementDetails(achievement);
        });
    });
}

function animatePlayerCard() {
    const playerCard = document.querySelector('.player-card');
    const playerAvatar = document.querySelector('.player-avatar-large img');
    const levelBadge = document.querySelector('.level-badge-large');
    
    if (playerCard) {
        playerCard.style.opacity = '0';
        playerCard.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            playerCard.style.transition = 'all 0.8s ease-out';
            playerCard.style.opacity = '1';
            playerCard.style.transform = 'scale(1)';
        }, 300);
    }
    
    if (playerAvatar) {
        playerAvatar.addEventListener('mouseenter', function() {
            playerAvatar.style.transform = 'scale(1.1)';
            playerAvatar.style.transition = 'transform 0.3s ease';
            
            if (levelBadge) {
                levelBadge.style.transform = 'scale(1.2) rotate(10deg)';
                levelBadge.style.transition = 'transform 0.3s ease';
            }
        });
        
        playerAvatar.addEventListener('mouseleave', function() {
            playerAvatar.style.transform = 'scale(1)';
            
            if (levelBadge) {
                levelBadge.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    }
}

function expandStatCard(card) {
    const statInfo = card.querySelector('.stat-info');
    const statTitle = statInfo.querySelector('h3').textContent;
    const statValue = statInfo.querySelector('p').textContent;
    
    // Create expanded view with additional details
    const expandedOverlay = document.createElement('div');
    expandedOverlay.className = 'expanded-overlay';
    
    let additionalInfo = getAdditionalStatInfo(statTitle);
    
    expandedOverlay.innerHTML = `
        <div class="expanded-stat-card">
            <button class="close-btn" onclick="closeExpandedStat()">&times;</button>
            <div class="expanded-stat-content">
                <div class="stat-icon-large">${card.querySelector('.stat-icon').textContent}</div>
                <h2>${statTitle}</h2>
                <p class="stat-value">${statValue}</p>
                <div class="additional-info">
                    ${additionalInfo}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(expandedOverlay);
    
    // Add styles for expanded stat view
    if (!document.getElementById('expanded-stat-styles')) {
        const style = document.createElement('style');
        style.id = 'expanded-stat-styles';
        style.textContent = `
            .expanded-stat-card {
                background: var(--card-bg);
                border-radius: 25px;
                padding: 50px;
                max-width: 500px;
                border: 3px solid var(--primary-orange);
                backdrop-filter: blur(15px);
                position: relative;
                text-align: center;
                transform: scale(0.8);
                animation: scaleIn 0.3s ease-out forwards;
            }
            
            .stat-icon-large {
                font-size: 4rem;
                margin-bottom: 20px;
                animation: iconPulse 2s ease-in-out infinite;
            }
            
            .expanded-stat-content h2 {
                font-family: 'Orbitron', monospace;
                color: var(--primary-orange);
                margin-bottom: 15px;
                font-size: 2rem;
            }
            
            .stat-value {
                font-size: 1.3rem;
                color: var(--electric-blue);
                margin-bottom: 25px;
                font-weight: bold;
            }
            
            .additional-info {
                color: var(--text-secondary);
                line-height: 1.6;
                font-size: 1.1rem;
            }
            
            @keyframes iconPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        expandedOverlay.style.opacity = '1';
    }, 10);
}

function getAdditionalStatInfo(statTitle) {
    const statDetails = {
        'Role': 'As the MVP of Life & Lobby, Chooza brings energy and leadership to every gaming session. Always ready to strategize and support the team!',
        'Superpower': 'The legendary Time Stop Watch ability allows Chooza to pause moments and make them memorable. Perfect for those epic gaming highlights!',
        'Rank': 'Achieved through countless hours of dedication, friendship, and amazing gameplay. A true leader among friends!',
        'Most Used Weapon': 'Emotions & Friendship - the most powerful weapons in any game. Chooza knows that connections matter more than kills!',
        'KD Ratio': 'This philosophy shows true wisdom: building relationships and having fun together is worth more than any statistic!',
        'Birthday Level': 'Each year brings new adventures, skills, and memories. Level 19 is just the beginning of an epic journey!'
    };
    
    return statDetails[statTitle] || 'An amazing achievement that showcases Chooza\'s unique gaming style and personality!';
}

function showAchievementDetails(achievement) {
    const achievementName = achievement.querySelector('.achievement-name').textContent;
    const achievementIcon = achievement.querySelector('.achievement-icon').textContent;
    
    const modal = document.createElement('div');
    modal.className = 'achievement-modal';
    
    let achievementDescription = getAchievementDescription(achievementName);
    
    modal.innerHTML = `
        <div class="achievement-modal-content">
            <button class="close-btn" onclick="closeAchievementModal()">&times;</button>
            <div class="achievement-details">
                <div class="achievement-icon-large">${achievementIcon}</div>
                <h2>${achievementName}</h2>
                <div class="achievement-description">
                    ${achievementDescription}
                </div>
                <div class="achievement-date">
                    Unlocked: Throughout the years of awesome friendship! 🎉
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add achievement modal styles
    if (!document.getElementById('achievement-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'achievement-modal-styles';
        style.textContent = `
            .achievement-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1001;
                opacity: 0;
                animation: fadeIn 0.3s ease-out forwards;
            }
            
            .achievement-modal-content {
                background: var(--card-bg);
                border-radius: 25px;
                padding: 50px;
                max-width: 600px;
                border: 3px solid var(--neon-green);
                backdrop-filter: blur(15px);
                position: relative;
                text-align: center;
                transform: scale(0.8);
                animation: scaleIn 0.3s ease-out forwards;
            }
            
            .achievement-icon-large {
                font-size: 5rem;
                margin-bottom: 20px;
                animation: achievementGlow 2s ease-in-out infinite;
            }
            
            .achievement-details h2 {
                font-family: 'Orbitron', monospace;
                color: var(--neon-green);
                margin-bottom: 20px;
                font-size: 2.2rem;
            }
            
            .achievement-description {
                color: var(--text-primary);
                line-height: 1.6;
                font-size: 1.2rem;
                margin-bottom: 25px;
            }
            
            .achievement-date {
                color: var(--text-secondary);
                font-style: italic;
                font-size: 1rem;
            }
            
            @keyframes achievementGlow {
                0%, 100% { 
                    transform: scale(1);
                    filter: drop-shadow(0 0 10px var(--neon-green));
                }
                50% { 
                    transform: scale(1.1);
                    filter: drop-shadow(0 0 20px var(--neon-green));
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function getAchievementDescription(achievementName) {
    const descriptions = {
        'Gaming Legend': 'Awarded for exceptional gaming skills, strategic thinking, and the ability to turn any game into an epic adventure. Chooza\'s gaming prowess is legendary among friends!',
        'Comedy King': 'Master of timing, wit, and making everyone laugh during the most intense gaming moments. Chooza knows how to keep the mood light and fun!',
        'Best Cousin': 'This rare achievement is earned through years of being an amazing family member, friend, and gaming buddy. Truly one of a kind!',
        'Birthday Star': 'Celebrating another year of awesomeness! This achievement recognizes all the joy, laughter, and memories Chooza brings to everyone around.'
    };
    
    return descriptions[achievementName] || 'An incredible achievement that showcases Chooza\'s unique talents and wonderful personality!';
}

function createMiniCelebration(element) {
    const particles = ['✨', '🎉', '⭐', '💫'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.position = 'fixed';
            particle.style.left = (rect.left + rect.width / 2) + 'px';
            particle.style.top = (rect.top + rect.height / 2) + 'px';
            particle.style.fontSize = '1.5rem';
            particle.style.zIndex = '1000';
            particle.style.pointerEvents = 'none';
            particle.style.animation = `miniParticle ${1 + Math.random()}s ease-out forwards`;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }, i * 100);
    }
    
    // Add mini particle animation
    if (!document.getElementById('mini-particle-styles')) {
        const style = document.createElement('style');
        style.id = 'mini-particle-styles';
        style.textContent = `
            @keyframes miniParticle {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function setupSoundEffects() {
    // Add click sounds to all interactive elements
    const clickableElements = document.querySelectorAll('button, .stat-card, .achievement');
    clickableElements.forEach(element => {
        element.addEventListener('click', playClickSound);
    });
    
    // Add hover sounds
    const hoverElements = document.querySelectorAll('.stat-card, .achievement, .back-btn, .player-avatar-large img');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', playHoverSound);
    });
}

// Sound functions
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

function closeExpandedStat() {
    const overlay = document.querySelector('.expanded-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

function closeAchievementModal() {
    const modal = document.querySelector('.achievement-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Navigation function
function goBack() {
    playClickSound();
    window.location.href = 'index.html';
}

// Global functions
window.closeExpandedStat = closeExpandedStat;
window.closeAchievementModal = closeAchievementModal;
window.goBack = goBack;
