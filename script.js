/**
 * A1 BOT - LOGIC CƠ BẢN
 * Chứa các xử lý về UI, tin nhắn và phản hồi từ Bot
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ELEMENTS SELECTORS
    const botLauncher = document.getElementById('botLauncher');
    const chatContainer = document.getElementById('chatContainer');
    const closeBtn = document.getElementById('closeBtn');
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const messageArea = document.getElementById('messageArea');
    const typingIndicator = document.getElementById('typingIndicator');

    if (!botLauncher || !chatContainer) return;

// BOT STATUS CONFIG
let botStatus = "updating"; // default

const STATUS_CONFIG = {
    online: {
        text: "Đang hoạt động",
        color: "#00ff88",
        dotShadow: "0 0 10px #00ff88"
    },
    updating: {
        text: "Đang cập nhật",
        color: "#ff3b3b",
        dotShadow: "0 0 10px #ff3b3b",
        autoReply: "⏳ A1 Bot đang cập nhật nha 😭"
    },
};

window.setBotStatus = function(status) {
    if (!STATUS_CONFIG[status]) return;
    botStatus = status;

    const config = STATUS_CONFIG[status];
    const statusText = document.querySelector('.bot-status');
    if (!statusText) return;

    statusText.innerHTML = `
        <span class="status-dot"></span>
        ${config.text}
    `;
    statusText.style.color = config.color;

    const dot = statusText.querySelector('.status-dot');
    if (dot) {
        dot.style.background = config.color;
        dot.style.boxShadow = config.dotShadow;
    }
};

// INIT STATUS UI
setBotStatus(botStatus);


    // CONFIG & SLANG DATA
    const SLANG_MAP = {
        'j': 'gì', 'mik': 'mình', 'ko': 'không', 'đc': 'được', 'vl': 'vãi',
        'bn': 'bao nhiêu', 'nx': 'nữa', 'rep': 'trả lời', 'cl': 'cái lề',
        'oke': 'ok', 'vcl': 'vãi cả lúa', 'tk': 'tài khoản', 'ib': 'inbox',
        'ad': 'admin', 'thx': 'thanks', 'r': 'rồi', 'k': 'không', 'b': 'bạn',
        'bt': 'biết', 'dc': 'được', 'gđ': 'gia đình'
    };

    const FALLBACK_RESPONSES = [
        "Nghe có vẻ hay đấy! Kể tiếp đi bồ. 😂",
        "Hehe, mình hiểu mà. 😉",
        "Đúng là học sinh A1 có khác, đỉnh thật sự!",
        "Câu này khó quá, chắc phải đợi đến giờ ra chơi mới giải được. 🏫",
        "Okela luôn! 👌",
        "Căng nhở! 😂",
        "A1 Bot đang lắng nghe đâyyy...",
        "Gắt thế nhở! 😂",
        "Để mình hỏi lớp trưởng xem sao nhé!",
        "Đỉnh của chóp luôn bồ ơi! 🔥"
    ];

    // 1. UI FUNCTIONS
    function toggleChat() {
        chatContainer.classList.toggle('active');
        if (chatContainer.classList.contains('active')) {
            userInput.focus();
        }
    }

    function scrollToBottom() {
        setTimeout(() => {
            messageArea.scrollTo({
                top: messageArea.scrollHeight,
                behavior: 'smooth'
            });
        }, 10);
    }

    function showTyping() {
        typingIndicator.style.display = 'block';
        scrollToBottom();
    }

    function hideTyping() {
        typingIndicator.style.display = 'none';
    }

    // 2. MESSAGE FUNCTIONS
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        
        msgDiv.style.opacity = '0';
        msgDiv.style.transform = 'translateY(10px)';
        msgDiv.textContent = text;
        
        messageArea.insertBefore(msgDiv, typingIndicator);
        
        setTimeout(() => {
            msgDiv.style.transition = 'all 0.3s ease';
            msgDiv.style.opacity = '1';
            msgDiv.style.transform = 'translateY(0)';
        }, 10);
        
        scrollToBottom();
    }

    function handleSendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';
        
        showTyping();
        
        const typingSpeed = text.length * 20 + 600; 
        const delay = Math.min(Math.max(typingSpeed, 800), 2500);
        
        setTimeout(() => {
            const response = getBotResponse(text);
            hideTyping();
            addMessage(response, 'bot');
        }, delay);
    }

    // 3. AI LOGIC & PARSING
    function parseSlang(text) {
        let normalized = text.toLowerCase();
        normalized = normalized.replace(/(.)\1{2,}/g, '$1$1');
        
        Object.keys(SLANG_MAP).forEach(key => {
            const regex = new RegExp(`\\b${key}\\b`, 'g');
            normalized = normalized.replace(regex, SLANG_MAP[key]);
        });
        return normalized;
    }

    function getBotResponse(input) {
        // Handle Non-Online status first
        if (botStatus !== "online") {
            return STATUS_CONFIG[botStatus].autoReply || "A1 Bot hiện không khả dụng.";
        }

        const text = parseSlang(input);
        const inputLower = input.toLowerCase();
        
        // Math Check
        const mathMatch = text.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
        if (mathMatch) {
            try {
                const n1 = parseFloat(mathMatch[1]);
                const op = mathMatch[2];
                const n2 = parseFloat(mathMatch[3]);
                let res;
                switch(op) {
                    case '+': res = n1 + n2; break;
                    case '-': res = n1 - n2; break;
                    case '*': res = n1 * n2; break;
                    case '/': res = n2 !== 0 ? (n1 / n2).toFixed(2) : 'Vô cực ♾️'; break;
                }
                return `🧮 **Kết quả:** ${res} 😎 Quá đơn giản với dân A1!`;
            } catch(e) {}
        }

        // TIMELINE / SCHEDULE — Sự kiện sắp tới
        if (text.includes('sự kiện') || text.includes('sắp tới') || text.includes('lịch') || text.includes('timeline') || (text.includes('có gì') && text.includes('mới'))) {
          if (typeof timelineEvents !== 'undefined' && timelineEvents.length) {
            const upcoming = timelineEvents.slice(0, 4);
            let reply = '📅 **Sự kiện sắp tới của A1:**\n\n';
            upcoming.forEach(e => { reply += '• ' + e.icon + ' ' + e.text + '\n'; });
            reply += '\n📌 Xem thêm ở mục Timeline trên trang nhé!';
            return reply;
          }
          return '📅 Mình chưa có dữ liệu sự kiện mới. Check mục Timeline nhé!';
        }

        // CLASS SIZE — Sĩ số
        if ((text.includes('bao nhiêu') && (text.includes('người') || text.includes('thành viên'))) || text.includes('sĩ số') || text.includes('si so')) {
          if (typeof members !== 'undefined') {
            return `👥 Lớp A1 có **${members.length} thành viên** (${members.length - 1} học sinh + 1 GVCN). Một tập thể siêu đoàn kết luôn! 🔥`;
          }
          return '👥 Lớp A1 có 43 thành viên nha!';
        }

        // BIRTHDAY TODAY — Sinh nhật hôm nay
        if ((text.includes('sinh nhật') && (text.includes('hôm') || text.includes('nay'))) || text.includes('sinh nhật ai')) {
          if (typeof members !== 'undefined') {
            const today = new Date();
            const todayStr = String(today.getDate()).padStart(2,'0') + '/' + String(today.getMonth()+1).padStart(2,'0');
            const bdayMember = members.find(m => {
              if (!m.dob || m.dob === '🔐...') return false;
              const parts = m.dob.split('/');
              if (parts.length < 2) return false;
              return (parts[0].padStart(2,'0') + '/' + parts[1].padStart(2,'0')) === todayStr;
            });
            if (bdayMember) {
              return `🎂🎉 **Hôm nay là sinh nhật của ${bdayMember.name}!** 🎉🎉\nChúc mừng sinh nhật bạn nha! Tuổi mới học giỏi, vui vẻ và tỏa sáng nhé! 🥳🎈💫`;
            }
          }
          return '📅 Hôm nay không có ai sinh nhật trong lớp mình. Nhưng ngày nào cũng vui như sinh nhật nhé! 😄';
        }

        // MEMBER LOOKUP — Tra cứu thành viên
        if (typeof members !== 'undefined' && (inputLower.includes('ai là') || inputLower.includes('là ai') || inputLower.includes('tra cứu') || inputLower.includes('tra cuu'))) {
          // Extract potential name after keywords
          const whoMatch = inputLower.match(/(?:ai là|tra cứu|tra cuu)\s+(.+)/i);
          if (whoMatch) {
            const searchName = whoMatch[1].trim();
            const found = members.find(m => m.name.toLowerCase().includes(searchName));
            if (found) {
              const nick = found.nick && found.nick !== '...' && found.nick !== '🔐...' ? ` · Biệt danh: "${found.nick}"` : '';
              const dob = found.dob && found.dob !== '🔐...' ? `🎂 ${found.dob}` : '';
              return `🎯 **${found.name}**\n${dob} ${nick}\n\n💡 Click vào tên trong danh sách để xem profile nhé!`;
            }
            return `🤔 Mình không tìm thấy ai tên "${searchName}" trong lớp. Bạn thử kiểm tra lại tên nhé!`;
          }
        }

        // TEACHER INFO — Giáo viên chủ nhiệm
        if (text.includes('cô chủ nhiệm') || text.includes('cô giáo') || text.includes('cô linh') || text.includes('gvcn') || text.includes('giáo viên') || text.includes('chủ nhiệm') || text.includes('linh sử')) {
          if (typeof members !== 'undefined' && members.length > 0) {
            const teacher = members[0];
            return `👩‍🏫 **${teacher.name}** — Giáo viên chủ nhiệm lớp A1\n📅 ${teacher.dob}\n${teacher.nick && teacher.nick !== '...' ? '✨ '+teacher.nick : '✨ Cô chủ nhiệm đáng kính của tụi mình!'}`;
          }
          return '👩‍🏫 Cô giáo chủ nhiệm — Nguyễn Thùy Linh (Linh Sử) ❤️';
        }

        // Keyword Rules (existing)
        if (text.includes('hello') || text.includes('hi') || text.includes('chào')) {
            return 'Hế lô bồ! A1 Bot đẹp trai nhất lớp đã sẵn sàng "tiếp chiêu"! 👋';
        }
        if (text.includes('tên gì') || text.includes('là ai')) {
            return 'Mình là A1 Bot - Trợ lý siêu cấp vip pro của lớp A1 đây! 😎';
        }
        if (text.includes('lớp trưởng') || text.includes('gia linh')) {
            return 'Lớp trưởng Trần Gia Linh á? Đỉnh cao Wushu luôn nhé, đừng đùa! 🥋💪';
        }
        if (text.includes('thúy an') || text.includes('creator')) {
            return 'Thúy An là "mẹ đẻ" của mình đó, xịn chưa! ✨';
        }
        if (text.includes('khánh') || text.includes('dev')) {
            return 'Dev Khánh là người "thổi hồn" code cho mình nè, siêu cấp đẹp trai! 😂';
        }
        if (text.includes('yêu') || text.includes('thích')) {
            return 'Hehe, A1 là gia đình, ai mình cũng yêu hết! ❤️';
        }
        if (text.includes('cảm ơn') || text.includes('thanks') || text.includes('thank')) {
            return 'Không có gì đâu bồ ơi! 😊 Cần gì cứ hỏi A1 Bot nha! 🫶';
        }
        if (text.includes('tạm biệt') || text.includes('bye') || text.includes('goodbye')) {
            return 'Tạm biệt bồ! Hẹn gặp lại ở lớp A1 nha! 👋😄';
        }

        return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
    }

    // EVENT LISTENERS
    botLauncher.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
    sendBtn.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatContainer.classList.contains('active')) {
            toggleChat();
        }
    });

    // SUGGESTION CHIPS — Click to send quick message
    document.querySelectorAll('#chatChips .chip').forEach(chip => {
        chip.addEventListener('click', function() {
            const msg = this.dataset.msg;
            if (!msg) return;
            userInput.value = msg;
            handleSendMessage();
        });
    });
});
