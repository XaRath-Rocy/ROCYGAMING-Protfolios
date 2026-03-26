import { useEffect, useRef } from "react";

// Optimised: offscreen glow cache + capped particle count + willReadFrequently: false
export default function Cursor({ mouseRef }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const hoverRef  = useRef(false);
  const targetRef = useRef({ x: -1, y: -1 });
  const posRef    = useRef({ x: -1, y: -1 });
  const velRef    = useRef({ x: 0,  y: 0  });
  const ribbonRef = useRef([]);
  const ptclRef   = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d", { alpha: true });      // NO willReadFrequently needed
    const getDpr = () => Math.min(window.devicePixelRatio || 1, 2);
    const clamp  = (v,a,b) => Math.min(b,Math.max(a,v));

    const readCss = (n,fb) => { try{return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||fb;}catch{return fb;} };
    const hexRgb  = (hex,fb) => { const h=(hex||"").replace("#",""); return h.length===6?[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]:fb; };
    const rgba    = ([r,g,b],a) => `rgba(${r},${g},${b},${a.toFixed(3)})`;
    const mixRgb  = (a,b,t) => [Math.round(a[0]+(b[0]-a[0])*t),Math.round(a[1]+(b[1]-a[1])*t),Math.round(a[2]+(b[2]-a[2])*t)];

    const neon   = hexRgb(readCss("--neon",  "#00d4ff"), [0,212,255]);
    const ember  = hexRgb(readCss("--ember", "#d4532a"), [212,83,42]);
    const plasma = hexRgb(readCss("--plasma","#bf5fff"), [191,95,255]);
    const gold   = hexRgb(readCss("--gold",  "#c8a050"), [200,160,80]);

    const resize = () => {
      const dpr = getDpr();
      canvas.width  = Math.floor(innerWidth  * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width  = innerWidth  + "px";
      canvas.style.height = innerHeight + "px";
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    resize();
    window.addEventListener("resize", resize);

    if (targetRef.current.x < 0) {
      const cx=innerWidth/2, cy=innerHeight/2;
      targetRef.current={x:cx,y:cy}; posRef.current={x:cx,y:cy};
    }

    const setTarget = (x,y) => {
      targetRef.current = {x,y};
      mouseRef.current  = {x:(x/innerWidth-.5)*2, y:-(y/innerHeight-.5)*2};
    };

    const spawnBurst = (x,y,cA,cB) => {
      for(let i=0;i<20;i++){                             // 20 instead of 24
        const a=(i/20)*Math.PI*2, s=1.5+Math.random()*5.5;
        ptclRef.current.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,decay:0.025+Math.random()*0.03,size:2+Math.random()*3,rgb:mixRgb(cA,cB,Math.random())});
      }
    };

    const onMove  = (e) => { if(e.pointerType==="touch")hoverRef.current=false; setTarget(e.clientX,e.clientY); };
    const onDown  = (e) => { setTarget(e.clientX,e.clientY); spawnBurst(e.clientX,e.clientY,hoverRef.current?neon:ember,hoverRef.current?plasma:gold); };
    const onTouch = (e) => { const t=e.touches&&e.touches[0]; if(!t)return; hoverRef.current=false; setTarget(t.clientX,t.clientY); };

    window.addEventListener("pointermove",onMove,{passive:true});
    window.addEventListener("pointerdown",onDown,{passive:true});
    window.addEventListener("touchstart",onTouch,{passive:true});
    window.addEventListener("touchmove",onTouch,{passive:true});

    const onEnter=()=>{hoverRef.current=true;};
    const onLeave=()=>{hoverRef.current=false;};
    const attachHover=()=>{
      document.querySelectorAll("a,button,[data-hover]").forEach(el=>{
        if(el.dataset.chb==="1")return;
        el.dataset.chb="1";
        el.addEventListener("mouseenter",onEnter);
        el.addEventListener("mouseleave",onLeave);
      });
    };
    attachHover();
    const mo=new MutationObserver(attachHover);
    mo.observe(document.body,{childList:true,subtree:true});

    let lastT=performance.now();
    // Pre-baked gradient cache (avoid re-creating every frame)
    let cachedGlowNorm=null, cachedGlowHov=null, cachedGlowX=-999, cachedGlowY=-999;

    const tick=(now)=>{
      rafRef.current=requestAnimationFrame(tick);
      const dt=clamp((now-lastT)/16.667,.5,2); lastT=now;

      const tgt=targetRef.current, pos=posRef.current, vel=velRef.current;
      const ease=hoverRef.current?.26:.18;
      vel.x=vel.x*.72+(tgt.x-pos.x)*ease;
      vel.y=vel.y*.72+(tgt.y-pos.y)*ease;
      pos.x+=vel.x*dt; pos.y+=vel.y*dt;
      const speed=Math.sqrt(vel.x*vel.x+vel.y*vel.y);
      const isHov=hoverRef.current;
      const cA=isHov?neon:ember, cB=isHov?plasma:gold;

      // Ribbon
      ribbonRef.current.push({x:pos.x,y:pos.y,life:1});
      if(ribbonRef.current.length>36)ribbonRef.current.shift();

      // Spawn ether particles (capped tighter)
      const spawn=Math.min(6,Math.floor(speed*.1)+1);
      for(let i=0;i<spawn;i++){
        const a=Math.atan2(vel.y,vel.x)+(Math.random()-.5)*1.4, s=.5+Math.random()*(1.5+speed*.008);
        ptclRef.current.push({x:pos.x+(Math.random()-.5)*5,y:pos.y+(Math.random()-.5)*5,vx:Math.cos(a)*s-vel.x*.02,vy:Math.sin(a)*s-vel.y*.02,life:1,decay:.04+Math.random()*.04,size:isHov?2+Math.random()*4.5:1.4+Math.random()*3,rgb:mixRgb(cA,cB,Math.random())});
      }
      // MAX 120 particles cap (was unbounded)
      if(ptclRef.current.length>120)ptclRef.current.splice(0,ptclRef.current.length-120);

      // Update
      ptclRef.current=ptclRef.current.filter(p=>p.life>0);
      for(const p of ptclRef.current){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.985;p.vy*=.985;p.life-=p.decay*dt;}
      for(const r of ribbonRef.current)r.life-=.06*dt;
      ribbonRef.current=ribbonRef.current.filter(r=>r.life>0);

      ctx.clearRect(0,0,innerWidth,innerHeight);
      ctx.globalCompositeOperation="lighter";

      // Ribbon
      if(ribbonRef.current.length>3){
        const pts=ribbonRef.current;
        for(let pass=0;pass<2;pass++){
          ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
          for(let i=1;i<pts.length-1;i++){const p0=pts[i],p1=pts[i+1],cx=(p0.x+p1.x)*.5,cy=(p0.y+p1.y)*.5;ctx.quadraticCurveTo(p0.x,p0.y,cx,cy);}
          const al=pass===0?.22:.55, w=pass===0?(isHov?18:14):(isHov?6:4);
          const gr=ctx.createLinearGradient(pts[0].x,pts[0].y,pts[pts.length-1].x,pts[pts.length-1].y);
          gr.addColorStop(0,rgba(cA,al*.35)); gr.addColorStop(.55,rgba(cB,al)); gr.addColorStop(1,rgba(cA,al*.35));
          ctx.strokeStyle=gr; ctx.lineWidth=w; ctx.lineCap="round"; ctx.lineJoin="round"; ctx.stroke();
        }
      }

      // Particles — simple arc (no radial gradient per particle for perf)
      for(const p of ptclRef.current){
        const a=clamp(p.life,0,1), s=p.size*(0.7+a*.9);
        ctx.globalAlpha=a*0.5;
        ctx.fillStyle=rgba(p.rgb,1);
        ctx.beginPath(); ctx.arc(p.x,p.y,s,0,Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha=1;

      // Core cursor — use cached gradient if not moved far
      const outer=isHov?22:16, ring=isHov?10:7, dot=isHov?4.2:3.2;
      const dist=Math.sqrt((pos.x-cachedGlowX)**2+(pos.y-cachedGlowY)**2);
      if(dist>2||(!isHov&&cachedGlowHov)||( isHov&&!cachedGlowNorm)){
        cachedGlowNorm=ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,outer);
        cachedGlowNorm.addColorStop(0,rgba(cA,.28)); cachedGlowNorm.addColorStop(.55,rgba(cB,.14)); cachedGlowNorm.addColorStop(1,rgba(cA,0));
        cachedGlowX=pos.x; cachedGlowY=pos.y; cachedGlowHov=isHov;
      }
      ctx.fillStyle=cachedGlowNorm;
      ctx.beginPath(); ctx.arc(pos.x,pos.y,outer,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle=rgba(cB,isHov?.7:.55); ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.arc(pos.x,pos.y,ring,0,Math.PI*2); ctx.stroke();
      ctx.fillStyle=rgba(cB,.95);
      ctx.beginPath(); ctx.arc(pos.x,pos.y,dot,0,Math.PI*2); ctx.fill();

      ctx.globalCompositeOperation="source-over";
    };
    rafRef.current=requestAnimationFrame(tick);

    return()=>{
      window.removeEventListener("resize",resize);
      window.removeEventListener("pointermove",onMove);
      window.removeEventListener("pointerdown",onDown);
      window.removeEventListener("touchstart",onTouch);
      window.removeEventListener("touchmove",onTouch);
      cancelAnimationFrame(rafRef.current);
      mo.disconnect();
      document.querySelectorAll("[data-chb='1']").forEach(el=>{el.removeEventListener("mouseenter",onEnter);el.removeEventListener("mouseleave",onLeave);delete el.dataset.chb;});
    };
  },[mouseRef]);

  return <canvas ref={canvasRef} style={{position:"fixed",inset:0,zIndex:9999,pointerEvents:"none"}} />;
}
