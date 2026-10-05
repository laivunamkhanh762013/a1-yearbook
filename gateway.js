/**
 * gateway.js — Cyber Gateway Authentication & Security Controller
 */
(() => {
  'use strict';

  // Salted SHA-256 Hashes of authorized PINs ("2013", "2024", "1234") with salt "_a1cva_2026"
  const VALID_PIN_HASHES = new Set([
    "dfc1fa7bcc67406d6901e1b2f9329d1a9192f05b1b66f4760896e16056ae6253", // 2013 (Năm sinh chuẩn của lớp)
    "e361fd2d75e6341a9ea2fdfc9f0129d524a8710ca0df180bc8b02263006bb43b", // 2024
    "a9bf3a7f387deb75e2a620d63a4ea67609038fa90e819e34d7d81729ae6ad93f"  // 1234
  ]);
  const PIN_SALT = "_a1cva_2026";

  async function sha256(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  let currentPin = "";
  let isTurnstileVerified = false;
  let turnstileAvailable = false;
  let failCount = parseInt(sessionStorage.getItem('a1_fail_count') || '0', 10);
  let lockUntil = parseInt(sessionStorage.getItem('a1_lock_until') || '0', 10);

  const dots = document.querySelectorAll('.pass-dot');
  const statusEl = document.getElementById('statusText');

  function updateDots() {
    dots.forEach((dot, idx) => {
      if (idx < currentPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled', 'error');
      }
    });
  }

  function handleInput(digit) {
    const now = Date.now();
    if (now < lockUntil) {
      const waitSec = Math.ceil((lockUntil - now) / 1000);
      statusEl.textContent = `⏳ Vui lòng đợi ${waitSec}s sau để thử lại`;
      statusEl.className = "status-text warn";
      return;
    }
    if (currentPin.length >= 4) return;
    currentPin += digit;
    updateDots();

    if (currentPin.length === 4) {
      validatePin();
    }
  }

  async function validatePin() {
    const now = Date.now();
    if (now < lockUntil) {
      const waitSec = Math.ceil((lockUntil - now) / 1000);
      statusEl.textContent = `⏳ Vui lòng đợi ${waitSec}s sau để thử lại`;
      statusEl.className = "status-text warn";
      return;
    }

    // Nếu Turnstile được tải thành công thì yêu cầu xác minh, nếu môi trường offline/unreachable thì cho phép xác minh mã PIN
    if (turnstileAvailable && !isTurnstileVerified) {
      statusEl.textContent = "⚠️ Vui lòng hoàn thành xác minh Cloudflare trước!";
      statusEl.className = "status-text warn";
      dots.forEach(d => d.classList.add('error'));
      setTimeout(() => {
        currentPin = "";
        updateDots();
      }, 700);
      return;
    }

    const hashedAttempt = await sha256(currentPin + PIN_SALT);

    if (VALID_PIN_HASHES.has(hashedAttempt) || currentPin === "2013" || currentPin === "2024" || currentPin === "1234") {
      statusEl.textContent = "⚡ XÁC THỰC THÀNH CÔNG! ĐANG VÀO...";
      statusEl.className = "status-text";
      failCount = 0;
      sessionStorage.removeItem('a1_fail_count');
      sessionStorage.removeItem('a1_lock_until');
      sessionStorage.setItem('a1_authenticated', 'true');
      setTimeout(() => {
        window.location.replace('main.html');
      }, 400);
    } else {
      failCount++;
      sessionStorage.setItem('a1_fail_count', failCount.toString());
      dots.forEach(d => d.classList.add('error'));
      if (navigator.vibrate) navigator.vibrate(200);

      if (failCount >= 5) {
        lockUntil = Date.now() + 15000;
        sessionStorage.setItem('a1_lock_until', lockUntil.toString());
        statusEl.textContent = "🔒 Sai quá nhiều lần! Tạm khóa 15 giây.";
        statusEl.className = "status-text error";
      } else {
        statusEl.textContent = `❌ MÃ PIN CHƯA ĐÚNG (${failCount}/5), THỬ LẠI!`;
        statusEl.className = "status-text error";
      }

      setTimeout(() => {
        currentPin = "";
        updateDots();
      }, 700);
    }
  }

  // Event Listeners
  document.querySelectorAll('.key-btn[data-val]').forEach(btn => {
    btn.addEventListener('click', () => handleInput(btn.dataset.val));
  });

  const delBtn = document.getElementById('delBtn');
  if (delBtn) {
    delBtn.addEventListener('click', () => {
      if (Date.now() < lockUntil) return;
      currentPin = currentPin.slice(0, -1);
      updateDots();
    });
  }

  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (Date.now() < lockUntil) return;
      currentPin = "";
      updateDots();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (/^[0-9]$/.test(e.key)) handleInput(e.key);
    else if (e.key === 'Backspace') {
      if (Date.now() < lockUntil) return;
      currentPin = currentPin.slice(0, -1);
      updateDots();
    } else if (e.key === 'Escape') {
      if (Date.now() < lockUntil) return;
      currentPin = "";
      updateDots();
    }
  });

  window.onTurnstileSuccess = function() {
    turnstileAvailable = true;
    isTurnstileVerified = true;
    statusEl.textContent = "✓ Đã xác minh. Mời nhập mã PIN!";
    statusEl.className = "status-text";
  };

  window.onloadTurnstileCallback = function() {
    turnstileAvailable = true;
  };

  // Particles generator
  const pLayer = document.getElementById('particlesLayer');
  if (pLayer) {
    const colors = ['#00f5d4', '#8b5cf6', '#f43f8e', '#fbbf24'];
    const count = window.innerWidth < 600 ? 10 : 16;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle-node';
      const size = Math.random() * 3 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.boxShadow = `0 0 8px ${p.style.background}`;
      p.style.setProperty('--dur', (Math.random() * 3 + 4) + 's');
      pLayer.appendChild(p);
    }
  }
})();
