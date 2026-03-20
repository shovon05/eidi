let currentRotation = 0;
let isSpinning = false;

// 🎡 Segments (same order as UI)
const SEGMENTS = [
    "৳100",
    "৳500",
    "৳1000",
    "দোয়া",
    "৳50",
    "৳20"
];

// 🎯 Always land on index 3 → দোয়া
const DOA_INDEX = 3;

function getTargetRotation(index) {
    const segmentAngle = 360 / SEGMENTS.length;

    // 🎯 center of target slice
    const baseAngle = index * segmentAngle + segmentAngle / 2;

    // 🔝 pointer offset (top)
    const pointerOffset = 270;

    // 🎲 fake randomness (visual only)
    const jitter = (Math.random() - 0.5) * (segmentAngle * 0.6);

    return 360 * (5 + Math.floor(Math.random() * 2)) 
        + (pointerOffset - baseAngle + jitter);
}

function spinWheel() {
    const name = document.getElementById('nameInput').value.trim();

    if (!name) {
        alert("😑 নাম না দিলে কিছুই পাবেন না...");
        return;
    }

    if (isSpinning) return;
    isSpinning = true;

    const wheel = document.getElementById('wheel');

    // 💀 Fate decided → ALWAYS DOA
    const index = DOA_INDEX;
    const result = SEGMENTS[index];

    const rotation = getTargetRotation(index);
    currentRotation += rotation;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // ⏳ suspense delay
    setTimeout(() => {
        showResult(name, result);
        isSpinning = false;
    }, 4200);
}

function showResult(name, result) {
    const modal = document.getElementById('resultModal');
    const overlay = document.getElementById('modalOverlay');

    // 😈 emotional damage
    document.getElementById('resultMessage').innerText =
        `😌 ${name}, ভাগ্যে যা ছিল... তাই পেয়েছেন...`;

    document.getElementById('resultValue').innerText =
        `🤲 ${result} 🤲`;

    overlay.style.display = 'block';
    modal.style.display = 'block';

    setTimeout(() => modal.classList.add('show'), 10);

    // 😂 fake celebration (even for doa)
    confetti({
        particleCount: 80,
        spread: 60
    });
}

function closeModal() {
    const modal = document.getElementById('resultModal');
    const overlay = document.getElementById('modalOverlay');

    modal.classList.remove('show');

    setTimeout(() => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }, 300);
}
