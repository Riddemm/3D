!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/dist",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);let n=0,r=0,c=0;var l=()=>{const e=document.querySelector("menu"),t=document.querySelector(".menu"),o=document.querySelector(".close-btn"),n=e.querySelectorAll("ul > li > a"),r=()=>{e.classList.toggle("active-menu")};document.addEventListener("click",()=>{let c=event.target,l=!1;n.forEach(e=>{e===c&&(l=!0)}),t.childNodes.forEach(e=>{e===c&&(l=!0)}),c===o||c===t||!0===l?r():(c=c.closest("menu"),!c&&e.classList.contains("active-menu")&&r())})};var a=()=>{const e=document.querySelector(".popup"),t=document.querySelectorAll(".popup-btn"),o=document.querySelector(".popup-content");t.forEach(t=>{t.addEventListener("click",()=>{if(e.style.display="block",screen.width>768){o.style.top=0;let e=Date.now(),t=setInterval((function(){let n=Date.now()-e;n>=1e3?clearInterval(t):o.style.top=n/4+"px"}),20)}})}),e.addEventListener("click",t=>{let o=t.target;o.classList.contains("popup-close")?e.style.display="none":(o=o.closest(".popup-content"),o||(e.style.display="none"))})};var s=()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),o=document.querySelectorAll(".service-tab");e.addEventListener("click",e=>{let n=e.target;n=n.closest(".service-header-tab"),n&&t.forEach((e,r)=>{e===n&&(e=>{for(let n=0;n<o.length;n++)e===n?(t[n].classList.add("active"),o[n].classList.remove("d-none")):(t[n].classList.remove("active"),o[n].classList.add("d-none"))})(r)})})};var u=()=>{const e=document.querySelector(".portfolio-content"),t=document.querySelectorAll(".portfolio-item"),o=(document.querySelectorAll(".portfolio-btn"),document.querySelector(".portfolio-dots"));for(let e=0;e<t.length;e++){const e=document.createElement("li");e.classList.add("dot"),o.append(e)}const n=document.querySelectorAll(".dot");n[0].classList.add("dot-active");let r,c=0;const l=(e,t,o)=>{e[t].classList.remove(o)},a=(e,t,o)=>{e[t].classList.add(o)},s=()=>{l(t,c,"portfolio-item-active"),l(n,c,"dot-active"),c++,c>=t.length&&(c=0),a(t,c,"portfolio-item-active"),a(n,c,"dot-active")},u=(e=3e3)=>{r=setInterval(s,e)};e.addEventListener("click",e=>{e.preventDefault();let o=e.target;o.matches(".portfolio-btn, .dot")&&(l(t,c,"portfolio-item-active"),l(n,c,"dot-active"),o.matches("#arrow-right")?c++:o.matches("#arrow-left")?c--:o.matches(".dot")&&n.forEach((e,t)=>{o===e&&(c=t)}),c>=t.length&&(c=0),c<0&&(c=t.length-1),a(t,c,"portfolio-item-active"),a(n,c,"dot-active"))}),e.addEventListener("mouseover",e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(r)}),e.addEventListener("mouseout",e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&u(2e3)}),u(2e3)};var i=(e=100)=>{const t=document.querySelector(".calc-block"),o=t.querySelectorAll('[type="number"]'),n=t.querySelector(".calc-type"),r=o[0],c=o[1],l=o[2],a=t.querySelector("#total");let s,u=0,i=0;const d=()=>{s=requestAnimationFrame(d);let e=u-i;i>u?e<1e4?i-=5e3:e<1e3?i-=500:e<100?i-=50:e<0?i-=5:cancelAnimationFrame(s):i<u?e>1e4?i+=5e3:e>1e3?i+=500:e>100?i+=50:e>0?i+=5:cancelAnimationFrame(s):cancelAnimationFrame(s),a.textContent=i};t.addEventListener("change",t=>{const o=t.target;o!==n&&o!==r&&o!==c&&o!==l||(i=u,(()=>{let t=1,o=1;const a=n.options[n.selectedIndex].value,s=Number(r.value);c.value>1&&(t+=(c.value-1)/10),l.value&&l.value<5?o*=2:l.value&&l.value<10&&(o*=1.5),a&&s&&(u=e*a*s*t*o)})(),s=requestAnimationFrame(d))}),o.forEach(e=>{e.addEventListener("input",()=>{e.value=e.value.replace(/D/g,"")})})};var d=()=>{const e=document.querySelector(".command"),t=e.querySelectorAll(".command__photo");let o="";e.addEventListener("mouseover",()=>{let e=event.target;t.forEach(t=>{t===e&&(o=e.src,e.src=e.dataset.img,e.dataset.img=o)})}),e.addEventListener("mouseout",e=>{let n=e.target;t.forEach(e=>{e===n&&(o=n.src,n.src=n.dataset.img,n.dataset.img=o)})})};var m=()=>{const e=e=>{let t=Date.now(),o=setInterval((function(){let n=Date.now()-t;document.documentElement.scrollTop>e?clearInterval(o):document.documentElement.scrollTop+=n/10}),10)};function t(e){let t=e.getBoundingClientRect();return{top:t.top+pageYOffset,left:t.left+pageXOffset}}const o=document.querySelector("menu"),n=document.querySelector(".service-link"),r=document.querySelectorAll('[href="#service-block"]')[1],c=document.querySelector('[href="#portfolio"]'),l=document.querySelector('[href="#calc"]'),a=document.querySelector('[href="#command"]'),s=document.querySelector('[href="#connect"]'),u=document.querySelector("#service-block"),i=document.querySelector("#portfolio"),d=document.querySelector("#calc"),m=document.querySelector("#command"),f=document.querySelector("#connect");n.addEventListener("click",o=>{o.preventDefault(),e(t(u).top)}),o.addEventListener("click",o=>{o.preventDefault();let n=o.target;n===r&&e(t(u).top),n===c&&e(t(i).top),n===l&&e(t(d).top),n===a&&e(t(m).top),n===s&&e(t(f).top)})};var f=e=>{const t=document.createElement("img");t.setAttribute("src","./images/load.png");const o=document.createElement("div");o.style.cssText="font-size: 2rem";e.addEventListener("submit",n=>{n.preventDefault(),e.append(o),o.textContent="Загрузка...",e.append(t);const r=new FormData(e);let c={};r.forEach((e,t)=>{c[e]=t});let l=!0;[...e.elements].forEach(e=>{if(e.classList.contains("form-phone")){/^\+?[78]\d{10}$/.test(e.value)||(alert("Введите номер телефона в нужном формате"),l=!1)}e.value=""}),(e=>fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}))(c).then(e=>{200===e.status&&!0===l?(o.textContent="Ваша заявка отправлена",setTimeout(()=>{o.textContent=""},5e3),t.setAttribute("src","./images/success.jpg")):(o.textContent="Что-то пошло не так",setTimeout(()=>{o.textContent=""},5e3),t.setAttribute("src","./images/error.jpg"))}).catch(e=>console.error(e))})};(function e(t){let o=document.querySelector("#timer-hours"),l=document.querySelector("#timer-minutes"),a=document.querySelector("#timer-seconds"),s=function(e){return e<10?"0"+e:e};!function u(){let i=function(){let o=new Date(t).getTime(),l=(new Date).getTime(),a=(o-l)/1e3;if(a>0&&(n=Math.floor(a%60),r=Math.floor(a/60%60),c=Math.floor(a/3600)),a<0){o=new Date(t).getTime()+864e5;let s=new Date(o);a=(o-l)/1e3,n=Math.floor(a%60),r=Math.floor(a/60%60),c=Math.floor(a/3600),e(s)}return{timeRemaining:a,hours:c,minutes:r,seconds:n}}();o.textContent=s(i.hours),l.textContent=s(i.minutes),a.textContent=s(i.seconds),i.timeRemaining>=0&&setTimeout(u,1e3)}()})("2020-03-11 00:00:01"),l(),a(),s(),u(),i(100),m(),d(),[...document.forms].forEach(e=>{[...e.elements].forEach(e=>{if(e.classList.contains("mess")||"Ваше имя"===e.getAttribute("placeholder")){const t=/^[А-Яа-я\s]+$/;let o="";e.addEventListener("input",()=>{t.test(e.value)||""===e.value?o=e.value:e.value=o})}}),f(e)})}]);