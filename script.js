  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const targetText = "Hello, I am Tanvi!";
  const element = document.getElementById("scramble");

  let frame = 0;
  let duration = 20; // number of frames before final text
  let interval = setInterval(() => {
    if (frame < duration) {
      element.innerText = targetText
        .split("")
        .map(char => (char === " " ? " " : letters[Math.floor(Math.random() * letters.length)]))
        .join("");
      frame++;
    } else {
      clearInterval(interval);
      element.innerText = targetText;
    }
  }, 30);

const cursorGlow = document.getElementById('cursorGlow');

// Track mouse movement and update cursor position
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

  // ============================================

// ============================================
// QUESTION MARK CLICK - BLUE SCREEN TRANSITION
// ============================================
const questionBubble = document.getElementById('questionBubble');
const blueScreen = document.getElementById('blueScreen');
const rainContainer = document.getElementById('rainContainer');

questionBubble.addEventListener('click', (e) => {
    // Get click position for expanding circle effect
    const rect = questionBubble.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Set CSS custom properties for circle expansion origin
    blueScreen.style.setProperty('--click-x', `${x}px`);
    blueScreen.style.setProperty('--click-y', `${y}px`);
    
    // Activate blue screen
    blueScreen.classList.add('active');
    
    // Create rain
    createRain();
    
    // Start lightning
    startLightning();
    
    // Play thunder sound
    playThunder();
});

// Click anywhere on blue screen to return
blueScreen.addEventListener('click', () => {
    blueScreen.classList.remove('active');
    rainContainer.innerHTML = '';
    stopLightning();
});

// ============================================
// RAIN EFFECT
// ============================================
function createRain() {
    // Clear existing rain
    rainContainer.innerHTML = '';
    
    // Create 150 raindrops
    for (let i = 0; i < 150; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        
        // Random horizontal position
        drop.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (speed)
        drop.style.animationDuration = (Math.random() * 0.8 + 0.4) + 's';
        
        // Random delay so they don't all start together
        drop.style.animationDelay = Math.random() * 2 + 's';
        
        rainContainer.appendChild(drop);
    }
}

// ============================================
// LIGHTNING EFFECT
// ============================================
const canvas = document.getElementById('lightningCanvas');
const ctx = canvas.getContext('2d');
let lightningInterval;

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawLightning() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Random chance to show lightning (20%)
    if (Math.random() < 0.2) {
        // Random starting point at top of screen
        const startX = Math.random() * canvas.width;
        const startY = 0;
        
        // Draw lightning bolt
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        let currentX = startX;
        let currentY = startY;
        
        // Create jagged lightning path
        while (currentY < canvas.height) {
            currentX += (Math.random() - 0.5) * 100;
            currentY += Math.random() * 50 + 30;
            ctx.lineTo(currentX, currentY);
        }
        
        // Style the lightning
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'white';
        ctx.stroke();
        
        // Add glow effect
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.6)';
        ctx.lineWidth = 8;
        ctx.shadowBlur = 30;
        ctx.stroke();
    }
}

function startLightning() {
    // Draw lightning every 300ms
    lightningInterval = setInterval(drawLightning, 300);
}

function stopLightning() {
    clearInterval(lightningInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ============================================
// THUNDER SOUND
// ============================================
function playThunder() {
    // Preload audio file
    const thunder = new Audio('thunder.mp3'); // Replace with your file path
    thunder.volume = 1; // 50% volume (adjust as needed)
    
    function triggerThunder() {
        if (!blueScreen.classList.contains('active')) return;
        
        // Play the sound
        thunder.currentTime = 0; // Reset to start
        thunder.play().catch(err => console.log('Audio play failed:', err));
        
        // Schedule next thunder (2-4 seconds)
        const nextDelay = Math.random() * 2000 + 2000;
        setTimeout(triggerThunder, nextDelay);
    }
    
    // Start first thunder after short delay
    setTimeout(triggerThunder, 500);
}