/*@license
* Drag/Rotate/Resize Library
* Released under the MIT license, 2018-2019
* Karen Sarksyan
* nichollascarter@gmail.com
*/
"use strict";const requestAnimFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)},cancelAnimFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||function(e){clearTimeout(e)},{forEach:forEach,slice:arrSlice,map:arrMap,reduce:arrReduce}=Array.prototype,{warn:warn}=console;function isDef(e){return null!=e}function isUndef(e){return null==e}function isFunc(e){return"function"==typeof e}function createMethod(e){return isFunc(e)?function(){e.call(this,...arguments)}:()=>{}}class Helper{constructor(e){if("string"==typeof e){let t=document.querySelectorAll(e);this.length=t.length;for(let e=0;e<this.length;e++)this[e]=t[e]}else if("object"!=typeof e||1!==e.nodeType&&e!==document)if(e instanceof Helper){this.length=e.length;for(let t=0;t<this.length;t++)this[t]=e[t]}else{if(!isIterable(e))throw new Error("Passed parameter must be selector/element/elementArray");this.length=0;for(let t=0;t<this.length;t++)1===e.nodeType&&(this[t]=e[t],this.length++)}else this[0]=e,this.length=1}css(e){const t={setStyle(e){return((e,t)=>{let o=e.length;for(;o--;)for(let s in t)e[o].style[s]=t[s];return e.style})(this,e)},getStyle(){return(t=>{let o=t.length;for(;o--;)return t[o].currentStyle?t[o].currentStyle[e]:document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(t[o],"")[e]:t[o].style[e]})(this)}};return"string"==typeof e?t.getStyle.apply(this,arrSlice.call(arguments,1)):"object"!=typeof e&&e?(warn(`Method ${e} does not exist`),!1):t.setStyle.apply(this,arguments)}on(){let e=this.length;for(;e--;)this[e].events||(this[e].events={},this[e].events[arguments[0]]=[]),"string"!=typeof arguments[1]?document.addEventListener?this[e].addEventListener(arguments[0],arguments[1],arguments[2]||{passive:!1}):document.attachEvent?this[e].attachEvent(`on${arguments[0]}`,arguments[1]):this[e][`on${arguments[0]}`]=arguments[1]:listenerDelegate(this[e],arguments[0],arguments[1],arguments[2],arguments[3],!0);return this}off(){let e=this.length;for(;e--;)this[e].events||(this[e].events={},this[e].events[arguments[0]]=[]),"string"!=typeof arguments[1]?document.removeEventListener?this[e].removeEventListener(arguments[0],arguments[1],arguments[2]):document.detachEvent?this[e].detachEvent(`on${arguments[0]}`,arguments[1]):this[e][`on${arguments[0]}`]=null:listenerDelegate(this[e],arguments[0],arguments[1],arguments[2],arguments[3],!1);return this}is(e){const t=helper(e);let o=this.length;for(;o--;)if(this[o]===t[o])return!0;return!1}}function listenerDelegate(e,t,o,s,r,n){const a=function(e){let t=e.target;for(;t&&t!==this;)t.matches(o)&&s.call(t,e),t=t.parentNode};!0===n?document.addEventListener?e.addEventListener(t,a,r||{passive:!1}):document.attachEvent?e.attachEvent(`on${t}`,a):e[`on${t}`]=a:document.removeEventListener?e.removeEventListener(t,a,r||{passive:!1}):document.detachEvent?e.detachEvent(`on${t}`,a):e[`on${t}`]=null}function isIterable(e){return isDef(e)&&"object"==typeof e&&(Array.isArray(e)||isDef(window.Symbol)&&"function"==typeof e[window.Symbol.iterator]||isDef(e.forEach)||"number"==typeof e.length&&(0===e.length||e.length>0&&e.length-1 in e))}function helper(e){return new Helper(e)}class Observable{constructor(){this.observers={}}subscribe(e,t){const o=this.observers;return isUndef(o[e])&&Object.defineProperty(o,e,{value:[]}),o[e].push(t),this}unsubscribe(e,t){const o=this.observers;if(isDef(o[e])){const s=o[e].indexOf(t);o[e].splice(s,1)}return this}notify(e,t,o){isUndef(this.observers[e])||this.observers[e].forEach(s=>{if(t!==s)switch(e){case"onmove":s.notifyMove(o);break;case"onrotate":s.notifyRotate(o);break;case"onresize":s.notifyResize(o);break;case"onapply":s.notifyApply(o);break;case"ongetstate":s.notifyGetState(o)}})}}class SubjectModel{constructor(e){this.el=e,this.storage=null,this.proxyMethods=null,this._onMouseDown=this._onMouseDown.bind(this),this._onTouchStart=this._onTouchStart.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this._onTouchMove=this._onTouchMove.bind(this),this._onMouseUp=this._onMouseUp.bind(this),this._onTouchEnd=this._onTouchEnd.bind(this),this._animate=this._animate.bind(this)}enable(e){this._processOptions(e),this._init(this.el),this.proxyMethods.onInit.call(this,this.el)}disable(){throwNotImplementedError()}_init(){throwNotImplementedError()}_destroy(){throwNotImplementedError()}_processOptions(){throwNotImplementedError()}_start(){throwNotImplementedError()}_moving(){throwNotImplementedError()}_end(){throwNotImplementedError()}_animate(){throwNotImplementedError()}_drag(){this._processMove(...arguments),this.proxyMethods.onMove.call(this,...arguments)}_draw(){this._animate()}_onMouseDown(e){this._start(e),helper(document).on("mousemove",this._onMouseMove).on("mouseup",this._onMouseUp)}_onTouchStart(e){this._start(e.touches[0]),helper(document).on("touchmove",this._onTouchMove).on("touchend",this._onTouchEnd)}_onMouseMove(e){e.preventDefault&&e.preventDefault(),this._moving(e,this.el)}_onTouchMove(e){e.preventDefault&&e.preventDefault(),this._moving(e.touches[0],this.el)}_onMouseUp(e){helper(document).off("mousemove",this._onMouseMove).off("mouseup",this._onMouseUp),this._end(e,this.el)}_onTouchEnd(e){helper(document).off("touchmove",this._onTouchMove).off("touchend",this._onTouchEnd),0===e.touches.length&&this._end(e.changedTouches[0],this.el)}}function throwNotImplementedError(){throw Error("Method not implemented")}function getOffset(e){return e.getBoundingClientRect()}function getTransform(e){return e.css("-webkit-transform")||e.css("-moz-transform")||e.css("-ms-transform")||e.css("-o-transform")||e.css("transform")||"none"}function parseMatrix(e){const t=e.match(/-?\d+\.?\d+|-?\d+/g);return t?t.map(e=>parseFloat(e)):[1,0,0,1,0,0]}function addClass(e,t){if(t){if(e.classList){if(!(t.indexOf(" ")>-1))return e.classList.add(t);t.split(/\s+/).forEach(t=>e.classList.add(t))}return e}}function removeClass(e,t){if(t){if(e.classList){if(!(t.indexOf(" ")>-1))return e.classList.remove(t);t.split(/\s+/).forEach(t=>e.classList.remove(t))}return e}}function objectsCollide(e,t){const{top:o,left:s}=getOffset(e),{top:r,left:n}=getOffset(t),a=helper(e),i=helper(t);return!(o<r||o+parseFloat(a.css("height"))>r+parseFloat(i.css("height"))||s<n||s+parseFloat(a.css("width"))>n+parseFloat(i.css("width")))}function matrixToCSS(e){const t=`matrix(${e.join()})`;return{transform:t,webkitTranform:t,mozTransform:t,msTransform:t,otransform:t}}const RAD=Math.PI/180;function snapToGrid(e,t){if(0===t)return e;{const o=snapCandidate(e,t);if(o-e<t)return o}}function snapCandidate(e,t){return 0===t?e:Math.round(e/t)*t}function floatToFixed(e,t=6){return Number(e.toFixed(t))}class Transformable extends SubjectModel{constructor(e,t,o){if(super(e),this.constructor===Transformable)throw new TypeError("Cannot construct Transformable instances directly");this.observable=o,this.enable(t)}_cursorPoint(){throw Error("'_cursorPoint()' method not implemented")}_rotate(){this._processRotate(...arguments),this.proxyMethods.onRotate.call(this,...arguments)}_resize(){this._processResize(...arguments),this.proxyMethods.onResize.call(this,...arguments)}_processOptions(e){const{el:t}=this;addClass(t,"sjx-drag");const o={x:10,y:10,angle:10*RAD},s={move:!1,resize:!1,rotate:!1};let r=null,n=!1,a="xy",i="auto",l="auto",c="auto",h="#00a8ff",d=!1,u=()=>{},p=()=>{},f=()=>{},x=()=>{},m=()=>{},y=()=>{},b=t.parentNode;if(isDef(e)){const{snap:g,each:v,axis:T,cursorMove:M,cursorResize:_,cursorRotate:E,rotationPoint:w,restrict:S,onInit:V,onDrop:D,onMove:j,onResize:C,onRotate:F,onDestroy:k,container:A,proportions:N,themeColor:R}=e;if(isDef(g)){const{x:e,y:t,angle:s}=g;o.x=isUndef(e)?10:e,o.y=isUndef(t)?10:t,o.angle=isUndef(s)?o.angle:s*RAD}if(isDef(v)){const{move:e,resize:t,rotate:o}=v;s.move=e||!1,s.resize=t||!1,s.rotate=o||!1}isDef(S)&&(r="parent"===S?t.parentNode:helper(S)[0]||document),h=R||"#00a8ff",i=M||"auto",l=_||"auto",c=E||"auto",a=T||"xy",b=isDef(A)&&helper(A)[0]?helper(A)[0]:b,d=w||!1,n=N||!1,u=createMethod(V),m=createMethod(D),p=createMethod(j),x=createMethod(C),f=createMethod(F),y=createMethod(k)}this.options={axis:a,themeColor:h,cursorMove:i,cursorRotate:c,cursorResize:l,rotationPoint:d,restrict:r,container:b,snap:o,each:s,proportions:n},this.proxyMethods={onInit:u,onDrop:m,onMove:p,onResize:x,onRotate:f,onDestroy:y},this.subscribe(s)}_animate(){const e=this,{observable:t,storage:o,options:s}=e;if(isUndef(o))return;if(o.frame=requestAnimFrame(e._animate),!o.doDraw)return;o.doDraw=!1;let{dox:r,doy:n,clientX:a,clientY:i,doDrag:l,doResize:c,doRotate:h,doSetCenter:d,revX:u,revY:p,handle:f}=o;const{snap:x,each:m,restrict:y}=s,{move:b,resize:g,rotate:v}=m;if(c){const{transform:s,cx:l,cy:c}=o,{x:h,y:d}=this._pointToElement({x:a,y:i});let m=r?snapToGrid(h-l,x.x/s.scX):0,y=n?snapToGrid(d-c,x.y/s.scY):0;m=r?u?-m:m:0,y=n?p?-y:y:0,e._resize(m,y,f[0]),g&&t.notify("onresize",e,{dx:m,dy:y,handle:f[0]})}if(l){const{restrictOffset:s,elementOffset:l,nx:c,ny:h}=o;isDef(y)&&(a-s.left<c-l.left&&(a=c-l.left+s.left),i-s.top<h-l.top&&(i=h-l.top+s.top));const d=r?snapToGrid(a-c,x.x):0,u=n?snapToGrid(i-h,x.y):0;e._drag(d,u),b&&t.notify("onmove",e,{dx:d,dy:u})}if(h){const{pressang:s,center:r}=o,n=Math.atan2(i-r.y,a-r.x)-s;e._rotate(snapToGrid(n,x.angle)),v&&t.notify("onrotate",e,{radians:n})}if(d){const{bx:t,by:s}=o,{x:r,y:n}=this._pointToControls({x:a,y:i});e._moveCenterHandle(r-t,n-s)}}_start(e){const{observable:t,storage:o,options:s,el:r}=this,n=this._compute(e);Object.keys(n).forEach(e=>{o[e]=n[e]});const{onRightEdge:a,onBottomEdge:i,onTopEdge:l,onLeftEdge:c,handle:h,factor:d,revX:u,revY:p,doW:f,doH:x}=n,m=a||i||l||c,{handles:y,radius:b}=o,{axis:g,restrict:v}=s;isDef(b)&&removeClass(b,"sjx-hidden");const T=h.is(y.rotator),M=!!isDef(y.center)&&h.is(y.center),{clientX:_,clientY:E}=e,{x:w,y:S}=this._cursorPoint({clientX:_,clientY:E}),{x:V,y:D}=this._pointToElement({x:w,y:S}),{x:j,y:C}=this._pointToControls({x:w,y:S}),F={clientX:_,clientY:E,nx:w,ny:S,cx:V,cy:D,bx:j,by:C,doResize:m,doDrag:!(T||m||M),doRotate:T,doSetCenter:M,onExecution:!0,cursor:null,elementOffset:getOffset(r),restrictOffset:isDef(v)?getOffset(v):null,dox:/\x/.test(g)&&(!m||(h.is(y.ml)||h.is(y.mr)||h.is(y.tl)||h.is(y.tr)||h.is(y.bl)||h.is(y.br))),doy:/\y/.test(g)&&(!m||(h.is(y.br)||h.is(y.bl)||h.is(y.bc)||h.is(y.tr)||h.is(y.tl)||h.is(y.tc)))};this.storage={...o,...F},t.notify("ongetstate",this,{factor:d,revX:u,revY:p,doW:f,doH:x}),this._draw()}_moving(e){const{storage:t,options:o}=this,{x:s,y:r}=this._cursorPoint(e);t.e=e,t.clientX=s,t.clientY=r,t.doDraw=!0;let{doRotate:n,doDrag:a,doResize:i,cursor:l}=t;const{cursorMove:c,cursorResize:h,cursorRotate:d}=o;isUndef(l)&&(a?l=c:n?l=d:i&&(l=h),helper(document.body).css({cursor:l}))}_end(e){const{observable:t,storage:o,proxyMethods:s,el:r}=this,{doResize:n,doDrag:a,frame:i,radius:l}=o,c=n?"resize":a?"drag":"rotate";o.doResize=!1,o.doDrag=!1,o.doRotate=!1,o.doSetCenter=!1,o.doDraw=!1,o.onExecution=!1,o.cursor=null,this._apply(c),s.onDrop.call(this,e,r),t.notify("onapply",this,{actionName:c,e:e}),cancelAnimFrame(i),helper(document.body).css({cursor:"auto"}),isDef(l)&&addClass(l,"sjx-hidden")}_checkHandles(e,t){const{tl:o,tc:s,tr:r,bl:n,br:a,bc:i,ml:l,mr:c}=t,h=!!isDef(o)&&e.is(o),d=!!isDef(s)&&e.is(s),u=!!isDef(r)&&e.is(r),p=!!isDef(n)&&e.is(n),f=!!isDef(i)&&e.is(i),x=!!isDef(a)&&e.is(a),m=!!isDef(l)&&e.is(l),y=!!isDef(c)&&e.is(c);return{revX:h||m||p||d,revY:h||u||d||m,onTopEdge:d||u||h,onLeftEdge:h||m||p,onRightEdge:u||y||x,onBottomEdge:x||f||p,doW:m||y,doH:d||f}}notifyMove({dx:e,dy:t}){this._drag(e,t)}notifyRotate({radians:e}){const{snap:t}=this.options;this._rotate(snapToGrid(e,t.angle))}notifyResize({dx:e,dy:t}){this._resize(e,t)}notifyApply({e:e,actionName:t}){this.proxyMethods.onDrop.call(this,e,this.el),this._apply(t)}notifyGetState(e){const{storage:t}=this,o=this._getState(e);this.storage={...t,...o}}subscribe(e){const{observable:t}=this,{resize:o,move:s,rotate:r}=e;(s||o||r)&&t.subscribe("ongetstate",this).subscribe("onapply",this),s&&t.subscribe("onmove",this),o&&t.subscribe("onresize",this),r&&t.subscribe("onrotate",this)}unsubscribe(){const{observable:e}=this;e.unsubscribe("ongetstate",this).unsubscribe("onapply",this).unsubscribe("onmove",this).unsubscribe("onresize",this).unsubscribe("onrotate",this)}disable(){const{storage:e,proxyMethods:t,el:o}=this;isUndef(e)||(e.onExecution&&(this._end(),helper(document).off("mousemove",this._onMouseMove).off("mouseup",this._onMouseUp).off("touchmove",this._onTouchMove).off("touchend",this._onTouchEnd)),removeClass(o,"sjx-drag"),this._destroy(),this.unsubscribe(),t.onDestroy.call(this,o),delete this.storage)}}function matrixTransform(e,t){const{x:o,y:s}=e,[r,n,a,i,l,c]=t;return{x:r*o+a*s+l,y:n*o+i*s+c}}function matrixInvert(e){const t=[[e[0],e[2],e[4]],[e[1],e[3],e[5]],[0,0,1]];if(t.length!==t[0].length)return;const o=t.length,s=[],r=[];for(let e=0;e<o;e+=1){s[s.length]=[],r[r.length]=[];for(let n=0;n<o;n+=1)s[e][n]=e==n?1:0,r[e][n]=t[e][n]}for(let e=0;e<o;e+=1){let t=r[e][e];if(0===t){for(let n=e+1;n<o;n+=1)if(0!==r[n][e]){for(let a=0;a<o;a++)t=r[e][a],r[e][a]=r[n][a],r[n][a]=t,t=s[e][a],s[e][a]=s[n][a],s[n][a]=t;break}if(0===(t=r[e][e]))return}for(let n=0;n<o;n++)r[e][n]=r[e][n]/t,s[e][n]=s[e][n]/t;for(let n=0;n<o;n++)if(n!=e){t=r[n][e];for(let a=0;a<o;a++)r[n][a]-=t*r[e][a],s[n][a]-=t*s[e][a]}}return[s[0][0],s[1][0],s[0][1],s[1][1],s[0][2],s[1][2]]}function multiplyMatrix(e,t){const o=[[e[0],e[2],e[4]],[e[1],e[3],e[5]],[0,0,1]],s=[[t[0],t[2],t[4]],[t[1],t[3],t[5]],[0,0,1]],r=[];for(let e=0;e<s.length;e++){r[e]=[];for(let t=0;t<o[0].length;t++){let n=0;for(let r=0;r<o.length;r++)n+=o[r][t]*s[e][r];r[e].push(n)}}return[r[0][0],r[1][0],r[0][1],r[1][1],r[0][2],r[1][2]]}function rotatedTopLeft(e,t,o,s,r,n,a,i,l){const c=parseFloat(o)/2,h=parseFloat(s)/2,d=e+c,u=t+h,p=e-d,f=t-u,x=Math.atan2(i?0:f,l?0:p)+r,m=Math.sqrt(Math.pow(l?0:c,2)+Math.pow(i?0:h,2));let y=Math.cos(x),b=Math.sin(x);const g=u+m*(b=!0===a?-b:b);return{left:floatToFixed(d+m*(y=!0===n?-y:y)),top:floatToFixed(g)}}const MIN_SIZE=2,CENTER_DELTA=7;class Draggable extends Transformable{constructor(e,t,o){super(e,t,o)}_init(e){const t=document.createElement("div");addClass(t,"sjx-wrapper"),e.parentNode.insertBefore(t,e);const{options:o}=this,{rotationPoint:s}=o,{left:r,top:n,width:a,height:i}=e.style,l=helper(e),c=a||l.css("width"),h=i||l.css("height"),d={top:n||l.css("top"),left:r||l.css("left"),width:c,height:h,transform:getTransform(l)},u=document.createElement("div");addClass(u,"sjx-controls");const p={normal:["sjx-normal"],tl:["sjx-hdl","sjx-hdl-t","sjx-hdl-l","sjx-hdl-tl"],tr:["sjx-hdl","sjx-hdl-t","sjx-hdl-r","sjx-hdl-tr"],br:["sjx-hdl","sjx-hdl-b","sjx-hdl-r","sjx-hdl-br"],bl:["sjx-hdl","sjx-hdl-b","sjx-hdl-l","sjx-hdl-bl"],tc:["sjx-hdl","sjx-hdl-t","sjx-hdl-c","sjx-hdl-tc"],bc:["sjx-hdl","sjx-hdl-b","sjx-hdl-c","sjx-hdl-bc"],ml:["sjx-hdl","sjx-hdl-m","sjx-hdl-l","sjx-hdl-ml"],mr:["sjx-hdl","sjx-hdl-m","sjx-hdl-r","sjx-hdl-mr"],center:s?["sjx-hdl","sjx-hdl-m","sjx-hdl-c","sjx-hdl-mc"]:void 0,rotator:["sjx-hdl","sjx-hdl-m","sjx-rotator"]};if(Object.keys(p).forEach(e=>{const t=p[e];if(isUndef(t))return;const o=createHandler(t);p[e]=o,u.appendChild(o)}),isDef(p.center)){helper(p.center).css({left:`${e.getAttribute("data-cx")}px`,top:`${e.getAttribute("data-cy")}px`})}t.appendChild(u);const f=helper(u);f.css(d),this.storage={controls:u,handles:p,radius:void 0,parent:e.parentNode},f.on("mousedown",this._onMouseDown).on("touchstart",this._onTouchStart)}_destroy(){const{controls:e}=this.storage;helper(e).off("mousedown",this._onMouseDown).off("touchstart",this._onTouchStart);const t=e.parentNode;t.parentNode.removeChild(t)}_compute(e){const{handles:t}=this.storage,o=helper(e.target),{revX:s,revY:r,doW:n,doH:a,...i}=this._checkHandles(o,t),l=o.is(t.tr)||o.is(t.bl)?-1:1,c=this._getState({factor:l,revX:s,revY:r,doW:n,doH:a}),{x:h,y:d}=this._cursorPoint(e),u=Math.atan2(d-c.center.y,h-c.center.x);return{...c,...i,handle:o,pressang:u}}_pointToElement({x:e,y:t}){const{transform:o}=this.storage,s=[...o.matrix];return s[4]=s[5]=0,this._applyMatrixToPoint(matrixInvert(s),e,t)}_pointToControls(e){return this._pointToElement(e)}_applyMatrixToPoint(e,t,o){return matrixTransform({x:t,y:o},e)}_cursorPoint({clientX:e,clientY:t}){const{container:o}=this.options;return matrixTransform({x:e,y:t},matrixInvert(parseMatrix(getTransform(helper(o)))))}_apply(){const{el:e,storage:t}=this,o=helper(e),{cached:s,controls:r,transform:n,handles:a}=t,i=helper(r),l=parseFloat(i.css("width"))/2,c=parseFloat(i.css("height"))/2,{center:h}=a,d=isDef(h),u=d?parseFloat(helper(h).css("left")):l,p=d?parseFloat(helper(h).css("top")):c;if(e.setAttribute("data-cx",u),e.setAttribute("data-cy",p),isUndef(s))return;const{dx:f,dy:x}=s,m=matrixToCSS(n.matrix),y=parseFloat(e.style.left||o.css("left")),b=parseFloat(e.style.top||o.css("top"));m.left=`${y+f}px`,m.top=`${b+x}px`,o.css(m),i.css(m),this.storage.cached=null}_processResize(e,t){const{el:o,storage:s,options:r}=this,{proportions:n}=r,{controls:a,coords:i,cw:l,ch:c,transform:h,refang:d,revX:u,revY:p,doW:f,doH:x}=s,m=f||!f&&!x?(l+e)/l:(c+t)/c,y=n?l*m:l+e,b=n?c*m:c+t;if(y<MIN_SIZE||b<MIN_SIZE)return;const g=[...h.matrix],v=rotatedTopLeft(g[4],g[5],y,b,d,u,p,f,x),T=i.left-v.left,M=i.top-v.top;g[4]+=T,g[5]+=M;const _=matrixToCSS(g);_.width=`${y}px`,_.height=`${b}px`,helper(a).css(_),helper(o).css(_),s.cached={dx:T,dy:M}}_processMove(e,t){const{el:o,storage:s}=this,{controls:r,transform:n}=s,{matrix:a,parentMatrix:i}=n,l=[...i];l[4]=l[5]=0;const c=[...a];c[4]=a[4]+e,c[5]=a[5]+t;const h=matrixToCSS(c);helper(r).css(h),helper(o).css(h),s.cached={dx:e,dy:t}}_processRotate(e){const{el:t,storage:o}=this,{controls:s,transform:r,center:n}=o,{matrix:a,parentMatrix:i}=r,l=floatToFixed(Math.cos(e)),c=floatToFixed(Math.sin(e)),h=[1,0,0,1,n.cx,n.cy],d=[l,c,-c,l,0,0],u=[...i];u[4]=u[5]=0;const p=multiplyMatrix(matrixInvert(u),multiplyMatrix(d,u)),f=multiplyMatrix(multiplyMatrix(h,p),matrixInvert(h)),x=matrixToCSS(multiplyMatrix(f,a));helper(s).css(x),helper(t).css(x)}_getState(e){const{factor:t,revX:o,revY:s,doW:r,doH:n}=e,{el:a,storage:i,options:l}=this,{container:c}=l,{handles:h,controls:d,parent:u}=i,{center:p}=h,f=helper(d),x=parseMatrix(getTransform(helper(c))),m=parseMatrix(getTransform(helper(d))),y=parseMatrix(getTransform(helper(u))),b=Math.atan2(m[1],m[0])*t,g={matrix:m,parentMatrix:u===c?multiplyMatrix(y,x):x,scX:Math.sqrt(m[0]*m[0]+m[1]*m[1]),scY:Math.sqrt(m[2]*m[2]+m[3]*m[3])},v=parseFloat(f.css("width")),T=parseFloat(f.css("height")),M=rotatedTopLeft(m[4],m[5],v,T,b,o,s,r,n),_=v/2,E=T/2,w=getOffset(a),S=isDef(p),V=S?parseFloat(helper(p).css("left")):_,D=S?parseFloat(helper(p).css("top")):E,j=S?CENTER_DELTA:0;return{transform:g,cw:v,ch:T,coords:M,center:{x:w.left+V-j,y:w.top+D-j,cx:-V+_-j,cy:-D+E-j,hx:V,hy:D},factor:t,refang:b,revX:o,revY:s,doW:r,doH:n}}_moveCenterHandle(e,t){const{storage:o}=this,{handles:s,center:r}=o,n=`${r.hx+e}px`,a=`${r.hy+t}px`;helper(s.center).css({left:n,top:a})}resetCenterPoint(){const{handles:e}=this.storage;helper(e.center).css({left:null,top:null})}get controls(){return this.storage.controls}}function createHandler(e){const t=document.createElement("div");return e.forEach(e=>{addClass(t,e)}),t}const svgPoint=createSVGElement("svg").createSVGPoint(),ALLOWED_ELEMENTS=["circle","ellipse","image","line","path","polygon","polyline","rect","text","g"];function createSVGElement(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function createSVGMatrix(){return createSVGElement("svg").createSVGMatrix()}function getTransformToElement(e,t){return(t.getScreenCTM()||createSVGMatrix()).inverse().multiply(e.getScreenCTM()||createSVGMatrix())}function matrixToString(e){const{a:t,b:o,c:s,d:r,e:n,f:a}=e;return`matrix(${t},${o},${s},${r},${n},${a})`}function pointTo(e,t,o){return svgPoint.x=t,svgPoint.y=o,svgPoint.matrixTransform(e)}function cloneMatrix(e){const t=createSVGMatrix();return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t.e=e.e,t.f=e.f,t}function checkElement(e){const t=e.tagName.toLowerCase();return-1!==ALLOWED_ELEMENTS.indexOf(t)||(warn("Selected element is not allowed to transform. Allowed elements:\ncircle, ellipse, image, line, path, polygon, polyline, rect, text, g"),!1)}function isIdentity(e){const{a:t,b:o,c:s,d:r,e:n,f:a}=e;return 1===t&&0===o&&0===s&&1===r&&0===n&&0===a}const dRE=/\s*([achlmqstvz])([^achlmqstvz]*)\s*/gi,sepRE=/\s*,\s*|\s+/g;function parsePath(e){let t=dRE.lastIndex=0;const o=[];for(;t=dRE.exec(e);){const e=t[1],s=e.toUpperCase(),r=t[2].replace(/([^e])-/g,"$1 -").replace(/ +/g," ");o.push({relative:e!==s,key:s,cmd:e,values:r.trim().split(sepRE).map(e=>{if(!isNaN(e))return Number(e)})})}return o}function movePath(e){const{path:t,dx:o,dy:s}=e;try{const e=parsePath(t);let r="",n=" ",a=!0;for(let t=0,i=e.length;t<i;t++){const i=e[t],{values:l,key:c,relative:h}=i,d=[];switch(c){case"M":for(let e=0,t=l.length;e<t;e+=2){const[t,r]=l.slice(e,e+2);h&&!a||(t+=o,r+=s),d.push(t,r),a=!1}break;case"A":for(let e=0,t=l.length;e<t;e+=7){const t=l.slice(e,e+7);h||(t[5]+=o,t[6]+=s),d.push(...t)}break;case"C":for(let e=0,t=l.length;e<t;e+=6){const t=l.slice(e,e+6);h||(t[0]+=o,t[1]+=s,t[2]+=o,t[3]+=s,t[4]+=o,t[5]+=s),d.push(...t)}break;case"H":for(let e=0,t=l.length;e<t;e+=1){const t=l.slice(e,e+1);h||(t[0]+=o),d.push(t[0])}break;case"V":for(let e=0,t=l.length;e<t;e+=1){const t=l.slice(e,e+1);h||(t[0]+=s),d.push(t[0])}break;case"L":case"T":for(let e=0,t=l.length;e<t;e+=2){const[t,r]=l.slice(e,e+2);h||(t+=o,r+=s),d.push(t,r)}break;case"Q":case"S":for(let e=0,t=l.length;e<t;e+=4){const[t,r,n,a]=l.slice(e,e+4);h||(t+=o,r+=s,n+=o,a+=s),d.push(t,r,n,a)}break;case"Z":l[0]="",n=""}r+=i.cmd+d.join(",")+n}return r}catch(e){warn("Path parsing error: "+e)}}function resizePath(e){const{path:t,localCTM:o}=e;try{const e=parsePath(t);let s="",r=" ";const n=[];let a=!0;for(let t=0,i=e.length;t<i;t++){const i=e[t],{values:l,key:c,relative:h}=i;switch(c){case"A":{const e=[];for(let t=0,s=l.length;t<s;t+=7){const[s,r,n,a,i,c,d]=l.slice(t,t+7),u=cloneMatrix(o);h&&(u.e=u.f=0);const{x:p,y:f}=pointTo(u,c,d);e.push(floatToFixed(p),floatToFixed(f)),u.e=u.f=0;const{x:x,y:m}=pointTo(u,s,r);e.unshift(floatToFixed(x),floatToFixed(m),n,a,i)}n.push(e);break}case"C":{const e=[];for(let t=0,s=l.length;t<s;t+=6){const[s,r,n,a,i,c]=l.slice(t,t+6),d=cloneMatrix(o);h&&(d.e=d.f=0);const{x:u,y:p}=pointTo(d,s,r),{x:f,y:x}=pointTo(d,n,a),{x:m,y:y}=pointTo(d,i,c);e.push(floatToFixed(u),floatToFixed(p),floatToFixed(f),floatToFixed(x),floatToFixed(m),floatToFixed(y))}n.push(e);break}case"H":{const e=[];for(let t=0,s=l.length;t<s;t+=1){const[s]=l.slice(t,t+1),r=cloneMatrix(o);h&&(r.e=r.f=0);const{x:n}=pointTo(r,s,0);e.push(floatToFixed(n))}n.push(e);break}case"V":{const e=[];for(let t=0,s=l.length;t<s;t+=1){const[s]=l.slice(t,t+1),r=cloneMatrix(o);h&&(r.e=r.f=0);const{y:n}=pointTo(r,0,s);e.push(floatToFixed(n))}n.push(e);break}case"T":case"L":{const e=[];for(let t=0,s=l.length;t<s;t+=2){const[s,r]=l.slice(t,t+2),n=cloneMatrix(o);h&&(n.e=n.f=0);const{x:a,y:i}=pointTo(n,s,r);e.push(floatToFixed(a),floatToFixed(i))}n.push(e);break}case"M":{const e=[];for(let t=0,s=l.length;t<s;t+=2){const[s,r]=l.slice(t,t+2),n=cloneMatrix(o);h&&!a&&(n.e=n.f=0);const{x:i,y:c}=pointTo(n,s,r);e.push(floatToFixed(i),floatToFixed(c)),a=!1}n.push(e);break}case"Q":{const e=[];for(let t=0,s=l.length;t<s;t+=4){const[s,r,n,a]=l.slice(t,t+4),i=cloneMatrix(o);h&&(i.e=i.f=0);const{x:c,y:d}=pointTo(i,s,r),{x:u,y:p}=pointTo(i,n,a);e.push(floatToFixed(c),floatToFixed(d),floatToFixed(u),floatToFixed(p))}n.push(e);break}case"S":{const e=[];for(let t=0,s=l.length;t<s;t+=4){const[s,r,n,a]=l.slice(t,t+4),i=cloneMatrix(o);h&&(i.e=i.f=0);const{x:c,y:d}=pointTo(i,s,r),{x:u,y:p}=pointTo(i,n,a);e.push(floatToFixed(c),floatToFixed(d),floatToFixed(u),floatToFixed(p))}n.push(e);break}case"Z":n.push([""]),r=""}s+=i.cmd+n[t].join(",")+r}return s}catch(e){warn("Path parsing error: "+e)}}const MIN_SIZE$1=5,ROT_OFFSET=50,floatRE=/[+-]?\d+(\.\d+)?/g;class DraggableSVG extends Transformable{constructor(e,t,o){super(e,t,o)}_init(e){const{options:t}=this,{rotationPoint:o,container:s,themeColor:r}=t,n=createSVGElement("g");addClass(n,"sjx-svg-wrapper"),s.appendChild(n);const{width:a,height:i,x:l,y:c}=e.getBBox(),h=getTransformToElement(e,s),d=createSVGElement("rect");[["width",a],["height",i],["x",l],["y",c],["fill",r],["fill-opacity",.1],["stroke",r],["stroke-dasharray","3 3"],["vector-effect","non-scaling-stroke"],["transform",matrixToString(h)]].forEach(([e,t])=>{d.setAttribute(e,t)});const u=createSVGElement("g"),p=createSVGElement("g"),f=createSVGElement("g");addClass(f,"sjx-svg-box-group"),addClass(u,"sjx-svg-handles"),addClass(p,"sjx-svg-normal-group"),f.appendChild(d),n.appendChild(f),n.appendChild(p),n.appendChild(u);const{x:x,y:m,width:y,height:b}=d.getBBox(),g=e.getAttribute("data-cx"),v=e.getAttribute("data-cy"),T=getTransformToElement(d,d.parentNode),M=pointTo(T,x+y/2,m+b/2),_={tl:pointTo(T,x,m),tr:pointTo(T,x+y,m),br:pointTo(T,x+y,m+b),bl:pointTo(T,x,m+b),tc:pointTo(T,x+y/2,m),bc:pointTo(T,x+y/2,m+b),ml:pointTo(T,x,m+b/2),mr:pointTo(T,x+y,m+b/2),center:o?createPoint(s,g,v)||M:void 0,rotator:{}},E=Math.atan2(_.tl.y-_.tr.y,_.tl.x-_.tr.x);_.rotator.x=_.mr.x-ROT_OFFSET*Math.cos(E),_.rotator.y=_.mr.y-ROT_OFFSET*Math.sin(E);const w=createSVGElement("line");w.x1.baseVal.value=_.mr.x,w.y1.baseVal.value=_.mr.y,w.x2.baseVal.value=_.rotator.x,w.y2.baseVal.value=_.rotator.y,setLineStyle(w,r),p.appendChild(w);let S=null;o&&(addClass(S=createSVGElement("line"),"sjx-hidden"),S.x1.baseVal.value=M.x,S.y1.baseVal.value=M.y,S.x2.baseVal.value=g||M.x,S.y2.baseVal.value=v||M.y,setLineStyle(S,"#fe3232"),S.setAttribute("opacity",.5),p.appendChild(S)),Object.keys(_).forEach(e=>{const t=_[e];if(isUndef(t))return;const{x:o,y:s}=t,n="center"===e?"#fe3232":r;_[e]=createHandler$1(o,s,n,e),u.appendChild(_[e])}),this.storage={wrapper:n,box:d,handles:_,normalLine:w,radius:o?S:void 0,parent:e.parentNode},helper(n).on("mousedown",this._onMouseDown).on("touchstart",this._onTouchStart)}_destroy(){const{wrapper:e}=this.storage;helper(e).off("mousedown",this._onMouseDown).off("touchstart",this._onTouchStart),e.parentNode.removeChild(e)}_compute(e){const{handles:t}=this.storage,o=helper(e.target),{revX:s,revY:r,doW:n,doH:a,...i}=this._checkHandles(o,t),l=this._getState({revX:s,revY:r,doW:n,doH:a}),{x:c,y:h}=this._cursorPoint(e),d=Math.atan2(h-l.center.y,c-l.center.x);return{...l,...i,handle:o,pressang:d}}_cursorPoint({clientX:e,clientY:t}){const{container:o}=this.options;return pointTo(o.getScreenCTM().inverse(),e,t)}_pointToElement({x:e,y:t}){const{transform:o}=this.storage,{ctm:s}=o,r=s.inverse();return r.e=r.f=0,this._applyMatrixToPoint(r,e,t)}_pointToControls({x:e,y:t}){const{transform:o}=this.storage,{boxCTM:s}=o,r=s.inverse();return r.e=r.f=0,this._applyMatrixToPoint(r,e,t)}_applyMatrixToPoint(e,t,o){const{container:s}=this.options,r=s.createSVGPoint();return r.x=t,r.y=o,r.matrixTransform(e)}_apply(e){const{el:t,storage:o,options:s}=this,{container:r}=s,{box:n,handles:a,cached:i,transform:l}=o,{matrix:c}=l,h=t.getBBox(),{x:d,y:u,width:p,height:f}=h,x=isDef(a.center)?pointTo(l.boxCTM,a.center.cx.baseVal.value,a.center.cy.baseVal.value):pointTo(c,d+p/2,u+f/2);if(t.setAttribute("data-cx",x.x),t.setAttribute("data-cy",x.y),isUndef(i))return;const{scaleX:m,scaleY:y,dx:b,dy:g,ox:v,oy:T}=i;if("drag"===e){if(0===b&&0===g)return;const e=createSVGMatrix();e.e=b,e.f=g;const o=e.multiply(c).multiply(e.inverse());if(t.setAttribute("transform",matrixToString(o)),isGroup(t)){checkChildElements(t).forEach(e=>{const o=r.createSVGPoint(),s=getTransformToElement(t.parentNode,r).inverse();o.x=v,o.y=T,s.e=s.f=0;const n=o.matrixTransform(s),a=createSVGMatrix();a.e=b,a.f=g;const i=a.multiply(getTransformToElement(e,e.parentNode)).multiply(a.inverse());isIdentity(i)||e.setAttribute("transform",matrixToString(i)),isGroup(e)||applyTranslate(e,{x:n.x,y:n.y})})}else applyTranslate(t,{x:b,y:g})}if("resize"===e){const{x:e,y:s,width:a,height:i}=n.getBBox();if(applyTransformToHandles(o,{x:e,y:s,width:a,height:i}),isGroup(t)){checkChildElements(t).forEach(e=>{isGroup(e)||applyResize(e,{scaleX:m,scaleY:y,defaultCTM:e.__ctm__,bBox:l.bBox,container:r,storage:o})})}else applyResize(t,{scaleX:m,scaleY:y,defaultCTM:l.ctm,bBox:l.bBox,container:r,storage:o});t.setAttribute("transform",matrixToString(c))}this.storage.cached=null}_processResize(e,t){const{el:o,storage:s,options:r}=this,{proportions:n}=r,{box:a,left:i,top:l,cw:c,ch:h,transform:d,revX:u,revY:p,doW:f,doH:x}=this.storage,{matrix:m,scMatrix:y,trMatrix:b,scaleX:g,scaleY:v}=d;let{width:T,height:M}=a.getBBox();const _=f||!f&&!x?(c+e)/c:(h+t)/h;if(T=n?c*_:c+e,M=n?h*_:h+t,Math.abs(T)<MIN_SIZE$1||Math.abs(M)<MIN_SIZE$1)return;const E=T/c,w=M/h;y.a=E,y.b=0,y.c=0,y.d=w,y.e=0,y.f=0,b.e=g,b.f=v;const S=b.multiply(y).multiply(b.inverse()),V=m.multiply(S);o.setAttribute("transform",matrixToString(V)),this.storage.cached={scaleX:E,scaleY:w},applyTransformToHandles(s,{x:i-(T-c)*(x?.5:u?1:0),y:l-(M-h)*(f?.5:p?1:0),width:T,height:M})}_processMove(e,t){const{transform:o,wrapper:s,center:r}=this.storage,{matrix:n,trMatrix:a,scMatrix:i,wrapperMatrix:l,parentMatrix:c}=o;i.e=e,i.f=t;const h=i.multiply(l);s.setAttribute("transform",matrixToString(h)),c.e=c.f=0;const{x:d,y:u}=pointTo(c.inverse(),e,t);a.e=d,a.f=u;const p=a.multiply(n);if(this.el.setAttribute("transform",matrixToString(p)),this.storage.cached={dx:d,dy:u,ox:e,oy:t},!r.isShifted)return;const f=l.inverse();f.e=f.f=0;const{x:x,y:m}=pointTo(f,e,t);this._moveCenterHandle(-x,-m)}_processRotate(e){const{center:t,transform:o,wrapper:s}=this.storage,{matrix:r,wrapperMatrix:n,parentMatrix:a,trMatrix:i,scMatrix:l,rotMatrix:c}=o,h=floatToFixed(Math.cos(e)),d=floatToFixed(Math.sin(e));i.e=t.x,i.f=t.y,c.a=h,c.b=d,c.c=-d,c.d=h;const u=i.multiply(c).multiply(i.inverse()).multiply(n);s.setAttribute("transform",matrixToString(u)),l.e=t.el_x,l.f=t.el_y,a.e=a.f=0;const p=a.inverse().multiply(c).multiply(a),f=l.multiply(p).multiply(l.inverse()).multiply(r);this.el.setAttribute("transform",matrixToString(f))}_getState({revX:e,revY:t,doW:o,doH:s}){const{el:r,storage:n,options:a}=this,{container:i}=a,{box:l,wrapper:c,parent:h,handles:d}=n,{center:u}=d,p=r.getBBox(),{x:f,y:x,width:m,height:y}=p,{width:b,height:g,x:v,y:T}=l.getBBox(),M=getTransformToElement(r,h),_=getTransformToElement(r,i),E=getTransformToElement(l.parentNode,i),w=getTransformToElement(h,i),S=f+m*(s?.5:e?1:0),V=x+y*(o?.5:t?1:0),D={matrix:M,ctm:_,boxCTM:E,parentMatrix:w,wrapperMatrix:getTransformToElement(c,c.parentNode),trMatrix:createSVGMatrix(),scMatrix:createSVGMatrix(),rotMatrix:createSVGMatrix(),scaleX:S,scaleY:V,scX:Math.sqrt(_.a*_.a+_.b*_.b),scY:Math.sqrt(_.c*_.c+_.d*_.d),bBox:p},j=v+b/2,C=T+g/2,F=u?u.cx.baseVal.value:j,k=u?u.cy.baseVal.value:C,{x:A,y:N}=pointTo(E,F,k),{x:R,y:O}=isDef(u)?pointTo(w.inverse(),A,N):pointTo(M,f+m/2,x+y/2),{x:P,y:G}=pointTo(getTransformToElement(l,i),j,C);return checkChildElements(r).forEach(e=>{e.__ctm__=getTransformToElement(e,i)}),{transform:D,cw:b,ch:g,center:{x:u?A:P,y:u?N:G,el_x:R,el_y:O,hx:u?u.cx.baseVal.value:null,hy:u?u.cy.baseVal.value:null,isShifted:floatToFixed(P,3)!==floatToFixed(A,3)&&floatToFixed(G,3)!==floatToFixed(N,3)},left:v,top:T,revX:e,revY:t,doW:o,doH:s}}_moveCenterHandle(e,t){const{handles:o,center:s,radius:r}=this.storage;isUndef(o.center)||(o.center.cx.baseVal.value=s.hx+e,o.center.cy.baseVal.value=s.hy+t,r.x2.baseVal.value=s.hx+e,r.y2.baseVal.value=s.hy+t)}resetCenterPoint(){const{box:e,handles:t,radius:o}=this.storage,{center:s}=t,{width:r,height:n,x:a,y:i}=e.getBBox(),l=getTransformToElement(e,e.parentNode),{x:c,y:h}=pointTo(l,a+r/2,i+n/2);s.cx.baseVal.value=c,s.cy.baseVal.value=h,s.isShifted=!1,o.x2.baseVal.value=c,o.y2.baseVal.value=h}get controls(){return this.storage.wrapper}}function applyTranslate(e,{x:t,y:o}){const s=[];switch(e.tagName.toLowerCase()){case"text":{const r=isDef(e.x.baseVal[0])?e.x.baseVal[0].value+t:(Number(e.getAttribute("x"))||0)+t,n=isDef(e.y.baseVal[0])?e.y.baseVal[0].value+o:(Number(e.getAttribute("y"))||0)+o;s.push(["x",r],["y",n]);break}case"use":case"image":case"rect":{const r=isDef(e.x.baseVal.value)?e.x.baseVal.value+t:(Number(e.getAttribute("x"))||0)+t,n=isDef(e.y.baseVal.value)?e.y.baseVal.value+o:(Number(e.getAttribute("y"))||0)+o;s.push(["x",r],["y",n]);break}case"circle":case"ellipse":{const r=e.cx.baseVal.value+t,n=e.cy.baseVal.value+o;s.push(["cx",r],["cy",n]);break}case"line":{const r=e.x1.baseVal.value+t,n=e.y1.baseVal.value+o,a=e.x2.baseVal.value+t,i=e.y2.baseVal.value+o;s.push(["x1",r],["y1",n],["x2",a],["y2",i]);break}case"polygon":case"polyline":{const r=parsePoints(e.getAttribute("points")).map(e=>(e[0]=Number(e[0])+t,e[1]=Number(e[1])+o,e.join(" "))).join(" ");s.push(["points",r]);break}case"path":{const r=e.getAttribute("d");s.push(["d",movePath({path:r,dx:t,dy:o})]);break}}s.forEach(t=>{e.setAttribute(t[0],t[1])})}function applyResize(e,t){const{scaleX:o,scaleY:s,bBox:r,defaultCTM:n,container:a}=t,{width:i,height:l}=r,c=[],h=getTransformToElement(e,a),d=n.inverse().multiply(h);switch(e.tagName.toLowerCase()){case"text":{const t=isDef(e.x.baseVal[0])?e.x.baseVal[0].value:Number(e.getAttribute("x"))||0,r=isDef(e.y.baseVal[0])?e.y.baseVal[0].value:Number(e.getAttribute("y"))||0,{x:n,y:a}=pointTo(d,t,r);c.push(["x",n+(o<0?i:0)],["y",a+(s<0?l:0)]);break}case"circle":{const t=e.r.baseVal.value,r=e.cx.baseVal.value,n=e.cy.baseVal.value,a=t*(Math.abs(o)+Math.abs(s))/2,{x:i,y:l}=pointTo(d,r,n);c.push(["r",a],["cx",i],["cy",l]);break}case"image":case"rect":{const t=e.width.baseVal.value,r=e.height.baseVal.value,n=e.x.baseVal.value,a=e.y.baseVal.value,{x:i,y:l}=pointTo(d,n,a),h=Math.abs(t*o),u=Math.abs(r*s);c.push(["x",i-(o<0?h:0)],["y",l-(s<0?u:0)],["width",h],["height",u]);break}case"ellipse":{const t=e.rx.baseVal.value,r=e.ry.baseVal.value,n=e.cx.baseVal.value,a=e.cy.baseVal.value,{x:i,y:l}=pointTo(d,n,a),h=createSVGMatrix();h.a=o,h.d=s;const{x:u,y:p}=pointTo(h,t,r);c.push(["rx",Math.abs(u)],["ry",Math.abs(p)],["cx",i],["cy",l]);break}case"line":{const t=e.x1.baseVal.value,o=e.y1.baseVal.value,s=e.x2.baseVal.value,r=e.y2.baseVal.value,{x:n,y:a}=pointTo(d,t,o),{x:i,y:l}=pointTo(d,s,r);c.push(["x1",n],["y1",a],["x2",i],["y2",l]);break}case"polygon":case"polyline":{const t=parsePoints(e.getAttribute("points")).map(e=>{const{x:t,y:o}=pointTo(d,Number(e[0]),Number(e[1]));return e[0]=t,e[1]=o,e.join(" ")}).join(" ");c.push(["points",t]);break}case"path":{const t=e.getAttribute("d");c.push(["d",resizePath({path:t,localCTM:d})]);break}}c.forEach(([t,o])=>{e.setAttribute(t,o)})}function applyTransformToHandles(e,t){const{box:o,handles:s,normalLine:r,radius:n,center:a}=e;let{x:i,y:l,width:c,height:h}=t;const d=c/2,u=h/2,p=getTransformToElement(o,o.parentNode),f=pointTo(p,i+d,l+u),x={tl:pointTo(p,i,l),tr:pointTo(p,i+c,l),br:pointTo(p,i+c,l+h),bl:pointTo(p,i,l+h),tc:pointTo(p,i+d,l),bc:pointTo(p,i+d,l+h),ml:pointTo(p,i,l+u),mr:pointTo(p,i+c,l+u),rotator:{},center:!a.isShifted&&isDef(s.center)?f:void 0},m=Math.atan2(x.tl.y-x.tr.y,x.tl.x-x.tr.x);x.rotator.x=x.mr.x-ROT_OFFSET*Math.cos(m),x.rotator.y=x.mr.y-ROT_OFFSET*Math.sin(m),r.x1.baseVal.value=x.mr.x,r.y1.baseVal.value=x.mr.y,r.x2.baseVal.value=x.rotator.x,r.y2.baseVal.value=x.rotator.y,isDef(n)&&(n.x1.baseVal.value=f.x,n.y1.baseVal.value=f.y,a.isShifted||(n.x2.baseVal.value=f.x,n.y2.baseVal.value=f.y));const y={x:i+=c<0?c:0,y:l+=h<0?h:0,width:Math.abs(c),height:Math.abs(h)};Object.keys(y).forEach(e=>{o.setAttribute(e,y[e])}),Object.keys(x).forEach(e=>{const t=s[e],o=x[e];isUndef(o)||(t.setAttribute("cx",o.x),t.setAttribute("cy",o.y))})}function isGroup(e){return"g"===e.tagName.toLowerCase()}function checkChildElements(e){const t=[];return isGroup(e)?forEach.call(e.childNodes,e=>{if(1===e.nodeType){const o=e.tagName.toLowerCase();-1!==ALLOWED_ELEMENTS.indexOf(o)&&("g"===o&&t.push(...checkChildElements(e)),t.push(e))}}):t.push(e),t}function parsePoints(e){return e.match(floatRE).reduce((e,t,o,s)=>(o%2==0&&e.push(s.slice(o,o+2)),e),[])}function createHandler$1(e,t,o,s){const r=createSVGElement("circle");addClass(r,`sjx-svg-hdl-${s}`);const n={cx:e,cy:t,r:5.5,fill:o,stroke:"#fff","fill-opacity":1,"vector-effect":"non-scaling-stroke","stroke-width":1};return Object.keys(n).map(e=>{r.setAttribute(e,n[e])}),r}function setLineStyle(e,t){e.setAttribute("stroke",t),e.setAttribute("stroke-dasharray","3 3"),e.setAttribute("vector-effect","non-scaling-stroke")}function createPoint(e,t,o){if(isUndef(t)||isUndef(o))return null;const s=e.createSVGPoint();return s.x=t,s.y=o,s}function drag(e,t){if(this.length){const o=isDef(t)&&t instanceof Observable?t:new Observable;return arrReduce.call(this,(t,s)=>(s instanceof SVGElement?checkElement(s)&&t.push(new DraggableSVG(s,e,o)):t.push(new Draggable(s,e,o)),t),[])}}class Cloneable extends SubjectModel{constructor(e,t){super(e),this.enable(t)}_init(){const{el:e,options:t}=this,o=helper(e),{style:s,appendTo:r}=t,n={position:"absolute","z-index":"2147483647",...s};this.storage={css:n,parent:isDef(r)?helper(r)[0]:document.body},o.on("mousedown",this._onMouseDown).on("touchstart",this._onTouchStart)}_processOptions(e){let t={},o=null,s=document,r=()=>{},n=()=>{},a=()=>{},i=()=>{};if(isDef(e)){const{style:s,appendTo:l,stack:c,onInit:h,onMove:d,onDrop:u,onDestroy:p}=e;t=isDef(s)&&"object"==typeof s?s:t,o=l||null;const f=isDef(c)?helper(c)[0]:document;r=createMethod(h),n=createMethod(d),a=isFunc(u)?function(e){const{clone:t}=this.storage;objectsCollide(t,f)&&u.call(this,e,this.el,t)}:()=>{},i=createMethod(p)}this.options={style:t,appendTo:o,stack:s},this.proxyMethods={onInit:r,onDrop:a,onMove:n,onDestroy:i}}_start({clientX:e,clientY:t}){const{storage:o,el:s}=this,{parent:r,css:n}=o,{left:a,top:i}=getOffset(r);n.left=`${e-a}px`,n.top=`${t-i}px`;const l=s.cloneNode(!0);helper(l).css(n),o.clientX=e,o.clientY=t,o.cx=e,o.cy=t,o.clone=l,helper(r)[0].appendChild(l),this._draw()}_moving({clientX:e,clientY:t}){const{storage:o}=this;o.clientX=e,o.clientY=t,o.doDraw=!0,o.doMove=!0}_end(e){const{storage:t}=this,{clone:o,frameId:s}=t;t.doDraw=!1,cancelAnimFrame(s),isUndef(o)||(this.proxyMethods.onDrop.call(this,e),o.parentNode.removeChild(o),delete t.clone)}_animate(){const{storage:e}=this;e.frameId=requestAnimFrame(this._animate);const{doDraw:t,clientX:o,clientY:s,cx:r,cy:n}=e;t&&(e.doDraw=!1,this._drag(o-r,s-n))}_processMove(e,t){const{clone:o}=this.storage,s=`translate(${e}px, ${t}px)`;helper(o).css({transform:s,webkitTranform:s,mozTransform:s,msTransform:s,otransform:s})}_destroy(){const{storage:e,proxyMethods:t,el:o}=this;isUndef(e)||(helper(o).off("mousedown",this._onMouseDown).off("touchstart",this._onTouchStart),t.onDestroy.call(this,o),delete this.storage)}disable(){this._destroy()}}function clone(e){if(this.length)return arrMap.call(this,t=>new Cloneable(t,e))}class Subjx extends Helper{constructor(e){super(e)}drag(){return drag.call(this,...arguments)}clone(){return clone.call(this,...arguments)}}function subjx(e){return new Subjx(e)}Object.defineProperty(subjx,"createObservable",{value:()=>new Observable}),Object.defineProperty(subjx,"Subjx",{value:Subjx}),Object.defineProperty(subjx,"Observable",{value:Observable}),module.exports=subjx;
