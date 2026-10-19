const WA='201000000000'; // غيّر الرقم هنا (بالصيغة الدولية)
const g=id=>document.getElementById(id);
const ld=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const COW=`<svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg"><g stroke="#3b2417" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
<path d="M58 52Q44 20 34 24Q38 46 52 66Z" fill="#efe0b2"/><path d="M142 52Q156 20 166 24Q162 46 148 66Z" fill="#efe0b2"/>
<ellipse cx="34" cy="84" rx="26" ry="14" fill="#8a5a3c" transform="rotate(-18 34 84)"/><ellipse cx="166" cy="84" rx="26" ry="14" fill="#f0b3a8" transform="rotate(18 166 84)"/>
<path d="M100 38C150 38 156 90 150 126C146 160 126 178 100 178C74 178 54 160 50 126C44 90 50 38 100 38Z" fill="#fff"/>
<path d="M54 70Q48 110 66 112Q84 100 76 62Q64 52 54 70Z" fill="#2a211c" stroke="none"/><path d="M132 44Q150 52 150 80Q136 86 128 70Z" fill="#2a211c" stroke="none"/>
<ellipse cx="100" cy="146" rx="42" ry="30" fill="#f5b5a8"/><ellipse cx="86" cy="146" rx="5" ry="7" fill="#3b2417" stroke="none"/><ellipse cx="114" cy="146" rx="5" ry="7" fill="#3b2417" stroke="none"/>
<circle cx="76" cy="96" r="14" fill="#fff"/><circle cx="124" cy="96" r="14" fill="#fff"/><circle cx="76" cy="96" r="7" fill="#2a211c" stroke="none"/><circle cx="124" cy="96" r="7" fill="#2a211c" stroke="none"/>
<path d="M86 166Q100 176 114 166" fill="none" stroke-width="3"/><path d="M62 184Q100 204 138 184" fill="none" stroke="#98623d" stroke-width="12"/><circle cx="100" cy="198" r="9" fill="#f4d77d"/></g></svg>`;

/* ===== البيانات (عدّل الأسعار والأسماء من هنا) ===== */
const milk=[['سادة طبيعي',35,'#ffffff'],['شوكولاتة',45,'#8a5a3c'],['جوافة',45,'#f4a6a0'],['فراولة',45,'#f48ab0'],['كراميل',48,'#d9a05b'],['موز',45,'#f4d77d'],['مانجو',45,'#f6b44a']];
const cheese=[['قريش',70],['رومي',180],['دمياطي',120],['حلومي',160],['مش',60],['فيتا',110],['موزاريلا بلدي',150]];
const meat=[['كندوز',380,'🥩'],['ريش',420,'🥩'],['مفروم',340,'🍖']];
const farm=[['كبدة',300,'🫀'],['ممبار',150,'🌭'],['كوارع',120,'🦴'],['عكاوي',260,'🍢'],['لسان',250,'👅']];
const boxes=[['بوكس الجبن',350,'🧺'],['بوكس الفطار',280,'🍳'],['بوكس هدايا المزرعة',500,'🎁']];
const days=[['كل يوم',30],['يوم بيوم',15],['مرة في الأسبوع',4]];
const areas={'مدينة نصر':'كل يوم 6–8 ص','المعادي':'كل يوم 6–8 ص','الشيخ زايد':'السبت والثلاثاء','التجمع':'كل يوم 7–9 ص','6 أكتوبر':'الأحد والأربعاء'};
const NAV=[['index','الرئيسية','#f0b3a8'],['meat','اللحوم','#e9a39a'],['milk','الألبان','#cfe3a8'],['dairy','منتجات الألبان','#f4d77d'],['subscriptions','الاشتراكات','#a9d6e5'],['account','حسابي','#d9b8e0'],['contact','تواصل معنا','#f6c28b'],['cart','السلة','#e8a1a1']];
/* أماكن الأزرار فوق صورة الهيرو بالنسبة المئوية: [الرابط, الاسم, يسار, فوق, عرض, ارتفاع, شكل] */
const HS=[['milk.html','تسوق الآن',65.3,58.3,10.7,7.7,'99px'],['subscriptions.html','اشترك في التوصيل',77.2,57.4,13.9,8.2,'99px'],['meat.html','لحوم بلدية',65.4,74.1,6.3,15.6,'50%'],['milk.html','ألبان طبيعية',72.4,74.1,6.3,15.6,'50%'],['dairy.html','أجبان متنوعة',79.3,74.1,6.3,15.6,'50%'],['dairy.html#boxes','بوكسات المزرعة',86.3,74.1,6.3,15.6,'50%']];

const bottle=c=>`<path d="M26 4h18v8h-4v10c10 8 14 14 14 28v50c0 6-4 10-10 10H26c-6 0-10-4-10-10V50c0-14 4-20 14-28V12h-4z" fill="#eaf6fb" stroke="#3b2417" stroke-width="3"/><path d="M18 60h34v38c0 6-4 8-8 8H26c-4 0-8-2-8-8z" fill="${c}"/><ellipse cx="35" cy="80" rx="8" ry="6" fill="#2a211c" opacity=".8"/><rect x="24" y="2" width="22" height="7" rx="2" fill="#98623d" stroke="#3b2417" stroke-width="2"/>`;
const card=(id,n,p,u,ph)=>`<div class="card"><div class="ph">${ph}</div><h3>${n}</h3><div class="price">${p} جنيه / ${u}</div><button class="add" onclick="add('${id}','${n}',${p},'${u}')">أضف للسلة</button></div>`;
const grid=a=>`<div class="grid">${a.join('')}</div>`;
const head=(t,s)=>`<section class="pagehead"><h1>${t}</h1><p>${s}</p></section>`;
const sec=(h,cls='',id='')=>`<section class="sec ${cls}" ${id?`id="${id}"`:''}><div class="wrap">${h}</div></section>`;

/* ===== السلة ===== */
let cart=ld('cart',{}),tt;
const total=()=>Object.values(cart).reduce((a,i)=>a+i.price*i.q,0);
const count=()=>Object.values(cart).reduce((a,i)=>a+i.q,0);
function upd(){sv('cart',cart);const c=g('cc');if(c)c.textContent=count();if(g('items'))drawItems()}
const MOO=['مووو! اتضافت','في السلة يا باشا','اللبن في الطريق','تمام، هنجهزه طازة','اختيار ممتاز'];
function say(t){g('say').textContent=t||MOO[Math.floor(Math.random()*MOO.length)];g('toast').classList.add('show');clearTimeout(tt);tt=setTimeout(()=>g('toast').classList.remove('show'),2200)}
function add(id,name,price,unit,qty=1){if(cart[id])cart[id].q+=qty;else cart[id]={name,price,unit,q:qty};upd();say()}
function chg(id,d){cart[id].q+=d;if(cart[id].q<=0)delete cart[id];upd()}
function drawItems(){g('items').innerHTML=count()?Object.entries(cart).map(([id,i])=>`<div class="it"><span>${i.name}<br><small>${i.price*i.q} جنيه</small></span><span><button onclick="chg('${id}',-1)" aria-label="أقل">−</button> ${i.q} <button onclick="chg('${id}',1)" aria-label="أكتر">+</button></span></div>`).join(''):'<p>السلة فاضية. ابدأ بإزازة لبن من صفحة الألبان.</p>';g('tot').textContent=total()}
function order(e){e.preventDefault();if(!count()){say('السلة فاضية!');return false}
 const f=id=>g(id).value.trim();const items=Object.entries(cart).map(([id,i])=>({id,name:i.name,q:i.q,price:i.price}));
 const t='طلب جديد من مزرعة بقايرنا السعيدة:\n'+items.map(i=>`- ${i.name} × ${i.q} (${i.price*i.q} جنيه)`).join('\n')+`\nالإجمالي: ${total()} جنيه\nالاسم: ${f('on')}\nالموبايل: ${f('op')}\nالعنوان: ${f('oa')}\nالدفع: ${g('oy').value}\nملاحظات: ${f('ono')||'-'}`;
 const o=ld('orders',[]);o.unshift({d:new Date().toLocaleDateString('ar-EG'),total:total(),items});sv('orders',o);
 if(!ld('profile',null))sv('profile',{n:f('on'),p:f('op'),a:f('oa')});
 window.open(`https://wa.me/${WA}?text=${encodeURIComponent(t)}`,'_blank');cart={};upd();say('وصل طلبك. شكراً ليك!');return false}

/* ===== الاشتراك ===== */
let sf=0,sd=0,sqty=1,ret=true;
function pick(i){sf=i;[...g('sFlavor').children].forEach((c,j)=>c.setAttribute('aria-pressed',i==j));calc()}
function pickD(i){sd=i;[...g('sDays').children].forEach((c,j)=>c.setAttribute('aria-pressed',i==j));calc()}
function setQ(d){sqty=Math.max(1,Math.min(6,sqty+d));g('sq').textContent=sqty;calc()}
function toggleRet(){ret=!ret;g('sRet').setAttribute('aria-pressed',ret);calc()}
const subTotal=()=>{const n=days[sd][1]*sqty;return milk[sf][1]*n-(ret?2*n:0)};
function calc(){g('sBottle').innerHTML=bottle(milk[sf][2]);g('sName').textContent=`لبن ${milk[sf][0]} · ${sqty} لتر · ${days[sd][0]}`;g('sTotal').textContent=subTotal()+' جنيه';g('sNote').textContent=`${days[sd][1]*sqty} إزازة في الشهر`+(ret?' بعد خصم الإزايز المرتجعة':'')}
function addSub(){add(`sub_${sf}_${sd}`,`اشتراك شهري: ${milk[sf][0]} (${days[sd][0]})`,subTotal(),'شهر');say('اتسجل اشتراكك. اللبناوي جاي!')}
function checkZone(){const v=g('zin').value.trim();const k=Object.keys(areas).find(a=>v&&(a.includes(v)||v.includes(a)));g('zmsg').textContent=k?`وصلنا ${k}. مواعيد المرور: ${areas[k]}`:'لسه ما وصلناش هناك؟ ابعتلنا على واتساب وهنحاول نضيفك.'}

/* ===== الحساب والتواصل ===== */
function saveP(e){e.preventDefault();sv('profile',{n:g('pn').value,p:g('pp').value,a:g('pa').value});location.reload();return false}
function logout(){try{localStorage.removeItem('profile')}catch(e){}location.reload()}
function sendMsg(e){e.preventDefault();window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`رسالة من ${g('mn').value}:\n${g('mm').value}`)}`,'_blank');return false}

/* ===== الصفحات ===== */
const R={};
R.index=()=>`<section class="heroimg"><h1 class="sr">مزرعة بقايرنا السعيدة</h1><div class="hi"><img src="hero.png" alt="مزرعة بقايرنا السعيدة لمنتجات اللحوم والألبان">${HS.map(h=>`<a class="hs" href="${h[0]}" aria-label="${h[1]}" style="left:${h[2]}%;top:${h[3]}%;width:${h[4]}%;height:${h[5]}%;border-radius:${h[6]}"></a>`).join('')}</div></section>`
+sec(`<h2>تسوق من أقسام المزرعة</h2><p class="sub">كل قسم له صفحته.</p><div class="cats"><a class="cat c1" href="meat.html"><i>🥩</i><h3>اللحوم</h3></a><a class="cat c2" href="milk.html"><i>🥛</i><h3>ألبان كل يوم</h3></a><a class="cat c3" href="dairy.html"><i>🧀</i><h3>منتجات الألبان</h3></a><a class="cat c4" href="subscriptions.html"><i>🚲</i><h3>اشتراك التوصيل</h3></a></div>`)
+sec(`<h2>قابل بقراتنا</h2><p class="sub">لكل لبن بقرة بتديه، وبنكتب اسمها على الإزازة.</p><div class="cows"><div class="cowcard"><div class="cow"></div><h3>زهرة</h3><small>أم لبن السادة. هادية وبتحب البرسيم.</small></div><div class="cowcard"><div class="cow"></div><h3>شوكلاتة</h3><small>مصدر لبن الشوكولاتة. مشاغبة وبتحب التمشية.</small></div><div class="cowcard"><div class="cow"></div><h3>فرفورة</h3><small>أول من يصحى. بتحب تسمع الراديو.</small></div></div>`,'band');
R.meat=()=>head('اللحوم','طازجة من المزرعة، وعليها تاريخ الذبح')+sec(`<h2>لحوم طازجة</h2>${grid(meat.map(m=>card('t'+m[0],m[0],m[1],'كجم',m[2])))}<h2>من المزرعة كمان</h2>${grid(farm.map(m=>card('f'+m[0],m[0],m[1],'كجم',m[2])))}`);
R.milk=()=>head('ألبان كل يوم','لبن طبيعي ونكهات في إزازة ازاز')+sec(grid(milk.map(m=>card('m'+m[0],'لبن '+m[0],m[1],'لتر',`<svg width="52" height="82" viewBox="0 0 70 110">${bottle(m[2])}</svg>`)))+`<p class="sub" style="margin-top:26px">عايز لبن كل صباح؟ <a href="subscriptions.html">اشترك من هنا</a></p>`);
R.dairy=()=>head('منتجات الألبان','جبن بلدي وبوكسات من مطبخ المزرعة')+sec(`<h2 id="boxes">بوكسات المزرعة</h2>${grid(boxes.map(m=>card('b'+m[0],m[0],m[1],'بوكس',m[2])))}<h2>الجبن</h2>${grid(cheese.map(c=>card('c'+c[0],'جبنة '+c[0],c[1],'كجم','🧀')))}`);
R.subscriptions=()=>head('الاشتراكات والتوصيل','اللبناوي بيعدي كل صبح زي زمان')+sec(`<div class="builder"><div><h3>اختار النكهة</h3><div class="chips" id="sFlavor">${milk.map((m,i)=>`<button class="chip" aria-pressed="${i==0}" onclick="pick(${i})">${m[0]}</button>`).join('')}</div><h3>كام لتر في المرة؟</h3><div class="step"><button onclick="setQ(-1)" aria-label="أقل">−</button><b id="sq">1</b><button onclick="setQ(1)" aria-label="أكتر">+</button></div><h3>مواعيد المرور</h3><div class="chips" id="sDays">${days.map((d,i)=>`<button class="chip" aria-pressed="${i==0}" onclick="pickD(${i})">${d[0]}</button>`).join('')}</div><h3>إزايز زمان</h3><div class="chips"><button class="chip" id="sRet" aria-pressed="true" onclick="toggleRet()">رجّع الفاضي واخصم ٢ جنيه للإزازة</button></div><h3>وقف مؤقت</h3><p style="margin:0">مسافر؟ ابعتلنا على واتساب قبلها بيوم وهنوقف الاشتراك من غير ما يتلغي.</p></div><div class="sum"><svg class="bottle" id="sBottle" width="70" height="110" viewBox="0 0 70 110"></svg><p id="sName"></p><div class="big" id="sTotal"></div><p id="sNote"></p><button class="btn" style="border:0" onclick="addSub()">أضف الاشتراك للسلة</button></div></div>
<div class="how"><div><b>١</b>اختار النكهة والكمية والمواعيد</div><div><b>٢</b>اللبناوي يعدي ويسيب الإزايز عند بابك</div><div><b>٣</b>رجّع الفاضي في المرة الجاية واخصم</div></div>`)
+sec(`<h2>هنوصلك؟</h2><p class="sub">اكتب منطقتك وهنقولك مواعيد المرور.</p><div class="zone"><input id="zin" placeholder="مثال: مدينة نصر" aria-label="منطقتك"><button class="btn" style="border:0" onclick="checkZone()">اتأكد</button></div><div id="zmsg" role="status"></div>`,'band');
R.account=()=>{const p=ld('profile',null),o=ld('orders',[]);
 if(!p)return head('حسابي','بياناتك وطلباتك واشتراكاتك في مكان واحد')+sec(`<form class="form" onsubmit="return saveP(event)"><h2>أهلاً بيك في بقايرنا</h2><p style="margin:0">سجّل بياناتك مرة واحدة والطلبات الجاية تتعبى لوحدها. البيانات محفوظة على جهازك بس.</p><input id="pn" placeholder="الاسم" required><input id="pp" type="tel" placeholder="رقم الموبايل" required><input id="pa" placeholder="العنوان بالتفصيل" required><button class="btn" style="border:0">احفظ بياناتي</button></form>`);
 const subs=o.flatMap(x=>x.items.filter(i=>i.id.startsWith('sub_')));
 return head('أهلاً '+p.n,'بياناتك وطلباتك واشتراكاتك')+sec(`<div class="panel"><h3>بياناتي</h3><p style="margin:0">${p.n}<br>${p.p}<br>${p.a}</p><p style="margin:10px 0 0"><button class="chip" onclick="logout()">مسح بياناتي</button></p></div><div class="panel"><h3>اشتراكاتي</h3>${subs.length?subs.map(s=>`<p style="margin:0">${s.name} — ${s.price} جنيه</p>`).join(''):'<p style="margin:0">مفيش اشتراكات لسه. <a href="subscriptions.html">ابدأ اشتراك</a></p>'}</div><div class="panel"><h3>طلباتي</h3>${o.length?o.map(x=>`<p style="margin:0 0 8px"><b>${x.d}</b> — ${x.total} جنيه<br><small>${x.items.map(i=>i.name+' ×'+i.q).join('، ')}</small></p>`).join(''):'<p style="margin:0">مفيش طلبات لسه.</p>'}</div>`)};
R.contact=()=>head('تواصل معنا','نرد عليك في نفس اليوم')+sec(`<div class="grid" style="margin-bottom:30px"><div class="card"><div class="ph">📱</div><h3>واتساب</h3><a href="https://wa.me/${WA}" target="_blank" rel="noopener">ابعتلنا رسالة</a></div><div class="card"><div class="ph">📞</div><h3>اتصل بينا</h3><div class="price">01000000000</div></div><div class="card"><div class="ph">🕖</div><h3>مواعيد الشغل</h3><div>يومياً من ٧ ص لـ ٩ م</div></div><div class="card"><div class="ph">📍</div><h3>المزرعة</h3><div>اكتب عنوان المزرعة هنا</div></div></div><form class="form" onsubmit="return sendMsg(event)"><h2>ابعتلنا رسالة</h2><input id="mn" placeholder="اسمك" required><textarea id="mm" rows="4" placeholder="رسالتك" required></textarea><button class="btn" style="border:0">أرسل على واتساب</button></form>`);
R.cart=()=>{const p=ld('profile',{});return head('السلة','راجع طلبك وأكده على واتساب')+sec(`<div class="cartbox"><div id="items"></div><p class="tot"><b>الإجمالي:</b> <span id="tot">0</span> جنيه</p><p style="font-size:14px;opacity:.8;margin:6px 0 0">رسوم التوصيل بتتحدد حسب منطقتك.</p></div><form class="form" onsubmit="return order(event)"><h2>بيانات التوصيل</h2><input id="on" placeholder="الاسم" value="${p.n||''}" required><input id="op" type="tel" placeholder="رقم الموبايل" value="${p.p||''}" required><input id="oa" placeholder="العنوان بالتفصيل" value="${p.a||''}" required><select id="oy" aria-label="طريقة الدفع"><option>كاش عند الاستلام</option><option>فودافون كاش</option><option>إنستاباي</option></select><textarea id="ono" rows="2" placeholder="ملاحظات (اختياري)"></textarea><button class="btn" style="border:0">أكد الطلب على واتساب</button></form>`)};

/* ===== التشغيل ===== */
const pg=document.body.dataset.page;
document.body.insertAdjacentHTML('afterbegin',`<header><div class="wrap"><a class="logo" href="index.html"><span class="cow"></span>مزرعة بقايرنا<br>السعيدة</a><nav aria-label="القائمة الرئيسية">${NAV.map(([p,t,c])=>`<a class="cowbtn" href="${p}.html" style="--c:${c}"${p==pg?' aria-current="page"':''}><i class="hn a"></i><i class="hn b"></i><span class="eyes"><u></u><u></u></span><span class="mz">${p=='cart'?'السلة (<span id="cc">0</span>)':t}</span></a>`).join('')}</nav></div></header>`);
g('app').innerHTML=R[pg]();
document.body.insertAdjacentHTML('beforeend',`<footer><div class="wrap"><b>مزرعة بقايرنا السعيدة</b><p>الدفع كاش عند الاستلام أو محفظة إلكترونية. اطلب من الموقع أو من الواتساب.</p></div></footer><a class="wa" href="https://wa.me/${WA}" target="_blank" rel="noopener">واتساب</a><div id="toast" aria-live="polite"><div class="say" id="say"></div><div class="cow"></div></div>`);
document.querySelectorAll('.cow').forEach(e=>e.innerHTML=COW);
if(pg=='subscriptions')calc();
upd();
