import * as T from './vendor/three.module.js';
export function city(host){
 const renderer=new T.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor('#dbe9ee');host.appendChild(renderer.domElement);
 const scene=new T.Scene();scene.fog=new T.Fog('#dbe9ee',55,130);scene.add(new T.HemisphereLight('#ffffff','#a5b9b3',3));const sun=new T.DirectionalLight('#fff7ed',2.3);sun.position.set(-20,35,18);scene.add(sun);
 const camera=new T.PerspectiveCamera(38,1,.1,180),materials={};function mat(c){return materials[c]||(materials[c]=new T.MeshStandardMaterial({color:c,roughness:.75}))}function box(x,y,z,w,h,d,c){const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat(c));m.position.set(x,y,z);scene.add(m);return m}function cylinder(x,y,z,r,h,c){const m=new T.Mesh(new T.CylinderGeometry(r,r,h,12),mat(c));m.position.set(x,y,z);scene.add(m);return m}
 box(0,-.4,0,85,.7,65,'#e9efeb');for(const z of [-10,12]){box(0,.02,z,85,.1,6.5,'#93a6ad');for(let x=-40;x<42;x+=3)box(x,.09,z,1.2,.03,.14,'#edf3f1')}
 for(const x of [-22,22])box(x,.02,0,6.5,.1,65,'#93a6ad');
 for(const z of [-14,-6,8,16])box(0,.04,z,85,.14,1.7,'#d3e0dd');
 const palette=['#b9cdd1','#c7d8d6','#b0c8d2','#d5ded4','#b7c7bf'];let i=0;
 for(const x of [-33,-13,0,13,34])for(const z of [-24,-1,26]){const h=7+((i*7)%15),w=6+(i%3);box(x,h/2,z,w,h,7,palette[i%palette.length]);box(x,h+.2,z,w+.4,.4,7.4,'#f0f4ef');for(let y=1.7;y<h-.3;y+=1.65){box(x,y,z+3.55,w-.9,.75,.06,'#87aebf');for(let dx=-w/2+.8;dx<w/2;dx+=1.4)box(x+dx,y,z+3.6,.055,1.4,.06,'#e8f0ee')}if(i%3===0){box(x,h+1,z,3,1.4,3,'#c1d2cd')}i++}
 for(const x of [-38,-27,-17,-6,7,17,28,39])for(const z of [-5,17]){cylinder(x,1.2,z,.12,2.4,'#a8aa92');const crown=new T.Mesh(new T.SphereGeometry(1.05,12,10),mat('#9ab9a4'));crown.position.set(x,2.8,z);crown.scale.y=1.25;scene.add(crown)}
 for(let k=0;k<8;k++)box(-21,.12,-12.5+k*.75,2.8,.03,.35,'#edf3f1');
 const cars=[];for(let k=0;k<5;k++){const g=new T.Group(),body=new T.Mesh(new T.BoxGeometry(2.7,.7,1.25),mat(['#c4d9d8','#e4dfd2','#a9c1cb'][k%3]));body.position.y=.55;g.add(body);const top=new T.Mesh(new T.BoxGeometry(1.4,.6,1.15),mat('#89aab9'));top.position.y=1.1;g.add(top);g.position.set(k*14-35,0,k%2?-9:13);scene.add(g);cars.push(g)}
 let yaw=1.05,pitch=.64,distance=67,drag=null,paused=false,last=performance.now();const canvas=renderer.domElement;canvas.setAttribute('aria-label','Latar kota 3D, seret untuk mengubah sudut');
 canvas.onpointerdown=e=>{if(e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)};canvas.onpointermove=e=>{if(!drag||drag.id!==e.pointerId)return;yaw-=(e.clientX-drag.x)*.004;pitch=T.MathUtils.clamp(pitch+(e.clientY-drag.y)*.004,.2,1.4);drag.x=e.clientX;drag.y=e.clientY};canvas.onpointerup=canvas.onpointercancel=()=>drag=null;
 function resize(){renderer.setSize(host.clientWidth,host.clientHeight);camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix()}new ResizeObserver(resize).observe(host);resize();const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(!paused&&!reduce.matches)for(const [j,g]of cars.entries()){g.position.x+=dt*(j%2?-2:2);if(Math.abs(g.position.x)>43)g.position.x=-Math.sign(g.position.x)*42}camera.position.set(distance*Math.cos(yaw)*Math.cos(pitch),distance*Math.sin(pitch),distance*Math.sin(yaw)*Math.cos(pitch));camera.lookAt(0,2,0);renderer.render(scene,camera);requestAnimationFrame(frame)}requestAnimationFrame(frame);
 return{reset(){yaw=1.05;pitch=.64},pause(){paused=!paused;return paused}};
}
