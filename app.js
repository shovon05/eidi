let currentRotation = 0;
let isSpinning = false;

function spinWheel() {
    const name = document.getElementById('nameInput').value.trim();

    if (!name) {
        alert("Enter name");
        return;
    }

    if (isSpinning) return;
    isSpinning = true;

    const wheel = document.getElementById('wheel');

    let result;

    // VIP cheat
    if (name.toLowerCase() === "shovon") {
        result = "৳2000";
    } else {
        result = "দোয়া";
    }

    const spins = 5 * 360;
    const target = 150;

    currentRotation += spins + target;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        showResult(name, result);
        isSpinning = false;
    }, 4000);
}

function showResult(name, result) {
    const modal = document.getElementById('resultModal');
    const overlay = document.getElementById('modalOverlay');

    document.getElementById('resultMessage').innerText = `${name}, you got:`;
    document.getElementById('resultValue').innerText = result;

    overlay.style.display = 'block';
    modal.style.display = 'block';

    setTimeout(() => modal.classList.add('show'), 10);

    // confetti
    confetti({
        particleCount: 100,
        spread: 70
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
