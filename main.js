/* ============================================================
   BYD Oway Đà Nẵng — Main JavaScript
   Modules:
   1. Mobile Drawer Toggle
   2. Nav Scroll Glass Effect
   3. Hero Canvas (car illustration)
   4. Model Card Canvases
   5. Brand Canvas
   6. News Canvases
   7. Model Slider
   8. Scroll Reveal
   9. Count-Up Animation
   10. Hero Stats Count-Up
   11. Hero Parallax
============================================================ */

/* ============================================================
   MOBILE DRAWER — arrow toggle
   ============================================================ */
(function(){
  var toggle  = document.getElementById('navToggle');
  var overlay = document.getElementById('mobileOverlay');
  var drawer  = document.getElementById('mobileDrawer');
  if(!toggle||!overlay||!drawer) return;
  var isOpen = false;

  function open(){
    isOpen=true;
    drawer.classList.add('open');
    overlay.style.display='block';
    requestAnimationFrame(function(){ overlay.classList.add('open'); });
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded','true');
    document.body.style.overflow='hidden';
    document.body.style.touchAction='none';
  }
  function close(){
    isOpen=false;
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
    document.body.style.touchAction='';
    setTimeout(function(){ if(!isOpen) overlay.style.display='none'; },320);
  }
  function syncVis(){
    var nl=document.querySelector('.nav-links');
    if(!nl) return;
    var hidden=window.getComputedStyle(nl).display==='none';
    toggle.style.display=hidden?'flex':'none';
    if(!hidden&&isOpen) close();
  }

  overlay.style.display='none';
  toggle.addEventListener('click',function(e){ e.stopPropagation(); isOpen?close():open(); });
  overlay.addEventListener('click',close);
  document.querySelectorAll('.dlink').forEach(function(a){ a.addEventListener('click',close); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&isOpen) close(); });
  syncVis();
  window.addEventListener('resize',syncVis);
})();

/* NAV SCROLL */
window.addEventListener('scroll',function(){
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>40);
},{passive:true});

/* ============================================================
   HERO CANVAS — BYD green theme
   ============================================================ */
(function(){
  var c=document.getElementById('heroCanvas'); if(!c) return;
  function sz(){ c.width=c.offsetWidth||window.innerWidth; c.height=c.offsetHeight||window.innerHeight; draw(); }
  function draw(){
    var ctx=c.getContext('2d'),W=c.width,H=c.height;
    ctx.clearRect(0,0,W,H);
    var bg=ctx.createLinearGradient(0,0,W,H);
    bg.addColorStop(0,'#d8ede0'); bg.addColorStop(.5,'#e8f5ec'); bg.addColorStop(1,'#cce8d6');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    // grid
    ctx.strokeStyle='rgba(0,120,60,.1)'; ctx.lineWidth=.5;
    var gy=H*.68;
    for(var x=0;x<W;x+=60){ ctx.beginPath(); ctx.moveTo(x,gy); ctx.lineTo(W/2+(x-W/2)*.08,H); ctx.stroke(); }
    for(var i=0;i<8;i++){ var y=gy+(H-gy)*i/7; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    // glow
    var gr=ctx.createRadialGradient(W*.7,H*.5,0,W*.7,H*.5,W*.42);
    gr.addColorStop(0,'rgba(0,166,81,.2)'); gr.addColorStop(1,'transparent');
    ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
    // speed lines
    ctx.strokeStyle='rgba(0,166,81,.08)'; ctx.lineWidth=1;
    for(var j=0;j<16;j++){
      var ly=Math.random()*H*.55+H*.1,ll=Math.random()*W*.28+W*.08;
      ctx.beginPath(); ctx.moveTo(W*.65,ly); ctx.lineTo(W*.65+ll,ly+(Math.random()-.5)*16); ctx.stroke();
    }
    drawCar(ctx,W*.64,H*.5,W*.46);
  }
  function drawCar(ctx,cx,cy,sc){
    var s=sc/320; ctx.save(); ctx.translate(cx,cy); ctx.scale(s,s);
    ctx.beginPath();
    ctx.moveTo(-280,58); ctx.lineTo(-280,18); ctx.lineTo(-200,-28);
    ctx.lineTo(-120,-58); ctx.lineTo(20,-72); ctx.lineTo(130,-76);
    ctx.lineTo(200,-63); ctx.lineTo(240,-38); ctx.lineTo(280,10);
    ctx.lineTo(280,58); ctx.closePath();
    var bg2=ctx.createLinearGradient(-280,-78,280,58);
    bg2.addColorStop(0,'rgba(0,80,40,.92)'); bg2.addColorStop(.5,'rgba(0,120,60,.82)'); bg2.addColorStop(1,'rgba(0,60,30,.92)');
    ctx.fillStyle=bg2; ctx.fill();
    ctx.strokeStyle='rgba(0,180,80,.7)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-128,18); ctx.lineTo(-80,-53); ctx.lineTo(108,-63); ctx.lineTo(173,18); ctx.closePath();
    ctx.fillStyle='rgba(0,60,30,.9)'; ctx.fill(); ctx.strokeStyle='rgba(0,180,80,.3)'; ctx.lineWidth=1; ctx.stroke();
    // windows
    [[-118,18,-72,-48,20,-58,20,18],[26,18,26,-58,162,-58,170,18]].forEach(function(p){
      ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.lineTo(p[2],p[3]); ctx.lineTo(p[4],p[5]); ctx.lineTo(p[6],p[7]); ctx.closePath();
      ctx.fillStyle='rgba(0,166,81,.25)'; ctx.fill();
    });
    // wheels
    [[-168,58],[168,58]].forEach(function(w){
      ctx.beginPath(); ctx.arc(w[0],w[1],40,0,Math.PI*2);
      ctx.fillStyle='#1a2a1e'; ctx.fill(); ctx.strokeStyle='rgba(0,180,80,.65)'; ctx.lineWidth=1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(w[0],w[1],20,0,Math.PI*2);
      ctx.strokeStyle='rgba(0,180,80,.8)'; ctx.lineWidth=1; ctx.stroke();
      for(var a=0;a<6;a++){
        var an=a/6*Math.PI*2;
        ctx.beginPath(); ctx.moveTo(w[0]+Math.cos(an)*9,w[1]+Math.sin(an)*9);
        ctx.lineTo(w[0]+Math.cos(an)*36,w[1]+Math.sin(an)*36);
        ctx.strokeStyle='rgba(0,180,80,.45)'; ctx.lineWidth=1; ctx.stroke();
      }
    });
    // headlight
    var hl=ctx.createLinearGradient(230,-22,285,18);
    hl.addColorStop(0,'rgba(220,255,230,.9)'); hl.addColorStop(1,'rgba(0,166,81,.2)');
    ctx.beginPath(); ctx.moveTo(240,-28); ctx.lineTo(280,2); ctx.lineTo(280,18); ctx.lineTo(236,10); ctx.closePath();
    ctx.fillStyle=hl; ctx.fill();
    // ground glow
    var rg=ctx.createLinearGradient(0,60,0,110);
    rg.addColorStop(0,'rgba(0,166,81,.15)'); rg.addColorStop(1,'transparent');
    ctx.beginPath(); ctx.ellipse(0,66,286,28,0,0,Math.PI*2); ctx.fillStyle=rg; ctx.fill();
    ctx.restore();
  }
  window.addEventListener('resize',sz,{passive:true}); sz();
})();

/* MODEL CARD CANVASES */
var modelColors=[
  {h:145,label:'BYD ATTO 3'},
  {h:170,label:'BYD SEALION 6'},
  {h:130,label:'BYD SEAL'},
  {h:155,label:'BYD HAN'},
  {h:120,label:'BYD M6'},
  {h:160,label:'BYD ATTO 2'}
];
['c1','c2','c3','c4','c5','c6'].forEach(function(id,i){
  var mc=modelColors[i];
  var c=document.getElementById(id); if(!c) return;
  var ctx=c.getContext('2d'),W=c.width,H=c.height;
  var bg=ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,'hsl('+mc.h+',35%,86%)'); bg.addColorStop(1,'hsl('+(mc.h+15)+',30%,80%)');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='hsla('+mc.h+',60%,35%,.1)'; ctx.lineWidth=.5;
  for(var x=0;x<W;x+=38){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for(var y=0;y<H;y+=38){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
  var g=ctx.createRadialGradient(W*.6,H*.5,0,W*.6,H*.5,W*.38);
  g.addColorStop(0,'hsla('+mc.h+',70%,35%,.18)'); g.addColorStop(1,'transparent');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  ctx.save(); ctx.translate(W*.54,H*.52); ctx.scale(.52,.52);
  ctx.beginPath();
  ctx.moveTo(-258,52); ctx.lineTo(-258,14); ctx.lineTo(-178,-23);
  ctx.lineTo(-88,-52); ctx.lineTo(28,-67); ctx.lineTo(138,-70);
  ctx.lineTo(208,-56); ctx.lineTo(248,-33); ctx.lineTo(262,10); ctx.lineTo(262,52); ctx.closePath();
  ctx.fillStyle='hsla('+mc.h+',60%,20%,.92)'; ctx.fill();
  ctx.strokeStyle='hsla('+mc.h+',70%,35%,.65)'; ctx.lineWidth=1.5; ctx.stroke();
  [[-152,52],[162,52]].forEach(function(w){
    ctx.beginPath(); ctx.arc(w[0],w[1],36,0,Math.PI*2);
    ctx.fillStyle='hsla('+mc.h+',30%,15%,1)'; ctx.fill();
    ctx.strokeStyle='hsla('+mc.h+',70%,35%,.7)'; ctx.lineWidth=1.5; ctx.stroke();
  });
  ctx.restore();
  ctx.font='bold 15px -apple-system,sans-serif';
  ctx.fillStyle='hsla('+mc.h+',60%,25%,.5)';
  ctx.textAlign='left'; ctx.fillText(mc.label,16,H-14);
});

/* BRAND CANVAS */
(function(){
  var c=document.getElementById('brandCanvas'); if(!c) return;
  var ctx=c.getContext('2d'),W=c.width,H=c.height,cx=W/2,cy=H/2;
  ctx.clearRect(0,0,W,H);
  var bg=ctx.createRadialGradient(cx,cy,0,cx,cy,250);
  bg.addColorStop(0,'#e8f5ec'); bg.addColorStop(1,'#d8ede0');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  [110,150,190,230].forEach(function(r,i){
    ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
    ctx.strokeStyle='rgba(0,120,60,'+(0.2-i*.04)+')'; ctx.lineWidth=.5; ctx.stroke();
  });
  // BYD text
  ctx.font='bold 88px -apple-system,sans-serif';
  ctx.fillStyle='rgba(0,130,60,.88)';
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('BYD',cx,cy);
  // dots
  for(var a=0;a<12;a++){
    var ang=a/12*Math.PI*2,r=a%2===0?150:190;
    ctx.beginPath(); ctx.arc(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r,3,0,Math.PI*2);
    ctx.fillStyle='rgba(0,166,81,.6)'; ctx.fill();
  }
  // blade battery lines
  ctx.strokeStyle='rgba(0,120,60,.18)'; ctx.lineWidth=1;
  for(var j=-3;j<=3;j++){
    ctx.beginPath(); ctx.moveTo(cx-80,cy+j*14); ctx.lineTo(cx+80,cy+j*14-2); ctx.stroke();
  }
})();

/* NEWS CANVASES */
function drawNewsCv(id,c1,c2,txt){
  var c=document.getElementById(id); if(!c) return;
  var ctx=c.getContext('2d'),W=c.width,H=c.height;
  var g=ctx.createLinearGradient(0,0,W,H);
  g.addColorStop(0,c1); g.addColorStop(1,c2);
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  ctx.font='bold 17px -apple-system,sans-serif';
  ctx.fillStyle='rgba(0,80,30,.35)';
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(txt,W/2,H/2);
}
drawNewsCv('n1','#b8dfc4','#8fcca4','TẾT NGỌ ƯU ĐÃI');
drawNewsCv('n2','#c2e8cc','#9ad4b0','TẾT ẤT TỴ 2025');
drawNewsCv('n3','#aed8bc','#88c89a','HƯỚNG DẪN SẠC BYD');

/* MODEL SLIDER */
(function(){
  var track=document.getElementById('sliderTrack');
  var dots=document.querySelectorAll('.sdot');
  if(!track) return;
  var cards=track.querySelectorAll('.model-card');
  var cur=0;
  function gap(){ return parseInt(window.getComputedStyle(track).gap)||20; }
  function cardW(){ return cards[0]?cards[0].offsetWidth+gap():0; }
  function go(idx){
    idx=Math.max(0,Math.min(cards.length-1,idx));
    cur=idx;
    track.style.transform='translateX(-'+(cardW()*idx)+'px)';
    dots.forEach(function(d,i){ d.classList.toggle('on',i===idx); });
  }
  document.getElementById('sPrev').addEventListener('click',function(){ go(cur-1); });
  document.getElementById('sNext').addEventListener('click',function(){ go(cur+1); });
  dots.forEach(function(d){ d.addEventListener('click',function(){ go(+d.dataset.i); }); });
  var tx=0;
  track.addEventListener('touchstart',function(e){ tx=e.touches[0].clientX; },{passive:true});
  track.addEventListener('touchend',function(e){
    var dx=e.changedTouches[0].clientX-tx;
    if(Math.abs(dx)>44) go(dx<0?cur+1:cur-1);
  });
  window.addEventListener('resize',function(){ go(cur); },{passive:true});
})();

/* SCROLL REVEAL */
(function(){
  var els=document.querySelectorAll('.reveal,.rev-l,.rev-r');
  if(!('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add('in'); }); return; }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.1,rootMargin:'0px 0px -36px 0px'});
  els.forEach(function(e){ io.observe(e); });
})();

/* COUNT-UP */
function countUp(el){
  var target=+el.dataset.t,dur=1800,start=performance.now();
  function tick(now){
    var p=Math.min((now-start)/dur,1),e=1-Math.pow(1-p,3);
    el.textContent=Math.round(e*target);
    if(p<1) requestAnimationFrame(tick); else el.textContent=target;
  }
  requestAnimationFrame(tick);
}
(function(){
  var els=document.querySelectorAll('.cu');
  if(!('IntersectionObserver' in window)){ els.forEach(countUp); return; }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); io.unobserve(e.target); } });
  },{threshold:.5});
  els.forEach(function(e){ io.observe(e); });
})();

/* HERO STATS COUNT-UP */
function heroCount(id,target,delay,dec){
  setTimeout(function(){
    var el=document.getElementById(id); if(!el) return;
    var dur=1600,start=performance.now();
    function tick(now){
      var p=Math.min((now-start)/dur,1),e=1-Math.pow(1-p,3);
      el.textContent=dec?(e*target).toFixed(1):Math.round(e*target);
      if(p<1) requestAnimationFrame(tick); else el.textContent=dec?target.toFixed(1):target;
    }
    requestAnimationFrame(tick);
  },delay);
}
window.addEventListener('load',function(){
  heroCount('hs1',9,  1100,false);
  heroCount('hs2',521,1200,false);
  heroCount('hs3',200,1350,false);
  heroCount('hs4',85, 1500,false);
});

/* PARALLAX — desktop only */
(function(){
  /* Parallax: only move the right-panel canvas, not the text */
  var heroRight=document.querySelector('.hero-right');
  var ticking=false;
  function onScroll(){
    if(!ticking){
      requestAnimationFrame(function(){
        if(window.innerWidth>960&&heroRight){
          var y=window.scrollY;
          var heroH=document.querySelector('.hero');
          var limit=heroH?heroH.offsetHeight:window.innerHeight;
          if(y<limit){ heroRight.style.transform='translateY('+(y*.15)+'px)'; }
        } else if(heroRight){ heroRight.style.transform=''; }
        ticking=false;
      });
      ticking=true;
    }
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',function(){
    if(window.innerWidth<=960&&heroRight) heroRight.style.transform='';
  },{passive:true});
})();
