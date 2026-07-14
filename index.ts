<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<style>
  :root{
    --gold:#C9A227; --gold-bright:#E4C34A; --surface2:#2A2440;
    --surface:#1E1A2E; --muted:#9C93B8; --ivory:#F3ECE0; --line:#352F4D;
  }
  *{box-sizing:border-box;}
  body{
    margin:0;background:transparent;color:var(--ivory);
    font-family:-apple-system,Roboto,sans-serif;padding:4px;
  }
  .string-vis{display:flex;justify-content:center;gap:14px;padding:16px 0;}
  .string{width:4px;height:70px;border-radius:2px;background:var(--gold);opacity:0.85;transform-origin:top;}
  .string.playing{animation:pluck 1.4s ease-in-out infinite;}
  .string:nth-child(2).playing{animation-delay:.35s;}
  .string:nth-child(3).playing{animation-delay:.7s;}
  .string:nth-child(4).playing{animation-delay:1.05s;}
  @keyframes pluck{
    0%{transform:rotate(0deg);} 8%{transform:rotate(2.5deg);}
    20%{transform:rotate(-1.5deg);} 35%{transform:rotate(0deg);} 100%{transform:rotate(0deg);}
  }
  button{
    width:100%;padding:12px;border-radius:9px;border:none;background:var(--gold);
    color:#14121F;font-weight:600;font-size:14px;margin-top:6px;
  }
  button.secondary{background:var(--surface2);color:var(--ivory);border:1px solid var(--line);}
  .pitch-meter{background:var(--surface2);border-radius:12px;padding:16px;text-align:center;margin-top:12px;}
  .pitch-note{font-size:30px;font-weight:700;color:var(--gold-bright);}
  .pitch-cents{font-family:monospace;font-size:12px;color:var(--muted);margin-top:4px;}
  .meter-bar{height:8px;background:var(--surface);border-radius:4px;margin-top:12px;position:relative;overflow:hidden;}
  .meter-fill{position:absolute;top:0;bottom:0;width:2px;background:var(--gold-bright);left:50%;transition:left .1s linear;}
</style>
</head>
<body>
  <div class="string-vis" id="strings">
    <div class="string"></div><div class="string"></div><div class="string"></div><div class="string"></div>
  </div>
  <button id="tanpuraBtn">Play Tanpura</button>
  <button id="micBtn" class="secondary" style="margin-top:10px;">Start Listening</button>
  <div class="pitch-meter" id="meter" style="display:none;">
    <div class="pitch-note" id="pitchNote">—</div>
    <div class="pitch-cents" id="pitchCents">Sing "Sa"...</div>
    <div class="meter-bar"><div class="meter-fill" id="meterFill"></div></div>
  </div>

<script>
// Receives { type: 'setShruti', baseFreq, octaveMul } messages from React Native
let baseFreq = 164.81; // E
let octaveMul = 1;

document.addEventListener('message', handleRNMessage); // Android
window.addEventListener('message', handleRNMessage);   // iOS
function handleRNMessage(e){
  try{
    const data = JSON.parse(e.data);
    if(data.type === 'setShruti'){ baseFreq = data.baseFreq; octaveMul = data.octaveMul; }
  }catch(err){}
}

let audioCtx=null, tanpuraPlaying=false, loopTimer=null;

function pluck(freq, delaySec, ctx){
  const osc = ctx.createOscillator();
  osc.type = 'triangle'; osc.frequency.value = freq;
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass'; filter.frequency.value = freq*4;
  const t = ctx.currentTime + delaySec;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.18, t+0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, t+1.1);
  osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
  osc.start(t); osc.stop(t+1.15);
}
function scheduleLoop(){
  if(!tanpuraPlaying) return;
  const f = baseFreq*octaveMul;
  const pattern = [f*1.5, f*2, f*2, f]; // Pa Sa Sa Sa, just intonation approx
  pattern.forEach((freq,i)=>pluck(freq, i*0.9, audioCtx));
  loopTimer = setTimeout(scheduleLoop, pattern.length*900);
}
document.getElementById('tanpuraBtn').addEventListener('click', ()=>{
  if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  tanpuraPlaying = !tanpuraPlaying;
  const btn = document.getElementById('tanpuraBtn');
  const strings = document.querySelectorAll('.string');
  if(tanpuraPlaying){
    audioCtx.resume(); btn.textContent = 'Stop Tanpura';
    strings.forEach(s=>s.classList.add('playing'));
    scheduleLoop();
  } else {
    btn.textContent = 'Play Tanpura';
    strings.forEach(s=>s.classList.remove('playing'));
    clearTimeout(loopTimer);
  }
});

// ---- Pitch detection (autocorrelation) ----
let micStream=null, micCtx=null, analyser=null, micRunning=false, raf=null;
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
function freqToNote(freq){
  if(freq<=0) return null;
  const n = 12*(Math.log(freq/440)/Math.log(2)) + 69;
  const rounded = Math.round(n);
  const cents = Math.floor((n-rounded)*100);
  return { name: NOTE_NAMES[((rounded%12)+12)%12], cents };
}
function autoCorrelate(buf, sampleRate){
  let SIZE = buf.length, rms = 0;
  for(let i=0;i<SIZE;i++) rms += buf[i]*buf[i];
  rms = Math.sqrt(rms/SIZE);
  if(rms<0.01) return -1;
  let r1=0, r2=SIZE-1, thres=0.2;
  for(let i=0;i<SIZE/2;i++){ if(Math.abs(buf[i])<thres){ r1=i; break; } }
  for(let i=1;i<SIZE/2;i++){ if(Math.abs(buf[SIZE-i])<thres){ r2=SIZE-i; break; } }
  const trimmed = buf.slice(r1,r2); SIZE = trimmed.length;
  const c = new Array(SIZE).fill(0);
  for(let i=0;i<SIZE;i++){ for(let j=0;j<SIZE-i;j++){ c[i]+=trimmed[j]*trimmed[j+i]; } }
  let d=0; while(c[d]>c[d+1]) d++;
  let maxval=-1, maxpos=-1;
  for(let i=d;i<SIZE;i++){ if(c[i]>maxval){ maxval=c[i]; maxpos=i; } }
  return maxpos>0 ? sampleRate/maxpos : -1;
}
function pitchLoop(){
  if(!micRunning) return;
  const buf = new Float32Array(analyser.fftSize);
  analyser.getFloatTimeDomainData(buf);
  const freq = autoCorrelate(buf, micCtx.sampleRate);
  const note = freqToNote(freq);
  if(note){
    document.getElementById('pitchNote').textContent = note.name;
    document.getElementById('pitchCents').textContent = (note.cents>0?'+':'')+note.cents+' cents';
    document.getElementById('meterFill').style.left = (50+Math.max(-50,Math.min(50,note.cents)))+'%';
  } else {
    document.getElementById('pitchNote').textContent = '—';
    document.getElementById('pitchCents').textContent = 'Listening...';
    document.getElementById('meterFill').style.left = '50%';
  }
  raf = requestAnimationFrame(pitchLoop);
}
document.getElementById('micBtn').addEventListener('click', async ()=>{
  const btn = document.getElementById('micBtn');
  const meter = document.getElementById('meter');
  if(!micRunning){
    try{
      micStream = await navigator.mediaDevices.getUserMedia({audio:true});
      micCtx = new (window.AudioContext||window.webkitAudioContext)();
      const source = micCtx.createMediaStreamSource(micStream);
      analyser = micCtx.createAnalyser(); analyser.fftSize = 2048;
      source.connect(analyser);
      micRunning = true; meter.style.display='block'; btn.textContent='Stop Listening';
      pitchLoop();
    }catch(e){
      window.ReactNativeWebView?.postMessage(JSON.stringify({type:'micError', message: String(e)}));
    }
  } else {
    micRunning = false; cancelAnimationFrame(raf);
    if(micStream) micStream.getTracks().forEach(t=>t.stop());
    meter.style.display='none'; btn.textContent='Start Listening';
  }
});
</script>
</body>
</html>
