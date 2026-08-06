// ===== STATE =====
let progress = JSON.parse(localStorage.getItem('da-progress') || '{}');
let activeDay = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderRoadmap();
  updateStats();
  bindSidebar();
  setTimeout(drawConnections, 400);
  window.addEventListener('resize', debounce(drawConnections, 200));
});

// ===== ROADMAP RENDER =====
function renderRoadmap() {
  const content = document.getElementById('roadmap-content');
  content.innerHTML = '';
  SECTIONS.forEach(sec => {
    const section = el('div', 'rm-section');
    section.id = 'section-' + sec.id;
    const label = el('div', 'rm-section-label');
    label.textContent = sec.label;
    section.appendChild(label);
    if (sec.layout === 'foundation') renderFoundation(section, sec);
    else if (sec.layout === 'analysis') renderAnalysis(section, sec);
    else if (sec.layout === 'advanced') renderAdvanced(section, sec);
    else renderHorizontal(section, sec);
    content.appendChild(section);
  });
}

function renderFoundation(section) {
  const r1 = el('div', 'rm-row center');
  r1.appendChild(makeNode(1));
  section.appendChild(r1);
  const r2 = el('div', 'rm-row');
  r2.appendChild(makeGroupNode(2));
  r2.appendChild(makeGroupNode(3));
  section.appendChild(r2);
  const r3 = el('div', 'rm-row');
  r3.appendChild(makeGroupNode(5));
  r3.appendChild(makeNode(4));
  section.appendChild(r3);
}

function renderAnalysis(section) {
  const r1 = el('div', 'rm-row');
  r1.appendChild(makeGroupNode(11));
  r1.appendChild(makeGroupNode(12));
  section.appendChild(r1);
  const r2 = el('div', 'rm-row center');
  r2.appendChild(makeGroupNode(13));
  section.appendChild(r2);
  const sub = el('div', 'rm-section-sublabel');
  sub.textContent = 'Learn to analyze relationships and make data driven decisions';
  section.appendChild(sub);
  const r3 = el('div', 'rm-row center');
  r3.appendChild(makeGroupNode(14));
  section.appendChild(r3);
}

function renderAdvanced(section) {
  const r1 = el('div', 'rm-row');
  r1.appendChild(makeGroupNode(15));
  r1.appendChild(makeGroupNode(16));
  section.appendChild(r1);
  const r2 = el('div', 'rm-row center');
  r2.appendChild(makeGroupNode(17));
  section.appendChild(r2);
  const r3 = el('div', 'rm-row');
  r3.appendChild(makeGroupNode(18));
  r3.appendChild(makeGroupNode(19));
  section.appendChild(r3);
}

function renderHorizontal(section, sec) {
  const row = el('div', 'rm-row');
  sec.days.forEach(d => row.appendChild(makeGroupNode(d)));
  section.appendChild(row);
}

// ===== NODE BUILDERS =====
function makeNode(dayNum) {
  const data = ROADMAP_DAYS[dayNum - 1];
  const node = el('div', 'rm-node ' + data.color);
  node.dataset.day = dayNum;
  node.id = 'node-' + dayNum;
  if (progress[dayNum]) node.classList.add('status-' + progress[dayNum]);
  const dayLabel = el('span', 'day-label');
  dayLabel.textContent = 'Day ' + dayNum;
  node.appendChild(dayLabel);
  node.appendChild(document.createTextNode(data.title));
  node.addEventListener('click', () => openSidebar(dayNum));
  return node;
}

function makeGroupNode(dayNum) {
  const data = ROADMAP_DAYS[dayNum - 1];
  const group = el('div', 'rm-group');
  group.id = 'group-' + dayNum;
  applyGroupStatus(group, dayNum);

  const node = el('div', 'rm-node ' + data.color);
  node.dataset.day = dayNum;
  node.id = 'node-' + dayNum;
  if (progress[dayNum]) node.classList.add('status-' + progress[dayNum]);
  const dayLabel = el('span', 'day-label');
  dayLabel.textContent = 'Day ' + dayNum;
  node.appendChild(dayLabel);
  node.appendChild(document.createTextNode(data.title));
  node.addEventListener('click', () => openSidebar(dayNum));
  group.appendChild(node);

  const cols = data.topics.length > 4 ? 2 : 1;
  const grid = el('div', 'rm-grid cols-' + cols);
  const maxShow = Math.min(data.topics.length, 6);
  for (let i = 0; i < maxShow; i++) {
    const t = typeof data.topics[i] === 'object' ? data.topics[i].name : data.topics[i];
    const tn = el('div', 'rm-node ' + (data.color === 'blue' ? 'white' : 'orange'));
    tn.style.cursor = 'pointer';
    tn.textContent = t;
    tn.addEventListener('click', (e) => { e.stopPropagation(); openSidebar(dayNum); });
    grid.appendChild(tn);
  }
  if (data.topics.length > 6) {
    const more = el('div', 'rm-node white');
    more.textContent = '+' + (data.topics.length - 6) + ' more';
    more.style.cursor = 'pointer';
    more.style.fontStyle = 'italic';
    more.style.fontSize = '12px';
    more.addEventListener('click', (e) => { e.stopPropagation(); openSidebar(dayNum); });
    grid.appendChild(more);
  }
  group.appendChild(grid);
  return group;
}

function applyGroupStatus(group, dayNum) {
  group.classList.remove('group-done', 'group-skip', 'group-learning');
  const s = progress[dayNum];
  if (s === 'done') group.classList.add('group-done');
  else if (s === 'skip') group.classList.add('group-skip');
  else if (s === 'learning') group.classList.add('group-learning');
}

// ===== SIDEBAR =====
function openSidebar(dayNum) {
  activeDay = dayNum;
  const data = ROADMAP_DAYS[dayNum - 1];
  const overlay = document.getElementById('sidebar-overlay');
  const panel = document.getElementById('sidebar-panel');
  const body = document.getElementById('sidebar-body');
  updateStatusButtons(dayNum);
  body.innerHTML = '';

  const title = el('h2', 'sb-title');
  title.textContent = data.title;
  body.appendChild(title);

  const dayBadge = el('span', 'sb-day');
  dayBadge.textContent = '📅 Day ' + dayNum + ' of 21 — Week ' + Math.ceil(dayNum / 7);
  body.appendChild(dayBadge);

  const desc = el('p', 'sb-desc');
  desc.textContent = data.desc;
  body.appendChild(desc);

  // Detailed Topics
  const topicsTitle = el('div', 'sb-section-title');
  topicsTitle.textContent = '📋 Topics & Concepts to Learn';
  body.appendChild(topicsTitle);

  const topicsList = el('ul', 'sb-topics');
  data.topics.forEach(t => {
    const li = el('li');
    if (typeof t === 'object') {
      const strong = el('strong');
      strong.textContent = t.name;
      li.appendChild(strong);
      li.appendChild(document.createTextNode(t.detail));
      if (t.concepts) {
        const conceptDiv = el('div', 'concept-detail');
        conceptDiv.textContent = '💡 ' + t.concepts;
        li.appendChild(conceptDiv);
      }
    } else {
      li.textContent = t;
    }
    topicsList.appendChild(li);
  });
  body.appendChild(topicsList);

  // Resources
  if (data.resources && data.resources.length) {
    const resTitle = el('div', 'sb-section-title');
    resTitle.textContent = '🔗 Free Resources';
    body.appendChild(resTitle);
    const resList = el('ul', 'sb-resources');
    data.resources.forEach(r => {
      const li = el('li');
      const badge = el('span', 'sb-res-badge ' + r.type);
      badge.textContent = r.type;
      const link = el('a');
      link.textContent = r.title;
      link.href = r.url;
      link.target = '_blank';
      li.appendChild(badge);
      li.appendChild(link);
      resList.appendChild(li);
    });
    body.appendChild(resList);
  }

  overlay.classList.remove('hidden');
  panel.classList.remove('hidden');
  requestAnimationFrame(() => panel.classList.add('visible'));
}

function closeSidebar() {
  const overlay = document.getElementById('sidebar-overlay');
  const panel = document.getElementById('sidebar-panel');
  panel.classList.remove('visible');
  setTimeout(() => {
    panel.classList.add('hidden');
    overlay.classList.add('hidden');
  }, 300);
  activeDay = null;
}

function bindSidebar() {
  document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);
  document.getElementById('sb-close').addEventListener('click', closeSidebar);
  document.getElementById('sb-learning').addEventListener('click', () => setStatus('learning'));
  document.getElementById('sb-done').addEventListener('click', () => setStatus('done'));
  document.getElementById('sb-skip').addEventListener('click', () => setStatus('skip'));
}

function setStatus(status) {
  if (!activeDay) return;
  if (progress[activeDay] === status) delete progress[activeDay];
  else progress[activeDay] = status;
  saveProgress();
  // Re-render to update group colors
  renderRoadmap();
  updateStatusButtons(activeDay);
  updateStats();
  setTimeout(drawConnections, 300);
}

function updateStatusButtons(dayNum) {
  const s = progress[dayNum] || '';
  document.getElementById('sb-learning').classList.toggle('active', s === 'learning');
  document.getElementById('sb-done').classList.toggle('active', s === 'done');
  document.getElementById('sb-skip').classList.toggle('active', s === 'skip');
}

// ===== STATS =====
function updateStats() {
  const done = Object.values(progress).filter(v => v === 'done').length;
  const pct = Math.round((done / 21) * 100);
  document.getElementById('stat-completed').textContent = done;
  document.getElementById('stat-remaining').textContent = 21 - done;
  document.getElementById('stat-percent').textContent = pct + '%';
  document.getElementById('header-progress-bar').style.width = pct + '%';
  document.getElementById('header-progress-text').textContent = pct + '%';
}

// ===== CONNECTIONS (SVG) — CLEAN ORTHOGONAL FLOW =====
function drawConnections() {
  const svg = document.getElementById('connections-svg');
  const canvas = document.getElementById('roadmap-canvas');
  svg.setAttribute('width', canvas.scrollWidth);
  svg.setAttribute('height', canvas.scrollHeight);
  svg.innerHTML = '';
  const cRect = canvas.getBoundingClientRect();

  buildConnectionPairs().forEach(([fromId, toId, dashed]) => {
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);
    if (!fromEl || !toEl) return;
    const fR = fromEl.getBoundingClientRect();
    const tR = toEl.getBoundingClientRect();

    // Determine if nodes are roughly on the same vertical level (same row)
    const isSameRow = Math.abs(fR.top - tR.top) < 50;
    
    let x1, y1, x2, y2, d;

    if (isSameRow) {
      // Side-by-side connection (horizontal)
      if (fR.left < tR.left) {
        x1 = fR.right - cRect.left;
        y1 = fR.top + fR.height / 2 - cRect.top;
        x2 = tR.left - cRect.left;
        y2 = tR.top + tR.height / 2 - cRect.top;
      } else {
        x1 = fR.left - cRect.left;
        y1 = fR.top + fR.height / 2 - cRect.top;
        x2 = tR.right - cRect.left;
        y2 = tR.top + tR.height / 2 - cRect.top;
      }
      d = `M${x1},${y1} L${x2},${y2}`;
    } else {
      // Top-to-Bottom connection
      x1 = fR.left + fR.width / 2 - cRect.left;
      y1 = fR.bottom - cRect.top;
      x2 = tR.left + tR.width / 2 - cRect.left;
      y2 = tR.top - cRect.top;

      const dy = y2 - y1;
      const dx = x2 - x1;

      if (Math.abs(dx) < 10) {
        // Straight vertical
        d = `M${x1},${y1} L${x2},${y2}`;
      } else {
        // Orthogonal routing with rounded corners
        const midY = y1 + (dy / 2);
        const radius = Math.min(15, Math.abs(dx) / 2, Math.abs(dy) / 2);
        const dirX = dx > 0 ? 1 : -1;
        const dirY = dy > 0 ? 1 : -1;

        if (radius > 0) {
          d = `M${x1},${y1} ` +
              `L${x1},${midY - dirY * radius} ` +
              `Q${x1},${midY} ${x1 + dirX * radius},${midY} ` +
              `L${x2 - dirX * radius},${midY} ` +
              `Q${x2},${midY} ${x2},${midY + dirY * radius} ` +
              `L${x2},${y2}`;
        } else {
          d = `M${x1},${y1} L${x2},${y2}`;
        }
      }
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'conn-line' + (dashed ? ' dashed' : ''));
    svg.appendChild(path);
  });
}

function buildConnectionPairs() {
  return [
    // Foundation flow
    ['node-1', 'group-2', true],
    ['node-1', 'group-3', true],
    ['group-2', 'group-5', true],
    ['group-3', 'node-4', true],
    // Foundation → Programming
    ['group-5', 'group-6', true],
    ['node-4', 'group-6', false],
    // Programming flow
    ['group-6', 'group-7', true],
    ['group-7', 'group-8', true],
    // Programming → Data Handling
    ['group-8', 'group-9', true],
    ['group-9', 'group-10', false],
    // Data Handling → Analysis
    ['group-10', 'group-11', true],
    ['group-10', 'group-12', true],
    ['group-11', 'group-13', true],
    ['group-12', 'group-13', true],
    ['group-13', 'group-14', false],
    // Analysis → Advanced
    ['group-14', 'group-15', true],
    ['group-14', 'group-16', true],
    ['group-15', 'group-17', true],
    ['group-16', 'group-17', true],
    ['group-17', 'group-18', true],
    ['group-17', 'group-19', true],
    // Advanced → Next Steps
    ['group-18', 'group-20', true],
    ['group-19', 'group-20', true],
    ['group-20', 'group-21', false],
  ];
}

// ===== PERSISTENCE =====
function saveProgress() {
  localStorage.setItem('da-progress', JSON.stringify(progress));
}

// ===== HELPERS =====
function el(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}
function debounce(fn, ms) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}
