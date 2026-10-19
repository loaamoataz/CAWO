const WA='201000000000'; // غيّر الرقم هنا
const COW=`<svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg"><g stroke="#3b2417" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
<path d="M58 52Q44 20 34 24Q38 46 52 66Z" fill="#efe0b2"/><path d="M142 52Q156 20 166 24Q162 46 148 66Z" fill="#efe0b2"/>
<ellipse cx="34" cy="84" rx="26" ry="14" fill="#8a5a3c" transform="rotate(-18 34 84)"/><ellipse cx="166" cy="84" rx="26" ry="14" fill="#f0b3a8" transform="rotate(18 166 84)"/>
<path d="M100 38C150 38 156 90 150 126C146 160 126 178 100 178C74 178 54 160 50 126C44 90 50 38 100 38Z" fill="#fff"/>
<path d="M54 70Q48 110 66 112Q84 100 76 62Q64 52 54 70Z" fill="#2a211c" stroke="none"/>
<path d="M132 44Q150 52 150 80Q136 86 128 70Z" fill="#2a211c" stroke="none"/>
<ellipse cx="100" cy="146" rx="42" ry="30" fill="#f5b5a8"/>
<ellipse cx="86" cy="146" rx="5" ry="7" fill="#3b2417" stroke="none"/><ellipse cx="114" cy="146" rx="5" ry="7" fill="#3b2417" stroke="none"/>
<circle cx="76" cy="96" r="14" fill="#fff"/><circle cx="124" cy="96" r="14" fill="#fff"/>
<circle class="pu" cx="76" cy="96" r="7" fill="#2a211c" stroke="none"/><circle class="pu" cx="124" cy="96" r="7" fill="#2a211c" stroke="none"/>
<path d="M86 166Q100 176 114 166" fill="none" stroke-width="3"/>
<path d="M62 184Q100 204 138 184" fill="none" stroke="#98623d" stroke-width="12"/><circle cx="100" cy="198" r="9" fill="#f4d77d"/></g></svg>`;
document.querySelectorAll('.cow').forEach(e=>e.innerHTML=COW);
document.addEventListener('pointermove',e=>{document.querySelectorAll('#heroCow .pu').forEach(p=>{const r=p.getBoundingClientRect(),dx=e.clientX-(r.x+r.width/2),dy=e.clientY-(r.y+r.height/2),d=Math.hypot(dx,dy)||1,k=Math.min(5,d/40);p.style.transform=`translate(${dx/d*k}px,${dy/d*k}px)`})});

const milk=[['سادة طبيعي',35,'#ffffff'],['شوكولاتة',45,'#8a5a3c'],['جوافة',45,'#f4a6a0'],['فراولة',45,'#f48ab0'],['كراميل',48,'#d9a05b'],['موز',45,'#f4d77d'],['مانجو',45,'#f6b44a']];
const cheese=[['قريش',70,'كجم'],['رومي',180,'كجم'],['دمياطي',120,'كجم'],['حلومي',160,'كجم'],['مش',60,'كجم'],['فيتا',110,'كجم'],['موزاريلا بلدي',150,'كجم']];
const meat=[['كندوز',380,'🥩'],['ريش',420,'🥩'],['مفروم',340,'🍖'],['كبدة',300,'🫀'],['ممبار',150,'🌭'],['كوارع',120,'🦴'],['عكاوي',260,'🍢'],['لسان',250,'👅']];
const bottle=c=>`<path d="M26 4h18v8h-4v10c10 8 14 14 14 28v50c0 6-4 10-10 10H26c-6 0-10-4-10-10V50c0-14 4-20 14-28V12h-4z" fill="#eaf6fb" stroke="#3b2417" stroke-width="3"/><path d="M18 60h34v38c0 6-4 8-8 8H26c-4 0-8-2-8-8z" fill="${c}"/><ellipse cx="35" cy="80" rx="8" ry="6" fill="#2a211c" opacity=".8"/><rect x="24" y="2" width="22" height="7" rx="2" fill="#98623d" stroke="#3b2417" stroke-width="2"/>`;
const card=(id,n,p,u,ph)=>`<div class="card"><div class="ph">${ph}</div><h3>${n}</h3><div class="price">${p} جنيه / ${u}</div><button class="add" onclick="add('${id}','${n}',${p},'${u}')">أضف للسلة</button></div>`;
milkGrid.innerHTML=milk.map(m=>card('m'+m[0],'لبن '+m[0],m[1],'لتر',`<svg width="52" height="82" viewBox="0 0 70 110">${bottle(m[2])}</svg>`)).join('');
cheeseGrid.innerHTML=cheese.map(c=>card('c'+c[0],'جبنة '+c[0],c[1],c[2],'🧀')).join('');
meatGrid.innerHTML=meat.map(c=>card('t'+c[0],c[0],c[1],'كجم',c[2])).join('');

const cart={};const L=()=>Object.values(cart);
const MOO=['مووو! اتضافت','في السلة يا باشا','اللبن في الطريق','تمام، هنجهزه طازة','ممم، اختيار ممتاز'];
let tt;function say(t){document.getElementById('say').textContent=t||MOO[Math.floor(Math.random()*MOO.length)];toast.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('show'),2200)}
function add(id,name,price,unit,qty=1){cart[id]?cart[id].q+=qty:cart[id]={name,price,unit,q:qty};render();say()}
function chg(id,d){cart[id].q+=d;if(cart[id].q<=0)delete cart[id];render()}
function render(){cc.textContent=L().reduce((a,i)=>a+i.q,0);items.innerHTML=L().length?Object.entries(cart).map(([id,i])=>`<div class="it"><span>${i.name}<br><small>${i.price*i.q} جنيه</small></span><span><button onclick="chg('${id}',-1)">−</button> ${i.q} <button onclick="chg('${id}',1)">+</button></span></div>`).join(''):'<p>السلة فاضية. ابدأ بإزازة لبن.</p>';tot.textContent=L().reduce((a,i)=>a+i.price*i.q,0)}
const openCart=()=>drawer.classList.add('open'),closeCart=()=>drawer.classList.remove('open');
function sendOrder(){if(!L().length){say('السلة فاضية!');return}const t='طلب جديد من موقع مزرعة البقرة:\n'+L().map(i=>`- ${i.name} × ${i.q} (${i.price*i.q} جنيه)`).join('\n')+'\nالإجمالي: '+tot.textContent+' جنيه';window.open(`https://wa.me/${WA}?text=${encodeURIComponent(t)}`,'_blank')}
waFloat.href=`https://wa.me/${WA}`;

let sf=0,sd=0,sqty=1,ret=true;const days=[['كل يوم',30],['يوم بيوم',15],['مرة في الأسبوع',4]];
sFlavor.innerHTML=milk.map((m,i)=>`<button class="chip" aria-pressed="${i==0}" onclick="pick(${i})">${m[0]}</button>`).join('');
sDays.innerHTML=days.map((d,i)=>`<button class="chip" aria-pressed="${i==0}" onclick="pickD(${i})">${d[0]}</button>`).join('');
function pick(i){sf=i;[...sFlavor.children].forEach((c,j)=>c.setAttribute('aria-pressed',i==j));calc()}
function pickD(i){sd=i;[...sDays.children].forEach((c,j)=>c.setAttribute('aria-pressed',i==j));calc()}
function setQ(d){sqty=Math.max(1,Math.min(6,sqty+d));sq.textContent=sqty;calc()}
function toggleRet(){ret=!ret;sRet.setAttribute('aria-pressed',ret);calc()}
function total(){const n=days[sd][1]*sqty;return milk[sf][1]*n-(ret?2*n:0)}
function calc(){sBottle.innerHTML=bottle(milk[sf][2]);sName.textContent=`لبن ${milk[sf][0]} · ${sqty} لتر · ${days[sd][0]}`;sTotal.textContent=total()+' جنيه';sNote.textContent=`${days[sd][1]*sqty} إزازة في الشهر`+(ret?' بعد خصم الإزايز المرتجعة':'')}
function addSub(){add('sub','اشتراك شهري: '+milk[sf][0]+' ('+days[sd][0]+')',total(),'شهر');say('اتسجل اشتراكك. اللبناوي جاي!')}
calc();render();

const areas={'مدينة نصر':'كل يوم 6–8 ص','المعادي':'كل يوم 6–8 ص','الشيخ زايد':'السبت والثلاثاء','التجمع':'كل يوم 7–9 ص','6 أكتوبر':'الأحد والأربعاء'};
function checkZone(){const v=zin.value.trim();const k=Object.keys(areas).find(a=>v&&(a.includes(v)||v.includes(a)));zmsg.textContent=k?`وصلنا ${k}. مواعيد المرور: ${areas[k]}`:'لسه ما وصلناش هناك؟ ابعتلنا على واتساب وهنحاول نضيفك.'}
