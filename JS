// =========================================================
// VEHICLE DEFINITIONS
// =========================================================
const VEHICLES=[
  {id:'lambo',name:'LAMBORGHINI',badge:'SUPERCAR',bc:'#ff4400',type:'car',ac:'#ff4400',ag:'rgba(255,68,0,0.35)',sc:'#ff4400',speed:95,accel:88,handling:78,fireRate:60,maxSpeed:8.5,acc:0.18,friction:0.96,w:48,h:96,desc:'Huracán STO'},
  {id:'f1',name:'FORMULA ONE',badge:'F1',bc:'#ffcc00',type:'f1',ac:'#ffcc00',ag:'rgba(255,200,0,0.35)',sc:'#ffcc00',speed:100,accel:95,handling:92,fireRate:80,maxSpeed:11,acc:0.25,friction:0.97,w:38,h:100,desc:'SF-24 Chassis'},
  {id:'bike',name:'SPORT BIKE',badge:'MOTO',bc:'#00ff88',type:'bike',ac:'#00ff88',ag:'rgba(0,255,136,0.35)',sc:'#00ff88',speed:88,accel:92,handling:95,fireRate:50,maxSpeed:9.5,acc:0.22,friction:0.965,w:26,h:72,desc:'Kawasaki H2R'},
  {id:'jet',name:'FIGHTER JET',badge:'AIR',bc:'#00ccff',type:'jet',ac:'#00ccff',ag:'rgba(0,200,255,0.35)',sc:'#00ccff',speed:100,accel:100,handling:70,fireRate:100,maxSpeed:13,acc:0.3,friction:0.98,w:80,h:90,desc:'F-22 Raptor'},
  {id:'muscle',name:'MUSCLE CAR',badge:'BEAST',bc:'#cc44ff',type:'muscle',ac:'#cc44ff',ag:'rgba(200,68,255,0.35)',sc:'#cc44ff',speed:82,accel:98,handling:65,fireRate:70,maxSpeed:8,acc:0.28,friction:0.94,w:54,h:104,desc:'Dodge Hellcat'},
  {id:'sbike',name:'SUPERBIKE',badge:'TURBO',bc:'#00ffdd',type:'sbike',ac:'#00ffdd',ag:'rgba(0,255,200,0.35)',sc:'#00ffdd',speed:93,accel:90,handling:88,fireRate:55,maxSpeed:10,acc:0.2,friction:0.968,w:28,h:78,desc:'Ducati V4R'},
];

// Traffic vehicles for each player type
const TRAFFIC_FOR = {
  car: ['tcar1','tcar2','tcar3','tmuscle','tsuv'],
  f1: ['tcar1','tcar2','tmuscle','tsuv','ttruck'],
  muscle: ['tcar1','tcar2','tcar3','tmuscle','tsuv'],
  bike: ['tbike1','tbike2','tbike3'],
  sbike: ['tbike1','tbike2','tbike3'],
  jet: ['tjet1','tjet2'],
};

// =========================================================
// PLAYER NAME & THEME
// =========================================================
let playerName = '';
let isLightTheme = false;

function toggleTheme(){
  isLightTheme = !isLightTheme;
  document.body.classList.toggle('light-theme', isLightTheme);
  document.getElementById('themeToggle').textContent = isLightTheme ? '🌙 DARK' : '☀ LIGHT';
}

// =========================================================
// DEV CREDITS INTRO
// =========================================================
function showDevCreditsIntro(){
  const overlay = document.getElementById('devCreditsIntro');
  const names = [0,1,2,3].map(i=>document.getElementById('dciN'+i));
  // Stagger name reveal
  names.forEach((n,i)=>{
    setTimeout(()=>{n.classList.add('visible');},800+i*350);
  });
  // After all names shown, transition to name overlay
  setTimeout(()=>{
    overlay.style.transition='opacity 0.8s ease';
    overlay.style.opacity='0';
    setTimeout(()=>{
      overlay.style.display='none';
      document.getElementById('nameOverlay').style.display='flex';
    },800);
  },800+4*350+1200);
}
showDevCreditsIntro();

function submitName(){
  const inp = document.getElementById('playerNameInput').value.trim();
  if(!inp){document.getElementById('playerNameInput').focus();return;}
  playerName = inp.toUpperCase();
  document.getElementById('nameOverlay').style.display='none';
  document.getElementById('lobby').style.display='flex';
  drawLobby();
}

document.getElementById('playerNameInput').addEventListener('keydown',e=>{if(e.key==='Enter')submitName();});

// =========================================================
// LOBBY
// =========================================================
const lobbyC=document.getElementById('lobbyCanvas');
const lctx=lobbyC.getContext('2d');
lobbyC.width=window.innerWidth;lobbyC.height=window.innerHeight;
let lobbyAnim,lobbyT=0;

function drawLobby(){
  const W=lobbyC.width,H=lobbyC.height;
  lctx.clearRect(0,0,W,H);lobbyT++;
  // Dark bg
  lctx.fillStyle='#03030a';lctx.fillRect(0,0,W,H);
  // Checkerboard ground
  for(let x=-80;x<W+80;x+=80)for(let y=H*0.55;y<H;y+=80){
    lctx.fillStyle=(Math.floor(x/80)+Math.floor(y/80))%2===0?'#080810':'#060608';
    lctx.fillRect(x,y,80,80);
  }
  // Sky panel
  lctx.fillStyle='#09091a';lctx.fillRect(0,0,W,H*0.56);
  lctx.strokeStyle='#10101e';lctx.lineWidth=1;
  for(let y=0;y<H*0.56;y+=55){lctx.beginPath();lctx.moveTo(0,y);lctx.lineTo(W,y);lctx.stroke();}
  for(let x=0;x<W;x+=90){lctx.beginPath();lctx.moveTo(x,0);lctx.lineTo(x,H*0.56);lctx.stroke();}
  // Center panel
  lctx.fillStyle='#0c0c1c';lctx.fillRect(W/2-260,8,520,H*0.49);
  for(let y=16;y<H*0.49+8;y+=36){lctx.strokeStyle='#131326';lctx.lineWidth=2;lctx.beginPath();lctx.moveTo(W/2-250,y);lctx.lineTo(W/2+250,y);lctx.stroke();}
  lctx.strokeStyle='#1e1e34';lctx.lineWidth=2;lctx.strokeRect(W/2-260,8,520,H*0.49);
  // Horizon glow line
  const ng=lctx.createLinearGradient(0,0,W,0);
  ng.addColorStop(0,'rgba(255,68,0,0)');ng.addColorStop(0.3,'rgba(255,68,0,0.65)');ng.addColorStop(0.7,'rgba(255,68,0,0.65)');ng.addColorStop(1,'rgba(255,68,0,0)');
  lctx.fillStyle=ng;lctx.fillRect(0,H*0.548,W,3);
  const fg=lctx.createRadialGradient(W/2,H,0,W/2,H,400);
  fg.addColorStop(0,'rgba(255,50,0,0.1)');fg.addColorStop(1,'transparent');
  lctx.fillStyle=fg;lctx.fillRect(0,H*0.5,W,H*0.5);
  // Lobby decorations: parked cars on the side
  drawLobbyDecor(lctx,W,H,lobbyT);
  // Main Lamborghini
  drawLobbyLambo(lctx,W/2-110,H*0.56,lobbyT);
  // Reflection
  lctx.save();lctx.globalAlpha=0.11;lctx.scale(1,-1);lctx.translate(0,-H*2.26);
  drawLobbyLambo(lctx,W/2-110,H*0.56,lobbyT);lctx.restore();
  // Character
  drawGirl(lctx,W/2+200,H*0.72,Math.sin(lobbyT*0.03)*2,Math.sin(lobbyT*0.05)*3);
  // Spotlights
  const sp=lctx.createRadialGradient(W/2-60,H*0.38,0,W/2-60,H*0.38,380);
  sp.addColorStop(0,'rgba(255,160,60,0.1)');sp.addColorStop(1,'transparent');
  lctx.fillStyle=sp;lctx.fillRect(0,0,W,H);
  lobbyAnim=requestAnimationFrame(drawLobby);
}

function drawLobbyDecor(c,W,H,t){
  // Left side: parked muscle car
  const lx=W/2-320,ly=H*0.68;
  c.save();c.globalAlpha=0.7;
  c.fillStyle='rgba(0,0,0,0.3)';c.beginPath();c.ellipse(lx+70,ly+20,70,8,0,0,Math.PI*2);c.fill();
  // body
  c.fillStyle='#2a0055';
  c.beginPath();c.moveTo(lx+10,ly);c.lineTo(lx+24,ly-20);c.lineTo(lx+70,ly-28);c.lineTo(lx+118,ly-24);c.lineTo(lx+138,ly);c.closePath();c.fill();
  c.fillStyle='#3a0077';
  c.beginPath();c.moveTo(lx+32,ly-20);c.lineTo(lx+38,ly-38);c.lineTo(lx+88,ly-44);c.lineTo(lx+110,ly-38);c.lineTo(lx+120,ly-20);c.closePath();c.fill();
  c.fillStyle='rgba(80,0,200,0.2)';
  c.beginPath();c.moveTo(lx+38,ly-20);c.lineTo(lx+44,ly-36);c.lineTo(lx+76,ly-40);c.lineTo(lx+82,ly-20);c.closePath();c.fill();
  c.fillStyle='rgba(200,100,255,0.7)';c.fillRect(lx+8,ly-2,8,4);
  c.fillStyle='rgba(255,20,0,0.8)';c.fillRect(lx+128,ly-2,8,4);
  [lx+28,lx+110].forEach(wx=>{c.fillStyle='#080808';c.beginPath();c.arc(wx,ly+10,15,0,Math.PI*2);c.fill();c.fillStyle='#555';c.beginPath();c.arc(wx,ly+10,9,0,Math.PI*2);c.fill();});
  c.restore();

  // Right side: parked truck
  const rx=W/2+160,ry=H*0.66;
  c.save();c.globalAlpha=0.6;
  c.fillStyle='rgba(0,0,0,0.3)';c.beginPath();c.ellipse(rx+100,ry+24,100,10,0,0,Math.PI*2);c.fill();
  c.fillStyle='#1a1a08';
  c.beginPath();c.moveTo(rx,ry);c.lineTo(rx,ry-44);c.lineTo(rx+60,ry-44);c.lineTo(rx+60,ry);c.closePath();c.fill();
  c.fillStyle='#2a2a10';
  c.beginPath();c.moveTo(rx+60,ry);c.lineTo(rx+60,ry-52);c.lineTo(rx+195,ry-52);c.lineTo(rx+195,ry);c.closePath();c.fill();
  c.fillStyle='rgba(80,200,255,0.15)';c.fillRect(rx+4,ry-42,50,26);
  c.fillStyle='rgba(255,240,120,0.8)';c.fillRect(rx,ry-6,8,5);
  c.fillStyle='rgba(255,20,0,0.8)';c.fillRect(rx+190,ry-8,6,5);
  [rx+36,rx+96,rx+165].forEach(wx=>{c.fillStyle='#080808';c.beginPath();c.arc(wx,ry+12,15,0,Math.PI*2);c.fill();c.fillStyle='#555';c.beginPath();c.arc(wx,ry+12,8,0,Math.PI*2);c.fill();});
  c.restore();

  // Floating car parts in background
  const parts=[
    {x:W*0.05+Math.sin(t*0.018)*8,y:H*0.2+Math.cos(t*0.012)*5,label:'⚙️',size:1.2},
    {x:W*0.92+Math.cos(t*0.015)*6,y:H*0.15+Math.sin(t*0.02)*4,label:'🔧',size:1.0},
    {x:W*0.08+Math.sin(t*0.022)*5,y:H*0.4+Math.cos(t*0.017)*6,label:'🏁',size:1.1},
    {x:W*0.88+Math.cos(t*0.019)*7,y:H*0.35+Math.sin(t*0.013)*5,label:'💀',size:1.0},
  ];
  parts.forEach(p=>{
    c.save();c.globalAlpha=0.5;
    c.font=`${p.size*22}px serif`;c.textAlign='center';c.fillText(p.label,p.x,p.y);
    c.restore();
  });
}

function drawLobbyLambo(c,x,y,t){
  const gl=Math.sin(t*0.04)*0.3+0.7;
  c.fillStyle='rgba(0,0,0,0.4)';c.beginPath();c.ellipse(x+155,y+36,148,15,0,0,Math.PI*2);c.fill();
  c.fillStyle='#bb1200';
  c.beginPath();c.moveTo(x+14,y+16);c.lineTo(x+34,y-12);c.lineTo(x+84,y-26);c.lineTo(x+168,y-31);c.lineTo(x+230,y-26);c.lineTo(x+270,y-6);c.lineTo(x+274,y+16);c.closePath();c.fill();
  c.fillStyle='#cc1500';
  c.beginPath();c.moveTo(x+74,y-26);c.lineTo(x+94,y-56);c.lineTo(x+148,y-66);c.lineTo(x+198,y-56);c.lineTo(x+224,y-26);c.closePath();c.fill();
  c.fillStyle='rgba(80,190,255,0.25)';
  c.beginPath();c.moveTo(x+84,y-26);c.lineTo(x+99,y-54);c.lineTo(x+152,y-64);c.lineTo(x+160,y-26);c.closePath();c.fill();
  c.beginPath();c.moveTo(x+170,y-26);c.lineTo(x+190,y-54);c.lineTo(x+220,y-54);c.lineTo(x+222,y-26);c.closePath();c.fill();
  c.strokeStyle='#881000';c.lineWidth=1.5;c.beginPath();c.moveTo(x+34,y-12);c.lineTo(x+264,y-6);c.stroke();
  c.fillStyle='#0a0a0a';
  c.beginPath();c.moveTo(x+14,y+18);c.lineTo(x+0,y+24);c.lineTo(x+44,y+24);c.lineTo(x+34,y+18);c.closePath();c.fill();
  c.beginPath();c.moveTo(x+264,y+18);c.lineTo(x+284,y+24);c.lineTo(x+246,y+24);c.lineTo(x+254,y+18);c.closePath();c.fill();
  const hg=c.createRadialGradient(x+26,y,0,x+26,y,52);
  hg.addColorStop(0,`rgba(255,240,120,${gl*0.42})`);hg.addColorStop(1,'transparent');
  c.fillStyle=hg;c.fillRect(x-18,y-28,80,56);
  c.fillStyle=`rgba(255,240,150,${gl})`;
  c.beginPath();c.moveTo(x+14,y+2);c.lineTo(x+24,y-10);c.lineTo(x+44,y-12);c.lineTo(x+38,y+2);c.closePath();c.fill();
  c.fillStyle='rgba(255,28,0,0.9)';
  c.beginPath();c.moveTo(x+264,y+0);c.lineTo(x+274,y-8);c.lineTo(x+272,y+8);c.closePath();c.fill();
  [x+66,x+220].forEach(wx=>drawLobbyWheel(c,wx,y+24,t));
  c.fillStyle='#ffcc00';c.font='bold 9px sans-serif';c.textAlign='left';c.fillText('LAMBORGHINI',x+92,y+10);
}

function drawLobbyWheel(c,x,y,t){
  c.save();c.translate(x,y);
  c.fillStyle='#080808';c.beginPath();c.arc(0,0,22,0,Math.PI*2);c.fill();
  c.strokeStyle='#181818';c.lineWidth=3;c.stroke();
  c.fillStyle='#6a6a6a';c.beginPath();c.arc(0,0,14,0,Math.PI*2);c.fill();
  c.fillStyle='#888';c.beginPath();c.arc(0,0,7,0,Math.PI*2);c.fill();
  c.strokeStyle='#444';c.lineWidth=3;
  for(let i=0;i<5;i++){c.save();c.rotate(t*0.025+i*Math.PI*2/5);c.beginPath();c.moveTo(0,0);c.lineTo(0,12);c.stroke();c.restore();}
  c.restore();
}

function drawGirl(c,x,y,ga,hb){
  c.save();c.translate(x,y+ga);
  c.fillStyle='rgba(0,0,0,0.22)';c.beginPath();c.ellipse(0,2,15,4,0,0,Math.PI*2);c.fill();
  c.strokeStyle='#0e0520';c.lineWidth=10;c.lineCap='round';
  c.beginPath();c.moveTo(-5,0);c.lineTo(-9,42);c.stroke();c.beginPath();c.moveTo(5,0);c.lineTo(9,42);c.stroke();
  c.fillStyle='#080808';c.beginPath();c.ellipse(-9,45,7,4,0,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(9,45,7,4,0,0,Math.PI*2);c.fill();
  c.fillStyle='#bb0044';c.beginPath();c.moveTo(-13,0);c.lineTo(-11,16);c.lineTo(11,16);c.lineTo(13,0);c.closePath();c.fill();
  c.fillStyle='#0c0c20';c.beginPath();c.roundRect(-13,-40,26,42,2);c.fill();
  c.strokeStyle='#ff3300';c.lineWidth=1;c.beginPath();c.moveTo(0,-40);c.lineTo(0,-1);c.stroke();c.beginPath();c.moveTo(-13,-18);c.lineTo(13,-18);c.stroke();
  c.strokeStyle='#0c0c20';c.lineWidth=7;c.lineCap='round';
  c.beginPath();c.moveTo(12,-28);c.quadraticCurveTo(22,-14,17,0);c.stroke();
  c.beginPath();c.moveTo(-12,-28);c.quadraticCurveTo(-24,-18,-28,-8);c.stroke();
  c.fillStyle='#f2be72';c.fillRect(-4,-47,8,9);c.beginPath();c.ellipse(0,-58,13,16,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0e0400';
  c.beginPath();c.moveTo(-11,-70);c.quadraticCurveTo(-24+hb,-50,-20,-8);c.lineTo(-13,-10);c.quadraticCurveTo(-17,-44,-7,-68);c.closePath();c.fill();
  c.beginPath();c.moveTo(11,-70);c.quadraticCurveTo(22-hb,-50,17,-4);c.lineTo(12,-4);c.quadraticCurveTo(15,-44,7,-68);c.closePath();c.fill();
  c.beginPath();c.ellipse(0,-70,13,7,0,0,Math.PI*2);c.fill();
  c.fillStyle='#fff';c.beginPath();c.ellipse(-4,-58,4,3,0,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(4,-58,4,3,0,0,Math.PI*2);c.fill();
  c.fillStyle='#290600';c.beginPath();c.arc(-4,-58,2.5,0,Math.PI*2);c.fill();c.beginPath();c.arc(4,-58,2.5,0,Math.PI*2);c.fill();
  c.fillStyle='#fff';c.beginPath();c.arc(-3,-59,1,0,Math.PI*2);c.fill();c.beginPath();c.arc(5,-59,1,0,Math.PI*2);c.fill();
  c.fillStyle='#bb2255';c.beginPath();c.ellipse(0,-48,5,2.5,0,0,Math.PI*2);c.fill();
  c.strokeStyle='#0e0400';c.lineWidth=1.5;c.beginPath();c.moveTo(-7,-63);c.lineTo(-2,-62);c.stroke();c.beginPath();c.moveTo(2,-62);c.lineTo(7,-63);c.stroke();
  c.restore();
}
// drawLobby() is now called only after name entry via submitName()

// =========================================================
// MODE SELECT
// =========================================================
let gameMode='traffic';

function showModeSelect(){
  cancelAnimationFrame(lobbyAnim);
  document.getElementById('lobby').style.display='none';
  document.getElementById('modeselect').style.display='flex';
}

function selectMode(mode,card){
  gameMode=mode;
  document.querySelectorAll('.mode-card').forEach(c=>c.classList.remove('selected'));
  card.classList.add('selected');
  document.getElementById('modeBtn').disabled=false;
}

// =========================================================
// VEHICLE SELECT
// =========================================================
let selectedVeh=-1;

function showCarSelect(){
  document.getElementById('modeselect').style.display='none';
  const cs=document.getElementById('carselect');cs.style.display='flex';
  document.getElementById('csSub').textContent=gameMode==='zombie'?
    '6 machines \u2022 machine gun equipped \u2022 destroy zombies':
    '6 machines \u2022 dodge traffic \u2022 survive';
  const grid=document.getElementById('vehGrid');grid.innerHTML='';selectedVeh=-1;
  document.getElementById('selectBtn').disabled=true;
  VEHICLES.forEach((v,i)=>{
    const card=document.createElement('div');
    card.className='veh-card';
    card.style.setProperty('--ac',v.ac);card.style.setProperty('--ag',v.ag);
    card.innerHTML=`<div class="veh-badge" style="background:${v.bc}18;color:${v.bc};border:1px solid ${v.bc}30;">${v.badge}</div>
      <canvas width="136" height="86" id="vp${i}"></canvas>
      <div class="veh-name">${v.name}</div><div class="veh-desc">${v.desc}</div>
      <div class="stat-row"><span class="stat-lbl">Speed</span><div class="stat-track"><div class="stat-fill" style="width:${v.speed}%;background:${v.sc};"></div></div></div>
      <div class="stat-row"><span class="stat-lbl">Accel</span><div class="stat-track"><div class="stat-fill" style="width:${v.accel}%;background:${v.sc};"></div></div></div>
      <div class="stat-row"><span class="stat-lbl">Handle</span><div class="stat-track"><div class="stat-fill" style="width:${v.handling}%;background:${v.sc};"></div></div></div>
      <div class="stat-row"><span class="stat-lbl">Fire</span><div class="stat-track"><div class="stat-fill" style="width:${v.fireRate}%;background:${v.sc};"></div></div></div>`;
    card.onclick=()=>{document.querySelectorAll('.veh-card').forEach(c=>c.classList.remove('selected'));card.classList.add('selected');selectedVeh=i;document.getElementById('selectBtn').disabled=false;};
    grid.appendChild(card);
    setTimeout(()=>drawVehiclePreview(document.getElementById('vp'+i),v),40);
  });
}

function drawVehiclePreview(canvas,v){
  const c=canvas.getContext('2d'),W=136,H=86;
  c.clearRect(0,0,W,H);c.save();c.translate(W/2,H/2);
  const id=v.id;
  if(id==='lambo')pvLambo(c,v);
  else if(id==='f1')pvF1(c,v);
  else if(id==='bike')pvBike(c,v);
  else if(id==='jet')pvJet(c,v);
  else if(id==='muscle')pvMuscle(c,v);
  else if(id==='sbike')pvSBike(c,v);
  c.restore();
}

// --- Preview Draw Functions ---
function pvLambo(c,v){
  c.fillStyle=v.ac;c.beginPath();c.moveTo(0,-40);c.lineTo(16,-34);c.lineTo(20,-8);c.lineTo(16,8);c.lineTo(14,36);c.lineTo(0,40);c.lineTo(-14,36);c.lineTo(-16,8);c.lineTo(-20,-8);c.lineTo(-16,-34);c.closePath();c.fill();
  c.fillStyle='rgba(80,200,255,0.28)';c.beginPath();c.ellipse(0,-8,12,16,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.moveTo(-5,-26);c.lineTo(0,-36);c.lineTo(5,-26);c.closePath();c.fill();
  c.fillStyle='rgba(255,240,150,0.9)';c.beginPath();c.moveTo(-16,-34);c.lineTo(-9,-40);c.lineTo(9,-40);c.lineTo(16,-34);c.lineTo(9,-32);c.lineTo(-9,-32);c.closePath();c.fill();
  c.fillStyle='rgba(255,20,0,0.9)';c.fillRect(-14,34,10,5);c.fillRect(4,34,10,5);
  [[-22,-22],[-22,18],[22,-22],[22,18]].forEach(([wx,wy])=>{c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(wx,wy,6,10,0,0,Math.PI*2);c.fill();c.fillStyle='#444';c.beginPath();c.ellipse(wx,wy,3,6,0,0,Math.PI*2);c.fill();});
}
function pvF1(c,v){
  c.fillStyle='#222';c.fillRect(-28,28,56,5);c.fillRect(-30,24,4,9);c.fillRect(26,24,4,9);
  c.fillRect(-24,-40,48,4);c.fillRect(-26,-44,4,8);c.fillRect(22,-44,4,8);
  c.fillStyle=v.ac;c.beginPath();c.moveTo(0,-40);c.lineTo(11,-26);c.lineTo(13,2);c.lineTo(9,28);c.lineTo(0,36);c.lineTo(-9,28);c.lineTo(-13,2);c.lineTo(-11,-26);c.closePath();c.fill();
  c.fillStyle='rgba(80,200,255,0.38)';c.beginPath();c.ellipse(0,-6,7,14,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,-18,4,6,0,0,Math.PI*2);c.fill();
  c.fillStyle=v.ac+'88';c.fillRect(-20,-3,7,18);c.fillRect(13,-3,7,18);
  [[-18,-20],[-18,18],[18,-20],[18,18]].forEach(([wx,wy])=>{c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(wx,wy,8,8,0,0,Math.PI*2);c.fill();c.fillStyle='#2a2a2a';c.beginPath();c.ellipse(wx,wy,4,4,0,0,Math.PI*2);c.fill();});
}
function pvBike(c,v){
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,-26,9,13,0,0,Math.PI*2);c.fill();c.fillStyle='#3a3a3a';c.beginPath();c.ellipse(0,-26,5,8,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,26,10,14,0,0,Math.PI*2);c.fill();c.fillStyle='#3a3a3a';c.beginPath();c.ellipse(0,26,6,9,0,0,Math.PI*2);c.fill();
  c.strokeStyle=v.ac;c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(0,-12);c.lineTo(0,12);c.stroke();
  c.fillStyle=v.ac;c.beginPath();c.moveTo(-11,-12);c.lineTo(-13,-4);c.lineTo(-11,8);c.lineTo(0,10);c.lineTo(11,8);c.lineTo(13,-4);c.lineTo(11,-12);c.closePath();c.fill();
  c.fillStyle='rgba(80,200,255,0.4)';c.beginPath();c.ellipse(0,-14,5,5,0,0,Math.PI*2);c.fill();
  c.strokeStyle='#6a6a6a';c.lineWidth=3;c.beginPath();c.moveTo(11,5);c.quadraticCurveTo(18,15,16,23);c.stroke();
  c.strokeStyle='#555';c.lineWidth=2;c.beginPath();c.moveTo(-13,-10);c.lineTo(13,-10);c.stroke();
}
function pvJet(c,v){
  c.fillStyle=v.ac+'60';
  c.beginPath();c.moveTo(0,-8);c.lineTo(-42,14);c.lineTo(-36,26);c.lineTo(0,8);c.closePath();c.fill();
  c.beginPath();c.moveTo(0,-8);c.lineTo(42,14);c.lineTo(36,26);c.lineTo(0,8);c.closePath();c.fill();
  c.fillStyle=v.ac+'40';
  c.beginPath();c.moveTo(-7,26);c.lineTo(-18,40);c.lineTo(-11,37);c.lineTo(-5,28);c.closePath();c.fill();
  c.beginPath();c.moveTo(7,26);c.lineTo(18,40);c.lineTo(11,37);c.lineTo(5,28);c.closePath();c.fill();
  c.fillStyle=v.ac;
  c.beginPath();c.moveTo(0,-40);c.lineTo(8,-26);c.lineTo(10,8);c.lineTo(7,32);c.lineTo(0,40);c.lineTo(-7,32);c.lineTo(-10,8);c.lineTo(-8,-26);c.closePath();c.fill();
  c.fillStyle='rgba(80,200,255,0.48)';c.beginPath();c.ellipse(0,-14,5,13,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(-7,4,4,5,0,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(7,4,4,5,0,0,Math.PI*2);c.fill();
  c.fillStyle='#777';[[-26,10],[-32,14],[26,10],[32,14]].forEach(([mx,my])=>{c.beginPath();c.ellipse(mx,my,2.5,5,0,0,Math.PI*2);c.fill();});
  c.fillStyle='#0a0a0a';c.beginPath();c.moveTo(-3,-40);c.lineTo(3,-40);c.lineTo(0,-48);c.closePath();c.fill();
}
function pvMuscle(c,v){
  c.fillStyle='#0a0a0a';[[-26,-26],[-26,18],[26,-26],[26,18]].forEach(([wx,wy])=>{c.beginPath();c.ellipse(wx,wy,8,13,0,0,Math.PI*2);c.fill();c.fillStyle='#3a3a3a';c.beginPath();c.ellipse(wx,wy,4,8,0,0,Math.PI*2);c.fill();c.fillStyle='#0a0a0a';});
  c.fillStyle=v.ac;
  c.beginPath();c.moveTo(-13,-40);c.lineTo(13,-40);c.lineTo(22,-26);c.lineTo(24,2);c.lineTo(22,32);c.lineTo(13,40);c.lineTo(-13,40);c.lineTo(-22,32);c.lineTo(-24,2);c.lineTo(-22,-26);c.closePath();c.fill();
  c.beginPath();c.ellipse(0,-20,9,13,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.moveTo(-5,-30);c.lineTo(0,-40);c.lineTo(5,-30);c.lineTo(4,-22);c.lineTo(-4,-22);c.closePath();c.fill();
  c.fillStyle='rgba(80,200,255,0.28)';c.beginPath();c.roundRect(-14,-20,28,18,2);c.fill();
  c.fillStyle=v.ac+'aa';c.fillRect(-11,-2,22,16);
  c.fillStyle='rgba(255,240,150,0.9)';c.fillRect(-20,-42,8,4);c.fillRect(12,-42,8,4);
  c.fillStyle='rgba(255,20,0,0.9)';c.fillRect(-20,37,8,4);c.fillRect(12,37,8,4);
}
function pvSBike(c,v){
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,-28,8,12,0,0,Math.PI*2);c.fill();c.fillStyle='#3a3a3a';c.beginPath();c.ellipse(0,-28,4,7,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,28,10,14,0,0,Math.PI*2);c.fill();c.fillStyle='#3a3a3a';c.beginPath();c.ellipse(0,28,6,9,0,0,Math.PI*2);c.fill();
  c.strokeStyle=v.ac;c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(0,-14);c.lineTo(0,14);c.stroke();
  c.fillStyle=v.ac;
  c.beginPath();c.moveTo(-13,-16);c.lineTo(-15,-4);c.lineTo(-13,10);c.lineTo(0,12);c.lineTo(13,10);c.lineTo(15,-4);c.lineTo(13,-16);c.closePath();c.fill();
  c.beginPath();c.moveTo(-10,-16);c.lineTo(-8,-24);c.lineTo(0,-28);c.lineTo(8,-24);c.lineTo(10,-16);c.closePath();c.fill();
  c.fillStyle='rgba(80,200,255,0.5)';c.beginPath();c.ellipse(0,-18,4,5,0,0,Math.PI*2);c.fill();
  c.fillStyle='#1a1a1a';c.beginPath();c.ellipse(0,-4,6,9,0,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(0,-16,4,5,0,0,Math.PI*2);c.fill();
  c.strokeStyle='#6a6a6a';c.lineWidth=2.5;c.beginPath();c.moveTo(-11,5);c.quadraticCurveTo(-15,16,-13,25);c.stroke();c.beginPath();c.moveTo(11,5);c.quadraticCurveTo(15,16,13,25);c.stroke();
}

// =========================================================
// GAME ENGINE
// =========================================================
const gc=document.getElementById('gameCanvas');
const gctx=gc.getContext('2d');
const ROAD_W=500; // wider road
const NUM_LANES=5;
let gameState=null,gameLoop=null,keysDown={};
let touchState={left:false,right:false,fire:false,boost:false};
let gamePaused=false;

document.addEventListener('keydown',e=>{
  keysDown[e.key]=true;keysDown[e.code]=true;
  if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();
  // Escape toggles pause menu (only during active game)
  if(e.key==='Escape'&&gc.style.display==='block'&&gameState&&!gameState.dead){
    if(gamePaused)resumeGame();else pauseGame();
  }
});
document.addEventListener('keyup',e=>{keysDown[e.key]=false;keysDown[e.code]=false;});

// Touch controls
function setupTouchControls(){
  const tl=document.getElementById('touchLeft');
  const tr=document.getElementById('touchRight');
  const tf=document.getElementById('touchFire');
  const tb=document.getElementById('touchBoost');
  const tc=document.getElementById('touchControls');
  tc.style.display='block';

  function addTouch(el,onStart,onEnd){
    el.addEventListener('touchstart',e=>{e.preventDefault();onStart();},{passive:false});
    el.addEventListener('touchend',e=>{e.preventDefault();onEnd();},{passive:false});
    el.addEventListener('touchcancel',e=>{e.preventDefault();onEnd();},{passive:false});
  }
  addTouch(tl,()=>{touchState.left=true;},()=>{touchState.left=false;});
  addTouch(tr,()=>{touchState.right=true;},()=>{touchState.right=false;});
  addTouch(tf,()=>{touchState.fire=true;tf.classList.add('active');},()=>{touchState.fire=false;tf.classList.remove('active');});
  addTouch(tb,()=>{touchState.boost=true;tb.classList.add('active');},()=>{touchState.boost=false;tb.classList.remove('active');});
}

function isMobile(){return 'ontouchstart' in window||navigator.maxTouchPoints>0;}

function startRace(){
  if(selectedVeh<0)return;
  document.getElementById('carselect').style.display='none';
  gc.width=window.innerWidth;gc.height=window.innerHeight;
  gc.style.display='block';
  document.getElementById('hud').style.display='flex';
  // Mode-specific HUD
  if(gameMode==='zombie'){
    document.getElementById('killsLabel').textContent='Kills';
    document.getElementById('ammoLabel').textContent='Ammo';
    document.getElementById('ammoWrap').style.display='block';
    document.getElementById('livesDisplay').style.display='block';
    document.getElementById('livesDisplay').textContent='❤❤❤';
  } else {
    document.getElementById('killsLabel').textContent='Score';
    document.getElementById('ammoLabel').textContent='';
    document.getElementById('ammoWrap').style.display='none';
    document.getElementById('livesDisplay').style.display='none';
  }
  if(isMobile()){
    setupTouchControls();
    document.getElementById('controlsHint').style.display='none';
  } else {
    document.getElementById('controlsHint').style.display='block';
  }
  runCountdown(()=>{document.getElementById('countdown').style.display='none';initGame();gameLoop=requestAnimationFrame(gameFrame);});
}

function runCountdown(cb){
  const el=document.getElementById('countdown'),num=document.getElementById('cdNum');
  el.style.display='flex';let count=3;
  num.textContent=count;num.style.color='#ff4400';
  num.style.animation='none';void num.offsetWidth;num.style.animation='countAnim 0.9s ease-out forwards';
  const iv=setInterval(()=>{
    count--;
    if(count<=0){clearInterval(iv);num.textContent='GO!';num.style.color='#00ff88';num.style.animation='none';void num.offsetWidth;num.style.animation='countAnim 0.9s ease-out forwards';setTimeout(cb,700);return;}
    num.textContent=count;num.style.color='#ff4400';num.style.animation='none';void num.offsetWidth;num.style.animation='countAnim 0.9s ease-out forwards';
  },1000);
}

const ZCOLORS=['#3a8a2a','#2a7a3a','#7a2a2a','#5a4a10','#4a1a7a','#1a6a5a','#8a4a00','#2a5a8a','#6a2a5a','#0a5a3a','#7a6a00','#4a0a1a'];
const ZOMBIE_SIZES=[
  {w:16,h:32,scale:0.75},  // small
  {w:20,h:40,scale:1.0},   // normal
  {w:20,h:40,scale:1.0},   // normal
  {w:26,h:50,scale:1.28},  // big
  {w:30,h:58,scale:1.5},   // huge
];
const CAR_COLORS=['#cc2200','#0044cc','#226600','#886600','#444','#aa00aa','#007788','#cc6600'];
const BIKE_COLORS=['#ff4400','#00ccff','#ffcc00','#cc00ff'];

function getLaneX(lane,W){
  const rX=W/2-ROAD_W/2;
  const laneW=ROAD_W/NUM_LANES;
  return rX+laneW*lane+laneW/2;
}

function initGame(){
  const W=gc.width,H=gc.height;
  const v=VEHICLES[selectedVeh];
  const playerLane=Math.floor(NUM_LANES/2);
  // Clear any stale key state
  Object.keys(keysDown).forEach(k=>keysDown[k]=false);
  Object.keys(touchState).forEach(k=>touchState[k]=false);
  gameState={v,player:{x:getLaneX(playerLane,W),y:H*0.75,boost:100,ammo:100,boosting:false,fireCooldown:0,vx:0},
    roadY:0,roadSpeed:0,score:0,kills:0,
    zombieHits:0,
    enemies:[],bullets:[],particles:[],blood:[],
    spawnT:0,dead:false,
    debris:genDebris(W,H),
    stripeOffset:0,
    settleTime:190,
    gameTime:0,
    difficultyRamp:0,
    spawnWave:0,      // increments every 10 seconds
    lastWaveTime:0,   // tracks last wave tick
    _won:false};
}

function genDebris(W,H){
  const d=[];const rL=W/2-ROAD_W/2,rR=W/2+ROAD_W/2;
  for(let i=0;i<60;i++){
    const side=i%2===0?'L':'R';
    d.push({x:side==='L'?rL-15-Math.random()*200:rR+15+Math.random()*200,y:Math.random()*3000-1200,t:Math.floor(Math.random()*5),sz:10+Math.random()*22,rot:Math.random()*Math.PI*2});
  }
  return d;
}

function spawnEnemy(init=false){
  const W=gc.width,H=gc.height;
  const v=VEHICLES[selectedVeh];
  const type=v.type;
  const lane=Math.floor(Math.random()*NUM_LANES);
  const ex=getLaneX(lane,W);

  if(gameMode==='zombie'){
    const sz=ZOMBIE_SIZES[Math.floor(Math.random()*ZOMBIE_SIZES.length)];
    gameState.enemies.push({
      kind:'zombie',
      x:ex,y:init?Math.random()*H:-80,
      lane,
      color:ZCOLORS[Math.floor(Math.random()*ZCOLORS.length)],
      color2:ZCOLORS[Math.floor(Math.random()*ZCOLORS.length)],
      wp:Math.random()*Math.PI*2,sp:0.7+Math.random()*0.9,
      dead:false,deadT:0,
      w:sz.w,h:sz.h,scale:sz.scale
    });
  } else {
    let ttype,tw,th,col;
    const btype=(type==='bike'||type==='sbike');
    const jtype=(type==='jet');
    if(jtype){
      ttype=Math.random()<0.5?'tjet1':'tjet2';
      tw=60;th=70;col='#00ccff';
    } else if(btype){
      ttype=['tbike1','tbike2','tbike3'][Math.floor(Math.random()*3)];
      tw=22;th=60;col=BIKE_COLORS[Math.floor(Math.random()*BIKE_COLORS.length)];
    } else {
      ttype=['tcar1','tcar2','tcar3','tmuscle'][Math.floor(Math.random()*4)];
      tw=44;th=88;col=CAR_COLORS[Math.floor(Math.random()*CAR_COLORS.length)];
    }
    // sp = this car's own forward speed (slower than player so player catches up)
    const sp=0.8+Math.random()*1.2;
    gameState.enemies.push({
      kind:'traffic',
      x:ex,y:init?-th-Math.random()*H*0.8:-th-20,
      lane,ttype,tw,th,col,sp,
      dead:false,deadT:0,
      w:tw,h:th
    });
  }
}

function pauseGame(){
  if(gamePaused||!gameState||gameState.dead)return;
  gamePaused=true;
  cancelAnimationFrame(gameLoop);
  document.getElementById('pauseMenu').style.display='flex';
}

function resumeGame(){
  if(!gamePaused)return;
  gamePaused=false;
  document.getElementById('pauseMenu').style.display='none';
  if(gameState&&!gameState.dead) gameLoop=requestAnimationFrame(gameFrame);
}

function pauseRestart(){
  document.getElementById('pauseMenu').style.display='none';
  gamePaused=false;
  resetGame();
}

function pauseMainMenu(){
  document.getElementById('pauseMenu').style.display='none';
  gamePaused=false;
  cancelAnimationFrame(gameLoop);
  gc.style.display='none';
  document.getElementById('hud').style.display='none';
  document.getElementById('controlsHint').style.display='none';
  document.getElementById('touchControls').style.display='none';
  document.getElementById('crash-overlay').style.display='none';
  Object.keys(touchState).forEach(k=>touchState[k]=false);
  document.getElementById('lobby').style.display='flex';
  drawLobby();
}

function gameFrame(){if(!gameState||gameState.dead||gamePaused)return;updateGame();drawGame();gameLoop=requestAnimationFrame(gameFrame);}

function updateGame(){
  const gs=gameState,p=gs.player,W=gc.width,H=gc.height,v=gs.v;

  // Tick timers
  gs.gameTime++;
  if(gs.settleTime>0)gs.settleTime--;

  // Difficulty ramp: 0→1 over ~3 minutes
  gs.difficultyRamp=Math.min(1,gs.gameTime/10800);

  // Speed ramp: starts at 25% of maxSpeed, grows to 100% over ~90 sec
  const speedRampFactor=0.25+0.75*Math.min(1,gs.gameTime/5400);
  const effectiveMaxSpeed=v.maxSpeed*speedRampFactor;

  // --- INPUT ---
  const leftKey =keysDown['a']||keysDown['A']||keysDown['ArrowLeft'] ||touchState.left;
  const rightKey=keysDown['d']||keysDown['D']||keysDown['ArrowRight']||touchState.right;
  const brakeKey=keysDown['s']||keysDown['S']||keysDown['ArrowDown'];
  const boostKey=(keysDown[' ']||keysDown['Space']||touchState.boost)&&p.boost>0;
  const fireKey =(keysDown['f']||keysDown['F']||touchState.fire)&&gameMode==='zombie';

  // --- HORIZONTAL MOVEMENT with smooth velocity ---
  const steerAcc=0.6*(v.handling/100)*1.3;
  const steerFric=0.82;
  if(leftKey)  p.vx-=steerAcc;
  else if(rightKey) p.vx+=steerAcc;
  else p.vx*=steerFric;
  // Clamp vx
  const maxVX=5*(v.handling/100)+1.5;
  p.vx=Math.max(-maxVX,Math.min(maxVX,p.vx));
  p.x+=p.vx;

  // --- ROAD SPEED ---
  if(brakeKey) gs.roadSpeed=Math.max(0.5,gs.roadSpeed-0.5);
  else gs.roadSpeed=Math.min(effectiveMaxSpeed+(boostKey?3.5:0), gs.roadSpeed+v.acc*0.7);

  // --- BOOST & AMMO ---
  p.boosting=boostKey;
  if(p.boosting) p.boost=Math.max(0,p.boost-0.85);
  else           p.boost=Math.min(100,p.boost+0.15);
  p.fireCooldown=Math.max(0,p.fireCooldown-1);
  if(fireKey&&p.ammo>0&&p.fireCooldown<=0){
    p.ammo=Math.max(0,p.ammo-1.5);p.fireCooldown=4;
    fireBullet(p.x,p.y-v.h/2-12);
  } else if(!fireKey) p.ammo=Math.min(100,p.ammo+0.07);

  // --- ROAD SCROLL ---
  const spd=gs.roadSpeed+(p.boosting?2.5:0);
  gs.roadY=(gs.roadY+spd)%80;
  gs.score+=spd*0.5;
  gs.stripeOffset=(gs.stripeOffset+spd)%80;

  // --- CLAMP PLAYER TO ROAD ---
  const rL=W/2-ROAD_W/2+v.w/2+4;
  const rR=W/2+ROAD_W/2-v.w/2-4;
  if(p.x<rL){p.x=rL;p.vx=Math.max(0,p.vx);}
  if(p.x>rR){p.x=rR;p.vx=Math.min(0,p.vx);}

  // --- BOOST PARTICLES ---
  if(p.boosting&&Math.random()<0.7){
    const cols=v.id==='jet'?'#44aaff':'#ff6600';
    const ox=v.id==='jet'?[-18,18]:[0];
    ox.forEach(o=>gs.particles.push({x:p.x+o+(Math.random()-0.5)*10,y:p.y+v.h/2,vx:(Math.random()-0.5)*3,vy:spd+2+Math.random()*3,life:1,color:cols,r:3+Math.random()*4}));
  }

  // --- UPDATE BULLETS / PARTICLES / BLOOD / DEBRIS ---
  gs.bullets.forEach(b=>b.y-=18);
  gs.bullets=gs.bullets.filter(b=>b.y>-30);
  gs.particles.forEach(pt=>{pt.x+=pt.vx;pt.y+=pt.vy;pt.life-=0.055;});
  gs.particles=gs.particles.filter(pt=>pt.life>0);
  gs.blood.forEach(s=>s.life-=0.007);
  gs.blood=gs.blood.filter(s=>s.life>0);
  gs.debris.forEach(d=>{d.y+=spd*0.72;if(d.y>H+80)d.y=-Math.random()*900-80;});

  // --- SPAWN ENEMIES ---
  gs.spawnT++;

  // Every 10 seconds (600 frames at 60fps), increment wave
  if(gs.settleTime<=0){
    const waveTick=600;
    if(gs.gameTime-gs.lastWaveTime>=waveTick){
      gs.spawnWave++;
      gs.lastWaveTime=gs.gameTime;
    }
  }

  if(gs.settleTime<=0){
    // Base interval shrinks with difficultyRamp, then wave bonus shrinks it further
    const baseInterval=Math.max(45,200-Math.floor(155*gs.difficultyRamp));
    // Each wave reduces interval by 8 frames (min 20), and adds multi-spawn chance
    const waveInterval=Math.max(20,baseInterval-gs.spawnWave*8);
    if(gs.spawnT>=waveInterval){
      gs.spawnT=0;
      spawnEnemy();
      // Extra spawns per wave (1 extra every 3 waves, max 4 extra)
      const extraSpawns=Math.min(4,Math.floor(gs.spawnWave/3));
      for(let ex=0;ex<extraSpawns;ex++){
        setTimeout(()=>{if(gameState&&!gameState.dead&&!gamePaused)spawnEnemy();},ex*180+180);
      }
    }
  }

  // --- UPDATE ENEMIES & COLLISION ---
  gs.enemies.forEach(z=>{
    if(z.dead){z.deadT++;return;}

    // Enemies scroll DOWN the screen at road speed (they come from top, pass player)
    // Traffic moves slower than player so player overtakes them — that's correct
    z.y+=spd-(z.sp||0)*0.6;
    if(z.kind==='zombie') z.wp+=0.13;

    // Bullet hit (zombies only)
    if(z.kind==='zombie'){
      for(let i=gs.bullets.length-1;i>=0;i--){
        const b=gs.bullets[i];
        if(!b.hit&&Math.abs(b.x-z.x)<20&&Math.abs(b.y-z.y)<28){
          b.hit=true;z.dead=true;z.deadT=0;gs.kills++;
          for(let j=0;j<9;j++)gs.blood.push({x:z.x+(Math.random()-0.5)*18,y:z.y+(Math.random()-0.5)*18,r:2+Math.random()*8,life:1,a:0.7+Math.random()*0.3});
          for(let j=0;j<5;j++)gs.particles.push({x:z.x,y:z.y,vx:(Math.random()-0.5)*5,vy:(Math.random()-0.5)*5-1,life:0.8,color:'#8b0000',r:3+Math.random()*4});
        }
      }
      gs.bullets=gs.bullets.filter(b=>!b.hit);
    }

    // --- COLLISION with player (AABB, tight boxes) ---
    if(!z.dead&&!gs.dead){
      const dx=Math.abs(z.x-p.x);
      const dy=Math.abs(z.y-p.y);
      const hw=(v.w/2+z.w/2)*0.72;
      const hh=(v.h/2+z.h/2)*0.60;
      if(dx<hw&&dy<hh){
        if(z.kind==='traffic'){
          playerDie();
        } else {
          z.dead=true;z.deadT=0;gs.kills++;
          for(let j=0;j<5;j++)gs.blood.push({x:z.x+(Math.random()-0.5)*16,y:z.y+(Math.random()-0.5)*16,r:3+Math.random()*6,life:1,a:0.8});
          if(gameMode==='zombie'){
            gs.zombieHits++;
            for(let j=0;j<10;j++)gs.particles.push({x:p.x,y:p.y,vx:(Math.random()-0.5)*9,vy:(Math.random()-0.5)*9,life:0.8,color:'#ff0000',r:4+Math.random()*6});
            if(gs.zombieHits>=3){gs.dead=true;setTimeout(zombiePlayerDie,400);}
          }
        }
      }
    }
  });

  if(gameMode==='zombie'&&gs.kills>=35&&!gs._won){gs._won=true;showZombieWin();}
  gs.enemies=gs.enemies.filter(z=>z.y<H+120&&z.deadT<45);

  // HUD
  document.getElementById('speedVal').textContent=Math.floor(spd*28);
  document.getElementById('scoreVal').textContent=Math.floor(gs.score);
  document.getElementById('killsVal').textContent=gameMode==='zombie'?gs.kills+'/35':Math.floor(gs.score/50);
  document.getElementById('boostBar').style.width=p.boost+'%';
  document.getElementById('waveVal').textContent=gs.spawnWave+1;
  if(gameMode==='zombie'){
    document.getElementById('ammoBar').style.width=p.ammo+'%';
    const lives=3-gs.zombieHits;
    document.getElementById('livesDisplay').textContent='❤'.repeat(Math.max(0,lives))+'🖤'.repeat(Math.min(3,gs.zombieHits));
  }
  if(gameMode==='traffic'&&gs.score>=20000&&!gs._won){gs._won=true;showTrafficWin();}
}

function fireBullet(x,y){
  gameState.bullets.push({x,y,hit:false});
  for(let i=0;i<6;i++)gameState.particles.push({x,y,vx:(Math.random()-0.5)*7,vy:-Math.random()*4,life:0.45,color:'#ffee33',r:1.5+Math.random()*3});
}

function playerDie(){
  if(gameState.dead)return;
  gameState.dead=true;cancelAnimationFrame(gameLoop);
  const ov=document.getElementById('crash-overlay');
  ov.style.display='flex';ov.style.animation='none';void ov.offsetWidth;ov.style.animation='crashBg 1.2s ease-out forwards';
  setTimeout(resetGame,2500);
}

function zombiePlayerDie(){
  cancelAnimationFrame(gameLoop);
  gameState.dead=true;
  const ov=document.getElementById('zombieDieOverlay');
  ov.style.display='flex';
}

function showZombieWin(){
  cancelAnimationFrame(gameLoop);
  gameState.dead=true;
  const wo=document.getElementById('winOverlay');
  document.getElementById('winPlayerName').textContent=playerName;
  document.getElementById('winScoreText').textContent='35 ZOMBIES ELIMINATED!';
  wo.style.display='flex';
  startConfetti();
  setTimeout(()=>{
    wo.style.display='none';
    stopConfetti();
    showCredits(()=>{resetGame();});
  },5000);
}

function showTrafficWin(){
  cancelAnimationFrame(gameLoop);
  gameState.dead=true;
  const wo=document.getElementById('winOverlay');
  document.getElementById('winPlayerName').textContent=playerName;
  document.getElementById('winScoreText').textContent='SCORE: '+Math.floor(gameState.score);
  wo.style.display='flex';
  startConfetti();
  setTimeout(()=>{
    wo.style.display='none';
    stopConfetti();
    showCredits(()=>{resetGame();});
  },5000);
}

// CONFETTI
let confettiAnim=null,confettiParts=[];
function startConfetti(){
  const cv=document.getElementById('confettiCanvas');
  cv.style.display='block';
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  const ctx=cv.getContext('2d');
  confettiParts=Array.from({length:180},()=>({
    x:Math.random()*cv.width,y:-20-Math.random()*200,
    vx:(Math.random()-0.5)*4,vy:3+Math.random()*4,
    color:['#ff4400','#ffcc00','#00ff88','#00ccff','#ff00cc','#ffffff'][Math.floor(Math.random()*6)],
    r:5+Math.random()*8,rot:Math.random()*Math.PI*2,rv:(Math.random()-0.5)*0.2
  }));
  function drawC(){
    ctx.clearRect(0,0,cv.width,cv.height);
    confettiParts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.rot+=p.rv;
      if(p.y>cv.height+20){p.y=-20;p.x=Math.random()*cv.width;}
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
      ctx.fillStyle=p.color;ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r/2);
      ctx.restore();
    });
    confettiAnim=requestAnimationFrame(drawC);
  }drawC();
}
function stopConfetti(){
  cancelAnimationFrame(confettiAnim);
  document.getElementById('confettiCanvas').style.display='none';
}

// CREDITS
const CREDITS=[
  {name:'DAKSH BHARDWAJ',role:'ARTIST'},
  {name:'ANANT SAINI',role:'DEVELOPER'},
  {name:'PRANAV PANDEY',role:'GAME DESIGNER'},
  {name:'Samay Chutani',role:'LEAD DEVELOPER'},
];
function showCredits(cb){
  const ov=document.getElementById('creditsOverlay');
  ov.style.display='flex';
  let i=0;
  function showNext(){
    if(i>=CREDITS.length){ov.style.display='none';if(cb)cb();return;}
    const cr=CREDITS[i];
    const nm=document.getElementById('crName');
    const rl=document.getElementById('crRole');
    nm.textContent=cr.name;rl.textContent=cr.role;
    nm.style.animation='none';void nm.offsetWidth;nm.style.animation='crFly 0.8s ease-out both';
    i++;
    setTimeout(showNext,1400);
  }
  showNext();
}

function restartFromWin(){
  document.getElementById('winOverlay').style.display='none';
  stopConfetti();
  resetGame();
}
function restartFromZombieDie(){
  document.getElementById('zombieDieOverlay').style.display='none';
  resetGame();
}
function exitToLobby(){
  document.getElementById('winOverlay').style.display='none';
  document.getElementById('zombieDieOverlay').style.display='none';
  stopConfetti();
  cancelAnimationFrame(gameLoop);
  gc.style.display='none';
  document.getElementById('hud').style.display='none';
  document.getElementById('controlsHint').style.display='none';
  document.getElementById('touchControls').style.display='none';
  document.getElementById('crash-overlay').style.display='none';
  Object.keys(touchState).forEach(k=>touchState[k]=false);
  document.getElementById('lobby').style.display='flex';
  drawLobby();
}

// =========================================================
// DRAW GAME
// =========================================================
function drawGame(){
  const gs=gameState,W=gc.width,H=gc.height;
  gctx.clearRect(0,0,W,H);
  const isLight=document.body.classList.contains('light-theme');
  if(!isLight){
  const sky=gctx.createLinearGradient(0,0,0,H*0.36);
  sky.addColorStop(0,'#070107');sky.addColorStop(0.55,'#140307');sky.addColorStop(1,'#1e0606');
  gctx.fillStyle=sky;gctx.fillRect(0,0,W,H*0.36);
  // Moon
  gctx.fillStyle='rgba(255,215,165,0.55)';gctx.beginPath();gctx.arc(W*0.11,H*0.09,26,0,Math.PI*2);gctx.fill();
  gctx.fillStyle='rgba(255,215,165,0.1)';gctx.beginPath();gctx.arc(W*0.11,H*0.09,48,0,Math.PI*2);gctx.fill();
  // Stars
  if(!gs._stars){gs._stars=Array.from({length:60},()=>({x:Math.random()*W,y:Math.random()*H*0.36,r:Math.random()*1.5,a:0.3+Math.random()*0.7}));}
  gs._stars.forEach(s=>{gctx.globalAlpha=s.a;gctx.fillStyle='#fff';gctx.beginPath();gctx.arc(s.x,s.y,s.r,0,Math.PI*2);gctx.fill();});gctx.globalAlpha=1;
  // Dead trees
  [0.04,0.1,0.16,0.84,0.9,0.96,0.07,0.93].forEach((tx,i)=>{
    const x=tx*W,y=H*0.36,h=55+i*14;
    gctx.strokeStyle='rgba(22,10,6,0.9)';gctx.lineWidth=3.5-i*0.2;
    gctx.beginPath();gctx.moveTo(x,y);gctx.lineTo(x+Math.sin(i*1.4)*7,y-h);gctx.stroke();
    gctx.lineWidth=1.5;
    gctx.beginPath();gctx.moveTo(x,y-h*0.5);gctx.lineTo(x+18+i*3,y-h*0.68);gctx.stroke();
    gctx.beginPath();gctx.moveTo(x,y-h*0.6);gctx.lineTo(x-16-i*2,y-h*0.78);gctx.stroke();
  });
  // Horizon glow
  const hg=gctx.createLinearGradient(0,H*0.26,0,H*0.44);
  hg.addColorStop(0,'rgba(160,0,0,0.28)');hg.addColorStop(1,'transparent');
  gctx.fillStyle=hg;gctx.fillRect(0,H*0.26,W,H*0.2);
  // Ground
  gctx.fillStyle='#0c0906';gctx.fillRect(0,H*0.36,W,H*0.64);
  gctx.strokeStyle='#100c08';gctx.lineWidth=1;
  for(let i=0;i<14;i++){const cx=(i/14)*W+Math.sin(i*0.9)*30;gctx.beginPath();gctx.moveTo(cx,H*0.36);gctx.lineTo(cx+28,H);gctx.stroke();}
  } // end !isLight dark bg

  // ===== ROAD =====
  const rX=W/2-ROAD_W/2;
  // Always draw road color above horizon so traffic doesn't emerge from a void
  if(isLight){
    // Day: draw asphalt strip above horizon
    gctx.fillStyle='#c0bdb5';gctx.fillRect(rX,0,ROAD_W,H*0.36);
    // Side grass above horizon
    gctx.fillStyle='#4caf50';gctx.fillRect(0,0,rX,H*0.36);gctx.fillRect(rX+ROAD_W,0,W-(rX+ROAD_W),H*0.36);
  } else {
    // Night: draw dark asphalt above horizon
    gctx.fillStyle='#141414';gctx.fillRect(rX,0,ROAD_W,H*0.36);
    // Side ground above horizon
    gctx.fillStyle='#0c0906';gctx.fillRect(0,0,rX,H*0.36);gctx.fillRect(rX+ROAD_W,0,W-(rX+ROAD_W),H*0.36);
  }
  if(isLight){
    // ---- HIGHWAY (light theme) ----
    // Sky gradient - daytime
    gctx.clearRect(0,0,W,H);
    const skyday=gctx.createLinearGradient(0,0,0,H*0.36);
    skyday.addColorStop(0,'#87ceeb');skyday.addColorStop(0.6,'#b0e0ff');skyday.addColorStop(1,'#d4f1ff');
    gctx.fillStyle=skyday;gctx.fillRect(0,0,W,H*0.36);
    // Sun
    gctx.fillStyle='rgba(255,240,100,0.9)';gctx.beginPath();gctx.arc(W*0.85,H*0.08,28,0,Math.PI*2);gctx.fill();
    gctx.fillStyle='rgba(255,240,100,0.18)';gctx.beginPath();gctx.arc(W*0.85,H*0.08,52,0,Math.PI*2);gctx.fill();
    // Clouds
    if(!gs._clouds){gs._clouds=[{x:W*0.15,y:H*0.06,w:90},{x:W*0.45,y:H*0.04,w:120},{x:W*0.7,y:H*0.1,w:80}];}
    gs._clouds.forEach(cl=>{
      cl.x-=0.18;if(cl.x<-cl.w-20)cl.x=W+cl.w;
      gctx.fillStyle='rgba(255,255,255,0.88)';
      gctx.beginPath();gctx.ellipse(cl.x,cl.y,cl.w/2,18,0,0,Math.PI*2);gctx.fill();
      gctx.beginPath();gctx.ellipse(cl.x-cl.w*0.2,cl.y+5,cl.w*0.3,14,0,0,Math.PI*2);gctx.fill();
      gctx.beginPath();gctx.ellipse(cl.x+cl.w*0.2,cl.y+4,cl.w*0.28,13,0,0,Math.PI*2);gctx.fill();
    });
    // Green grass / shoulder
    gctx.fillStyle='#4caf50';gctx.fillRect(0,H*0.36,W,H*0.64);
    // Grass texture strokes
    gctx.strokeStyle='#388e3c';gctx.lineWidth=1;
    for(let i=0;i<22;i++){const gx=(i/22)*W;gctx.beginPath();gctx.moveTo(gx,H*0.36);gctx.lineTo(gx+20,H);gctx.stroke();}
    // Highway asphalt — concrete grey
    gctx.fillStyle='#c0bdb5';gctx.fillRect(rX,H*0.36,ROAD_W,H*0.64);
    // Tarmac surface bands
    gctx.fillStyle='#b8b5ad';
    for(let y=H*0.36;y<H;y+=24){if(Math.floor((y+gs.roadY*5)/24)%3===0)gctx.fillRect(rX,y,ROAD_W,12);}
    // Highway side barriers (concrete blocks)
    for(let y=H*0.36;y<H;y+=22){
      const col=(Math.floor(y/22))%2===0?'#e8e0d8':'#d0c8c0';
      gctx.fillStyle=col;gctx.fillRect(rX-12,y,12,11);gctx.fillRect(rX+ROAD_W,y,12,11);
    }
    // Road edge lines — white
    gctx.strokeStyle='#fff';gctx.lineWidth=4;
    gctx.beginPath();gctx.moveTo(rX,H*0.36);gctx.lineTo(rX,H);gctx.stroke();
    gctx.beginPath();gctx.moveTo(rX+ROAD_W,H*0.36);gctx.lineTo(rX+ROAD_W,H);gctx.stroke();
    // Lane dashes — yellow
    gctx.strokeStyle='#f5c518';gctx.lineWidth=3;gctx.setLineDash([36,24]);gctx.lineDashOffset=-gs.roadY*5;
    const lw2=ROAD_W/NUM_LANES;
    for(let l=1;l<NUM_LANES;l++){gctx.beginPath();gctx.moveTo(rX+lw2*l,H*0.36);gctx.lineTo(rX+lw2*l,H);gctx.stroke();}
    gctx.setLineDash([]);
    // Highway guard rails (metal)
    gctx.strokeStyle='rgba(200,180,140,0.7)';gctx.lineWidth=2.5;
    gctx.beginPath();gctx.moveTo(rX-6,H*0.36);gctx.lineTo(rX-6,H);gctx.stroke();
    gctx.beginPath();gctx.moveTo(rX+ROAD_W+6,H*0.36);gctx.lineTo(rX+ROAD_W+6,H);gctx.stroke();
    // Distance trees along highway
    if(!gs._trees){gs._trees=Array.from({length:14},(_,i)=>({side:i%2===0?-1:1,frac:i/14}));}
    gs._trees.forEach(tr=>{
      const tx=W/2+tr.side*(ROAD_W/2+60+Math.abs(tr.side)*40);
      const ty=H*0.36+H*0.64*tr.frac;
      gctx.fillStyle='#2e7d32';gctx.beginPath();gctx.arc(tx,ty-18,14,0,Math.PI*2);gctx.fill();
      gctx.fillStyle='#1b5e20';gctx.beginPath();gctx.arc(tx+4,ty-24,10,0,Math.PI*2);gctx.fill();
      gctx.fillStyle='#6d4c41';gctx.fillRect(tx-3,ty-5,6,16);
    });
    // Debris (off road - lighter)
    gs.debris.forEach(d=>{
      gctx.save();gctx.translate(d.x,d.y);gctx.rotate(d.rot);
      if(d.t===0){gctx.fillStyle='#8d6e63';gctx.beginPath();gctx.ellipse(0,0,d.sz,d.sz*0.55,0,0,Math.PI*2);gctx.fill();}
      else if(d.t===1){gctx.fillStyle='#795548';gctx.fillRect(-d.sz,-d.sz*0.45,d.sz*2,d.sz*0.9);}
      else if(d.t===2){gctx.fillStyle='rgba(160,140,110,0.5)';gctx.beginPath();gctx.arc(0,0,d.sz*0.38,0,Math.PI*2);gctx.fill();}
      else{gctx.fillStyle='#a1887f';gctx.fillRect(-d.sz*0.4,-d.sz*0.4,d.sz*0.8,d.sz*0.8);}
      gctx.restore();
    });
  } else {
    // ---- ORIGINAL DARK ROAD ----
    gctx.fillStyle='#141414';gctx.fillRect(rX,H*0.36,ROAD_W,H*0.64);
    // Road surface texture
    gctx.fillStyle='#161616';
    for(let y=H*0.36;y<H;y+=22){if(Math.floor((y+gs.roadY*5)/22)%3===0)gctx.fillRect(rX,y,ROAD_W,11);}

    // ===== BLACK & WHITE ILLUSION SIDE STRIPES =====
    drawIllusionStripes(gctx,rX,H,gs.stripeOffset);

    // Road edges — bold
    gctx.strokeStyle='#ff4400';gctx.lineWidth=3;
    gctx.beginPath();gctx.moveTo(rX,H*0.36);gctx.lineTo(rX,H);gctx.stroke();
    gctx.beginPath();gctx.moveTo(rX+ROAD_W,H*0.36);gctx.lineTo(rX+ROAD_W,H);gctx.stroke();

    // Lane dashes (5 lanes)
    gctx.strokeStyle='#2a2a2a';gctx.lineWidth=2;gctx.setLineDash([28,28]);gctx.lineDashOffset=-gs.roadY*5;
    const lw=ROAD_W/NUM_LANES;
    for(let l=1;l<NUM_LANES;l++){gctx.beginPath();gctx.moveTo(rX+lw*l,H*0.36);gctx.lineTo(rX+lw*l,H);gctx.stroke();}
    gctx.setLineDash([]);

    // Rumble strips
    for(let y=H*0.36;y<H;y+=34){
      gctx.fillStyle=(Math.floor(y/34))%2===0?'#7a0000':'#181818';
      gctx.fillRect(rX-9,y,9,17);gctx.fillRect(rX+ROAD_W,y,9,17);
    }

    // Debris (off road)
    gs.debris.forEach(d=>{
      gctx.save();gctx.translate(d.x,d.y);gctx.rotate(d.rot);
      if(d.t===0){gctx.fillStyle='#181210';gctx.beginPath();gctx.ellipse(0,0,d.sz,d.sz*0.55,0,0,Math.PI*2);gctx.fill();}
      else if(d.t===1){gctx.fillStyle='#160a0a';gctx.fillRect(-d.sz,-d.sz*0.45,d.sz*2,d.sz*0.9);gctx.fillStyle='#220e0e';gctx.fillRect(-d.sz*0.45,-d.sz*0.75,d.sz*0.9,d.sz*0.45);}
      else if(d.t===2){gctx.fillStyle='rgba(180,160,130,0.4)';gctx.beginPath();gctx.arc(0,0,d.sz*0.38,0,Math.PI*2);gctx.fill();}
      else if(d.t===3){gctx.fillStyle='#181808';gctx.beginPath();gctx.ellipse(0,0,d.sz*0.38,d.sz*0.55,0,0,Math.PI*2);gctx.fill();gctx.strokeStyle='#262608';gctx.lineWidth=2;gctx.stroke();}
      else{gctx.fillStyle='#101010';gctx.fillRect(-d.sz*0.4,-d.sz*0.4,d.sz*0.8,d.sz*0.8);}
      gctx.restore();
    });
  }

  // Blood splatters
  gs.blood.forEach(s=>{gctx.globalAlpha=s.life*s.a;gctx.fillStyle='#7a0000';gctx.beginPath();gctx.arc(s.x,s.y,s.r,0,Math.PI*2);gctx.fill();});gctx.globalAlpha=1;

  // Enemies
  gs.enemies.forEach(z=>{
    if(z.kind==='zombie')drawZombie(gctx,z);
    else drawTrafficVehicle(gctx,z);
  });

  // Bullets
  gs.bullets.forEach(b=>{
    gctx.fillStyle='#ffee33';gctx.beginPath();gctx.arc(b.x,b.y,3,0,Math.PI*2);gctx.fill();
    gctx.fillStyle='rgba(255,230,0,0.25)';gctx.beginPath();gctx.arc(b.x,b.y,7,0,Math.PI*2);gctx.fill();
  });

  // Particles
  gs.particles.forEach(pt=>{gctx.globalAlpha=pt.life;gctx.fillStyle=pt.color;gctx.beginPath();gctx.arc(pt.x,pt.y,pt.r,0,Math.PI*2);gctx.fill();});gctx.globalAlpha=1;

  // Player vehicle
  drawPlayerVehicle(gctx,gs.player,gs.v,gs.roadSpeed);

  // Muzzle flash
  if(gs.player.fireCooldown>2&&gameMode==='zombie'){
    gctx.fillStyle='rgba(255,225,0,0.65)';gctx.beginPath();gctx.arc(gs.player.x,gs.player.y-gs.v.h/2-14,9,0,Math.PI*2);gctx.fill();
  }

  // Boost speed lines
  if(gs.player.boosting){
    gctx.globalAlpha=0.1;gctx.strokeStyle='#ff4400';gctx.lineWidth=1;
    for(let i=0;i<14;i++){const lx=Math.random()*W;gctx.beginPath();gctx.moveTo(lx,0);gctx.lineTo(lx+16,H);gctx.stroke();}
    gctx.globalAlpha=1;
  }

  // Vignette
  const vig=gctx.createRadialGradient(W/2,H/2,H*0.16,W/2,H/2,H*0.72);
  vig.addColorStop(0,'transparent');vig.addColorStop(1,'rgba(0,0,0,0.72)');
  gctx.fillStyle=vig;gctx.fillRect(0,0,W,H);
}

// =========================================================
// ILLUSION STRIPES
// =========================================================
function drawIllusionStripes(c,rX,H,offset){
  const W_STRIPE=40;
  const horizonY=H*0.36;
  // Left side stripes
  const leftEnd=rX;
  const leftStart=Math.max(0,leftEnd-220);
  // Right side stripes
  const rightStart=rX+ROAD_W;
  const rightEnd=Math.min(leftEnd+ROAD_W+440,leftEnd+220+ROAD_W);

  // Draw both sides
  [[leftStart,leftEnd],[rightStart,rightEnd]].forEach(([x1,x2])=>{
    const w=x2-x1;
    for(let i=0;i<Math.ceil(w/W_STRIPE)+1;i++){
      const sx=x1+i*W_STRIPE;
      const isBlack=i%2===0;
      // Perspective-mapped stripe
      // At top (horizon): compressed; at bottom: full width
      for(let y=horizonY;y<H;y+=2){
        const t=(y-horizonY)/(H-horizonY); // 0 at top, 1 at bottom
        // animate with offset
        const animI=Math.floor((i+offset/W_STRIPE))%2===0;
        const col=animI?'#111111':'#000000';
        const stripW=W_STRIPE*t*1.5;
        const stripX=x1+(i-offset/W_STRIPE)*W_STRIPE*t*1.5;
        // Only draw within bounds
        if(stripX+stripW<x1||stripX>x2)continue;
        c.fillStyle=col;
        c.fillRect(Math.max(x1,stripX),y,Math.min(stripW,x2-Math.max(x1,stripX)),2);
      }
    }
    // Bright white lines for stark illusion effect
    for(let i=0;i<=Math.ceil(w/W_STRIPE)+1;i++){
      const progress=(offset%(W_STRIPE))/W_STRIPE;
      for(let y=horizonY;y<H;y+=3){
        const t=(y-horizonY)/(H-horizonY);
        const lineX=x1+(i-progress)*W_STRIPE*t*1.5;
        if(lineX<x1||lineX>x2)continue;
        c.strokeStyle='rgba(255,255,255,0.18)';
        c.lineWidth=1;
        c.beginPath();c.moveTo(lineX,y);c.lineTo(lineX,y+3);c.stroke();
      }
    }
  });
}

// =========================================================
// ZOMBIE DRAW
// =========================================================
function drawZombie(c,z){
  if(z.dead&&z.deadT>0){
    c.save();c.translate(z.x,z.y);c.globalAlpha=1-z.deadT/45;
    c.fillStyle='#6a0000';c.beginPath();c.ellipse(0,0,14,7,0,0,Math.PI*2);c.fill();
    c.globalAlpha=1;c.restore();return;
  }
  c.save();c.translate(z.x,z.y);
  const sc=z.scale||1;
  c.scale(sc,sc);
  const wp=z.wp,ll=Math.sin(wp)*5,rl=-Math.sin(wp)*5;
  c.fillStyle='rgba(0,0,0,0.25)';c.beginPath();c.ellipse(0,2,9,3.5,0,0,Math.PI*2);c.fill();
  c.strokeStyle='#182a10';c.lineWidth=5.5;c.lineCap='round';
  c.beginPath();c.moveTo(-4,0);c.lineTo(-4+ll,15);c.stroke();
  c.beginPath();c.moveTo(4,0);c.lineTo(4+rl,15);c.stroke();
  c.fillStyle=z.color;c.beginPath();c.roundRect(-7,-17,14,18,1);c.fill();
  // pants/lower body in color2
  c.fillStyle=z.color2||z.color;c.beginPath();c.roundRect(-7,-1,6,10,1);c.fill();c.fillStyle=z.color2||z.color;c.beginPath();c.roundRect(1,-1,6,10,1);c.fill();
  c.strokeStyle='#0a1e08';c.lineWidth=1;c.beginPath();c.moveTo(-7,-7);c.lineTo(3,-11);c.stroke();
  c.strokeStyle=z.color;c.lineWidth=4.5;c.lineCap='round';
  c.beginPath();c.moveTo(-7,-9);c.lineTo(-19+Math.sin(wp)*4,-1);c.stroke();
  c.beginPath();c.moveTo(7,-9);c.lineTo(19-Math.sin(wp)*4,-1);c.stroke();
  c.fillStyle='#c09850';c.beginPath();c.ellipse(0,-25,8,10,0,0,Math.PI*2);c.fill();
  c.fillStyle='#cc0000';c.beginPath();c.arc(-3,-26,2.8,0,Math.PI*2);c.fill();c.beginPath();c.arc(3,-26,2.8,0,Math.PI*2);c.fill();
  c.fillStyle='rgba(255,0,0,0.35)';c.beginPath();c.arc(-3,-26,5,0,Math.PI*2);c.fill();c.beginPath();c.arc(3,-26,5,0,Math.PI*2);c.fill();
  c.fillStyle='#080808';c.beginPath();c.arc(0,-20,3.5,0,Math.PI);c.fill();
  c.fillStyle='#0a0400';c.beginPath();c.ellipse(-2,-33,4.5,3.5,0.3,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(3.5,-32,3.5,3,-0.3,0,Math.PI*2);c.fill();
  c.restore();
}

// =========================================================
// TRAFFIC VEHICLE DRAW
// =========================================================
function drawTrafficVehicle(c,t){
  if(t.dead&&t.deadT>0){
    c.save();c.translate(t.x,t.y);c.globalAlpha=1-t.deadT/45;
    c.fillStyle='rgba(255,80,0,0.7)';c.beginPath();c.ellipse(0,0,t.tw,t.th/3,0,0,Math.PI*2);c.fill();
    c.globalAlpha=1;c.restore();return;
  }
  c.save();c.translate(t.x,t.y);
  const tp=t.ttype;
  if(tp==='tcar1'||tp==='tcar2'||tp==='tcar3'){drawTCar(c,t);}
  else if(tp==='tmuscle'){drawTMuscle(c,t);}
  else if(tp==='tbike1'||tp==='tbike2'||tp==='tbike3'){drawTBike(c,t);}
  else if(tp==='tjet1'||tp==='tjet2'){drawTJet(c,t);}
  c.restore();
}

function drawTCar(c,t){
  const w=t.tw/2,h=t.th/2,col=t.col;
  // Shadow
  c.fillStyle='rgba(0,0,0,0.3)';c.beginPath();c.ellipse(2,h+4,w+4,6,0,0,Math.PI*2);c.fill();
  // Wheels
  [[-w,-h+18],[-w,h-18],[w,-h+18],[w,h-18]].forEach(([wx,wy])=>{
    c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(wx,wy,7,10,0,0,Math.PI*2);c.fill();
    c.fillStyle='#444';c.beginPath();c.ellipse(wx,wy,4,6,0,0,Math.PI*2);c.fill();
  });
  // Body
  c.fillStyle=col;
  c.beginPath();c.moveTo(0,-h);c.lineTo(w-2,-h+12);c.lineTo(w,-h+36);c.lineTo(w-2,h-8);c.lineTo(0,h);c.lineTo(-w+2,h-8);c.lineTo(-w,-h+36);c.lineTo(-w+2,-h+12);c.closePath();c.fill();
  // Windshield
  c.fillStyle='rgba(80,200,255,0.22)';c.beginPath();c.roundRect(-w+3,-h+14,t.tw-6,18,2);c.fill();
  // Roof
  c.fillStyle=col;c.beginPath();c.roundRect(-w+4,-h+32,t.tw-8,h-8,2);c.fill();
  // Rear window
  c.fillStyle='rgba(80,200,255,0.18)';c.beginPath();c.roundRect(-w+5,h-28,t.tw-10,12,2);c.fill();
  // Headlights
  c.fillStyle='rgba(255,240,150,0.8)';c.fillRect(-w,-h-1,8,4);c.fillRect(w-8,-h-1,8,4);
  // Tail lights
  c.fillStyle='rgba(255,20,0,0.8)';c.fillRect(-w,h-4,8,4);c.fillRect(w-8,h-4,8,4);
}

function drawTMuscle(c,t){
  const w=t.tw/2,h=t.th/2,col=t.col;
  c.fillStyle='rgba(0,0,0,0.3)';c.beginPath();c.ellipse(2,h+6,w+5,7,0,0,Math.PI*2);c.fill();
  [[-w,-h+20],[-w,h-24],[w,-h+20],[w,h-24]].forEach(([wx,wy])=>{
    c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(wx,wy,8,12,0,0,Math.PI*2);c.fill();
    c.fillStyle='#444';c.beginPath();c.ellipse(wx,wy,4.5,7,0,0,Math.PI*2);c.fill();
  });
  c.fillStyle=col;
  c.beginPath();c.moveTo(-w+5,-h);c.lineTo(w-5,-h);c.lineTo(w,-h+16);c.lineTo(w,h-12);c.lineTo(w-4,h);c.lineTo(-w+4,h);c.lineTo(-w,h-12);c.lineTo(-w,-h+16);c.closePath();c.fill();
  c.fillStyle='rgba(80,200,255,0.2)';c.beginPath();c.roundRect(-w+4,-h+18,t.tw-8,16,2);c.fill();
  c.fillStyle=col;c.beginPath();c.roundRect(-w+4,-h+34,t.tw-8,h-10,2);c.fill();
  c.fillStyle='rgba(255,240,150,0.9)';c.fillRect(-w,-h-1,10,5);c.fillRect(w-10,-h-1,10,5);
  c.fillStyle='rgba(255,20,0,0.9)';c.fillRect(-w,h-5,10,5);c.fillRect(w-10,h-5,10,5);
}

function drawTBike(c,t){
  const w=t.tw/2,h=t.th/2,col=t.col;
  c.fillStyle='rgba(0,0,0,0.2)';c.beginPath();c.ellipse(0,h+2,w+2,3,0,0,Math.PI*2);c.fill();
  // Wheels
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,-h+8,w+2,12,0,0,Math.PI*2);c.fill();
  c.fillStyle='#3a3a3a';c.beginPath();c.ellipse(0,-h+8,w-1,7,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,h-8,w+2,13,0,0,Math.PI*2);c.fill();
  c.fillStyle='#3a3a3a';c.beginPath();c.ellipse(0,h-8,w,8,0,0,Math.PI*2);c.fill();
  // Frame
  c.strokeStyle=col;c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(0,-h+20);c.lineTo(0,h-18);c.stroke();
  // Fairing
  c.fillStyle=col;c.beginPath();c.moveTo(-w,-h+20);c.lineTo(-w+2,0);c.lineTo(-w+2,h-18);c.lineTo(w-2,h-18);c.lineTo(w+2,0);c.lineTo(w,-h+20);c.closePath();c.fill();
  c.fillStyle='rgba(80,200,255,0.4)';c.beginPath();c.ellipse(0,-h+16,w-1,6,0,0,Math.PI*2);c.fill();
  // Rider silhouette
  c.fillStyle='#080810';c.beginPath();c.ellipse(0,-h/2,w-3,h/3,0,0,Math.PI*2);c.fill();
}

function drawTJet(c,t){
  const w=t.tw/2,h=t.th/2,col=t.col;
  c.fillStyle='rgba(0,0,0,0.2)';c.beginPath();c.ellipse(0,h+3,w+5,4,0,0,Math.PI*2);c.fill();
  // Wings
  c.fillStyle=col+'60';
  c.beginPath();c.moveTo(0,-4);c.lineTo(-w-18,12);c.lineTo(-w-12,22);c.lineTo(0,4);c.closePath();c.fill();
  c.beginPath();c.moveTo(0,-4);c.lineTo(w+18,12);c.lineTo(w+12,22);c.lineTo(0,4);c.closePath();c.fill();
  // Tail fins
  c.fillStyle=col+'40';
  c.beginPath();c.moveTo(-w,h-14);c.lineTo(-w-12,h+4);c.lineTo(-w-6,h);c.lineTo(-w,h-8);c.closePath();c.fill();
  c.beginPath();c.moveTo(w,h-14);c.lineTo(w+12,h+4);c.lineTo(w+6,h);c.lineTo(w,h-8);c.closePath();c.fill();
  // Body
  c.fillStyle=col;
  c.beginPath();c.moveTo(0,-h);c.lineTo(w-3,-h+14);c.lineTo(w,h-14);c.lineTo(w-5,h);c.lineTo(-w+5,h);c.lineTo(-w,h-14);c.lineTo(-w+3,-h+14);c.closePath();c.fill();
  // Cockpit
  c.fillStyle='rgba(80,200,255,0.45)';c.beginPath();c.ellipse(0,-h+22,w-5,14,0,0,Math.PI*2);c.fill();
  // Engines
  c.fillStyle='#888';[[-w,8],[w,8]].forEach(([mx,my])=>{c.beginPath();c.ellipse(mx,my,2.5,6,0,0,Math.PI*2);c.fill();});
  // Nose
  c.fillStyle='#0a0a0a';c.beginPath();c.moveTo(-3,-h);c.lineTo(3,-h);c.lineTo(0,-h-10);c.closePath();c.fill();
}

// =========================================================
// PLAYER VEHICLE DRAW
// =========================================================
function flame(c,v,p,ox=0){
  if(!p.boosting)return;
  ['#ff5500','#ff7700','#ffaa00','#ffdd00'].forEach((fl,fi)=>{c.fillStyle=fl;c.beginPath();c.moveTo(-5+fi*2.5+ox,v.h/2);c.lineTo(ox,v.h/2+20-fi*4);c.lineTo(5-fi*2.5+ox,v.h/2);c.closePath();c.fill();});
}

function drawPlayerVehicle(c,p,v,speed){
  c.save();c.translate(p.x,p.y);
  const id=v.id;
  if(id==='lambo')gvLambo(c,p,v,speed);
  else if(id==='f1')gvF1(c,p,v,speed);
  else if(id==='bike')gvBike(c,p,v,speed);
  else if(id==='jet')gvJet(c,p,v,speed);
  else if(id==='muscle')gvMuscle(c,p,v,speed);
  else if(id==='sbike')gvSBike(c,p,v,speed);
  if(gameMode==='zombie')drawMachineGun(c,v,p);
  c.restore();
}

function drawMachineGun(c,v,p){
  const gy=-v.h/2+6;
  c.fillStyle='#2e2e2e';c.beginPath();c.arc(0,gy,8.5,0,Math.PI*2);c.fill();
  c.strokeStyle='#484848';c.lineWidth=1;c.stroke();
  c.fillStyle='#1e1e1e';c.fillRect(-2.5,gy-21,5,16);
  c.strokeStyle='#333';c.lineWidth=1.5;
  for(let i=0;i<3;i++){c.beginPath();c.moveTo(-3,gy-20+i*5);c.lineTo(3,gy-20+i*5);c.stroke();}
  c.fillStyle='#111';c.fillRect(-3.5,gy-24,7,4);
  c.strokeStyle='#7a7a00';c.lineWidth=2;c.setLineDash([3,2]);c.beginPath();c.moveTo(6,gy+2);c.quadraticCurveTo(12,gy+6,14,gy+10);c.stroke();c.setLineDash([]);
  c.fillStyle='#333';c.fillRect(4,gy-16,5,8);c.fillStyle='rgba(0,255,0,0.2)';c.beginPath();c.arc(6.5,gy-12,2,0,Math.PI*2);c.fill();
}

function gvLambo(c,p,v){
  const h=v.h/2,w=v.w/2;
  c.fillStyle='rgba(0,0,0,0.32)';c.beginPath();c.ellipse(3,h+5,w+4,7,0,0,Math.PI*2);c.fill();
  flame(c,v,p);
  [[-w-1,-h+18],[-w-1,h-20],[w+1,-h+18],[w+1,h-20]].forEach(([wx,wy])=>{c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(wx,wy,7,11,0,0,Math.PI*2);c.fill();c.fillStyle='#444';c.beginPath();c.ellipse(wx,wy,4,7,0,0,Math.PI*2);c.fill();});
  c.fillStyle=v.ac;c.beginPath();c.moveTo(0,-h);c.lineTo(w-2,-h+16);c.lineTo(w,-h+46);c.lineTo(w-3,h-7);c.lineTo(0,h);c.lineTo(-w+3,h-7);c.lineTo(-w,-h+46);c.lineTo(-w+2,-h+16);c.closePath();c.fill();
  c.fillStyle='rgba(90,210,255,0.28)';c.beginPath();c.roundRect(-w+3,-h+18,v.w-6,20,2);c.fill();
  c.fillStyle='rgba(90,210,255,0.18)';c.beginPath();c.roundRect(-w+5,h-32,v.w-10,14,2);c.fill();
  c.fillStyle='rgba(255,248,170,0.95)';c.fillRect(-w,-h-1,9,5);c.fillRect(w-9,-h-1,9,5);
  c.fillStyle='rgba(255,18,0,0.9)';c.fillRect(-w,h-4,9,5);c.fillRect(w-9,h-4,9,5);
}

function gvF1(c,p,v){
  const h=v.h/2,w=v.w/2;
  c.fillStyle='rgba(0,0,0,0.22)';c.beginPath();c.ellipse(0,h+3,w+10,5,0,0,Math.PI*2);c.fill();
  c.fillStyle='#1e1e1e';c.fillRect(-w-13,h-14,v.w+26,5);c.fillRect(-w-15,h-20,4,8);c.fillRect(w+11,h-20,4,8);
  c.fillRect(-w-11,-h+4,v.w+22,4);c.fillRect(-w-13,-h-2,4,8);c.fillRect(w+9,-h-2,4,8);
  flame(c,v,p,-10);flame(c,v,p,10);
  c.fillStyle=v.ac;c.beginPath();c.moveTo(0,-h);c.lineTo(w-1,-h+14);c.lineTo(w,h-14);c.lineTo(0,h);c.lineTo(-w,h-14);c.lineTo(-w+1,-h+14);c.closePath();c.fill();
  c.fillStyle=v.ac+'88';c.fillRect(-w-3,h-50,10,26);c.fillRect(w-7,h-50,10,26);
  c.fillStyle='rgba(90,210,255,0.38)';c.beginPath();c.ellipse(0,-2,w-3,h-14,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(-12,0,4,7,0,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(12,0,4,7,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,-12,4,7,0,0,Math.PI*2);c.fill();
  [[-w-3,-h+20],[-w-3,h-22],[w+3,-h+20],[w+3,h-22]].forEach(([wx,wy])=>{c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(wx,wy,8,8,0,0,Math.PI*2);c.fill();c.fillStyle='#2a2a2a';c.beginPath();c.ellipse(wx,wy,4,4,0,0,Math.PI*2);c.fill();});
  c.fillStyle='rgba(0,0,0,0.55)';c.font='bold 7px Orbitron,monospace';c.textAlign='center';c.fillText('F1',0,6);
}

function gvBike(c,p,v){
  const h=v.h/2,w=v.w/2;
  c.fillStyle='rgba(0,0,0,0.22)';c.beginPath();c.ellipse(0,h+3,9,3.5,0,0,Math.PI*2);c.fill();
  flame(c,v,p);
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,-h+9,w+2,13,0,0,Math.PI*2);c.fill();c.fillStyle='#383838';c.beginPath();c.ellipse(0,-h+9,w-1,8,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,h-9,w+3,15,0,0,Math.PI*2);c.fill();c.fillStyle='#383838';c.beginPath();c.ellipse(0,h-9,w,10,0,0,Math.PI*2);c.fill();
  c.strokeStyle=v.ac;c.lineWidth=4.5;c.lineCap='round';c.beginPath();c.moveTo(0,-h+22);c.lineTo(0,h-24);c.stroke();
  c.fillStyle=v.ac;
  c.beginPath();c.moveTo(-w,-h+22);c.lineTo(-w-2,1);c.lineTo(-w+2,h-24);c.lineTo(w-2,h-24);c.lineTo(w+2,1);c.lineTo(w,-h+22);c.closePath();c.fill();
  c.beginPath();c.moveTo(-w,-h+22);c.lineTo(-w+2,-h+9);c.lineTo(0,-h+3);c.lineTo(w-2,-h+9);c.lineTo(w,-h+22);c.closePath();c.fill();
  c.fillStyle='rgba(90,210,255,0.42)';c.beginPath();c.ellipse(0,-h+18,4.5,7,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0f0f0f';c.beginPath();c.ellipse(0,0,w-2,11,0,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(0,-14,4,6,0,0,Math.PI*2);c.fill();
  c.strokeStyle='#707070';c.lineWidth=2.5;c.beginPath();c.moveTo(w,5);c.quadraticCurveTo(w+5,14,w+3,h-12);c.stroke();
}

function gvJet(c,p,v){
  const h=v.h/2,w=v.w/2;
  c.fillStyle='rgba(0,0,0,0.18)';c.beginPath();c.ellipse(0,h+3,w+8,5.5,0,0,Math.PI*2);c.fill();
  c.fillStyle=v.ac+'70';
  c.beginPath();c.moveTo(0,-6);c.lineTo(-w-18,14);c.lineTo(-w-12,26);c.lineTo(0,6);c.closePath();c.fill();
  c.beginPath();c.moveTo(0,-6);c.lineTo(w+18,14);c.lineTo(w+12,26);c.lineTo(0,6);c.closePath();c.fill();
  c.fillStyle=v.ac+'50';
  c.beginPath();c.moveTo(-w,h-18);c.lineTo(-w-16,h+6);c.lineTo(-w-9,h+2);c.lineTo(-w,h-9);c.closePath();c.fill();
  c.beginPath();c.moveTo(w,h-18);c.lineTo(w+16,h+6);c.lineTo(w+9,h+2);c.lineTo(w,h-9);c.closePath();c.fill();
  const spd=gameState.roadSpeed;
  if(p.boosting||spd>3){
    ['#55bbff','#2299ee','#0055bb'].forEach((col,ci)=>{
      [-14,14].forEach(ox=>{c.fillStyle=col;c.globalAlpha=0.72-ci*0.22;c.beginPath();c.moveTo(ox-4,h);c.lineTo(ox,h+15+ci*7);c.lineTo(ox+4,h);c.closePath();c.fill();});
    });c.globalAlpha=1;
  }
  c.fillStyle=v.ac;
  c.beginPath();c.moveTo(0,-h);c.lineTo(w-3,-h+18);c.lineTo(w,h-18);c.lineTo(w-5,h);c.lineTo(-w+5,h);c.lineTo(-w,h-18);c.lineTo(-w+3,-h+18);c.closePath();c.fill();
  c.fillStyle='rgba(90,210,255,0.48)';c.beginPath();c.ellipse(0,-h+26,w-5,17,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(-8,5,4.5,6,0,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(8,5,4.5,6,0,0,Math.PI*2);c.fill();
  c.fillStyle='#888';[[-w,8],[-(w-8),18],[w,8],[w-8,18]].forEach(([mx,my])=>{c.beginPath();c.ellipse(mx,my,2.5,6.5,0,0,Math.PI*2);c.fill();});
  c.fillStyle='#0a0a0a';c.beginPath();c.moveTo(-3,-h);c.lineTo(3,-h);c.lineTo(0,-h-11);c.closePath();c.fill();
}

function gvMuscle(c,p,v){
  const h=v.h/2,w=v.w/2;
  c.fillStyle='rgba(0,0,0,0.38)';c.beginPath();c.ellipse(2,h+5,w+5,8,0,0,Math.PI*2);c.fill();
  flame(c,v,p,-9);flame(c,v,p,9);
  [[-w,-h+22],[-w,h-26],[w,-h+22],[w,h-26]].forEach(([wx,wy])=>{c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(wx,wy,8,13,0,0,Math.PI*2);c.fill();c.fillStyle='#484848';c.beginPath();c.ellipse(wx,wy,4.5,8,0,0,Math.PI*2);c.fill();});
  c.fillStyle=v.ac;
  c.beginPath();c.moveTo(-w+5,-h);c.lineTo(w-5,-h);c.lineTo(w,-h+18);c.lineTo(w,h-14);c.lineTo(w-5,h);c.lineTo(-w+5,h);c.lineTo(-w,h-14);c.lineTo(-w,-h+18);c.closePath();c.fill();
  c.beginPath();c.ellipse(0,-h+22,w-3,17,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.moveTo(-7,-h+6);c.lineTo(0,-h-3);c.lineTo(7,-h+6);c.lineTo(5.5,-h+16);c.lineTo(-5.5,-h+16);c.closePath();c.fill();
  c.fillStyle='rgba(90,210,255,0.25)';c.beginPath();c.roundRect(-w+5,-h+22,v.w-10,17,2);c.fill();
  c.fillStyle=v.ac+'bb';c.fillRect(-w+9,-h+40,v.w-18,h-18);
  c.fillStyle='rgba(90,210,255,0.18)';c.beginPath();c.roundRect(-w+7,h-36,v.w-14,13,2);c.fill();
  c.fillStyle='rgba(255,248,170,0.95)';c.fillRect(-w,-h-1,11,5);c.fillRect(w-11,-h-1,11,5);
  c.fillStyle='rgba(255,18,0,0.9)';c.fillRect(-w,h-5,11,5);c.fillRect(w-11,h-5,11,5);
  c.fillStyle='rgba(0,0,0,0.18)';c.fillRect(-2.5,-h,5,v.h);
}

function gvSBike(c,p,v){
  const h=v.h/2,w=v.w/2;
  c.fillStyle='rgba(0,0,0,0.22)';c.beginPath();c.ellipse(0,h+3,10,3.5,0,0,Math.PI*2);c.fill();
  flame(c,v,p);
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,-h+9,w+2,12,0,0,Math.PI*2);c.fill();c.fillStyle='#383838';c.beginPath();c.ellipse(0,-h+9,w,7,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(0,h-10,w+3,14,0,0,Math.PI*2);c.fill();c.fillStyle='#383838';c.beginPath();c.ellipse(0,h-10,w+1,9,0,0,Math.PI*2);c.fill();
  c.strokeStyle=v.ac;c.lineWidth=4.5;c.lineCap='round';c.beginPath();c.moveTo(0,-h+22);c.lineTo(0,h-26);c.stroke();
  c.fillStyle=v.ac;
  c.beginPath();c.moveTo(-w,-h+22);c.lineTo(-w-2,-1);c.lineTo(-w+2,h-26);c.lineTo(w-2,h-26);c.lineTo(w+2,-1);c.lineTo(w,-h+22);c.closePath();c.fill();
  c.beginPath();c.moveTo(-w,-h+22);c.lineTo(-w+2,-h+7);c.lineTo(0,-h+1);c.lineTo(w-2,-h+7);c.lineTo(w,-h+22);c.closePath();c.fill();
  c.fillStyle='rgba(90,210,255,0.5)';c.beginPath();c.ellipse(0,-h+17,4,6.5,0,0,Math.PI*2);c.fill();
  c.fillStyle='#0f0f0f';c.beginPath();c.ellipse(0,-1,w-1,9.5,0,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(0,-13,3.5,5.5,0,0,Math.PI*2);c.fill();
  c.strokeStyle='#707070';c.lineWidth=2.5;
  c.beginPath();c.moveTo(-w,4);c.quadraticCurveTo(-w-5,13,-w-3,h-14);c.stroke();
  c.beginPath();c.moveTo(w,4);c.quadraticCurveTo(w+5,13,w+3,h-14);c.stroke();
}

function resetGame(){
  gamePaused=false;
  document.getElementById('pauseMenu').style.display='none';
  cancelAnimationFrame(gameLoop);
  gc.style.display='none';
  document.getElementById('hud').style.display='none';
  document.getElementById('controlsHint').style.display='none';
  document.getElementById('touchControls').style.display='none';
  document.getElementById('crash-overlay').style.display='none';
  document.getElementById('zombieDieOverlay').style.display='none';
  document.getElementById('winOverlay').style.display='none';
  document.getElementById('creditsOverlay').style.display='none';
  stopConfetti();
  Object.keys(touchState).forEach(k=>touchState[k]=false);
  selectedVeh=-1;showCarSelect();
}
