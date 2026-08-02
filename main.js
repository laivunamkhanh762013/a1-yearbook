/**
 * main.js — Restored from a1cvatt.vercel.app (baseline)
 * Patched: getImgUrl() for local assets/ folder
 * ============================================================
 */

// ====== DEBOUNCE UTILITY ======
function debounce(fn, ms) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

// ====== FIREBASE INIT ======
firebase.initializeApp({
  apiKey:"AIzaSyAGk_PVH9MHzZ3HhgFVf7c1hdH1d-i9yhc",
  authDomain:"a1-chat-52003.firebaseapp.com",
  databaseURL:"https://a1-chat-52003-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:"a1-chat-52003",
  storageBucket:"a1-chat-52003.firebasestorage.app",
  messagingSenderId:"690983023454",
  appId:"1:690983023454:web:ebeb8a12b11ffc46f715cf"
});
const db = firebase.database();

// ====== IMAGE PATH HELPER (local patch) ======
function getImgUrl(path) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('assets/') || path.startsWith('data:')) return path;
  return 'assets/' + path;
}

// ====== MEMBER DATA ======
const members = [
  {name:"Nguyễn Thùy Linh",      dob:"25/07/1998", nick:"Linhh Sử (GVCN)",                       img:"Teacher.jpg"},
  {name:"Nguyễn Vũ Bảo An",      dob:"13/04/2013", nick:"Thiên Tài Tiếng Anh",                    img:"assets/NguyenVuBaoAn.jpg"},
  {name:"Phạm Thúy An",          dob:"06/06/2013", nick:"An hay Sleep...",                        img:"PhamThuyAn.jpg"},
  {name:"Trần Ngọc Bảo An",      dob:"12/03/2013", nick:"Thiên tài Văn học",                      img:"TranNgocBaoAn.jpg"},
  {name:"Lê Bảo Anh",            dob:"30/06/2013", nick:"Thiên tài Văn học",                      img:"LeBaoAnh.jpg"},
  {name:"Nguyễn Tùng Bách",      dob:"06/01/2013", nick:"Thiên Tài Toán Học",                     img:"NguyenTungBach.jpg"},
  {name:"Dương Thanh Bình",      dob:"12/12/2013", nick:"Thiên tài Toán học",                     img:"DuongThanhBinh.jpg"},
  {name:"Nguyễn Ngọc Bảo Châu",  dob:"06/08/2013", nick:"Châu Chấu",                              img:"NguyenNgocBaoChau.jpg"},
  {name:"Nguyễn Thùy Chi",       dob:"08/07/2013", nick:"Thiên Tài mọi môn",                      img:"NguyenThuyChi.jpg"},
  {name:"Lê Nguyễn Thùy Dương",  dob:"05/04/2013", nick:"...",                                    img:"LeNguyenThuyDuong.jpg"},
  {name:"Lê Ngân Hà",            dob:"06/10/2013", nick:"Cao thủ Guitar",                         img:"LeNganHa.jpg"},
  {name:"Nguyễn Minh Hà",        dob:"06/12/2013", nick:"Thiên tài bóng đá",                      img:"NguyenMinhHa.jpg"},
  {name:"Nguyễn Thanh Hà",       dob:"27/05/2013", nick:"Thiên tài Tiếng Anh",                    img:"NguyenThanhHa.jpg"},
  {name:"Vũ Trung Hiếu",         dob:"16/07/2013", nick:"...",                                    img:"VuTrungHieu.jpg"},
  {name:"Nguyễn Đình Phúc Hưng", dob:"15/04/2013", nick:"Lau sàn Hiphop - Hitler",                img:"NguyenDinhPhucHung.jpg"},
  {name:"Lê Minh Khang",         dob:"07/01/2013", nick:"Thiên Tài Bóng Đá",                      img:"LeMinhKhang.jpg"},
  {name:"Nguyễn Minh Khang",     dob:"24/08/2013", nick:"Thiên Tài Bóng Đá",                      img:"NguyenMinhKhang.jpg"},
  {name:"Lại Vũ Nam Khánh",      dob:"07/06/2013", nick:"Thiên Tài IT",                           img:"LaiVuNamKhanh.jpg"},
  {name:"Đỗ Khắc Nguyên Khôi",   dob:"22/02/2013", nick:"...",                                    img:"DoKhacNguyenKhoi.jpg"},
  {name:"Trần Anh Khôi",         dob:"21/03/2013", nick:"Thiên Tài Sinh học",                     img:"TranAnhKhoi.jpg"},
  {name:"Lê Trần Khánh Linh",    dob:"05/03/2013", nick:"...",                                    img:"LeTranKhanhLinh.jpg"},
  {name:"Ngô Gia Linh",          dob:"11/10/2013", nick:"Ngô Tổng - Thiên Tài mọi môn",           img:"NgoGiaLinh.jpg"},
  {name:"Trần Gia Linh",         dob:"28/05/2013", nick:"Lớp Trưởng - Thiên tài Wushu / Vật lý",  img:"TranGiaLinh.jpg"},
  {name:"Lê Duy Bảo Minh",       dob:"16/12/2013", nick:"Thiên Tài Tiếng Anh",                    img:"LeDuyBaoMinh.jpg"},
  {name:"Đàm Khánh Ngân",        dob:"30/12/2013", nick:"...",                                    img:"DamKhanhNgan.jpg"},
  {name:"Phạm Tuấn Nghĩa",       dob:"08/05/2013", nick:"Thiên Tài Bóng Đá",                      img:"PhamTuanNghia.jpg"},
  {name:"Phạm Bảo Ngọc",         dob:"25/12/2013", nick:"...",                                    img:"PhamBaoNgoc.jpg"},
  {name:"Vũ Bảo Ngọc",           dob:"28/10/2013", nick:"...",                                    img:"VuBaoNgoc.jpg"},
  {name:"Trần Khôi Nguyên",      dob:"03/09/2013", nick:"...",                                    img:"TranKhoiNguyen.jpg"},
  {name:"Nguyễn Xuân Nhã",       dob:"21/11/2013", nick:"Thiên Tài Toán Học",                     img:"NguyenXuanNha.jpg"},
  {name:"Vũ Xuân Phúc",          dob:"27/01/2013", nick:"Thiên Tài Bóng Đá",                      img:"VuXuanPhuc.jpg"},
  {name:"Nguyễn Nhật Phương",    dob:"24/09/2013", nick:"Thiên Tài Vật lý",                       img:"NguyenNhatPhuong.jpg"},
  {name:"Quản Bích Phượng",      dob:"05/04/2013", nick:"...",                                    img:"QuanBichPhuong.jpg"},
  {name:"Phạm Huy Quang",        dob:"09/04/2013", nick:"...",                                    img:"PhamHuyQuang.jpg"},
  {name:"Nguyễn Mạnh Quân",      dob:"14/08/2013", nick:"Thiên Tài Toán Học",                     img:"NguyenManhQuan.jpg"},
  {name:"Trần Minh Quân",        dob:"07/01/2013", nick:"Thiên Tài Bóng Đá",                      img:"TranMinhQuan.jpg"},
  {name:"Nguyễn Hương Thảo",     dob:"22/02/2013", nick:"Thiên Tài Tiếng Anh",                    img:"NguyenHuongThao.jpg"},
  {name:"Phạm Anh Thư",          dob:"08/02/2013", nick:"Tiểu Thư Cao Quý✨ - Thiên Tài Tiếng Anh",img:"PhamAnhThu.jpg"},
  {name:"Nguyễn Khánh Trang",    dob:"23/02/2013", nick:"Thiên tài Hóa Học",                      img:"NguyenKhanhTrang.jpg"},
  {name:"Hoàng Cẩm Tú",          dob:"05/11/2013", nick:"...",                                    img:"HoangCamTu.jpg"},
  {name:"Nguyễn Minh Tuấn",      dob:"14/02/2013", nick:"...",                                    img:"NguyenMinhTuan.jpg"},
  {name:"Bùi Lâm Tuệ",           dob:"16/12/2013", nick:"Quái Vật Văn Văn Văn😈",                 img:"BuiLamTue.jpg"},
  {name:"Bùi Thế Vinh",          dob:"19/09/2013", nick:"Thiên tài Tiếng Anh",                    img:"BuiTheVinh.jpg"},
];

const moods = [
  {emoji:"😍",label:"Crush nặng 💘"},{emoji:"🤩",label:"Siêu ngầu!"},
  {emoji:"😂",label:"Hài vãi!"},{emoji:"😎",label:"Chill quá đi"},
  {emoji:"🥰",label:"Dễ thương vcl"},{emoji:"🤓",label:"Học giỏi ghê"},
  {emoji:"😴",label:"Buồn ngủ như An"},{emoji:"🔥",label:"Quá fire!"},
  {emoji:"🫡",label:"Xin chào!"},{emoji:"💀",label:"Chết vì cute"},{emoji:"🧠",label:"IQ cao vl=))"},
];
const randEmojis = ['🎲','🌟','🔥','💫','🎯','⚡','🌈','🎪','🎭','🦄'];
const timelineEvents = [
  {icon:"📅",text:"06/09/2025 — Bắt đầu lớp A1"},
  {icon:"📅",text:"03/11/2025 — Thi Giữa Học Kì I"},
  {icon:"🎉",text:"20/11/2025 — Ngày Nhà Giáo Việt Nam"},
  {icon:"🏃",text:"08/12/2025 — Hoạt động ngoại khóa lần 1"},
  {icon:"📅",text:"22/12/2025 — Thi Cuối Học Kì I"},
  {icon:"📅",text:"06/02/2026 — Hội Chợ Xuân"},
  {icon:"🌸",text:"08/03/2026 — Ngày dành cho 23 bạn nữ 💖"},
  {icon:"📅",text:"16/03/2026 — Thi Giữa Kì II"},
  {icon:"📅",text:"20/04/2026 — Thi Cuối Kì II"},
  {icon:"🏃",text:"04/05 – 28/05/2026 — Hoạt động ngoại khóa lần 2"},
  {icon:"🏫",text:"29/05/2026 — Tổng kết & Kết thúc năm học"},
  {icon:"☀️",text:"01/06/2026 — BẮT ĐẦU NGHỈ HÈ! 🎉"},
];

// ====== TIMELINE (Enhanced) ======
const tlList = document.getElementById('timelineList');
timelineEvents.forEach((e,i) => {
  const wrap = document.createElement('div');
  wrap.className = 'tl-enhanced-item reveal';
  wrap.style.transitionDelay = (i*0.07)+'s';
  const dot = document.createElement('div');
  dot.className = 'tl-enhanced-dot';
  const card = document.createElement('div');
  card.className = 'tl-enhanced-card';
  const dateMatch = e.text.match(/^(\d{2}\/\d{2}(?:\/\d{4})?)/);
  if (dateMatch) {
    const dateSpan = document.createElement('span');
    dateSpan.className = 'tl-enhanced-date';
    dateSpan.textContent = '📅 ' + dateMatch[1];
    card.appendChild(dateSpan);
    const textSpan = document.createElement('span');
    textSpan.className = 'tl-enhanced-text';
    textSpan.textContent = e.icon + ' ' + e.text.replace(dateMatch[0],'').trim();
    card.appendChild(textSpan);
  } else {
    const textSpan = document.createElement('span');
    textSpan.className = 'tl-enhanced-text';
    textSpan.textContent = e.icon + ' ' + e.text;
    card.appendChild(textSpan);
  }
  wrap.appendChild(dot);
  wrap.appendChild(card);
  tlList.appendChild(wrap);
});

// ====== MEMBER CATEGORIES ======
const memberCategories = {
  'Nguyễn Thùy Linh':'other',
  'Nguyễn Vũ Bảo An':'english',
  'Phạm Thúy An':'english',
  'Trần Ngọc Bảo An':'literature',
  'Lê Bảo Anh':'literature',
  'Nguyễn Tùng Bách':'math',
  'Dương Thanh Bình':'math',
  'Nguyễn Ngọc Bảo Châu':'other',
  'Nguyễn Thùy Chi':'math',
  'Lê Nguyễn Thùy Dương':'other',
  'Lê Ngân Hà':'other',
  'Nguyễn Minh Hà':'sport',
  'Nguyễn Thanh Hà':'english',
  'Vũ Trung Hiếu':'other',
  'Nguyễn Đình Phúc Hưng':'english',
  'Lê Minh Khang':'sport',
  'Nguyễn Minh Khang':'sport',
  'Lại Vũ Nam Khánh':'it',
  'Đỗ Khắc Nguyên Khôi':'other',
  'Trần Anh Khôi':'khtn',
  'Lê Trần Khánh Linh':'other',
  'Ngô Gia Linh':'math',
  'Trần Gia Linh':'sport',
  'Lê Duy Bảo Minh':'english',
  'Đàm Khánh Ngân':'other',
  'Phạm Tuấn Nghĩa':'sport',
  'Phạm Bảo Ngọc':'other',
  'Vũ Bảo Ngọc':'other',
  'Trần Khôi Nguyên':'other',
  'Nguyễn Xuân Nhã':'math',
  'Vũ Xuân Phúc':'sport',
  'Nguyễn Nhật Phương':'khtn',
  'Quản Bích Phượng':'other',
  'Phạm Huy Quang':'other',
  'Nguyễn Mạnh Quân':'math',
  'Trần Minh Quân':'sport',
  'Nguyễn Hương Thảo':'english',
  'Phạm Anh Thư':'english',
  'Nguyễn Khánh Trang':'khtn',
  'Hoàng Cẩm Tú':'other',
  'Nguyễn Minh Tuấn':'other',
  'Bùi Lâm Tuệ':'literature',
  'Bùi Thế Vinh':'english',
};
const catEmojis = {math:'🔢',literature:'📖',english:'🇬🇧',sport:'⚽',khtn:'🔬',it:'💻',other:'🌟'};
const catLabels = {math:'Toán',literature:'Văn',english:'Anh',sport:'Thể thao',khtn:'KHTN',it:'IT',other:'Khác'};

// ====== IMAGE AUTO-RETRY ======
const MAX_IMG_RETRIES = 3;
const PLACEHOLDER_URL = 'https://via.placeholder.com/160/0d0d14/ffffff?text=';
function retryImage(img) {
  if (img.src.includes('placeholder')) return;
  const retries = parseInt(img.dataset.retry || '0');
  if (retries < MAX_IMG_RETRIES) {
    img.dataset.retry = retries + 1;
    if (!img.dataset.originalSrc) img.dataset.originalSrc = img.src.split('?')[0];
    const delay = 1000 + (retries * 800);
    setTimeout(() => {
      img.src = img.dataset.originalSrc + '?t=' + Date.now() + '_' + retries;
      img.classList.add('img-retrying');
    }, delay);
  } else {
    img.classList.remove('img-loading', 'img-retrying');
    const initial = (img.alt || '?').charAt(0);
    img.src = PLACEHOLDER_URL + encodeURIComponent(initial);
  }
}
function onImageLoaded(img) {
  img.classList.remove('img-loading', 'img-retrying');
}
function retryFailedImages() {
  document.querySelectorAll('.member-card img[data-retry]').forEach(img => {
    if (img.src.includes('placeholder')) return;
    const isBroken = img.complete && img.naturalWidth === 0;
    if (isBroken) {
      img.dataset.retry = '0';
      img.classList.add('img-loading');
      const baseSrc = img.dataset.originalSrc || img.src.split('?')[0];
      img.dataset.originalSrc = baseSrc;
      img.src = baseSrc + '?t=' + Date.now() + '_retry';
    }
  });
  document.querySelectorAll('.navbar-avatar').forEach(img => {
    const isBroken = img.complete && img.naturalWidth === 0;
    if (isBroken) {
      const src = img.src.split('?')[0];
      img.src = src + '?t=' + Date.now();
      img.style.display = '';
    }
  });
}

// ====== MEMBERS GRID ======
const transferredNames = [
  "Phạm Tuấn Nghĩa", "Hoàng Cẩm Tú", "Phạm Bảo Ngọc",
  "Lê Bảo Anh", "Nguyễn Xuân Nhã", "Trần Gia Linh"
];

const studentMembers = members.slice(1);
const pickCount = {};
const MAX_PICK = 2;

// Update title count
const sectionTitle = document.querySelector('#members .section-title');
if (sectionTitle) {
  sectionTitle.textContent = `👥 Danh sách thành viên (${members.length} thành viên)`;
}

// Render all members in main grid with special highlight for transferred members
const grid = document.getElementById('membersGrid');
if (grid) {
  grid.innerHTML = '';
  members.forEach((m, i) => {
    const cat = memberCategories[m.name] || 'other';
    const isTransferred = transferredNames.includes(m.name);
    const card = document.createElement('div');
    card.className = `member-card reveal ${isTransferred ? 'transferred-highlight' : ''}`;
    card.style.transitionDelay = (i * 0.025) + 's';
    card.dataset.name = m.name;
    card.dataset.category = cat;
    const imgSrc = getImgUrl(m.img);
    card.innerHTML = `
      ${isTransferred ? '<div class="transferred-badge">🎓 Chuyển trường</div>' : ''}
      <img src="${imgSrc}" loading="lazy" data-retry="0" onerror="retryImage(this)" onload="onImageLoaded(this)" alt="${m.name}" class="img-loading">
      <div class="mc-name">${m.name}</div>
      <div class="mc-dob">${m.dob}</div>
      ${m.nick ? `<div class="mc-nick">${m.nick}</div>` : ''}
      <div class="cat-badge">${catEmojis[cat] || '🌟'} ${catLabels[cat] || 'Khác'}</div>
    `;
    card.addEventListener('click', () => openProfile(m));
    grid.appendChild(card);
  });
}

// ====== SCROLL REVEAL ======
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);} });
},{threshold:0.07});
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// ====== SEARCH ======
document.getElementById('searchInput').addEventListener('input', function() {
  const kw = this.value;
  const isEmpty = kw.length === 0;
  const searchLower = kw.toLowerCase().trim();
  let found = false;

  document.querySelectorAll('.member-card').forEach(card => {
    const name = card.dataset.name;
    const match = isEmpty || name.toLowerCase().includes(searchLower);
    const nameEl = card.querySelector('.mc-name');

    if (match) {
      found = true;
      if (card.classList.contains('search-hidden')) {
        card.style.display = '';
        card.offsetHeight;
        card.classList.remove('search-hidden');
        card.classList.add('search-visible');
        setTimeout(() => card.classList.remove('search-visible'), 400);
      } else {
        card.classList.remove('search-hidden');
      }
      if (!isEmpty && searchLower) {
        const safeKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${safeKw})`, 'gi');
        nameEl.innerHTML = name.replace(regex, '<span class="highlight">$1</span>');
      } else {
        nameEl.textContent = name;
      }
    } else {
      card.classList.add('search-hidden');
      setTimeout(() => {
        if (card.classList.contains('search-hidden')) {
          card.style.display = 'none';
        }
      }, 300);
    }
  });

  document.getElementById('noResult').style.display = found ? 'none' : 'block';
});

// Sticky search (debounced)
(function() {
  const searchWrap = document.querySelector('.search-wrap');
  const membersSection = document.getElementById('members');
  if (!searchWrap || !membersSection) return;
  const onScroll = debounce(() => {
    const rect = membersSection.getBoundingClientRect();
    searchWrap.classList.toggle('sticky', rect.top <= 0);
  }, 30);
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ====== PROFILE ======
function openProfile(m) {
  const mood = moods[Math.floor(Math.random()*moods.length)];
  document.getElementById('pName').textContent = m.name;
  document.getElementById('pDob').textContent  = '🎂 Ngày sinh: '+m.dob;
  document.getElementById('pNick').textContent = '✨ Biệt danh: '+(m.nick||'...');
  
  const isTransferred = transferredNames.includes(m.name);
  const badgeEl = document.getElementById('pBadge');
  if (badgeEl) {
    badgeEl.textContent = isTransferred 
      ? '🎯 Đã từng là thành viên lớp A1 – THCS CVA' 
      : '🎯 Thành viên lớp A1 – THCS CVA';
  }

  const img = document.getElementById('pImg');
  img.src = getImgUrl(m.img); // patch: fix local assets/ path
  img.onerror = ()=>{ img.src='https://via.placeholder.com/200/0d0d14/ffffff?text=?'; };
  document.getElementById('pMood').innerHTML = `<span style="font-size:52px;display:block;margin:4px 0;">${mood.emoji}</span><span style="font-size:14px;color:var(--muted);">${mood.label}</span>`;
  const emo = document.getElementById('profileEmoji');
  emo.textContent=mood.emoji; emo.style.display='block'; emo.style.animation='none'; emo.offsetHeight;
  emo.style.animation='emojiPop 0.5s ease both';
  setTimeout(()=>{emo.style.display='none';},1200);
  const modal = document.getElementById('profileModal');
  modal.style.display='flex'; modal.offsetHeight; modal.classList.add('open');
}
function closeProfile() {
  const modal=document.getElementById('profileModal'); modal.classList.remove('open');
  setTimeout(()=>{modal.style.display='none';},300);
}
document.getElementById('closeProfile').onclick = closeProfile;
document.getElementById('profileModal').addEventListener('click',e=>{if(e.target===document.getElementById('profileModal'))closeProfile();});
function openProfileByName(name){const m=members.find(m=>m.name===name);if(m)openProfile(m);}

// ====== ZOOM ======
function openZoom(src) {
  const modal = document.getElementById('zoomModal');
  const img = document.getElementById('zoomImg');
  const spinner = document.getElementById('zoomSpinner');
  spinner.classList.add('visible');
  img.classList.remove('loaded');
  img.classList.add('loading');
  img.src = src;
  modal.style.display = 'flex';
  modal.offsetHeight;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
if (document.getElementById('zoomImg')) {
  document.getElementById('zoomImg').addEventListener('load', function() {
    const spinner = document.getElementById('zoomSpinner');
    if (spinner) spinner.classList.remove('visible');
    this.classList.remove('loading');
    this.classList.add('loaded');
  });
  document.getElementById('zoomImg').addEventListener('error', function() {
    const spinner = document.getElementById('zoomSpinner');
    if (spinner) spinner.classList.remove('visible');
    this.classList.remove('loading');
    this.classList.add('loaded');
  });
}
function closeZoom() {
  const modal = document.getElementById('zoomModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { modal.style.display = 'none'; }, 500);
}
if (document.getElementById('zoomModal')) {
  document.getElementById('zoomModal').addEventListener('click', function(e) {
    if (e.target === this) closeZoom();
  });
  document.getElementById('zoomCloseBtn').addEventListener('click', closeZoom);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('zoomModal').classList.contains('active')) {
      closeZoom();
    }
  });
}

// ====== RANDOM MEMBER ======
let spinning=false, chosenMember=null;
function getPool(){
  const pool=studentMembers.filter(m=>(pickCount[m.name]||0)<MAX_PICK);
  if(pool.length===0){studentMembers.forEach(m=>pickCount[m.name]=0);return studentMembers.slice();}
  return pool;
}
function showMember(m){
  const ri=document.getElementById('randImg');
  ri.src=getImgUrl(m.img); // patch: fix local assets/ path
  ri.style.display='block';
  ri.onerror=()=>{ri.style.display='none';};
  document.getElementById('randEmoji').textContent=randEmojis[Math.floor(Math.random()*randEmojis.length)];
  document.getElementById('randName').textContent=m.name;
  document.getElementById('randDob').textContent='🎂 '+m.dob;
  document.getElementById('randNick').textContent='✨ '+(m.nick||'...');
}
function pickRandom(){
  if(spinning)return; spinning=true;
  const btn=document.getElementById('btnRandom'),card=document.getElementById('randCard'),status=document.getElementById('spinStatus');
  btn.disabled=true; btn.textContent='⏳ Đang quay...'; card.classList.add('spinning');
  const duration=5000,interval=110; let elapsed=0;
  const flick=setInterval(()=>{
    elapsed+=interval;
    const pool=getPool(), tmp=pool[Math.floor(Math.random()*pool.length)];
    const ri=document.getElementById('randImg'); ri.src=getImgUrl(tmp.img); ri.style.display='block'; ri.onerror=()=>{ri.style.display='none';};
    document.getElementById('randName').textContent=tmp.name;
    document.getElementById('randEmoji').textContent=randEmojis[Math.floor(Math.random()*randEmojis.length)];
    const rem=Math.max(0,Math.ceil((duration-elapsed)/1000));
    status.textContent=rem>0?`⏳ ${rem}s...`:'';
    if(elapsed>=duration){
      clearInterval(flick);
      const finalPool=getPool();
      chosenMember=finalPool[Math.floor(Math.random()*finalPool.length)];
      pickCount[chosenMember.name]=(pickCount[chosenMember.name]||0)+1;
      card.classList.remove('spinning'); card.classList.add('reveal');
      showMember(chosenMember); status.textContent='🎉 Kết quả!';
      setTimeout(()=>{card.classList.remove('reveal');status.textContent='';},700);
      btn.disabled=false; btn.textContent='🔀 Random lại'; spinning=false;
    }
  },interval);
}
document.getElementById('btnRandom').addEventListener('click',pickRandom);
document.getElementById('randCard').addEventListener('click',()=>{if(!spinning&&chosenMember)openProfile(chosenMember);});
document.getElementById('randImg').style.display='none';

// ====== COUNTDOWN ======
let prevSummerDays = null;
let prevSummerH = null, prevSummerM = null, prevSummerS = null;
let prevSchoolDays = null;
let prevSchoolH = null, prevSchoolM = null, prevSchoolS = null;

function buildDigitSpan(value, prevValue) {
  const cls = 'cd-digit' + (prevValue !== null && prevValue !== value ? ' pop' : '');
  return `<span class="${cls}">${value}</span>`;
}

function animateCountPop(el) {
  if (!el) return;
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

// Summer
function updateSummer(){
  const now=new Date(),summerStart=new Date('2026-05-28T12:00:00'),yearStart=new Date('2025-09-06T00:00:00');
  document.getElementById('summerStart').textContent='06/09/2025';
  document.getElementById('summerEnd').textContent='28/5☀️';
  const diff=summerStart-now;
  if(diff<=0){const sd=document.getElementById('summerDays');sd.textContent='🎉';sd.dataset.ended='true';document.getElementById('summerSub').textContent='ĐÃ NGHỈ HÈ RỒI!!!';document.getElementById('summerBar').style.width='100%';document.getElementById('summerPct').textContent='100% — Hè đây rồi!!! 🔥';return;}
  const pct=Math.max(0,Math.min(100,((now-yearStart)/(summerStart-yearStart))*100));
  const d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
  const el = document.getElementById('summerDays');
  const subText = d>=7 ? `${Math.floor(d/7)} tuần` : '';
  el.innerHTML = subText ? `${d} <span class="cd-count-sub">ngày ( ${subText} )</span>` : `${d} <span class="cd-count-sub">ngày</span>`;
  if (prevSummerDays !== null && prevSummerDays !== d) animateCountPop(el);
  prevSummerDays = d;
  const subEl = document.getElementById('summerSub');
  subEl.innerHTML = `ngày ${buildDigitSpan(h, prevSummerH)}h ${buildDigitSpan(m, prevSummerM)}p ${buildDigitSpan(s, prevSummerS)}s nữa thôi! 🌴`;
  prevSummerH = h; prevSummerM = m; prevSummerS = s;
  document.getElementById('summerBar').style.width=pct.toFixed(1)+'%';
  document.getElementById('summerPct').textContent=pct.toFixed(1)+'% năm học đã qua';
}
setTimeout(() => {
  updateSummer();
  document.getElementById('summerBar')?.classList.remove('loading');
  document.getElementById('schoolBar')?.classList.remove('loading');
}, 200);
setInterval(updateSummer,1000);

// Back to School
function updateBackToSchool(){
  const now=new Date(), schoolStart=new Date('2026-09-05T07:15:00');
  const diff=schoolStart-now;
  if(diff<=0){
    const sde=document.getElementById('schoolDays');sde.textContent='🎒';sde.dataset.ended='true';
    document.getElementById('schoolSub').textContent='ĐÃ ĐI HỌC RỒI!!! 📖';
    document.getElementById('schoolBar').style.width='100%';
    document.getElementById('schoolPct').textContent='100% — Hết hè rồi!!! 📚';
    return;
  }
  const summerEnd=new Date('2026-05-27T09:00:00');
  const totalHoliday=schoolStart-summerEnd;
  const pct=totalHoliday>0?Math.min(100,Math.max(0,((now-summerEnd)/totalHoliday)*100)):0;
  const d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
  const el = document.getElementById('schoolDays');
  const subText = d>=7 ? `${Math.floor(d/7)} tuần` : '';
  el.innerHTML = subText ? `${d} <span class="cd-count-sub">ngày ( ${subText} )</span>` : `${d} <span class="cd-count-sub">ngày</span>`;
  if (prevSchoolDays !== null && prevSchoolDays !== d) animateCountPop(el);
  prevSchoolDays = d;
  const subEl = document.getElementById('schoolSub');
  subEl.innerHTML = `ngày ${buildDigitSpan(h, prevSchoolH)}h ${buildDigitSpan(m, prevSchoolM)}p ${buildDigitSpan(s, prevSchoolS)}s nữa thôi! 📖`;
  prevSchoolH = h; prevSchoolM = m; prevSchoolS = s;
  document.getElementById('schoolBar').style.width=pct.toFixed(1)+'%';
  document.getElementById('schoolPct').textContent=pct.toFixed(1)+'% kỳ nghỉ hè đã qua';
}
setTimeout(() => updateBackToSchool(), 200);
setInterval(updateBackToSchool,1000);

// ====== POLL ======
const WEEKLY_POLLS = [
  {id:"loptruong", q:"🗣️ Bình chọn lớp trưởng A1?", candidates:["Lê Nguyễn Thùy Dương","Ngô Gia Linh","Trần Anh Khôi","Trần Gia Linh","Nguyễn Thùy Chi","Lê Minh Khang"]},
];

const poll = WEEKLY_POLLS[0];

// Tự động thay thế bạn chuyển trường trong poll bằng 1 bạn đang đi học ngẫu nhiên
const activeStudentNamesList = activeMembers.slice(1).map(m => m.name);
poll.candidates = poll.candidates.map(candidate => {
  if (transferredNames.includes(candidate)) {
    const pool = activeStudentNamesList.filter(n => !poll.candidates.includes(n));
    if (pool.length > 0) {
      return pool[Math.floor(Math.random() * pool.length)];
    }
  }
  return candidate;
});
const VOTE_KEY = 'polls/votes_' + poll.id;
const MY_KEY = 'myvote_' + poll.id;

function getTimeLeft(){
  return '🟢 Bình chọn đang mở vĩnh viễn';
}
function isPollLocked(){
  return false;
}
let pollVotes={};
let myVote=localStorage.getItem(MY_KEY)||null;

function getTopRanks(){
  const sorted=[...poll.candidates].map(n=>({name:n,votes:pollVotes[n]||0})).sort((a,b)=>b.votes-a.votes);
  return{first:sorted[0]?.name,second:sorted[1]?.name,third:sorted[2]?.name};
}
function updateMemberRanks(){
  document.querySelectorAll('.rank-badge').forEach(e=>e.remove());
  const ranks=getTopRanks();
  document.querySelectorAll('.member-card').forEach(card=>{
    const name=card.dataset.name; let badge='';
    if(name===ranks.first)       badge='<div class="rank-badge rank-gold">🥇</div>';
    else if(name===ranks.second) badge='<div class="rank-badge rank-silver">🥈</div>';
    else if(name===ranks.third)  badge='<div class="rank-badge rank-bronze">🥉</div>';
    if(badge) card.insertAdjacentHTML('beforeend',badge);
  });
}
function renderPoll(){
  const container=document.getElementById('pollContainer'); if(!container)return;
  const locked=isPollLocked(), canVote=!myVote&&!locked;
  const total=poll.candidates.reduce((s,c)=>s+(pollVotes[c]||0),0);
  const sorted=[...poll.candidates].sort((a,b)=>(pollVotes[b]||0)-(pollVotes[a]||0));
  let html='';
  html+=`<div class="poll-q">${poll.q}</div>`;
  sorted.forEach((c,idx)=>{
    const cnt=pollVotes[c]||0,pct=total>0?Math.round(cnt/total*100):0,isMine=myVote===c;
    const medal=idx===0?'🥇 ':idx===1?'🥈 ':idx===2?'🥉 ':'';
    html+=`<div class="poll-option">
      <div class="poll-option-label">
<button type="button"
  data-name="${c}"
  onclick="event.stopPropagation(); openProfileByName(this.dataset.name)"
  style="background:none;border:none;padding:0;cursor:pointer;color:${isMine?'var(--gold)':'var(--text)'};font-weight:${isMine?700:400};font-size:13px;font-family:'Quicksand',sans-serif;text-align:left;">
          ${medal}${isMine?'✓ ':''}${c}
        </button>
        <span style="color:var(--muted);font-size:12px;">${cnt} vote · ${pct}%</span>
      </div>
<div class="poll-bar-track${isMine ? ' voted' : ''}"
     ${canVote ? `onclick='doVote(${JSON.stringify(c)}, event)'` : ''}>        <div class="poll-bar-fill${isMine?' my-vote':''}" style="width:${pct>0?pct:2}%"></div>
        ${canVote?`<div class="poll-bar-label">Bấm để vote</div>`:''}
      </div>
    </div>`;
  });
  html+=`    <div class="poll-total">Tổng: ${total} lượt${myVote?' · Bạn đã vote ✓':''}${locked?' · 🔒 Đã khóa':''}</div>
`;
  container.innerHTML=html;
  updateMemberRanks();
}
async function doVote(candidate,event){
  if(myVote||isPollLocked())return;
  if(event){
    const track=event.currentTarget,rect=track.getBoundingClientRect();
    const rip=document.createElement('div'); rip.className='ripple-effect';
    rip.style.left=(event.clientX-rect.left)+'px'; rip.style.top=(event.clientY-rect.top)+'px';
    track.appendChild(rip); setTimeout(()=>rip.remove(),700);
  }
  myVote=candidate; localStorage.setItem(MY_KEY,candidate);
  pollVotes[candidate]=(pollVotes[candidate]||0)+1; renderPoll();
  const snap=await db.ref(VOTE_KEY).get(); const data=snap.val()||{};
  data[candidate]=(data[candidate]||0)+1; await db.ref(VOTE_KEY).set(data);
}
db.ref(VOTE_KEY).on('value',snap=>{pollVotes=snap.val()||{};renderPoll();});
function openPollModal(){const m=document.getElementById('pollModal');m.style.display='flex';m.offsetHeight;m.classList.add('open');}
function closePollModal(){const m=document.getElementById('pollModal');m.classList.remove('open');setTimeout(()=>{m.style.display='none';},300);}
document.getElementById('pollModal').addEventListener('click',e=>{if(e.target===document.getElementById('pollModal'))closePollModal();});
setInterval(()=>{const el=document.getElementById('pollTimer');if(el)el.textContent=getTimeLeft();},1000);
document.getElementById('pollTimer').textContent=getTimeLeft();

// ====== LOADING SCREEN ======
(function(){
  let p=0;
  const bar=document.getElementById('loadBar'),screen=document.getElementById('loadingScreen');
  if(!screen) return;
  const hideScreen = () => {
    screen.style.opacity='0';
    screen.style.pointerEvents='none';
    setTimeout(()=>{
      screen.style.display='none';
      if (typeof checkBirthday === 'function') checkBirthday();
    }, 500);
  };
  const iv=setInterval(()=>{
    p+=Math.random()*25;
    if(bar) bar.style.width=p+'%';
    if(p>=100){
      if(bar) bar.style.width='100%';
      clearInterval(iv);
      setTimeout(hideScreen, 150);
    }
  },70);
  // Dự phòng an toàn tối đa 1 giây ẩn màn hình loading
  setTimeout(hideScreen, 1000);
})();

// ====== BIRTHDAY ======
const confettiColors = ['#ff6b6b','#ffd700','#4ade80','#00e5ff','#a78bfa','#ff6b6b','#ff9a3c','#f472b6','#34d399','#60a5fa'];

function spawnConfetti(count = 60) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const left = Math.random() * 100;
    const size = 6 + Math.random() * 8;
    const dur = 2.5 + Math.random() * 2.5;
    const rot = 360 + Math.random() * 720;
    const delay = Math.random() * 1.5;
    const shapes = ['50%','0','30% 0 0'];
    const br = shapes[Math.floor(Math.random() * shapes.length)];
    piece.style.cssText = `left:${left}%;width:${size}px;height:${size}px;background:${color};border-radius:${br};--fall-dur:${dur}s;--rot:${rot}deg;animation-delay:${delay}s;`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), (dur + delay) * 1000 + 100);
  }
}

function checkBirthday() {
  const today = new Date();
  const todayStr = String(today.getDate()).padStart(2,'0') + '/' + String(today.getMonth()+1).padStart(2,'0');
  const birthdayMember = members.find(m => {
    if (!m.dob || m.dob === '🔐...') return false;
    const parts = m.dob.split('/');
    if (parts.length < 2) return false;
    return (parts[0].padStart(2,'0') + '/' + parts[1].padStart(2,'0')) === todayStr;
  });
  if (!birthdayMember) return;
  const overlay = document.getElementById('birthdayOverlay');
  const nameEl = document.getElementById('birthdayName');
  const ageEl = document.getElementById('birthdayAge');
  const emojiEl = document.getElementById('birthdayEmoji');
  const parts = birthdayMember.dob.split('/');
  const birthYear = parseInt(parts[2]);
  const age = new Date().getFullYear() - birthYear;
  nameEl.textContent = birthdayMember.name;
  birthdayMemberCache = birthdayMember;
  ageEl.textContent = `🎂 ${age} tuổi`;
  const festiveEmojis = ['🎂','🎉','🎊','🥳','🎈','🎁','💖','🌟'];
  emojiEl.textContent = festiveEmojis[Math.floor(Math.random() * festiveEmojis.length)];
  overlay.classList.add('active');
  spawnConfetti(80);
  setTimeout(() => { overlay.classList.remove('active'); }, 8000);
}

document.getElementById('birthdayClose').addEventListener('click', () => {
  document.getElementById('birthdayOverlay').classList.remove('active');
});
document.getElementById('birthdayOverlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('birthdayOverlay')) {
    document.getElementById('birthdayOverlay').classList.remove('active');
  }
});

let birthdayMemberCache = null;
document.getElementById('birthdayName').addEventListener('click', function() {
  if (birthdayMemberCache) {
    openProfileByName(birthdayMemberCache.name);
  }
});

// CLICK CREATOR & TESTER AVATARS → OPEN PROFILE
const creatorAvatar = document.getElementById('creatorAvatar');
const testerAvatar = document.getElementById('testerAvatar');
if (creatorAvatar) {
  creatorAvatar.addEventListener('click', function() {
    openProfileByName('Phạm Thúy An');
  });
}
if (testerAvatar) {
  testerAvatar.addEventListener('click', function() {
    openProfileByName('Lại Vũ Nam Khánh');
  });
}

// ====== BACK TO TOP ======
(function(){
  const btn = document.getElementById('backToTop');
  if(!btn) return;
  const onScroll = debounce(() => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, 50);
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ====== SCROLL PROGRESS BAR ======
(function(){
  const bar = document.getElementById('scrollProgress');
  if(!bar) return;
  const onScroll = debounce(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    bar.style.width = pct + '%';
  }, 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ====== PARTICLE NETWORK CANVAS ======
(function(){
  const canvas = document.getElementById('particleCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = -1000, mouseY = -1000;
  let animId = null;
  const isMobile = window.innerWidth < 768;
  const PARTICLE_COUNT = isMobile ? 30 : 65;
  const CONNECT_DIST = 130;
  const MOUSE_CONNECT_DIST = 160;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let displayW = window.innerWidth;
  let displayH = window.innerHeight;

  function resize() {
    displayW = window.innerWidth;
    displayH = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = displayW * dpr;
    canvas.height = displayH * dpr;
    canvas.style.width = displayW + 'px';
    canvas.style.height = displayH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }
  const debouncedResize = debounce(resize, 200);
  window.addEventListener('resize', debouncedResize, { passive: true });

  function getW() { return displayW; }
  function getH() { return displayH; }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * getW();
      this.y = Math.random() * getH();
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = 1.2 + Math.random() * 1.8;
      this.alpha = 0.3 + Math.random() * 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      const w = getW();
      const h = getH();
      if(this.x < 0 || this.x > w) this.vx *= -1;
      if(this.y < 0 || this.y > h) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 229, 255, ' + this.alpha + ')';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for(let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for(let i = 0; i < particles.length; i++) {
      for(let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < CONNECT_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(0, 229, 255, ' + (1 - dist / CONNECT_DIST) * 0.2 + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function drawMouseConnection() {
    for(let i = 0; i < particles.length; i++) {
      const dx = particles[i].x - mouseX;
      const dy = particles[i].y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if(dist < MOUSE_CONNECT_DIST) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = 'rgba(255, 215, 0, ' + (1 - dist / MOUSE_CONNECT_DIST) * 0.35 + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    drawMouseConnection();
    animId = requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });
  document.addEventListener('mouseleave', () => { mouseX = -1000; mouseY = -1000; }, { passive: true });
  document.addEventListener('touchmove', (e) => { const touch = e.touches[0]; if(touch) { mouseX = touch.clientX; mouseY = touch.clientY; } }, { passive: true });
  document.addEventListener('touchend', () => { mouseX = -1000; mouseY = -1000; }, { passive: true });

  resize();
  animate();
})();

// ====== 3D TILT (desktop only) ======
(function(){
  if ('ontouchstart' in window) return;
  const cards = document.querySelectorAll('.member-card');
  if (!cards.length) return;
  cards.forEach(card => {
    let rafId = null;
    card.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.05,1.05,1.05)';
        card.style.transition = 'transform 0.08s ease-out';
        card.classList.add('tilt-active');
        rafId = null;
      });
    }, { passive: true });
    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      card.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => card.classList.remove('tilt-active'), 400);
    }, { passive: true });
  });
})();

// ====== HAMBURGER MENU ======
(function(){
  const btn = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('mobileOverlay');
  if (!btn || !overlay) return;
  btn.addEventListener('click', () => {
    const isActive = !btn.classList.contains('active');
    btn.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  });
  overlay.querySelectorAll('[data-close-overlay]').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      btn.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
})();

// ====== CURSOR GLOW ======
(function(){
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  let timeout;
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.classList.add('visible');
    clearTimeout(timeout);
    timeout = setTimeout(() => glow.classList.remove('visible'), 2000);
  }, { passive: true });
  document.addEventListener('mouseleave', () => { glow.classList.remove('visible'); }, { passive: true });
})();

// ====== NAVBAR SCROLL ENHANCE ======
(function(){
  const nav = document.getElementById('mainNavbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

// ====== NAVBAR & BOTTOM NAV ACTIVE LINK ======
(function(){
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-menu a[href^="#"]');
  const bottomLinks = document.querySelectorAll('.bottom-nav a');
  if (!sections.length) return;
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => a.classList.toggle('active-link', a.getAttribute('href') === '#' + id));
        bottomLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { threshold: 0.2, rootMargin: '-70px 0px 0px 0px' });
  sections.forEach(s => navObs.observe(s));
  
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();
