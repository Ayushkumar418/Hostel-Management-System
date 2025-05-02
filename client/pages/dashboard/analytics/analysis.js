// Dynamic progress bar updates (if needed in the future)
document.querySelectorAll('.progress-circle').forEach(circle => {
    const progress = circle.querySelector('.progress');
    const percentage = parseInt(circle.querySelector('.text').textContent);
    const offset = 345.4 * (1 - percentage / 100);
    progress.style.strokeDashoffset = offset;
});

document.querySelector('.fees-circle').addEventListener('click', () => {
    alert('Fees collection details clicked!');
});

document.querySelector('.emergency-button').addEventListener('click', () => {
    alert('Emergency button pressed!');
});

function updateProgress(hostelNum, percentage) {
    const circle = document.querySelector(`.card:nth-child(${hostelNum}) .circle-progress`);
    const percentText = document.querySelector(`.card:nth-child(${hostelNum}) .percentage`);
    
    circle.style.strokeDasharray = `${percentage}, 100`;
    percentText.textContent = `${percentage}%`;
}

// Example of dynamic update
function updateHostelOccupancy(hostel1, hostel2, hostel3) {
    updateProgress(1, hostel1);
    updateProgress(2, hostel2);
    updateProgress(3, hostel3);
}

// Initial values
updateHostelOccupancy(50, 75, 95);

function setupHoverEffects() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
            
            const circle = card.querySelector('.circle-progress');
            const currentColor = getComputedStyle(circle).stroke;
            circle.style.stroke = adjustBrightness(currentColor, 1.2);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = 'none';
            
            const circle = card.querySelector('.circle-progress');
            const className = Array.from(circle.classList)
                .find(c => ['cyan', 'yellow', 'pink'].includes(c));
            circle.style.stroke = '';  // Reset to CSS defined color
        });
    });
}

function adjustBrightness(color, factor) {
    let r, g, b;
    if (color.startsWith('rgb')) {
        [r, g, b] = color.match(/\d+/g).map(Number);
    } else if (color.startsWith('#')) {
        r = parseInt(color.slice(1, 3), 16);
        g = parseInt(color.slice(3, 5), 16);
        b = parseInt(color.slice(5, 7), 16);
    }
    
    r = Math.min(255, Math.floor(r * factor));
    g = Math.min(255, Math.floor(g * factor));
    b = Math.min(255, Math.floor(b * factor));
    
    return `rgb(${r}, ${g}, ${b})`;
}

// Initialize hover effects
document.addEventListener('DOMContentLoaded', () => {
    setupHoverEffects();
    updateHostelOccupancy(50, 75, 30);
});

// Ensure layout stays responsive
window.addEventListener('resize', () => {
    const container = document.querySelector('.progress-container');
    const containerWidth = container.offsetWidth;
    const cards = document.querySelectorAll('.card');
    const totalCardsWidth = Array.from(cards).reduce((sum, card) => sum + card.offsetWidth, 0);
    
    if (totalCardsWidth > containerWidth) {
        container.style.justifyContent = 'flex-start';
        container.style.overflowX = 'auto';
    } else {
        container.style.justifyContent = 'space-between';
        container.style.overflowX = 'hidden';
    }
});