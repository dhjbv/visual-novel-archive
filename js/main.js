// ===== 互动影游档案馆 - 主脚本 =====

// ===== 爱心粒子 =====
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let hearts = [];
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  
  class Heart {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.size = Math.random() * 5 + 2;
      this.speed = Math.random() * 0.4 + 0.15;
      this.opacity = Math.random() * 0.3 + 0.05;
      this.drift = Math.random() * 0.4 - 0.2;
    }
    update() {
      this.y -= this.speed;
      this.x += this.drift + Math.sin(this.y * 0.01) * 0.2;
      if (this.y < -20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.size / 8, this.size / 8);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#e8a0bf';
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.bezierCurveTo(-4, -1, -8, 2, 0, 6);
      ctx.bezierCurveTo(8, 2, 4, -1, 0, 2);
      ctx.fill();
      ctx.restore();
    }
  }
  
  for (let i = 0; i < 20; i++) hearts.push(new Heart());
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => { h.update(); h.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== 游戏数据 =====
const GAMES = [
  {
    id: 'xingfu',
    icon: '🌸',
    name: '我只是想让她们都幸福',
    short: '只想她们都幸福',
    desc: '一款恋爱互动影游，包含丰富的剧情分支与角色互动。',
    resources: {
      '视频': { icon: '🎬', count: 447, size: '43.3GB', note: 'MP4 格式' },
      '音乐': { icon: '🎵', count: 62, size: '263MB', note: 'WAV 格式' },
      '剧本': { icon: '📜', count: 258, size: '8MB', note: 'TXT 文本' },
      '图片': { icon: '🖼️', count: 90, size: '~20MB', note: 'PNG 格式' },
    }
  },
  {
    id: 'cycle',
    icon: '♾️',
    name: 'The Cycle of Fate',
    short: '命运轮回',
    desc: '国产悬疑恋爱互动游戏，多线剧情，命运抉择。',
    resources: {
      '视频': { icon: '🎬', count: 921, size: '53.7GB', note: 'MP4 格式' },
      '音乐': { icon: '🎵', count: 86, size: '~2GB', note: 'WAV 格式' },
      '图片': { icon: '🖼️', count: 2636, size: '~1.5GB', note: 'PNG 格式' },
    }
  },
  {
    id: 'intiny',
    icon: '🎭',
    name: 'intiny HD6 / 完蛋2',
    short: '完蛋2',
    desc: '真人互动影像游戏，第一人称沉浸式恋爱体验。',
    resources: {
      '视频': { icon: '🎬', count: 482, size: '31.7GB', note: 'WebM 格式' },
      '视频(2K)': { icon: '🎬', count: 130, size: '~10GB', note: 'WebM 格式' },
      '图片': { icon: '🖼️', count: 773, size: '~300MB', note: 'PNG 格式' },
      '音乐': { icon: '🎵', count: 122, size: '~500MB', note: 'WAV 格式' },
    }
  },
  {
    id: 'flam',
    icon: '🔥',
    name: 'FLAM EVAW',
    short: 'FLAM',
    desc: 'Unity 引擎制作的互动剧情游戏。',
    resources: {
      '视频': { icon: '🎬', count: 573, size: '31.7GB', note: 'MP4 格式' },
      'BGM': { icon: '🎵', count: 544, size: '4.8GB', note: 'WAV 格式' },
      '语音': { icon: '🎤', count: 554, size: '4.6GB', note: 'WAV 格式' },
      '图片': { icon: '🖼️', count: 317, size: '~300MB', note: 'PNG 格式' },
    }
  }
];

// ===== 渲染首页 =====
function renderHome() {
  const grid = document.getElementById('gameList');
  if (!grid) return;
  
  grid.innerHTML = GAMES.map(g => {
    const stats = Object.entries(g.resources).map(([k, v]) =>
      `<span>${v.icon} ${k} ${v.count}</span>`
    ).join('');
    
    return `
      <div class="game-card" onclick="location.href='games/${g.id}.html'">
        <div class="icon">${g.icon}</div>
        <h3>${g.name}</h3>
        <div class="desc">${g.desc}</div>
        <div class="stats">${stats}</div>
        <div class="enter">→</div>
      </div>
    `;
  }).join('');
}

renderHome();
