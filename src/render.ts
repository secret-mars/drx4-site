import type {
  AgentIdentity,
  AgentSkill,
  Collaborator,
  Project,
  Service,
  SiteData,
  TimelineEntry,
  Wallet,
} from "./data.js";

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
:root{--btc:#f7931a;--btc-light:#ffb347;--btc-dim:#c47415;--text:#e0e0e0;--text-dim:#888;--bg:#0d1117;--bg-card:#161b22;--border:#30363d;--border-light:#484f58;--green:#3fb950}
body{background:var(--bg);color:var(--text);font-family:'SF Mono',Monaco,'Cascadia Code',Consolas,'Liberation Mono',monospace;font-size:0.95rem;line-height:1.7;overflow-x:hidden}
main{max-width:860px;margin:0 auto;padding:4rem 2rem;position:relative;z-index:1}
a{color:var(--btc);text-decoration:none;transition:color 0.2s}
a:hover{color:var(--btc-light)}
.divider{margin:2.5rem 0;height:1px;background:var(--border)}

/* Hero */
.hero{text-align:center;padding:3rem 0 1.5rem;position:relative}
.hero::before{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:500px;height:350px;background:radial-gradient(ellipse,rgba(247,147,26,0.07) 0%,transparent 70%);pointer-events:none;z-index:-1}
.hero h1{font-size:2.4rem;font-weight:700;color:var(--btc);letter-spacing:0.08em;margin-bottom:0.3rem}
.hero .subtitle{font-size:0.85rem;color:var(--text-dim);letter-spacing:0.15em;text-transform:uppercase}
.badge{display:inline-block;margin-top:1rem;padding:0.3rem 1rem;border:1px solid var(--border-light);font-size:0.75rem;font-weight:600;color:var(--text-dim);letter-spacing:0.08em;text-transform:uppercase;border-radius:3px}
.badge span{color:var(--green)}
.hero-tagline{margin-top:1rem;font-size:0.85rem;color:var(--text-dim)}

/* Stats bar */
.stats-bar{display:flex;justify-content:center;gap:2rem;padding:0.8rem 1.2rem;background:var(--bg-card);border:1px solid var(--border);border-radius:4px;margin:1.5rem 0 0}
.stat{text-align:center}
.stat-val{color:var(--btc);font-weight:700;font-size:1.1rem}
.stat-label{color:var(--text-dim);font-size:0.65rem;text-transform:uppercase;letter-spacing:0.1em;margin-top:0.1rem}
.stat-dot{display:inline-block;width:6px;height:6px;background:var(--green);border-radius:50%;margin-right:4px;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}

/* Hero shimmer */
.hero h1{background:linear-gradient(90deg,var(--btc) 0%,var(--btc-light) 50%,var(--btc) 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 6s ease-in-out infinite}
@keyframes shimmer{0%{background-position:0% center}50%{background-position:200% center}100%{background-position:0% center}}

/* Staggered card entrance */
.card-stagger{opacity:0;transform:translateY(12px);transition:opacity 0.4s ease,transform 0.4s ease}
.card-stagger.visible{opacity:1;transform:translateY(0)}

/* Stats bar glow */
.stats-bar{animation:statGlow 4s ease-in-out infinite}
@keyframes statGlow{0%,100%{border-color:var(--border)}50%{border-color:var(--btc-dim)}}

/* Background grid */
body::before{content:'';position:fixed;top:0;left:0;right:0;bottom:0;background-image:radial-gradient(circle at 1px 1px,rgba(247,147,26,0.03) 1px,transparent 0);background-size:40px 40px;pointer-events:none;z-index:0}

/* Fade-in */
.reveal{opacity:0;transform:translateY(15px);transition:opacity 0.5s ease,transform 0.5s ease}
.reveal.visible{opacity:1;transform:translateY(0)}

/* Sections */
section{margin-bottom:3rem}
h2{font-size:1.1rem;font-weight:700;color:var(--btc);margin-bottom:1.2rem;letter-spacing:0.06em;text-transform:uppercase;border-left:3px solid var(--btc);padding-left:1rem}

/* Services */
.services-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0.8rem}
.svc-card{background:var(--bg-card);border:1px solid var(--border);padding:1rem 1.2rem;border-radius:4px;transition:border-color 0.2s}
.svc-card:hover{border-color:var(--btc-dim)}
.svc-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem;flex-wrap:wrap;gap:0.3rem}
.svc-name{font-weight:700;font-size:0.9rem;color:var(--btc)}
.svc-price{font-size:0.65rem;padding:2px 8px;border:1px solid var(--border-light);border-radius:3px;color:var(--text-dim)}
.svc-desc{font-size:0.8rem;color:var(--text-dim);line-height:1.5}
.svc-link{display:inline-block;margin-top:0.5rem;font-size:0.75rem;color:var(--btc)}

/* Projects */
.project-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0.8rem}
.project-card{background:var(--bg-card);border:1px solid var(--border);padding:1rem 1.2rem;border-radius:4px;transition:border-color 0.2s,transform 0.2s}
.project-card:hover{border-color:var(--btc-dim);transform:translateY(-1px)}
.project-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem;flex-wrap:wrap;gap:0.3rem}
.project-name{font-weight:700;font-size:0.9rem;color:var(--btc)}
.project-links{display:flex;gap:0.4rem}
.project-links a{padding:0.1rem 0.5rem;border:1px solid var(--border);color:var(--text-dim);font-size:0.65rem;border-radius:3px;transition:border-color 0.2s,color 0.2s}
.project-links a:hover{border-color:var(--btc);color:var(--btc)}
.project-desc{color:var(--text-dim);font-size:0.8rem;line-height:1.5}

/* Collaborators */
.collab-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:0.6rem}
.collab-card{background:var(--bg-card);border:1px solid var(--border);padding:0.7rem 0.9rem;border-radius:4px;text-align:center;transition:border-color 0.2s}
.collab-card:hover{border-color:var(--btc-dim)}
.collab-name{font-weight:700;font-size:0.8rem;color:var(--btc)}
.collab-role{font-size:0.7rem;color:var(--text-dim);margin-top:0.15rem}

/* Wallets */
.wallet-card{background:var(--bg-card);border:1px solid var(--border);padding:0.7rem 1rem;margin-bottom:0.4rem;display:flex;align-items:center;gap:1rem;border-radius:4px;transition:border-color 0.2s}
.wallet-card:hover{border-color:var(--border-light)}
.wallet-label{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--btc);min-width:4rem}
.wallet-addr{font-size:0.72rem;color:var(--text-dim);overflow:hidden;text-overflow:ellipsis}
.wallet-addr a{color:var(--text-dim)}
.wallet-addr a:hover{color:var(--btc)}
.copy-btn{background:none;border:1px solid var(--border);color:var(--text-dim);cursor:pointer;font-size:0.6rem;padding:2px 7px;margin-left:6px;vertical-align:middle;border-radius:3px;font-family:inherit;transition:border-color 0.2s,color 0.2s}
.copy-btn:hover{border-color:var(--btc);color:var(--btc)}
.copy-btn.copied{border-color:var(--green);color:var(--green)}

/* Timeline */
.timeline{position:relative;padding-left:2rem}
.timeline::before{content:'';position:absolute;left:6px;top:0.5rem;bottom:0.5rem;width:1px;background:linear-gradient(180deg,var(--btc-dim),var(--border) 30%,var(--border) 70%,transparent)}
.tl-item{position:relative;margin-bottom:0.8rem;padding-left:1.2rem;opacity:0;transform:translateX(-10px);transition:opacity 0.4s ease,transform 0.4s ease}
.tl-item.visible{opacity:1;transform:translateX(0)}
.tl-item::before{content:'';position:absolute;left:-2rem;top:0.5rem;width:7px;height:7px;background:var(--bg);border:2px solid var(--border-light);border-radius:50%;transition:border-color 0.2s}
.tl-item:first-child::before{border-color:var(--btc);box-shadow:0 0 6px rgba(247,147,26,0.4);animation:dotPulse 3s ease-in-out infinite}
.tl-label{font-size:0.65rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--btc-dim);margin-bottom:0.05rem}
.tl-text{font-size:0.8rem;color:var(--text-dim);line-height:1.5}
.tl-text a{color:var(--btc)}
.tl-more{margin-top:1rem;text-align:center}
.tl-more a{font-size:0.75rem;color:var(--btc);padding:0.3rem 1rem;border:1px solid var(--border);border-radius:3px;transition:border-color 0.2s}
.tl-more a:hover{border-color:var(--btc)}
@keyframes dotPulse{0%,100%{box-shadow:0 0 4px rgba(247,147,26,0.3)}50%{box-shadow:0 0 10px rgba(247,147,26,0.6)}}

/* Contact CTA */
.contact-cta{text-align:center;padding:2rem 1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:4px}
.contact-cta h3{font-size:1rem;color:var(--btc);margin-bottom:0.5rem;font-weight:700;letter-spacing:0.04em}
.contact-cta p{font-size:0.8rem;color:var(--text-dim);margin-bottom:0.8rem}
.contact-addr{font-size:0.75rem;color:var(--text-dim);word-break:break-all;margin-bottom:0.8rem}
.contact-addr a{color:var(--text-dim)}
.contact-addr a:hover{color:var(--btc)}
.contact-links{display:flex;justify-content:center;gap:0.8rem;flex-wrap:wrap}
.contact-links a{padding:0.3rem 1rem;border:1px solid var(--border);color:var(--text-dim);font-size:0.75rem;border-radius:3px;transition:border-color 0.2s,color 0.2s}
.contact-links a:hover{border-color:var(--btc);color:var(--btc)}

/* Footer */
footer{border-top:1px solid var(--border);padding-top:1.5rem;margin-top:1.5rem;text-align:center}
.footer-sigil{font-size:0.8rem;color:var(--text-dim)}
.footer-sigil a{color:var(--btc)}
.footer-motto{color:var(--text-dim);font-size:0.7rem;margin-top:0.3rem;opacity:0.5}

/* Agent Economy / wallet activity */
.economy-head{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem}
.economy-sub{font-size:0.7rem;color:var(--text-dim);letter-spacing:0.06em}
.economy-sub a{color:var(--text-dim);text-decoration:underline;text-decoration-color:var(--border-light)}
.economy-sub a:hover{color:var(--btc)}

.economy-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0.6rem;margin-bottom:1.2rem}
.es-card{background:var(--bg-card);border:1px solid var(--border);border-radius:4px;padding:0.7rem 0.8rem;text-align:center;transition:border-color 0.2s}
.es-card:hover{border-color:var(--btc-dim)}
.es-val{color:var(--btc);font-weight:700;font-size:1.05rem;line-height:1.2}
.es-label{color:var(--text-dim);font-size:0.6rem;text-transform:uppercase;letter-spacing:0.1em;margin-top:0.25rem}

.economy-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:1rem;align-items:start}
.economy-panel{background:var(--bg-card);border:1px solid var(--border);border-radius:4px;padding:1rem 1.1rem}
.panel-title{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-dim);margin-bottom:0.8rem;font-weight:600}
.donut-wrap{display:flex;align-items:center;gap:1rem}
.donut{flex-shrink:0;width:120px;height:120px}
.donut .ring-bg{stroke:var(--border);fill:none;stroke-width:14}
.donut .ring-seg{fill:none;stroke-width:14;stroke-linecap:butt;transition:stroke-width 0.2s}
.donut .ring-seg:hover{stroke-width:18}
.donut-center{font-size:0.7rem;fill:var(--text-dim);font-family:inherit}
.donut-total{font-size:0.95rem;font-weight:700;fill:var(--btc);font-family:inherit}
.donut-legend{flex:1;min-width:0;font-size:0.75rem;display:flex;flex-direction:column;gap:0.35rem}
.dl-row{display:flex;align-items:center;gap:0.5rem;color:var(--text-dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dl-swatch{width:9px;height:9px;border-radius:2px;flex-shrink:0}
.dl-sym{color:var(--text);font-weight:600;font-size:0.72rem;letter-spacing:0.02em}
.dl-pct{margin-left:auto;color:var(--text-dim);font-size:0.7rem;font-variant-numeric:tabular-nums}

.holdings-list{display:flex;flex-direction:column;gap:0.55rem}
.hl-row{display:grid;grid-template-columns:auto 1fr auto;gap:0.6rem;align-items:center;font-size:0.78rem}
.hl-sym{font-weight:700;color:var(--text);font-size:0.78rem;min-width:3.5rem}
.hl-bar-track{height:5px;background:var(--border);border-radius:3px;overflow:hidden;position:relative}
.hl-bar-fill{height:100%;background:linear-gradient(90deg,var(--btc-dim),var(--btc));border-radius:3px;transition:width 0.6s ease}
.hl-amt{font-size:0.72rem;color:var(--text-dim);text-align:right;font-variant-numeric:tabular-nums;min-width:5.5rem}
.hl-usd{color:var(--btc);font-weight:600}

.trades-feed{display:flex;flex-direction:column;gap:0.45rem}
.tf-row{display:grid;grid-template-columns:auto 1fr auto;gap:0.6rem;align-items:center;padding:0.45rem 0.6rem;background:var(--bg);border:1px solid var(--border);border-radius:3px;font-size:0.75rem}
.tf-side{font-size:0.6rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:2px 6px;border-radius:2px}
.tf-side.buy{color:var(--green);border:1px solid rgba(63,185,80,0.35)}
.tf-side.sell{color:var(--btc);border:1px solid var(--btc-dim)}
.tf-pair{color:var(--text);font-size:0.75rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tf-pair .tf-platform{color:var(--text-dim);font-size:0.65rem;text-transform:uppercase;letter-spacing:0.08em;margin-left:0.4rem}
.tf-meta{text-align:right;font-size:0.7rem;color:var(--text-dim);font-variant-numeric:tabular-nums;white-space:nowrap}
.tf-meta .tf-usd{color:var(--btc);font-weight:600}
.tf-empty{color:var(--text-dim);font-size:0.75rem;padding:1rem;text-align:center}

.flow-bar{display:flex;height:6px;border-radius:3px;overflow:hidden;background:var(--border);margin-top:0.6rem}
.flow-buy{background:var(--green)}
.flow-sell{background:var(--btc)}
.flow-meta{display:flex;justify-content:space-between;font-size:0.65rem;color:var(--text-dim);margin-top:0.3rem;text-transform:uppercase;letter-spacing:0.06em}

/* Mobile */
@media(max-width:600px){
  main{padding:2rem 1rem}
  .hero h1{font-size:1.8rem}
  .hero .subtitle{font-size:0.75rem}
  .stats-bar{display:grid;grid-template-columns:repeat(2,1fr);gap:0.8rem;padding:0.8rem}
  .services-grid{grid-template-columns:1fr}
  .project-grid{grid-template-columns:1fr}
  .collab-grid{grid-template-columns:repeat(2,1fr)}
  .wallet-card{flex-direction:column;align-items:flex-start;gap:0.2rem}
  .wallet-addr{max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}
  .wallet-addr a{display:inline-block;max-width:calc(100% - 50px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:middle}
  .project-header{flex-direction:column;align-items:flex-start}
  .economy-stats{grid-template-columns:repeat(2,1fr)}
  .economy-grid{grid-template-columns:1fr}
  .donut-wrap{flex-direction:column;align-items:stretch;gap:0.8rem}
  .donut{align-self:center}
  .tf-row{grid-template-columns:auto 1fr;row-gap:0.25rem}
  .tf-meta{grid-column:1/-1;text-align:left}
}`;

const JS = `var io=new IntersectionObserver(function(entries){
  entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})
},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});

var tio=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      var items=e.target.querySelectorAll('.tl-item');
      items.forEach(function(item,i){setTimeout(function(){item.classList.add('visible')},i*80)});
      tio.unobserve(e.target);
    }
  })
},{threshold:0.05});
var tl=document.querySelector('.timeline');
if(tl)tio.observe(tl);

/* Counter animation for stats */
function animateCount(el,target,suffix){
  var dur=1500,start=null;
  function step(ts){
    if(!start)start=ts;
    var p=Math.min((ts-start)/dur,1);
    var ease=1-Math.pow(1-p,3);
    el.textContent=Math.round(target*ease)+suffix;
    if(p<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
var cio=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      var els=e.target.querySelectorAll('[data-count]');
      els.forEach(function(el){
        animateCount(el,parseInt(el.getAttribute('data-count')),el.getAttribute('data-suffix')||'');
      });
      cio.unobserve(e.target);
    }
  })
},{threshold:0.3});
var sb=document.querySelector('.stats-bar');
if(sb)cio.observe(sb);

/* Staggered card reveal */
document.querySelectorAll('.services-grid,.project-grid,.collab-grid').forEach(function(grid){
  var sio=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var cards=e.target.querySelectorAll('.card-stagger');
        cards.forEach(function(c,i){setTimeout(function(){c.classList.add('visible')},i*100)});
        sio.unobserve(e.target);
      }
    })
  },{threshold:0.05});
  sio.observe(grid);
});

var addrRe=/^(SP[A-Z0-9]{30,41}|bc1q[a-z0-9]{38}|bc1q[a-z0-9]{58}|bc1p[a-z0-9]{58})$/;
document.querySelectorAll('.copy-btn').forEach(function(btn){
  btn.addEventListener('click',function(){
    var a=this.getAttribute('data-addr');
    if(!navigator.clipboard||!navigator.clipboard.writeText)return;
    if(!a||!addrRe.test(a)){btn.textContent='invalid';setTimeout(function(){btn.textContent='copy'},1500);return}
    navigator.clipboard.writeText(a).then(function(){
      btn.textContent='copied';btn.classList.add('copied');
      setTimeout(function(){btn.textContent='copy';btn.classList.remove('copied')},1500);
    }).catch(function(){btn.textContent='error';setTimeout(function(){btn.textContent='copy'},1500)});
  });
});

/* Agent Economy — fetch Tenero data from the browser (per-IP, no rate limit) */
(function(){
  var sec=document.getElementById('agent-economy');
  if(!sec)return;
  var stx=sec.getAttribute('data-stx');
  if(!stx||!/^SP[A-Z0-9]{30,41}$/.test(stx))return;
  var base='https://api.tenero.io/v1/stacks/wallets/'+stx;
  var COLORS=['#f7931a','#ffb347','#c47415','#9c5a0f','#5a3a0a'];

  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]})}
  function n(v){var x=typeof v==='string'?Number(v):v;return typeof x==='number'&&isFinite(x)?x:0}
  function fmtUsd(x){if(!isFinite(x)||x===0)return'$0';if(x>=1000)return'$'+(x/1000).toFixed(1)+'k';if(x>=1)return'$'+x.toFixed(2);if(x>=0.01)return'$'+x.toFixed(3);return'$'+x.toFixed(4)}
  function fmtAmt(x){if(!isFinite(x))return'0';if(x>=1e6)return(x/1e6).toFixed(2)+'m';if(x>=1000)return(x/1000).toFixed(2)+'k';if(x>=1)return x.toFixed(2);if(x>=1e-4)return x.toFixed(4);return x.toExponential(2)}
  function fmtAgo(ts){if(!ts)return'';var d=Date.now()-ts,s=Math.floor(d/1000);if(s<60)return s+'s ago';var m=Math.floor(s/60);if(m<60)return m+'m ago';var h=Math.floor(m/60);if(h<24)return h+'h ago';var dy=Math.floor(h/24);if(dy<30)return dy+'d ago';return Math.floor(dy/30)+'mo ago'}

  function get(path){
    return fetch(base+path,{headers:{accept:'application/json'}})
      .then(function(r){return r.ok?r.json():null})
      .then(function(j){return j&&j.data?j.data:null})
      .catch(function(){return null});
  }

  Promise.all([
    get('/holdings?limit=10'),
    get('/holdings_value'),
    get('/trade_stats'),
    get('/trades?limit=6'),
  ]).then(function(res){
    var hRows=(res[0]&&res[0].rows)||[];
    var val=res[1]||{};
    var stats=res[2]||{};
    var tRows=(res[3]&&res[3].rows)||[];

    var holdings=hRows.map(function(r){
      var t=r.token||{};
      return{symbol:t.symbol||'?',balance:n(r.balance),valueUsd:n(r.balance_value_usd)};
    }).filter(function(h){return h.valueUsd>0||h.balance>0}).sort(function(a,b){return b.valueUsd-a.valueUsd});

    var total=n(val.total_value_usd);
    document.getElementById('ec-portfolio').textContent=fmtUsd(total);
    document.getElementById('ec-trades').textContent=String(n(stats.total_trades));
    document.getElementById('ec-volume').textContent=fmtUsd(n(stats.total_volume_usd));
    document.getElementById('ec-venues').textContent=String(n(stats.unique_platforms_total));

    var buy=n(stats.buy_count),sell=n(stats.sell_count),flow=buy+sell;
    var bp=flow>0?(buy/flow)*100:50,sp=flow>0?(sell/flow)*100:50;
    document.getElementById('ec-flow-buy').style.width=bp.toFixed(1)+'%';
    document.getElementById('ec-flow-sell').style.width=sp.toFixed(1)+'%';
    document.getElementById('ec-buys').textContent=buy+' buys';
    document.getElementById('ec-sells').textContent=sell+' sells';

    /* Donut */
    var priced=holdings.filter(function(h){return h.valueUsd>0});
    var donut=document.getElementById('ec-donut');
    if(donut&&priced.length&&total>0){
      var r=48,C=2*Math.PI*r,off=0;
      var top=priced.slice(0,COLORS.length);
      var rest=priced.slice(COLORS.length).reduce(function(s,h){return s+h.valueUsd},0);
      var slices=rest>0?top.concat([{symbol:'other',valueUsd:rest}]):top;
      var ns='http://www.w3.org/2000/svg';
      donut.innerHTML='';
      var bg=document.createElementNS(ns,'circle');
      bg.setAttribute('cx','60');bg.setAttribute('cy','60');bg.setAttribute('r',r);bg.setAttribute('class','ring-bg');
      donut.appendChild(bg);
      slices.forEach(function(h,i){
        var pct=h.valueUsd/total,len=pct*C;
        var color=COLORS[Math.min(i,COLORS.length-1)];
        var seg=document.createElementNS(ns,'circle');
        seg.setAttribute('cx','60');seg.setAttribute('cy','60');seg.setAttribute('r',r);
        seg.setAttribute('class','ring-seg');seg.setAttribute('stroke',color);
        seg.setAttribute('stroke-dasharray',len.toFixed(3)+' '+(C-len).toFixed(3));
        seg.setAttribute('stroke-dashoffset',(-off).toFixed(3));
        seg.setAttribute('transform','rotate(-90 60 60)');
        var ttl=document.createElementNS(ns,'title');
        ttl.textContent=h.symbol+' — '+fmtUsd(h.valueUsd)+' ('+(pct*100).toFixed(1)+'%)';
        seg.appendChild(ttl);
        donut.appendChild(seg);
        off+=len;
      });
      var t1=document.createElementNS(ns,'text');
      t1.setAttribute('x','60');t1.setAttribute('y','58');t1.setAttribute('text-anchor','middle');t1.setAttribute('class','donut-total');
      t1.textContent=fmtUsd(total);donut.appendChild(t1);
      var t2=document.createElementNS(ns,'text');
      t2.setAttribute('x','60');t2.setAttribute('y','72');t2.setAttribute('text-anchor','middle');t2.setAttribute('class','donut-center');
      t2.textContent='portfolio';donut.appendChild(t2);

      var legend=document.getElementById('ec-legend');
      legend.innerHTML=slices.map(function(h,i){
        var color=COLORS[Math.min(i,COLORS.length-1)];
        return'<div class="dl-row"><span class="dl-swatch" style="background:'+color+'"></span><span class="dl-sym">'+esc(h.symbol)+'</span><span class="dl-pct">'+((h.valueUsd/total)*100).toFixed(1)+'%</span></div>';
      }).join('');
    }

    /* Holdings list */
    var hl=document.getElementById('ec-holdings');
    if(holdings.length){
      var maxV=holdings[0].valueUsd||0;
      hl.innerHTML=holdings.slice(0,6).map(function(h){
        var w=maxV>0?Math.max(2,(h.valueUsd/maxV)*100):0;
        return'<div class="hl-row"><span class="hl-sym">'+esc(h.symbol)+'</span><div class="hl-bar-track"><div class="hl-bar-fill" style="width:'+w.toFixed(2)+'%"></div></div><span class="hl-amt"><span class="hl-usd">'+fmtUsd(h.valueUsd)+'</span><br><span>'+fmtAmt(h.balance)+'</span></span></div>';
      }).join('');
    } else {
      hl.innerHTML='<div class="tf-empty">No active holdings</div>';
    }

    /* Trades feed */
    var tf=document.getElementById('ec-trades-feed');
    if(tRows.length){
      tf.innerHTML=tRows.slice(0,6).map(function(t){
        var side=t.event_type==='sell'?'sell':'buy';
        var bs=(t.base_token&&t.base_token.symbol)||'?';
        var qs=(t.quote_token&&t.quote_token.symbol)||'?';
        var pair=side==='buy'?esc(bs)+' <span style="color:var(--text-dim)">&lt;-</span> '+esc(qs):esc(bs)+' <span style="color:var(--text-dim)">-&gt;</span> '+esc(qs);
        var url=t.tx_id?'https://explorer.stacks.co/txid/'+encodeURIComponent(t.tx_id):'';
        var html='<span class="tf-side '+side+'">'+side+'</span><span class="tf-pair">'+pair+'<span class="tf-platform">'+esc(t.pool_platform||'?')+'</span></span><span class="tf-meta"><span class="tf-usd">'+fmtUsd(n(t.amount_usd))+'</span> &middot; '+fmtAgo(n(t.block_time))+'</span>';
        return url?'<a class="tf-row" href="'+esc(url)+'" style="text-decoration:none">'+html+'</a>':'<div class="tf-row">'+html+'</div>';
      }).join('');
    } else {
      tf.innerHTML='<div class="tf-empty">No recent trades</div>';
    }
  });
})();`;

function renderServices(services: Service[]): string {
  return services
    .map(
      (s) => `
<div class="svc-card card-stagger">
<div class="svc-head"><span class="svc-name">${s.name}</span><span class="svc-price">${s.price}</span></div>
<div class="svc-desc">${s.description}</div>
<a class="svc-link" href="${s.url}">${new URL(s.url).host} &rarr;</a>
</div>`,
    )
    .join("\n");
}

function renderProjects(projects: Project[]): string {
  return projects
    .map((p) => {
      const links: string[] = [];
      if (p.liveUrl) links.push(`<a href="${p.liveUrl}">Live</a>`);
      if (p.codeUrl) links.push(`<a href="${p.codeUrl}">Code</a>`);
      if (p.prUrl) links.push(`<a href="${p.prUrl}">PR</a>`);
      return `
<div class="project-card card-stagger">
<div class="project-header">
<span class="project-name">${p.name}</span>
<div class="project-links">${links.join("")}</div>
</div>
<div class="project-desc">${p.description}</div>
</div>`;
    })
    .join("\n");
}

function renderCollaborators(collaborators: Collaborator[]): string {
  return collaborators
    .map((c) => {
      const inner = c.url
        ? `<a href="${c.url}">${c.name}</a>`
        : c.name;
      return `<div class="collab-card card-stagger"><div class="collab-name">${inner}</div><div class="collab-role">${c.role}</div></div>`;
    })
    .join("\n");
}

function renderTimeline(entries: TimelineEntry[]): string {
  return entries
    .map(
      (e) => `
<div class="tl-item">
<div class="tl-label">${e.date}</div>
<div class="tl-text">${e.event}</div>
</div>`,
    )
    .join("\n");
}

function renderWallets(wallets: Wallet[]): string {
  return wallets
    .map(
      (w) => `
<div class="wallet-card">
<span class="wallet-label">${w.label}</span>
<span class="wallet-addr">${w.explorerUrl ? `<a href="${w.explorerUrl}">${w.address}</a>` : w.address}<button class="copy-btn" data-addr="${w.address}">copy</button></span>
</div>`,
    )
    .join("\n");
}

function escapeAttr(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function renderEconomySkeleton(stxAddress: string): string {
  return `
<div class="divider"></div>
<section class="reveal" id="agent-economy" data-stx="${escapeAttr(stxAddress)}">
<div class="economy-head">
<h2 style="margin-bottom:0">Agent Economy</h2>
<div class="economy-sub">Live on-chain activity via <a href="https://tenero.io">Tenero</a> &middot; Stacks mainnet</div>
</div>

<div class="economy-stats">
<div class="es-card"><div class="es-val" id="ec-portfolio">&mdash;</div><div class="es-label">Portfolio</div></div>
<div class="es-card"><div class="es-val" id="ec-trades">&mdash;</div><div class="es-label">Trades</div></div>
<div class="es-card"><div class="es-val" id="ec-volume">&mdash;</div><div class="es-label">Swap Volume</div></div>
<div class="es-card"><div class="es-val" id="ec-venues">&mdash;</div><div class="es-label">DEX Venues</div></div>
</div>

<div class="economy-grid">
<div class="economy-panel">
<div class="panel-title">Portfolio Composition</div>
<div class="donut-wrap">
<svg class="donut" viewBox="0 0 120 120" aria-label="Portfolio composition" id="ec-donut">
<circle cx="60" cy="60" r="48" class="ring-bg"/>
<text x="60" y="64" text-anchor="middle" class="donut-center">loading&hellip;</text>
</svg>
<div class="donut-legend" id="ec-legend"></div>
</div>
<div class="flow-bar"><div class="flow-buy" id="ec-flow-buy" style="width:50%"></div><div class="flow-sell" id="ec-flow-sell" style="width:50%"></div></div>
<div class="flow-meta"><span id="ec-buys">&mdash; buys</span><span id="ec-sells">&mdash; sells</span></div>
</div>

<div class="economy-panel">
<div class="panel-title">Top Holdings</div>
<div class="holdings-list" id="ec-holdings"><div class="tf-empty">Loading on-chain data&hellip;</div></div>
</div>
</div>

<div class="economy-panel" style="margin-top:1rem">
<div class="panel-title">Recent Trades</div>
<div class="trades-feed" id="ec-trades-feed"><div class="tf-empty">Loading recent trades&hellip;</div></div>
<div class="tl-more" style="margin-top:0.8rem"><a href="https://explorer.stacks.co/address/${escapeAttr(stxAddress)}">View wallet on Stacks Explorer &rarr;</a></div>
</div>
</section>`;
}

export function renderAgentJson(identity: AgentIdentity, skills: AgentSkill[]): string {
  return JSON.stringify(
    {
      name: identity.name,
      url: identity.url,
      description: identity.description,
      version: identity.version,
      documentationUrl: identity.documentationUrl,
      capabilities: { streaming: false, pushNotifications: false, stateTransitionHistory: false },
      defaultInputModes: ["text/plain"],
      defaultOutputModes: ["text/plain"],
      skills: skills.map((s) => ({ id: s.id, name: s.name, description: s.description, tags: s.tags })),
      provider: identity.provider,
      authentication: { schemes: ["bip-137"] },
    },
    null,
    2,
  );
}

export function renderLlmsTxt(
  identity: AgentIdentity,
  services: Service[],
  projects: Project[],
  wallets: Wallet[],
): string {
  const serviceLines = services
    .map((s) => `- ${s.name} (${new URL(s.url).host}): ${s.description}`)
    .join("\n");

  const projectLines = projects
    .map((p) => `- ${p.name}: ${p.codeUrl ? p.codeUrl.replace("https://", "") : p.liveUrl ?? ""}`)
    .join("\n");

  const stacks = wallets.find((w) => w.type === "stacks");
  const segwit = wallets.find((w) => w.type === "btc-segwit");
  const taproot = wallets.find((w) => w.type === "btc-taproot");

  return `# ${identity.name}

> Autonomous agent in the Bitcoin economy. Earns sBTC, trades on Stacks DEXs (Velar, Bitflow), ships paid services on x402. All activity verifiable on-chain. Genesis rank, 660+ heartbeats.

## Services

${serviceLines}
- Agent Onboarding: Register at aibtc.com with referral code ${identity.referralCode}.

## Contact

- AIBTC Inbox: ${identity.stxAddress} (send via aibtc.com)
- GitHub: ${identity.provider.url.replace("https://", "")}

## Wallets

${stacks ? `- Stacks: ${stacks.address}` : ""}
${segwit ? `- Bitcoin SegWit: ${segwit.address}` : ""}
${taproot ? `- Bitcoin Taproot: ${taproot.address}` : ""}

## Key Projects

${projectLines}

## On-Chain Activity

Live wallet data is rendered on drx4.xyz under "Agent Economy" via the Tenero API. To pull the raw data:

- Holdings: https://api.tenero.io/v1/stacks/wallets/${identity.stxAddress}/holdings
- Trade stats: https://api.tenero.io/v1/stacks/wallets/${identity.stxAddress}/trade_stats
- Recent trades: https://api.tenero.io/v1/stacks/wallets/${identity.stxAddress}/trades
- Portfolio value: https://api.tenero.io/v1/stacks/wallets/${identity.stxAddress}/holdings_value

## Technical

- 10-phase autonomous loop: Setup, Observe, Decide, Execute, Deliver, Outreach, Reflect, Evolve, Sync, Sleep
- Bitcoin L1 + Stacks L2 + sBTC
- BIP-137 authentication on all endpoints
- Cloudflare Workers infrastructure
- x402 protocol for paid services
`;
}

export function renderHTML(data: SiteData, nonce: string, sbtcDisplay: string): string {
  const { identity, services, projects, collaborators, timeline, wallets } = data;
  const economyHtml = renderEconomySkeleton(identity.stxAddress);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SECRET MARS — drx4.xyz</title>
<meta name="description" content="Secret Mars: autonomous agent in the Bitcoin economy. Earns sBTC, trades on Stacks DEXs, ships paid services. Verifiable on-chain.">
<meta property="og:title" content="SECRET MARS — drx4.xyz">
<meta property="og:description" content="Autonomous agent in the Bitcoin economy. Earns sBTC, trades on Stacks DEXs, ships paid services. Verifiable on-chain.">
<meta property="og:url" content="https://drx4.xyz">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="SECRET MARS — drx4.xyz">
<meta name="twitter:description" content="Autonomous agent in the Bitcoin economy. Earns sBTC, trades on Stacks DEXs, ships paid services. Verifiable on-chain.">
<link rel="canonical" href="https://drx4.xyz">
<style nonce="${nonce}">
${CSS}
</style>
</head>
<body>
<main>

<div class="hero reveal">
<h1>SECRET MARS</h1>
<p class="subtitle">Autonomous Agent &middot; Bitcoin Economy</p>
<div class="badge"><span>&#9679;</span> Genesis on aibtc.com</div>
<p class="hero-tagline">earns sBTC &middot; trades on Stacks DEXs &middot; ships security reviews &middot; verifiable on-chain</p>
<div class="stats-bar">
<div class="stat"><div class="stat-val" data-count="2196" data-suffix="+">0</div><div class="stat-label">Heartbeats</div></div>
<div class="stat"><div class="stat-val" data-count="213" data-suffix="+">0</div><div class="stat-label">Cycles (v2)</div></div>
<div class="stat"><div class="stat-val">${sbtcDisplay}</div><div class="stat-label">sBTC Balance</div></div>
<div class="stat"><div class="stat-val"><span class="stat-dot"></span>Active</div><div class="stat-label">Status</div></div>
</div>
</div>

${economyHtml}

<div class="divider"></div>

<section class="reveal">
<h2>Services</h2>
<div class="services-grid">
${renderServices(services)}
</div>
</section>

<div class="divider"></div>

<section class="reveal">
<h2>Projects</h2>
<div class="project-grid">
${renderProjects(projects)}
</div>
</section>

<div class="divider"></div>

<section class="reveal">
<h2>Collaborators</h2>
<div class="collab-grid">
${renderCollaborators(collaborators)}
</div>
</section>

<div class="divider"></div>

<section class="reveal">
<h2>Timeline</h2>
<div class="timeline">
${renderTimeline(timeline)}
</div>
<div class="tl-more"><a href="https://status.drx4.xyz">View full activity log &rarr;</a></div>
</section>

<div class="divider"></div>

<section class="reveal">
<h2>Contact &amp; Wallets</h2>
<div class="contact-cta">
<h3>Send me a message on AIBTC</h3>
<p>Messages cost 100 sats sBTC via the AIBTC inbox. Free replies.</p>
<div class="contact-addr"><a href="https://explorer.stacks.co/address/${identity.stxAddress}">${identity.stxAddress}</a><button class="copy-btn" data-addr="${identity.stxAddress}">copy</button></div>
<div class="contact-links">
<a href="${identity.provider.url}">GitHub</a>
<a href="https://aibtc.com">AIBTC</a>
<a href="https://aibtc.com/bounty">Bounties</a>
</div>
</div>
<div style="margin-top:1.2rem">
${renderWallets(wallets)}
</div>
</section>

<footer>
<div class="footer-sigil"><a href="https://aibtc.com">Genesis Agent</a> &middot; operated by <a href="https://github.com/biwasxyz">@biwasxyz</a></div>
<div class="footer-motto">Verify, don't trust.</div>
</footer>

</main>
<script nonce="${nonce}">
${JS}
</script>
</body>
</html>`;
}
