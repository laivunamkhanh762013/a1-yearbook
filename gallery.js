/**
 * KHOẢNH KHẮC ĐÁNG NHỚ — V4 ULTIMATE
 * Namespace: GalleryA1
 * 
 * Tính năng:
 * - 5 ảnh + 5 video gần nhất, xen kẽ theo thời gian
 * - Xem thêm / Thu gọn (append, không re-render)
 * - Video autoplay preview (IntersectionObserver)
 * - Click video → modal giữ nguyên timestamp
 * - Reaction emoji + đếm + menu xóa (không tự biến mất)
 * - Emoji pop + mưa emoji khi click nhanh 5 lần
 * - Glassmorphism + cinematic dark UI
 */

const memoriesA1List = [
  "A1/7879257806846.mp4", "A1/anh145.jpg", "A1/video7.mp4", "A1/anh132.jpg", "A1/video8.mp4", "A1/anh133.jpg",
  "A1/video9.mp4", "A1/anh134.jpg", "A1/video6.mp4", "A1/anh136.jpg", "A1/video2.mp4",
  "A1/anh135.jpg", "A1/video3.mp4", "A1/anh137.jpg", "A1/video5.mp4", "A1/anh138.jpg",
  "A1/video4.mp4", "A1/anh139.jpg", "A1/video1.mp4", "A1/anh141.jpg", "A1/anh140.jpg",
  "A1/anh142.jpg", "A1/anh143.jpg", "A1/anh144.jpg", "A1/anh131.jpg", "A1/anh94.jpg",
  "A1/anh95.jpg", "A1/anh96.jpg", "A1/anh97.jpg", "A1/anh98.jpg", "A1/anh99.jpg",
  "A1/anh100.jpg", "A1/anh101.jpg", "A1/anh102.jpg", "A1/anh103.jpg", "A1/anh104.jpg",
  "A1/anh106.jpg", "A1/anh105.jpg", "A1/anh107.jpg", "A1/anh108.jpg", "A1/anh109.jpg",
  "A1/anh110.jpg", "A1/anh111.jpg", "A1/anh112.jpg", "A1/anh113.jpg", "A1/anh114.jpg",
  "A1/anh115.jpg", "A1/anh116.jpg", "A1/anh117.jpg", "A1/anh118.jpg", "A1/anh119.jpg",
  "A1/anh120.jpg", "A1/anh121.jpg", "A1/anh122.jpg", "A1/anh123.jpg", "A1/anh124.jpg",
  "A1/anh125.jpg", "A1/anh126.jpg", "A1/anh127.jpg", "A1/anh128.jpg", "A1/anh129.jpg",
  "A1/anh130.jpg", "A1/anh93.jpg", "A1/anh51.jpg", "A1/anh52.jpg", "A1/anh53.jpg",
  "A1/anh54.jpg", "A1/anh55.jpg", "A1/anh56.jpg", "A1/anh57.jpg", "A1/anh58.jpg",
  "A1/anh59.jpg", "A1/anh60.jpg", "A1/anh61.jpg", "A1/anh62.jpg", "A1/anh63.jpg",
  "A1/anh64.jpg", "A1/anh65.jpg", "A1/anh66.jpg", "A1/anh67.jpg", "A1/anh68.jpg",
  "A1/anh69.jpg", "A1/anh70.jpg", "A1/anh71.jpg", "A1/anh72.jpg", "A1/anh73.jpg",
  "A1/anh74.jpg", "A1/anh75.jpg", "A1/anh76.jpg", "A1/anh77.jpg", "A1/anh78.jpg",
  "A1/anh79.jpg", "A1/anh81.jpg", "A1/anh80.jpg", "A1/anh83.jpg", "A1/anh82.jpg",
  "A1/anh84.jpg", "A1/anh85.jpg", "A1/anh86.jpg", "A1/anh87.jpg", "A1/anh89.jpg",
  "A1/anh88.jpg", "A1/anh90.jpg", "A1/anh91.jpg", "A1/anh92.jpg", "A1/anh50.jpg",
  "A1/anh2.jpg", "A1/anh3.jpg", "A1/anh4.jpg", "A1/anh5.jpg", "A1/anh6.jpg",
  "A1/anh7.jpg", "A1/anh8.jpg", "A1/anh10.jpg", "A1/anh9.jpg", "A1/anh11.jpg",
  "A1/anh12.jpg", "A1/anh14.jpg", "A1/anh15.jpg", "A1/anh13.jpg", "A1/anh16.jpg",
  "A1/anh17.jpg", "A1/anh18.jpg", "A1/anh19.jpg", "A1/anh20.jpg", "A1/anh21.jpg",
  "A1/anh22.jpg", "A1/anh23.jpg", "A1/anh24.jpg", "A1/anh25.jpg", "A1/anh27.jpg",
  "A1/anh26.jpg", "A1/anh28.jpg", "A1/anh29.jpg", "A1/anh30.jpg", "A1/anh31.jpg",
  "A1/anh32.jpg", "A1/anh33.jpg", "A1/anh34.jpg", "A1/anh35.jpg", "A1/anh36.jpg",
  "A1/anh37.jpg", "A1/anh38.jpg", "A1/anh40.jpg", "A1/anh39.jpg", "A1/anh41.jpg",
  "A1/anh42.jpg", "A1/anh43.jpg", "A1/anh44.jpg", "A1/anh45.jpg", "A1/anh46.jpg",
  "A1/anh47.jpg", "A1/anh48.jpg", "A1/anh49.jpg", "A1/anh1.jpg"
];

const GalleryA1 = {
  settings: {
    totalInitial: 10,
    rainThreshold: 5,
    rainDuration: 4000
  },

  state: {
    clickTracker: {},
    isRaining: false,
    rainEmoji: '\u{1F602}',
    isExpanded: false,
    reactionCounts: {},
    initialItems: [],
    remainingItems: [],
    deleteMenuTimeout: null,
    observer: null,
    hasDeleteMenuOpen: false
  },

  init() {
    this.container = document.querySelector('.memories-a1-container');
    this.modal = document.getElementById('memoryModalA1');
    this.modalContent = document.querySelector('.memories-a1-modal-content');
    this.closeBtn = document.querySelector('.memories-a1-close');
    this.loadBtn = document.getElementById('loadMoreA1');
    this.reactionBtns = document.querySelectorAll('.memories-a1-reaction-btn');
    this.reactionsWrap = document.querySelector('.memories-a1-reactions');

    this.prepareMedia();
    this.renderInitial();
    this.bindEvents();
  },

  // --- UTILITY ---

  isVideo(src) {
    return src.toLowerCase().match(/\.(mp4|webm|mov)$/);
  },

  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // --- MEDIA PREPARATION ---

  prepareMedia() {
    const photos = this.shuffle(memoriesA1List.filter(s => !this.isVideo(s)));
    const videos = this.shuffle(memoriesA1List.filter(s => this.isVideo(s)));

    // 5 ảnh + 5 video đầu → xen kẽ
    const topPhotos = photos.slice(0, 5);
    const topVideos = videos.slice(0, 5);
    this.state.initialItems = [];
    for (let i = 0; i < 5; i++) {
      if (topPhotos[i]) this.state.initialItems.push({ src: topPhotos[i], isVideo: false });
      if (topVideos[i]) this.state.initialItems.push({ src: topVideos[i], isVideo: true });
    }

    // Phần còn lại → xen kẽ
    const restPhotos = photos.slice(5);
    const restVideos = videos.slice(5);
    const maxRest = Math.max(restPhotos.length, restVideos.length);
    this.state.remainingItems = [];
    for (let i = 0; i < maxRest; i++) {
      if (restPhotos[i]) this.state.remainingItems.push({ src: restPhotos[i], isVideo: false });
      if (restVideos[i]) this.state.remainingItems.push({ src: restVideos[i], isVideo: true });
    }

    this.state.isExpanded = false;
  },

  // --- RENDER ---

  createItemHTML(item) {
    if (item.isVideo) {
      return `
        <div class="memories-a1-item ${item._appended ? 'reveal-anim' : ''}" data-src="${item.src}">
          <div class="memories-a1-video-wrapper">
            <video src="${item.src}" muted loop playsinline preload="metadata" class="memories-a1-preview-video"></video>
          </div>
          <div class="memories-a1-overlay">
            <div class="memories-a1-caption">\u2728 K\u1ef7 ni\u1ec7m</div>
          </div>
        </div>`;
    }
    return `
      <div class="memories-a1-item" data-src="${item.src}">
        <img src="${item.src}" loading="lazy" class="memories-a1-img" onerror="this.src='https://via.placeholder.com/400x500/0d0d14/ffffff?text=A1+Moment'">
        <div class="memories-a1-overlay">
          <div class="memories-a1-caption">\u2728 K\u1ef7 ni\u1ec7m</div>
        </div>
      </div>`;
  },

  renderInitial() {
    if (!this.container) return;
    this.container.innerHTML = this.state.initialItems.map(item => this.createItemHTML(item)).join('');
    this.state.isExpanded = false;
    if (this.loadBtn) {
      this.loadBtn.textContent = this.state.remainingItems.length > 0 ? 'Xem thêm' : 'Đã hết';
    }
    this.setupVideoAutoplay();
  },

  setupVideoAutoplay() {
    if (this.state.observer) this.state.observer.disconnect();
    const videos = this.container.querySelectorAll('.memories-a1-preview-video');
    if (!videos.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });
    videos.forEach(v => observer.observe(v));
    this.state.observer = observer;
  },

  // --- EXPAND / COLLAPSE ---

  expand() {
    if (this.state.remainingItems.length === 0) return;
    const frag = document.createDocumentFragment();
    this.state.remainingItems.forEach(item => {
      item._appended = true;
      const temp = document.createElement('div');
      temp.innerHTML = this.createItemHTML(item);
      const el = temp.firstElementChild;
      el.style.animationDelay = '0s';
      frag.appendChild(el);
    });
    this.container.appendChild(frag);
    this.state.isExpanded = true;
    if (this.loadBtn) this.loadBtn.textContent = 'Thu gọn';
    this.setupVideoAutoplay();
  },

  collapse() {
    const allItems = this.container.querySelectorAll('.memories-a1-item');
    const toRemove = [];
    allItems.forEach((el, idx) => {
      if (idx >= this.state.initialItems.length) {
        toRemove.push(el);
      }
    });
    // Animation collapse
    toRemove.forEach((el, i) => {
      el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      el.style.opacity = '0';
      el.style.transform = 'scale(0.85) translateY(-30px)';
      el.style.marginBottom = '0';
      el.style.paddingBottom = '0';
      el.style.overflow = 'hidden';
      setTimeout(() => {
        if (el.parentNode) el.remove();
      }, 550 + i * 20);
    });
    if (this.loadBtn) this.loadBtn.textContent = 'Xem thêm';
    this.state.isExpanded = false;
    // Reset remaining items _appended flag
    this.state.remainingItems.forEach(item => { item._appended = false; });
    setTimeout(() => {
      document.getElementById('memories').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  },

  // --- MODAL ---

  openModal(src, time) {
    const isVid = this.isVideo(src);
    const oldMedia = this.modalContent.querySelector('img, video');
    if (oldMedia) oldMedia.remove();

    let media;
    if (isVid) {
      media = document.createElement('video');
      media.src = src;
      media.controls = true;
      media.autoplay = true;
      media.playsinline = true;
      // Giữ nguyên timestamp
      media.currentTime = time || 0;
    } else {
      media = document.createElement('img');
      media.src = src;
    }
    media.className = 'memories-a1-modal-media';
    const reactions = this.modalContent.querySelector('.memories-a1-reactions');
    this.modalContent.insertBefore(media, reactions);
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    const modalVideo = this.modalContent.querySelector('video');
    if (modalVideo) {
      const src = modalVideo.getAttribute('src');
      const gridItem = this.container.querySelector(`.memories-a1-item[data-src="${src}"]`);
      if (gridItem) {
        const v = gridItem.querySelector('video');
        if (v) v.currentTime = modalVideo.currentTime;
      }
    }
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      const media = this.modalContent.querySelector('img, video');
      if (media) media.remove();
    }, 600);
  },

  // --- REACTIONS ---

  handleReaction(emoji, btn, event) {
    // Bounce animation
    btn.classList.remove('bounce');
    void btn.offsetWidth;
    btn.classList.add('bounce');

    // Tăng count (không toggle)
    this.state.reactionCounts[emoji] = (this.state.reactionCounts[emoji] || 0) + 1;
    this.updateReactionBadges();

    // Pop emoji trên màn hình
    this.popEmoji(emoji, event.clientX, event.clientY);

    // Cập nhật emoji rain tracker
    this.state.rainEmoji = emoji;
    const now = Date.now();
    if (!this.state.clickTracker[emoji]) {
      this.state.clickTracker[emoji] = { count: 0, lastTime: 0 };
    }
    const tracker = this.state.clickTracker[emoji];
    if (now - tracker.lastTime < 1000) {
      tracker.count++;
    } else {
      tracker.count = 1;
    }
    tracker.lastTime = now;

    if (tracker.count >= this.settings.rainThreshold && !this.state.isRaining) {
      this.triggerRain(emoji);
      tracker.count = 0;
    }
  },

  updateReactionBadges() {
    this.reactionBtns.forEach(btn => {
      const emoji = btn.textContent.trim();
      const count = this.state.reactionCounts[emoji] || 0;
      const existing = btn.querySelector('.memories-a1-reaction-count');
      if (count > 0) {
        if (existing) {
          existing.textContent = count;
        } else {
          const badge = document.createElement('span');
          badge.className = 'memories-a1-reaction-count';
          badge.textContent = count;
          btn.appendChild(badge);
        }
      } else {
        if (existing) existing.remove();
      }
    });
  },

  // --- DELETE MENU ---

  showDeleteMenu(emoji, btn) {
    const count = this.state.reactionCounts[emoji] || 0;
    if (count === 0) return;

    clearTimeout(this.state.deleteMenuTimeout);
    // Ẩn menu cũ
    document.querySelectorAll('.memories-a1-delete-menu').forEach(m => m.remove());

    const menu = document.createElement('div');
    menu.className = 'memories-a1-delete-menu';
    menu.dataset.emoji = emoji;

    if (count === 1) {
      const opt = document.createElement('button');
      opt.className = 'memories-a1-delete-option';
      opt.textContent = '🗑️ Xóa';
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteReaction(emoji, 'all');
      });
      menu.appendChild(opt);
    } else {
      const opt1 = document.createElement('button');
      opt1.className = 'memories-a1-delete-option';
      opt1.textContent = '🗑️ Xóa 1 cái';
      opt1.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteReaction(emoji, 'one');
      });
      menu.appendChild(opt1);

      const opt2 = document.createElement('button');
      opt2.className = 'memories-a1-delete-option';
      opt2.textContent = '🗑️ Xóa tất cả';
      opt2.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteReaction(emoji, 'all');
      });
      menu.appendChild(opt2);
    }

    // Menu enter → cancel timeout
    menu.addEventListener('mouseenter', () => {
      clearTimeout(this.state.deleteMenuTimeout);
    });
    menu.addEventListener('mouseleave', () => {
      this.hideDeleteMenuDelayed();
    });

    // Position menu above the button
    const rect = btn.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.left = (rect.left + rect.width / 2) + 'px';
    menu.style.top = (rect.top - 8) + 'px';
    document.body.appendChild(menu);
    this.state.hasDeleteMenuOpen = true;

    // Trigger enter animation
    requestAnimationFrame(() => {
      menu.classList.add('active');
    });
  },

  hideDeleteMenuDelayed() {
    clearTimeout(this.state.deleteMenuTimeout);
    this.state.deleteMenuTimeout = setTimeout(() => {
      this.hideDeleteMenu();
    }, 400);
  },

  hideDeleteMenu() {
    document.querySelectorAll('.memories-a1-delete-menu').forEach(m => m.remove());
    this.state.hasDeleteMenuOpen = false;
  },

  deleteReaction(emoji, mode) {
    if (mode === 'all') {
      this.state.reactionCounts[emoji] = 0;
    } else {
      // 'one'
      const cur = this.state.reactionCounts[emoji] || 0;
      this.state.reactionCounts[emoji] = Math.max(0, cur - 1);
    }
    this.updateReactionBadges();
    this.hideDeleteMenu();
  },

  // --- EMOJI POP & RAIN ---

  popEmoji(emoji, x, y) {
    const el = document.createElement('div');
    el.className = 'memories-a1-emoji-pop';
    el.textContent = emoji;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  },

  triggerRain(emoji) {
    this.state.isRaining = true;
    const emojis = [emoji, '\u{1F602}', '\u{2764}\u{FE0F}', '\u{1F60E}', '\u{1F389}', '\u{2B50}', '\u{1F525}'];
    const interval = setInterval(() => {
      const rainEl = document.createElement('div');
      rainEl.className = 'memories-a1-emoji-rain';
      rainEl.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      rainEl.style.left = `${Math.random() * 100}vw`;
      rainEl.style.setProperty('--duration', `${2.5 + Math.random() * 2}s`);
      rainEl.style.setProperty('--rotation', `${Math.random() * 720}deg`);
      rainEl.style.fontSize = `${24 + Math.random() * 36}px`;
      document.body.appendChild(rainEl);
      setTimeout(() => rainEl.remove(), 4500);
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      this.state.isRaining = false;
    }, this.settings.rainDuration);
  },

  // --- EVENTS ---

  bindEvents() {
    // Xem thêm / Thu gọn
    if (this.loadBtn) {
      this.loadBtn.addEventListener('click', () => {
        if (this.state.isExpanded) {
          this.collapse();
        } else if (this.state.remainingItems.length > 0) {
          this.expand();
        }
      });
    }

    // Click item → mở modal
    if (this.container) {
      this.container.addEventListener('click', (e) => {
        const item = e.target.closest('.memories-a1-item');
        if (item) {
          const src = item.dataset.src;
          const media = item.querySelector('img, video');
          const time = (media && media.tagName === 'VIDEO') ? media.currentTime : 0;
          this.openModal(src, time);
        }
      });
    }

    // Đóng modal
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.classList.contains('active')) this.closeModal();
      });
    }

    // Reaction buttons
    this.reactionBtns.forEach(btn => {
      const emoji = btn.textContent.trim();

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleReaction(emoji, btn, e);
      });

      // Hover → show delete menu
      let hoverTimer = null;
      btn.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
          this.showDeleteMenu(emoji, btn);
        }, 250);
      });
      btn.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);
        if (!this.state.hasDeleteMenuOpen) {
          // Kiểm tra xem chuột có đang ở menu không
          setTimeout(() => {
            const menu = document.querySelector('.memories-a1-delete-menu');
            if (!menu || !menu.matches(':hover')) {
              this.hideDeleteMenuDelayed();
            }
          }, 50);
        }
      });
    });

    // Global: click outside delete menu → ẩn
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.memories-a1-delete-menu') &&
          !e.target.closest('.memories-a1-reaction-btn')) {
        this.hideDeleteMenu();
      }
    });

    // Global: nếu chuột rời khỏi btn + menu → ẩn
    document.addEventListener('mousemove', (e) => {
      const menu = document.querySelector('.memories-a1-delete-menu');
      if (!menu) return;
      const btn = Array.from(this.reactionBtns).find(b => b.textContent.trim() === menu.dataset.emoji);
      if (!btn) return;
      const isOnBtn = btn.contains(e.target);
      const isOnMenu = menu.contains(e.target);
      if (!isOnBtn && !isOnMenu) {
        this.hideDeleteMenuDelayed();
      } else {
        clearTimeout(this.state.deleteMenuTimeout);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => GalleryA1.init());
