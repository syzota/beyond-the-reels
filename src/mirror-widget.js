/* Beyond the Reels: original, dependency-free interactive mirror web component.
 * No webcam, face analysis, accounts, data collection, or persistent storage.
 * Copy and interactions are educational and adapted from WHO's DWM stress skills.
 */
const LENSES = [
  {id:'looks',name:'Penampilan',short:'cantik / menarik',compare:'Aku harus terlihat seperti yang ada di feed.',prompt:'Apakah satu foto cukup untuk menentukan nilai dirimu?',counter:'Yang kamu lihat: satu momen terpilih',icon:'✳'},
  {id:'success',name:'Pencapaian',short:'sukses',compare:'Aku tertinggal; semua orang sudah lebih jauh.',prompt:'Apa yang tidak terlihat dari perjalanan mereka?',counter:'Yang kamu lihat: hasil yang dibagikan',icon:'✦'},
  {id:'lifestyle',name:'Gaya hidup',short:'hidup ideal',compare:'Hidupku harus selalu semenarik unggahan itu.',prompt:'Bisakah potongan layar mewakili seluruh kehidupan?',counter:'Yang kamu lihat: momen yang dipilih',icon:'✶'},
  {id:'belonging',name:'Penerimaan',short:'disukai',compare:'Aku harus disukai agar merasa berharga.',prompt:'Apakah respons orang lain menentukan nilai dirimu?',counter:'Yang kamu lihat: respons di layar',icon:'✧'}
];
const VALUES = [
  {id:'growth',name:'Bertumbuh',action:'Catat satu hal kecil yang sudah kamu pelajari hari ini.',insight:'Aku boleh bertumbuh dengan kecepatanku sendiri.'},
  {id:'kindness',name:'Kebaikan',action:'Ucapkan satu kalimat hangat kepada dirimu seperti kepada sahabat.',insight:'Aku pantas diperlakukan dengan lembut, termasuk oleh diriku.'},
  {id:'creativity',name:'Kreativitas',action:'Buat sesuatu selama 10 menit tanpa mengukur hasilnya.',insight:'Aku bisa menikmati proses tanpa membuktikan apa pun.'},
  {id:'connection',name:'Koneksi',action:'Hubungi seseorang yang membuatmu nyaman menjadi diri sendiri.',insight:'Aku berharga di luar jumlah likes dan respons.'}
];
const esc = v => String(v).replace(/[&<>"']/g, x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const realPortrait = `<img class="ml-portrait-image ml-portrait-real" src="/images/mirror/real.png" alt="" aria-hidden="true" draggable="false" decoding="async">`;
const reelPortrait = `<img class="ml-portrait-image ml-portrait-reel" src="/images/mirror/reel.png" alt="" aria-hidden="true" draggable="false" decoding="async">`;
const star = `<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4Z" fill="currentColor"/></svg>`;
const heart = `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 1 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>`;
const arrow = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7"/></svg>`;
function template(){return `<div class="ml-content">
  <div class="ml-paperclip ml-paperclip-left" aria-hidden="true"></div><div class="ml-paperclip ml-paperclip-right" aria-hidden="true"></div>
  <header class="ml-header"><div class="ml-eyebrow"><span class="ml-tiny-star">${star}</span> AN INTERACTIVE REFLECTION</div><h2><span class="ml-ink">THE MIRROR</span> <span class="ml-pink-ink">EXPERIMENT</span></h2><p>Yang perlu berubah bukan dirimu, tetapi standar yang kamu gunakan untuk melihat dirimu.</p></header>
  <div class="ml-layout"><div class="ml-stage-col">
     <div class="ml-floating-label ml-float-one">a new perspective</div><div class="ml-floating-label ml-float-two">your pace matters</div>
     <div class="ml-mirror-frame" id="ml-stage" style="--ml-reveal:50%;" role="img" aria-label="Cermin ilustratif yang memperlihatkan perbedaan antara unggahan terkurasi dan kehidupan pribadi. Tidak menggunakan kamera."><div class="ml-frame-dots" aria-hidden="true">· · · · ·</div>
       <div class="ml-mirror-inside">
         <div class="ml-reflection ml-reflection-reel"><div class="ml-checker" aria-hidden="true"></div><div class="ml-flash" aria-hidden="true"></div><div class="ml-reel-window"><span>FOR YOU</span><span>FOLLOWING</span></div>${reelPortrait}<div class="ml-feed-badge ml-feed-badge-top">THE PERFECT <span id="ml-word">LOOK</span>?</div><div class="ml-feed-badge ml-feed-badge-bottom">${heart} <span>LOOK AGAIN</span></div><div class="ml-reel-bottom">highlight ≠ whole story</div></div>
         <div class="ml-reflection ml-reflection-real" id="ml-overlay"><div class="ml-sun" aria-hidden="true"></div><div class="ml-cloud ml-cloud-one" aria-hidden="true"></div><div class="ml-cloud ml-cloud-two" aria-hidden="true"></div><div class="ml-real-tape" aria-hidden="true"></div><div class="ml-real-note">MY LIFE,<br/><em>MY PACE.</em></div>${realPortrait}<div class="ml-real-bottom">I am more than a feed.</div></div>
         <div class="ml-wipe-divider" id="ml-divider"><div class="ml-wipe-grip" aria-hidden="true">‹ ›</div></div>
       </div>
       <span class="ml-frame-cap">THE MIRROR IS A METAPHOR, NOT A CAMERA</span>
     </div>
     <div class="ml-scrub"><div class="ml-scrub-labels"><span>REEL ME <small>konten yang terlihat</small></span><span>REAL ME <small>hidup yang utuh</small></span></div><label class="ml-sr-only" for="ml-range">Geser pembatas untuk mengatur porsi Reel Me di kiri dan Real Me di kanan</label><input id="ml-range" type="range" min="0" max="100" value="50" aria-describedby="ml-range-help"/><p id="ml-range-help">Geser pembatas untuk melihat Reel Me di kiri dan Real Me di kanan.</p></div>
   </div>
   <div class="ml-guide">
    <div class="ml-sticky-note ml-pink"><span class="ml-note-index">01 / NOTICE</span><h3>Which standard got into your head?</h3><p>Konten apa yang belakangan membuatmu merasa “harus seperti itu”?</p><div class="ml-lens-grid" role="group" aria-label="Pilih jenis standar">${LENSES.map((v,i)=>`<button class="ml-lens" type="button" data-lens="${v.id}" aria-pressed="${i===0?'true':'false'}"><span>${v.icon}</span>${v.name}</button>`).join('')}</div><div class="ml-thought" id="ml-thought"><span class="ml-quote-mark">“</span><span id="ml-thought-text">${esc(LENSES[0].compare)}</span><span class="ml-quote-mark">”</span></div></div>
    <div class="ml-sticky-note ml-lime"><span class="ml-note-index">02 / UNHOOK</span><h3>A thought isn't always a fact.</h3><p id="ml-question">${esc(LENSES[0].prompt)}</p><button class="ml-pop-btn" type="button" id="ml-unhook">Aku menyadari ini hanya pikiran ${arrow}</button><div class="ml-unhook-result" id="ml-unhook-result" aria-live="polite" hidden><span>COBA KATAKAN DALAM HATI</span><p>“Aku sedang memiliki pikiran bahwa <b id="ml-unhook-text"></b>”</p><small>Perhatikan pikiran itu tanpa harus mengikutinya.</small></div></div>
    <div class="ml-sticky-note ml-blue"><span class="ml-note-index">03 / RECLAIM</span><h3>What matters to you?</h3><p>Pilih satu nilai untuk memandumu di luar angka dan perbandingan.</p><div class="ml-values" role="group" aria-label="Pilih nilai pribadi">${VALUES.map(v=>`<button type="button" data-value="${v.id}" aria-pressed="false">${v.name}</button>`).join('')}</div><div class="ml-value-hint" id="ml-value-hint">Tidak ada nilai yang lebih benar dari yang lain.</div></div>
    <div class="ml-result" id="ml-result" hidden aria-live="polite"><span class="ml-result-top">A NOTE TO YOURSELF</span><h3 id="ml-result-title"></h3><p id="ml-result-action"></p><div class="ml-result-buttons"><button type="button" id="ml-copy" class="ml-pop-btn">Salin catatanku ${arrow}</button><button class="ml-plain-btn" type="button" id="ml-reset">Mulai ulang</button></div><small id="ml-copy-state"></small></div>
   </div>
  </div>
  <footer class="ml-footer"><span>Inspired by WHO's <em>Doing What Matters in Times of Stress</em>.</span><a href="https://www.who.int/publications/i/item/9789240003927" target="_blank" rel="noopener noreferrer">Baca panduan WHO ↗</a><span>Be yourself.</span></footer>
</div>`}
export function mountMirrorLab(root){
 if(root.dataset.mlReady==='yes')return;root.dataset.mlReady='yes';root.classList.add('ml');root.innerHTML=template();
 let active=LENSES[0],val=null,unhooked=false,reveal=50;
 const q = s=>root.querySelector(s), qa=s=>[...root.querySelectorAll(s)];
 const range=q('#ml-range'),overlay=q('#ml-overlay'),divider=q('#ml-divider'),stage=q('#ml-stage');
 const setReveal = num=>{reveal=Math.max(0,Math.min(100,Number(num)));range.value=String(reveal);stage.style.setProperty('--ml-reveal',reveal+'%');overlay.style.clipPath=`inset(0 0 0 ${reveal}%)`;divider.style.left=reveal+'%';range.style.setProperty('--fill',reveal+'%');q('#ml-range-help').textContent=reveal<30?'Kamu tetap orang yang sama. Yang bergeser adalah cara kamu melihatnya.':'Geser pembatas untuk melihat Reel Me di kiri dan Real Me di kanan.';};
 const update=()=>{q('#ml-thought-text').textContent=active.compare;q('#ml-question').textContent=active.prompt;q('#ml-word').textContent=active.short.toUpperCase();qa('[data-lens]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lens===active.id)));if(unhooked){q('#ml-unhook-text').textContent=active.compare.replace(/[.!?]+$/,'').replace(/^Aku\s+/i,'aku ');};};
 const showResult=()=>{if(!val)return; q('#ml-result').hidden=false;q('#ml-result-title').textContent=val.insight;q('#ml-result-action').textContent='Langkah kecil hari ini: '+val.action;q('#ml-copy-state').textContent='';};
 qa('[data-lens]').forEach(el=>el.addEventListener('click',()=>{active=LENSES.find(v=>v.id===el.dataset.lens)||active;update();}));
 range.addEventListener('input',e=>setReveal(e.target.value));
 q('#ml-unhook').addEventListener('click',()=>{unhooked=true;q('#ml-unhook-result').hidden=false;update();q('#ml-unhook').classList.add('ml-clicked');});
 qa('[data-value]').forEach(el=>el.addEventListener('click',()=>{val=VALUES.find(v=>v.id===el.dataset.value)||null;qa('[data-value]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.value===val.id)));q('#ml-value-hint').textContent='Nilai ini milikmu, bukan milik feed.';showResult();setReveal(Math.min(reveal,22));}));
 q('#ml-copy').addEventListener('click',async()=>{if(!val)return;const text=`BEYOND THE REELS — CATATANKU\nStandar yang sedang kupertanyakan: ${active.name}\nAku menyadari pikiran: ${active.compare}\n${val.insight}\nLangkah kecil: ${val.action}\nPikiran bukan selalu fakta. Aku boleh kembali ke nilaiku sendiri.`;try{await navigator.clipboard.writeText(text);q('#ml-copy-state').textContent='Catatan tersalin.';}catch{q('#ml-copy-state').textContent='Salin tidak tersedia di browser ini.';}});
 q('#ml-reset').addEventListener('click',()=>{active=LENSES[0];val=null;unhooked=false;qa('[data-value]').forEach(el=>el.setAttribute('aria-pressed','false'));q('#ml-result').hidden=true;q('#ml-unhook-result').hidden=true;q('#ml-unhook').classList.remove('ml-clicked');q('#ml-value-hint').textContent='Tidak ada nilai yang lebih benar dari yang lain.';update();setReveal(50);});
 const mirror=stage;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const tilt=e=>{if(reduced.matches||!e.pointerType||e.pointerType==='touch')return;const r=mirror.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;mirror.style.transform=`perspective(1300px) rotateY(${(x*5).toFixed(1)}deg) rotateX(${(-y*4).toFixed(1)}deg)`;};
 mirror.addEventListener('pointermove',tilt);mirror.addEventListener('pointerleave',()=>mirror.style.transform='');setReveal(50);
}
if(typeof customElements!=='undefined'&&!customElements.get('btr-mirror')){
 customElements.define('btr-mirror',class extends HTMLElement{connectedCallback(){mountMirrorLab(this)}});
}
