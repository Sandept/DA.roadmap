// ===== STATE =====
let progress = JSON.parse(localStorage.getItem('da-progress') || '{}');
let activeDay = null;
let currentNoteDay = 'global';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderRoadmap();
  updateStats();
  bindSidebar();
  bindNotesPanel(); // New Notes binding
  bindVideoPanel(); // New Video binding
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

  // Resources section removed per user request

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
  document.getElementById('sb-learning').addEventListener('click', () => setStatus('learning'));
  document.getElementById('sb-done').addEventListener('click', () => setStatus('done'));
  document.getElementById('sb-skip').addEventListener('click', () => setStatus('skip'));
  const sbNotesBtn = document.getElementById('sb-notes-btn');
  if (sbNotesBtn) {
    sbNotesBtn.addEventListener('click', () => {
      if (activeDay) {
        const dayToOpen = activeDay; // Save it before closeSidebar clears it
        closeSidebar();
        setTimeout(() => window.openNotes(dayToOpen), 300);
      }
    });
  }
  
  const sbVideoBtn = document.getElementById('sb-video-btn');
  if (sbVideoBtn) {
    sbVideoBtn.addEventListener('click', () => {
      if (activeDay) {
        const dayToOpen = activeDay;
        closeSidebar();
        setTimeout(() => window.openVideo(dayToOpen), 300);
      }
    });
  }
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

// ===== IndexedDB for Attachments =====
const DB_NAME = 'DataAnalystNotesDB';
const DB_VERSION = 1;
const STORE_NAME = 'attachments';

function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

async function saveAttachmentLocal(dayNum, file, base64Data) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.add({
      dayNum: dayNum,
      name: file.name,
      type: file.type,
      dataUrl: `data:${file.type};base64,${base64Data}`,
      timestamp: Date.now()
    });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getAttachmentsLocal(dayNum) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => {
      const all = req.result;
      // Because IndexedDB getAll doesn't filter easily, filter in memory
      resolve(all.filter(a => String(a.dayNum) === String(dayNum)));
    };
    req.onerror = () => reject(req.error);
  });
}

async function deleteAttachmentLocal(id) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

  async function renderAttachments() {
    const gallery = document.getElementById('attachments-gallery');
    if (!gallery) return;
    gallery.innerHTML = '<span style="font-size: 12px; color: var(--gray600);">Loading notes...</span>';
    
    try {
      // Get remote attachments (from GDrive) and local (if any)
      let items = [];
      if (typeof remoteAttachments !== 'undefined' && remoteAttachments.length > 0) {
        // Filter remote files for this day based on filename prefix e.g. "[Day 1]"
        const prefix = currentNoteDay === 'global' ? '[Global]' : `[Day ${currentNoteDay}]`;
        items = remoteAttachments.filter(a => a.name.startsWith(prefix) && !a.name.includes('_VIDEOLINK_') && !a.name.includes('_TEXTNOTE_'));
      }
      
      const localItems = await getAttachmentsLocal(currentNoteDay);
      // Merge unique by normalized name (stripping prefixes like [Day 1])
      const allItems = [...items, ...localItems].reduce((acc, curr) => {
        const normalizedCurrName = curr.name.replace(/\[.*?\]\s*/, '');
        if (!acc.find(i => i.name.replace(/\[.*?\]\s*/, '') === normalizedCurrName)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      gallery.innerHTML = '';
      if (allItems.length === 0) {
        gallery.innerHTML = '<span style="font-size: 12px; color: var(--gray400);">No notes available for this topic yet.</span>';
        return;
      }
      
      allItems.forEach(item => {
        const div = document.createElement('div');
        div.style = 'display: flex; align-items: center; justify-content: space-between; background: var(--gray100); padding: 8px; border-radius: 6px; border: 1px solid var(--gray200); transition: all 0.2s;';
        
        const left = document.createElement('div');
        left.style = 'display: flex; align-items: center; gap: 8px; overflow: hidden; cursor: pointer; flex: 1;';
        
        const isImage = (item.mimeType && item.mimeType.startsWith('image/')) || (item.type && item.type.startsWith('image/'));
        
        if (isImage && item.dataUrl) {
          const img = document.createElement('img');
          img.src = item.dataUrl;
          img.style = 'width: 40px; height: 40px; object-fit: cover; border-radius: 4px;';
          left.appendChild(img);
        } else {
          const icon = document.createElement('div');
          icon.textContent = isImage ? '🖼️' : (item.name.includes('.pdf') ? '📕' : '📄');
          icon.style = 'font-size: 24px; width: 40px; text-align: center;';
          left.appendChild(icon);
        }
        
        const name = document.createElement('span');
        name.textContent = item.name.replace(/\[.*?\]\s*/, ''); // hide prefix
        name.style = 'font-size: 13px; font-weight: 700; color: var(--blue); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
        left.appendChild(name);
        
        // Open Viewer Modal on click
        left.onclick = () => {
          document.getElementById('viewer-title').textContent = name.textContent;
          // Use Google Drive preview URL if available, otherwise local data URL
          const viewUrl = item.url ? item.url.replace('/view', '/preview') : item.dataUrl;
          document.getElementById('viewer-iframe').src = viewUrl;
          
          const downloadBtn = document.getElementById('viewer-download');
          if (downloadBtn) {
            if (item.id) {
              downloadBtn.href = `https://drive.google.com/uc?export=download&id=${item.id}`;
              downloadBtn.download = '';
              downloadBtn.style.display = 'inline-block';
            } else if (item.dataUrl) {
              downloadBtn.href = item.dataUrl;
              downloadBtn.download = name.textContent;
              downloadBtn.style.display = 'inline-block';
            } else {
              downloadBtn.style.display = 'none';
            }
          }
          
          document.getElementById('viewer-overlay').classList.remove('hidden');
          document.getElementById('viewer-modal').style.display = 'flex';
        };
        
        div.appendChild(left);
        
        // Only show delete for admin
        if (window.isAdmin) {
          const delBtn = document.createElement('button');
          delBtn.textContent = '🗑';
          delBtn.title = 'Delete File';
          delBtn.style = 'background: none; border: none; cursor: pointer; color: var(--red); font-size: 14px; margin-left: 10px;';
          delBtn.onclick = async (e) => {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this file completely?")) {
              delBtn.textContent = '⏳';
              
              if (typeof item.id === 'string') {
                // It's a Google Drive file
                try {
                  await fetch(WEB_APP_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({ action: 'delete', fileId: item.id }),
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' }
                  });
                  // Remove from remoteAttachments UI immediately
                  if (typeof remoteAttachments !== 'undefined') {
                    remoteAttachments = remoteAttachments.filter(a => a.id !== item.id);
                  }
                } catch(err) { console.error(err); }
              } else if (item.id) {
                // It's a local IndexedDB file
                await deleteAttachmentLocal(item.id);
              }
              
              renderAttachments();
            }
          };
          div.appendChild(delBtn);
        }
        
        div.onmouseenter = () => div.style.background = '#e2e8f0';
        div.onmouseleave = () => div.style.background = 'var(--gray100)';
        
        gallery.appendChild(div);
      });
    } catch (e) {
      gallery.innerHTML = '<span style="font-size: 12px; color: var(--red);">Error loading notes.</span>';
      console.error(e);
    }
  }

window.openNotes = function(dayNum = 'global') {
  currentNoteDay = dayNum;
  const notesPanel = document.getElementById('notes-panel');
  const notesOverlay = document.getElementById('notes-overlay');
  const notesTextarea = document.getElementById('notes-text');
  const notesDisplay = document.getElementById('notes-text-display');
  const notesTitle = document.getElementById('notes-title');
  const uploadSection = document.getElementById('upload-section');
  const saveDescBtn = document.getElementById('save-desc-btn');
  const descStatus = document.getElementById('desc-save-status');
  
  if (notesTitle) {
    notesTitle.textContent = `📝 Notes for Day ${dayNum}`;
  }
  
  // Find cloud-synced description from remoteAttachments
  const prefix = dayNum === 'global' ? '[Global]' : `[Day ${dayNum}]`;
  const textNoteFile = remoteAttachments.find(a => a.name.startsWith(prefix) && a.name.includes('_TEXTNOTE_'));
  let cloudText = '';
  if (textNoteFile) {
    // Extract the text from the filename: "[Day 1] _TEXTNOTE_Written notes of Introduction."
    cloudText = textNoteFile.name.split('_TEXTNOTE_')[1] ? textNoteFile.name.split('_TEXTNOTE_')[1].trim() : '';
  }
  
  // Fallback to localStorage (for backward compatibility / admin draft)
  const localText = localStorage.getItem('da-notes-' + dayNum) || '';
  const displayText = cloudText || localText;
  
  if (window.isAdmin) {
    if (notesTextarea) {
      notesTextarea.value = cloudText || localText;
      notesTextarea.style.display = 'block';
    }
    if (notesDisplay) notesDisplay.style.display = 'none';
    if (uploadSection) uploadSection.style.display = 'flex';
    if (saveDescBtn) saveDescBtn.style.display = 'inline-block';
    if (descStatus) descStatus.style.display = 'none';
  } else {
    if (notesTextarea) notesTextarea.style.display = 'none';
    if (uploadSection) uploadSection.style.display = 'none';
    if (saveDescBtn) saveDescBtn.style.display = 'none';
    if (descStatus) descStatus.style.display = 'none';
    if (notesDisplay) {
      if (displayText.trim() === '') {
        notesDisplay.style.display = 'none';
      } else {
        notesDisplay.textContent = displayText;
        notesDisplay.style.display = 'block';
      }
    }
  }
  
  // Always refresh remote notes when opening to ensure latest files are fetched across devices
  fetchRemoteNotes();
  
  renderAttachments();
  
  notesOverlay.classList.remove('hidden');
  notesPanel.classList.remove('hidden');
  requestAnimationFrame(() => notesPanel.classList.add('visible'));
};

// ===== NOTES PANEL BINDING =====
let remoteAttachments = [];
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzS87l9uQJyCMVP2HybIZjbxAUdzbOggbBEdSEJpASGYnMgQAQhVHoWavR04ZSbbRBH2Q/exec';

function fetchRemoteNotes() {
  fetch(WEB_APP_URL + "?action=list")
    .then(res => res.json())
    .then(data => {
      remoteAttachments = data;
      if (document.getElementById('notes-panel').classList.contains('visible')) {
        renderAttachments();
      }
    })
    .catch(err => console.error("Could not fetch remote notes.", err));
}

function bindNotesPanel() {
  // Fetch immediately on load
  fetchRemoteNotes();

  const notesClose = document.getElementById('notes-close');
  const notesOverlay = document.getElementById('notes-overlay');
  const uploadBtn = document.getElementById('upload-notes-btn');
  const notesTextarea = document.getElementById('notes-text');
  const notesTitle = document.getElementById('notes-title');

  // Secret Admin Toggle
  window.isAdmin = false;
  if (notesTitle) {
    notesTitle.addEventListener('dblclick', () => {
      if (!window.isAdmin) {
        const pass = prompt('Enter Author Password to unlock Uploads:');
        if (pass === 'admin') { // Simple local password for author
          window.isAdmin = true;
          alert('Author Mode Unlocked! You can now upload and edit notes.');
          window.openNotes(currentNoteDay); // Refresh panel
        }
      } else {
        window.isAdmin = false;
        alert('Author Mode Locked.');
        window.openNotes(currentNoteDay);
      }
    });
  }

  // Viewer Modal Bindings
  const viewerClose = document.getElementById('viewer-close');
  const viewerOverlay = document.getElementById('viewer-overlay');
  const viewerModal = document.getElementById('viewer-modal');
  
  function closeViewer() {
    viewerModal.style.display = 'none';
    viewerOverlay.classList.add('hidden');
    document.getElementById('viewer-iframe').src = '';
  }
  
  if (viewerClose) viewerClose.addEventListener('click', closeViewer);
  if (viewerOverlay) viewerOverlay.addEventListener('click', closeViewer);

  if (notesTextarea) {
    notesTextarea.addEventListener('input', (e) => {
      if (window.isAdmin) {
        localStorage.setItem('da-notes-' + currentNoteDay, e.target.value);
      }
    });
  }

  // Save Description to Cloud
  const saveDescBtn = document.getElementById('save-desc-btn');
  if (saveDescBtn) {
    saveDescBtn.addEventListener('click', async () => {
      const descText = document.getElementById('notes-text').value.trim();
      const statusDiv = document.getElementById('desc-save-status');
      statusDiv.style.display = 'block';
      
      if (!descText) {
        statusDiv.textContent = 'Please write a description first.';
        statusDiv.style.color = 'var(--red)';
        return;
      }
      
      statusDiv.textContent = 'Saving description to cloud...';
      statusDiv.style.color = 'var(--blue)';
      saveDescBtn.disabled = true;
      
      // Delete any existing _TEXTNOTE_ for this day
      const prefix = currentNoteDay === 'global' ? '[Global]' : `[Day ${currentNoteDay}]`;
      const existing = remoteAttachments.filter(a => a.name.startsWith(prefix) && a.name.includes('_TEXTNOTE_'));
      for (const ex of existing) {
        if (ex.id) {
          try {
            await fetch(WEB_APP_URL, {
              method: 'POST',
              mode: 'no-cors',
              body: JSON.stringify({ action: 'delete', fileId: ex.id }),
              headers: { 'Content-Type': 'text/plain;charset=utf-8' }
            });
          } catch (e) {}
        }
      }
      
      // Upload new text note
      const payload = {
        base64: btoa("text_note"),
        filename: `${prefix} _TEXTNOTE_${descText}`,
        mimeType: 'text/plain'
      };
      
      try {
        await fetch(WEB_APP_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
        
        setTimeout(() => {
          statusDiv.textContent = '✅ Description saved to cloud! Visible on all devices.';
          statusDiv.style.color = 'green';
          fetch(WEB_APP_URL + "?action=list")
            .then(res => res.json())
            .then(data => {
              remoteAttachments = data;
            });
        }, 1500);
      } catch (err) {
        console.error(err);
        statusDiv.textContent = 'Error saving description.';
        statusDiv.style.color = 'var(--red)';
      }
      saveDescBtn.disabled = false;
    });
  }

  function closeNotes() {
    const notesPanel = document.getElementById('notes-panel');
    notesPanel.classList.remove('visible');
    setTimeout(() => {
      notesPanel.classList.add('hidden');
      notesOverlay.classList.add('hidden');
    }, 300);
  }

  if (notesClose) notesClose.addEventListener('click', closeNotes);
  if (notesOverlay) notesOverlay.addEventListener('click', closeNotes);
  
  // File Upload Logic
  if (uploadBtn) {
    uploadBtn.addEventListener('click', async () => {
      const fileInput = document.getElementById('notes-file');
      const statusDiv = document.getElementById('upload-status');
      
      if (fileInput.files.length === 0) {
        statusDiv.textContent = 'Please select a file first.';
        statusDiv.className = 'upload-status error';
        return;
      }

      statusDiv.textContent = 'Preparing upload...';
      statusDiv.className = 'upload-status';

      const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzS87l9uQJyCMVP2HybIZjbxAUdzbOggbBEdSEJpASGYnMgQAQhVHoWavR04ZSbbRBH2Q/exec';
      
      const files = Array.from(fileInput.files);
      let successCount = 0;

      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          statusDiv.textContent = `Uploading file ${i + 1} of ${files.length}...`;
          
          const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = err => reject(err);
            reader.readAsDataURL(file);
          });
          
          const payload = {
            base64: base64Data,
            filename: `[${currentNoteDay === 'global' ? 'Global' : 'Day ' + currentNoteDay}] ${file.name}`,
            mimeType: file.type || 'application/octet-stream'
          };
          
          let uploadSucceeded = false;
          try {
            await fetch(WEB_APP_URL, {
              method: 'POST',
              mode: 'no-cors', // Avoids failing on opaque JSON response from Google
              body: JSON.stringify(payload),
              headers: {
                'Content-Type': 'text/plain;charset=utf-8'
              }
            });
            uploadSucceeded = true;
          } catch (e) {
            console.error('Fetch error:', e);
          }

          if (uploadSucceeded) {
            successCount++;
            await saveAttachmentLocal(currentNoteDay, file, base64Data);
          }
        }
        
        if (successCount === files.length) {
          statusDiv.textContent = `Successfully saved ${successCount} file(s)!`;
          statusDiv.className = 'upload-status success';
          fileInput.value = ''; // Reset input
          renderAttachments();
        } else if (successCount > 0) {
          statusDiv.textContent = `Partially saved ${successCount}/${files.length} files.`;
          statusDiv.className = 'upload-status error';
          renderAttachments();
        } else {
          statusDiv.textContent = 'Upload failed. Please try again.';
          statusDiv.className = 'upload-status error';
        }
      } catch (error) {
        statusDiv.textContent = 'Error during upload.';
        statusDiv.className = 'upload-status error';
        console.error('Upload error:', error);
      }
    });
  }
}

window.openVideo = function(dayNum) {
  const videoOverlay = document.getElementById('video-overlay');
  const videoModal = document.getElementById('video-modal');
  const videoTitle = document.getElementById('video-title');
  const videoAdminSection = document.getElementById('video-admin-section');
  const videoListContainer = document.getElementById('video-list-container');
  const videoEmptyState = document.getElementById('video-empty-state');
  const videoLinkInput = document.getElementById('video-link-input');
  const videoStatus = document.getElementById('video-status');
  const videoCount = document.getElementById('video-count');
  
  currentNoteDay = dayNum;
  if (videoTitle) videoTitle.textContent = `🎥 Videos for Day ${dayNum}`;
  if (videoStatus) {
    if (window.location.protocol === 'file:') {
      videoStatus.innerHTML = '⚠️ YouTube blocks embeds on local files (Error 153). Run a local server to view videos.';
      videoStatus.style.color = 'var(--red)';
    } else {
      videoStatus.textContent = '';
    }
  }
  
  if (window.isAdmin) {
    videoAdminSection.style.display = 'block';
  } else {
    videoAdminSection.style.display = 'none';
  }
  
  // Find ALL video links for this day from remoteAttachments
  const prefix = `[Day ${dayNum}]`;
  const videoFiles = remoteAttachments.filter(a => a.name.startsWith(prefix) && a.name.includes('_VIDEOLINK_'));
  
  // Clear previous video list
  videoListContainer.innerHTML = '';
  
  if (videoFiles.length > 0) {
    videoEmptyState.style.display = 'none';
    
    videoFiles.forEach((vf, index) => {
      const rawUrl = vf.name.split('_VIDEOLINK_')[1] ? vf.name.split('_VIDEOLINK_')[1].trim() : '';
      if (!rawUrl) return;
      
      const embedUrl = getEmbedUrl(rawUrl);
      
      // Create video card
      const card = document.createElement('div');
      card.style.cssText = 'margin-bottom: 16px; border: 1px solid var(--gray200); border-radius: 10px; overflow: hidden; background: var(--gray100);';
      
      // Card header with number and remove button
      const cardHeader = document.createElement('div');
      cardHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--white); border-bottom: 1px solid var(--gray200);';
      
      const label = document.createElement('span');
      label.style.cssText = 'font-size: 13px; font-weight: 700; color: var(--gray600); font-family: var(--font);';
      label.textContent = `📹 Video ${index + 1}`;
      cardHeader.appendChild(label);
      
      if (window.isAdmin) {
        const removeBtn = document.createElement('button');
        removeBtn.style.cssText = 'background: var(--red); color: white; border: none; padding: 4px 12px; border-radius: 5px; cursor: pointer; font-size: 12px; font-weight: bold; font-family: var(--font);';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', async () => {
          if (confirm(`Remove Video ${index + 1}?`)) {
            removeBtn.textContent = '⏳';
            try {
              if (vf.id) {
                await fetch(WEB_APP_URL, {
                  method: 'POST',
                  mode: 'no-cors',
                  body: JSON.stringify({ action: 'delete', fileId: vf.id }),
                  headers: { 'Content-Type': 'text/plain;charset=utf-8' }
                });
                remoteAttachments = remoteAttachments.filter(a => a.id !== vf.id);
              }
              window.openVideo(dayNum); // Refresh
            } catch (err) {
              console.error(err);
              removeBtn.textContent = 'Error';
            }
          }
        });
        cardHeader.appendChild(removeBtn);
      }
      
      card.appendChild(cardHeader);
      
      // iframe player
      const playerWrap = document.createElement('div');
      playerWrap.style.cssText = 'width: 100%; aspect-ratio: 16/9; background: #000;';
      
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.src = embedUrl;
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.border = 'none';
      iframe.setAttribute('loading', 'lazy');
      
      playerWrap.appendChild(iframe);
      card.appendChild(playerWrap);
      
      videoListContainer.appendChild(card);
    });
    
    if (videoCount) videoCount.textContent = `${videoFiles.length} of 10 videos added`;
  } else {
    videoEmptyState.style.display = 'block';
    if (videoCount) videoCount.textContent = '0 of 10 videos added';
  }
  
  // Clear input for next add
  if (videoLinkInput) videoLinkInput.value = '';
  
  // Always fetch to ensure we have latest remote data
  fetchRemoteNotes();
  
  videoOverlay.classList.remove('hidden');
  videoModal.classList.remove('hidden');
  videoModal.style.display = 'flex';
};

function getEmbedUrl(url) {
  let embedUrl = url;
  let v = null;
  if (url.includes('youtube.com/watch')) {
    try {
      const urlObj = new URL(url);
      v = urlObj.searchParams.get('v');
    } catch (e) {}
  } else if (url.includes('youtu.be/')) {
    v = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('youtube.com/embed/')) {
    v = url.split('youtube.com/embed/')[1].split('?')[0];
  } else if (url.includes('youtube-nocookie.com/embed/')) {
    v = url.split('youtube-nocookie.com/embed/')[1].split('?')[0];
  }
  
  if (v) {
    embedUrl = `https://www.youtube.com/embed/${v.trim()}`;
  }
  return embedUrl;
}

function bindVideoPanel() {
  const videoClose = document.getElementById('video-close');
  const videoOverlay = document.getElementById('video-overlay');
  const videoModal = document.getElementById('video-modal');
  const videoSaveBtn = document.getElementById('video-save-btn');
  
  function closeVideo() {
    videoModal.style.display = 'none';
    videoOverlay.classList.add('hidden');
    // Stop all iframes
    const iframes = document.getElementById('video-list-container').querySelectorAll('iframe');
    iframes.forEach(f => f.src = '');
  }
  
  if (videoClose) videoClose.addEventListener('click', closeVideo);
  if (videoOverlay) videoOverlay.addEventListener('click', closeVideo);
  
  if (videoSaveBtn) {
    videoSaveBtn.addEventListener('click', async () => {
      const input = document.getElementById('video-link-input');
      const statusDiv = document.getElementById('video-status');
      const url = input.value.trim();
      
      if (!url) {
        statusDiv.textContent = 'Please enter a URL.';
        statusDiv.style.color = 'var(--red)';
        return;
      }
      
      // Check current count
      const prefix = `[Day ${currentNoteDay}]`;
      const existingVideos = remoteAttachments.filter(a => a.name.startsWith(prefix) && a.name.includes('_VIDEOLINK_'));
      if (existingVideos.length >= 10) {
        statusDiv.textContent = 'Maximum 10 videos reached. Remove one first.';
        statusDiv.style.color = 'var(--red)';
        return;
      }
      
      statusDiv.textContent = 'Saving video...';
      statusDiv.style.color = 'var(--blue)';
      videoSaveBtn.disabled = true;
      
      const timestamp = Date.now();
      const payload = {
        base64: btoa("video_link"),
        filename: `[Day ${currentNoteDay}] _VIDEOLINK_${url}`,
        mimeType: 'text/plain'
      };
      
      try {
        await fetch(WEB_APP_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
        
        setTimeout(() => {
          statusDiv.textContent = 'Saved! Refreshing...';
          statusDiv.style.color = 'green';
          fetch(WEB_APP_URL + "?action=list")
            .then(res => res.json())
            .then(data => {
              remoteAttachments = data;
              window.openVideo(currentNoteDay);
            });
        }, 1500);
      } catch (err) {
        console.error(err);
        statusDiv.textContent = 'Error saving.';
        statusDiv.style.color = 'var(--red)';
      }
      videoSaveBtn.disabled = false;
    });
  }
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
