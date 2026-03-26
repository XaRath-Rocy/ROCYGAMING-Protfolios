import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground({ mouseRef, intensity = 1 }) {
  const canvasRef = useRef(null);
  const intensityRef = useRef(intensity);

  useEffect(() => { intensityRef.current = intensity; }, [intensity]);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    let animId, threeLoaded = false;

    const hexToInt = (hex, fb) => { const n=parseInt((hex||"").replace("#",""),16); return isFinite(n)?n:fb; };
    const hexToVec3 = (hex) => { const h=(hex||"").replace("#",""); if(h.length!==6)return[1,1,1]; return[parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255]; };
    const readCss = (n,fb) => { try{return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||fb;}catch{return fb;} };

    const init = () => {
      if (threeLoaded || !canvasEl) return;
      threeLoaded = true;

      const neonHex  = readCss("--neon",  "#00d4ff");
      const emberHex = readCss("--ember", "#d4532a");
      const bgHex    = readCss("--bg",    "#020308");
      const inkHex   = readCss("--ink",   "#e8f0ff");
      const neon     = hexToVec3(neonHex);
      const ember    = hexToVec3(emberHex);

      const getDpr = () => Math.min(window.devicePixelRatio||1, 2);
      const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: true, antialias: false });
      renderer.setPixelRatio(getDpr());
      renderer.setSize(innerWidth, innerHeight);
      renderer.setClearColor(0x000000, 0);
      if ("outputColorSpace" in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(62, innerWidth/innerHeight, 0.01, 120);
      camera.position.set(0, 1.05, 7.0);
      camera.lookAt(0, 1.0, 0);
      scene.fog = new THREE.FogExp2(hexToInt(bgHex, 0x020308), 0.085);

      // Lights
      const eLight = new THREE.PointLight(hexToInt(emberHex,0xd4532a), 1.8, 30, 2);
      eLight.position.set(0.5, 1.1, 1.8); scene.add(eLight);
      const nLight = new THREE.PointLight(hexToInt(neonHex,0x00d4ff), 1.0, 40, 2);
      nLight.position.set(-1.6, 2.0, -1.8); scene.add(nLight);
      scene.add(new THREE.AmbientLight(hexToInt(inkHex,0xe8f0ff), 0.10));

      // ── MOLTEN CORE — 3 octave FBM (was 5) ──────────────────
      const cU = { uTime:{value:0}, uIntensity:{value:1}, uNeon:{value:new THREE.Vector3(...neon)}, uEmber:{value:new THREE.Vector3(...ember)} };
      const coreMat = new THREE.ShaderMaterial({
        uniforms: cU, transparent: true,
        vertexShader:`varying vec3 vPos,vNormal;void main(){vPos=position;vNormal=normalMatrix*normal;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader:`
          precision mediump float;
          uniform float uTime,uIntensity; uniform vec3 uNeon,uEmber;
          varying vec3 vPos,vNormal;
          float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
          float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
          float fbm(vec3 p){float v=0.0,a=0.58;v+=a*noise(p);p*=2.02;a*=0.52;v+=a*noise(p);p*=2.02;a*=0.52;v+=a*noise(p);return v;}
          void main(){
            vec3 n=normalize(vNormal),vd=normalize(vec3(0,0.15,1)),ld=normalize(vec3(-0.3,0.8,0.45));
            float ndl=clamp(dot(n,ld)*0.5+0.5,0.0,1.0);
            vec3 p=vPos*2.35; p.y+=uTime*0.35;
            float sw=uTime*0.14; p.xz*=mat2(cos(sw),-sin(sw),sin(sw),cos(sw));
            float base=fbm(p),veins=fbm(p*2.2+vec3(2.0,-uTime*0.6,1.0));
            float heat=smoothstep(0.36,1.0,base),crack=smoothstep(0.76,0.99,veins);
            vec3 col=mix(vec3(0.02,0.02,0.05),uEmber,heat);
            col=mix(col,uNeon,crack*0.65);
            col*=(0.55+0.65*ndl); col+=col*(heat*0.85+crack*0.95)*(0.9+0.65*uIntensity);
            col+=uNeon*pow(1.0-clamp(dot(n,vd),0.0,1.0),2.0)*0.32*(0.7+0.55*uIntensity);
            gl_FragColor=vec4(col,0.92);
          }
        `,
      });
      const core = new THREE.Mesh(new THREE.SphereGeometry(1.15,48,48), coreMat);
      core.position.set(0,1.0,0); scene.add(core);

      // Rings
      const mkRing = (r,tube,col,op,y,z,rx) => {
        const m=new THREE.Mesh(new THREE.TorusGeometry(r,tube,10,160),new THREE.MeshBasicMaterial({color:hexToInt(col,0x00d4ff),transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false}));
        m.position.set(0,y,z); m.rotation.x=rx; scene.add(m); return m;
      };
      const ring  = mkRing(1.65,0.04,neonHex, 0.22,1.0, 0,    Math.PI*0.42);
      const halo  = mkRing(2.35,0.06,emberHex,0.12,1.0,-0.25, Math.PI*0.62);
      const ring3 = mkRing(2.95,0.018,neonHex,0.09,0.95,-0.45,Math.PI*0.5);
      const discMat=new THREE.MeshBasicMaterial({color:hexToInt(neonHex,0x00d4ff),transparent:true,opacity:0.03,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
      const disc=new THREE.Mesh(new THREE.CircleGeometry(2.9,72),discMat);
      disc.position.set(0,0.28,-0.6); disc.rotation.x=-Math.PI/2; scene.add(disc);

      // ── GPU-DRIVEN SPARKS — positions in vertex shader (zero JS loop per frame) ──
      const N = innerWidth < 768 ? 500 : 950;
      const seeds  = new Float32Array(N*4); // [radius, angOffset, yBase, liftSpeed]
      const sCol   = new Float32Array(N*3);
      const sSizes = new Float32Array(N);
      for (let i=0;i<N;i++){
        const band=Math.random();
        seeds[i*4]   = 1.2+Math.random()*(band<0.65?2.0:4.0);
        seeds[i*4+1] = Math.random()*Math.PI*2;
        seeds[i*4+2] = -0.85+Math.random()*3.75;
        seeds[i*4+3] = 0.003+Math.random()*0.012;
        // Mostly-white sparks (subtle warm tint), keep them calm.
        const w = Math.random();
        sCol[i*3]   = 0.92 + w * 0.08;
        sCol[i*3+1] = 0.92 + w * 0.08;
        sCol[i*3+2] = 0.94 + w * 0.06;
        sSizes[i]   = 0.9;
      }
      const sGeo=new THREE.BufferGeometry();
      sGeo.setAttribute("position",new THREE.BufferAttribute(new Float32Array(N*3),3));
      sGeo.setAttribute("color",   new THREE.BufferAttribute(sCol,3));
      sGeo.setAttribute("aSize",   new THREE.BufferAttribute(sSizes,1));
      sGeo.setAttribute("aSeed",   new THREE.BufferAttribute(seeds,4));
      const sU={uTime:{value:0},uIntensity:{value:1},uPixelRatio:{value:getDpr()}};
      const sMat=new THREE.ShaderMaterial({
        transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:sU,
        vertexShader:`
          attribute float aSize; attribute vec4 aSeed; attribute vec3 color;
          varying vec3 vColor; uniform float uTime,uPixelRatio;
          void main(){
            vColor=color;
            float r=aSeed.x,ao=aSeed.y,yb=aSeed.z,ls=aSeed.w;
            float spin=0.007*(mod(ao,0.5)>0.25?1.0:-1.0);
            float ang=ao+uTime*spin*80.0;
            float y=mod(yb+uTime*ls*80.0-(-0.85),4.10)-0.85;
            float wob=sin(uTime*1.4+ang*2.0)*0.07;
            vec3 pos=vec3(cos(ang)*(r+wob),y,sin(ang)*(r+wob)-0.75);
            vec4 mv=modelViewMatrix*vec4(pos,1.0);
            gl_Position=projectionMatrix*mv;
            // Non-growing / stable size
            float sizePx=aSize*uPixelRatio*(120.0/max(0.55,-mv.z));
            gl_PointSize=clamp(sizePx, 1.0, 6.0);
          }
        `,
        fragmentShader:`
          precision mediump float; varying vec3 vColor; uniform float uIntensity;
          void main(){
            vec2 uv=gl_PointCoord-0.5; float d=length(uv);
            float c=smoothstep(0.5,0.0,d*1.45),g=smoothstep(0.5,0.0,d*0.75);
            float a=(c*0.55+g*0.28)*0.5;
            vec3 col=vColor;
            gl_FragColor=vec4(col*a,a);
          }
        `,
      });
      scene.add(new THREE.Points(sGeo,sMat));

      // Stars — simple PointsMaterial (cheapest)
      const stN=1400, stP=new Float32Array(stN*3);
      for(let i=0;i<stN;i++){const r=10+Math.random()*16,a=Math.random()*Math.PI*2;stP[i*3]=Math.cos(a)*r;stP[i*3+1]=-6+Math.random()*16;stP[i*3+2]=-18+Math.random()*14;}
      const stGeo=new THREE.BufferGeometry(); stGeo.setAttribute("position",new THREE.BufferAttribute(stP,3));
      const stars=new THREE.Points(stGeo,new THREE.PointsMaterial({color:hexToInt(neonHex,0x00d4ff),size:0.045,transparent:true,opacity:0.28}));
      scene.add(stars);

      // ── Animate — purely GPU-driven, no particle JS loop ────
      let t=0;
      const animate=()=>{
        animId=requestAnimationFrame(animate); t+=0.016;
        const iRaw=intensityRef.current||1;
        const iNow=Math.min(1.15, Math.max(0.7, iRaw));
        cU.uTime.value=t; cU.uIntensity.value=iNow;
        sU.uTime.value=t; sU.uIntensity.value=iNow;
        const flick=0.75+0.25*Math.sin(t*8.5)+0.14*Math.sin(t*21);
        eLight.intensity=(1.55+0.55*flick)*iNow;
        nLight.intensity=(0.9+0.18*Math.sin(t*3.6))*(0.8+0.2*iNow);
        if(scene.fog)scene.fog.density=0.082+0.012*Math.min(1.15,iNow);
        const mx=mouseRef.current?.x||0,my=mouseRef.current?.y||0;
        camera.position.x += (mx * 1.05 - camera.position.x) * 0.035;
        camera.position.y += (1.03 + my * 0.4 - camera.position.y) * 0.034;
        camera.position.z += (7.0 - camera.position.z) * 0.02;
        const roll=Math.sin(t*0.14)*0.02;
        camera.up.set(Math.sin(roll),Math.cos(roll),0).normalize();
        camera.lookAt(0,1.0,0);
        core.rotation.y+=0.004+iNow*0.001;
        core.rotation.x=Math.sin(t*0.25)*0.05;
        ring.rotation.y-=0.002; ring.rotation.z=Math.sin(t*0.18)*0.08;
        halo.rotation.y+=0.0017; ring3.rotation.y-=0.0012;
        disc.material.opacity = 0.02 + 0.02 * (0.5 + 0.5 * Math.sin(t * 0.9)) * Math.min(1.1, iNow);
        disc.scale.setScalar(1);
        stars.rotation.y+=0.00035;
        renderer.render(scene,camera);
      };
      animate();

      const resize=()=>{
        camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
        const dpr=getDpr(); renderer.setPixelRatio(dpr); renderer.setSize(innerWidth,innerHeight);
        sU.uPixelRatio.value=dpr;
      };
      window.addEventListener("resize",resize);
      canvasEl._cleanup=()=>{ cancelAnimationFrame(animId); window.removeEventListener("resize",resize); sGeo.dispose();sMat.dispose();stGeo.dispose();coreMat.dispose();renderer.dispose(); };
    };

    init();
    return()=>{ canvasEl?._cleanup?.(); };
  },[mouseRef]);

  return <canvas ref={canvasRef} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",width:"100%",height:"100%"}} />;
}
