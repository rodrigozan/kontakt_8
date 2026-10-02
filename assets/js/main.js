const DEMOS = [
  { title: 'Demo 01 — [nome do patch]', sub: 'Pianos e Pads', src: 'assets/audio/demo-01.mp3' },
  { title: 'Demo 02 — [nome do patch]', sub: '[categoria]', src: 'assets/audio/demo-02.mp3' },
  { title: 'Demo 03 — [nome do patch]', sub: '[categoria]', src: 'assets/audio/demo-03.mp3' },
  { title: 'Demo 04 — [nome do patch]', sub: 'Synth Leads', src: 'assets/audio/demo-04.mp3' },
  { title: 'Demo 05 — [nome do patch]', sub: '[categoria]', src: 'assets/audio/demo-05.mp3' },
  { title: 'Demo 06 — [nome do patch]', sub: '[categoria]', src: 'assets/audio/demo-06.mp3' },
];

let activePlayer = null;

function buildDemoCard(demo, index) {
  const card = document.createElement('div');
  card.className = 'demo-card';

  const header = document.createElement('div');
  header.className = 'demo-header';

  const playBtn = document.createElement('button');
  playBtn.className = 'demo-play';
  playBtn.textContent = '▶';
  playBtn.setAttribute('aria-label', 'Tocar ' + demo.title);

  const titleWrap = document.createElement('div');
  const titleEl = document.createElement('div');
  titleEl.className = 'demo-title';
  titleEl.textContent = demo.title;
  const subEl = document.createElement('div');
  subEl.className = 'demo-sub';
  subEl.textContent = demo.sub;
  titleWrap.append(titleEl, subEl);

  header.append(playBtn, titleWrap);

  const waveformEl = document.createElement('div');
  waveformEl.className = 'demo-waveform';

  card.append(header, waveformEl);

  let wavesurfer = null;
  let loaded = false;

  function loadPlayer() {
    if (loaded) return;
    loaded = true;
    wavesurfer = WaveSurfer.create({
      container: waveformEl,
      waveColor: '#3A3A45',
      progressColor: '#E8A33D',
      height: 56,
      barWidth: 2,
      barGap: 2,
      cursorWidth: 0,
    });

    function showUnavailable() {
      waveformEl.innerHTML = '';
      const msg = document.createElement('div');
      msg.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100%;color:#9A99A6;font-size:0.75rem;';
      msg.textContent = 'Áudio indisponível — adicione o arquivo em ' + demo.src;
      waveformEl.appendChild(msg);
      playBtn.disabled = true;
      playBtn.style.opacity = '0.4';
    }

    wavesurfer.load(demo.src).catch(showUnavailable);
    wavesurfer.on('error', showUnavailable);

    wavesurfer.on('play', () => {
      playBtn.textContent = '❚❚';
      if (activePlayer && activePlayer !== wavesurfer) {
        activePlayer.pause();
      }
      activePlayer = wavesurfer;
    });

    wavesurfer.on('pause', () => {
      playBtn.textContent = '▶';
    });

    wavesurfer.on('finish', () => {
      playBtn.textContent = '▶';
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadPlayer();
        observer.disconnect();
      }
    });
  }, { rootMargin: '200px' });

  observer.observe(card);

  playBtn.addEventListener('click', () => {
    loadPlayer();
    if (wavesurfer) wavesurfer.playPause();
  });

  return card;
}

function renderDemos() {
  const grid = document.getElementById('demoGrid');
  if (!grid) return;
  DEMOS.forEach((demo, index) => {
    grid.appendChild(buildDemoCard(demo, index));
  });
}

function setupFaq() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

function setupIncluded() {
  document.querySelectorAll('#includedGrid .included-card').forEach((card) => {
    const list = card.querySelector('.included-list');
    const toggle = card.querySelector('.included-toggle');
    if (!list || !toggle) return;

    if (list.scrollHeight <= list.clientHeight + 4) {
      toggle.hidden = true;
      return;
    }

    toggle.addEventListener('click', () => {
      const expanded = card.classList.toggle('expanded');
      toggle.textContent = expanded ? 'Ver menos' : 'Ver mais';
    });
  });
}

function setupStickyCta() {
  const sticky = document.getElementById('stickyCta');
  const hero = document.querySelector('.hero');
  if (!sticky || !hero) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      sticky.classList.toggle('visible', !entry.isIntersecting && window.innerWidth <= 640);
    });
  });
  observer.observe(hero);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) sticky.classList.remove('visible');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderDemos();
  setupFaq();
  setupIncluded();
  setupStickyCta();
});
