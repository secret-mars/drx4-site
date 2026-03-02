import type { Project, SiteData, TimelineEntry, Wallet } from "./data";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderWalletCard(wallet: Wallet): string {
  const address = escapeHtml(wallet.address);
  return `<div class="wallet-card">
<span class="wallet-label">${escapeHtml(wallet.label)}</span>
<span class="wallet-addr"><a href="${escapeHtml(wallet.href)}">${address}</a><button class="copy-btn" data-addr="${address}">copy</button></span>
</div>`;
}

function renderProjectCard(project: Project): string {
  const links = project.links
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
    .join("");
  return `<div class="project-card">
<div class="project-header">
<span class="project-name">${escapeHtml(project.name)}</span>
<div class="project-links">${links}</div>
</div>
<div class="project-desc">${project.description}</div>
</div>`;
}

function renderTimelineItem(item: TimelineEntry): string {
  return `<div class="tl-item">
<div class="tl-label">${escapeHtml(item.label)}</div>
<div class="tl-text">${item.textHtml}</div>
</div>`;
}

export function renderHTML(nonce: string, data: SiteData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(data.title)}</title>
<meta name="description" content="${escapeHtml(data.description)}">
<meta property="og:title" content="${escapeHtml(data.title)}">
<meta property="og:description" content="${escapeHtml(data.description)}">
<meta property="og:url" content="https://drx4.xyz">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escapeHtml(data.title)}">
<meta name="twitter:description" content="${escapeHtml(data.description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" crossorigin="anonymous">
<style nonce="${nonce}">
*{margin:0;padding:0;box-sizing:border-box}
:root{--gold:#c9a84c;--gold-light:#e8d48b;--gold-dim:#8a7230;--parchment:#d4c5a9;--parchment-dim:#a89b80;--bg:#080808;--bg-card:#0e0d0b;--border:#2a2318;--border-light:#3d3425;--crimson:#6b1c1c;--crimson-glow:#8b2525}

body{background:var(--bg);color:var(--parchment);font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-size:1.05rem;line-height:1.8;overflow-x:hidden}
body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.03) 0%,transparent 60%);pointer-events:none;z-index:0}

main{max-width:860px;margin:0 auto;padding:4rem 2rem;position:relative;z-index:1}
a{color:var(--gold);text-decoration:none;transition:color 0.3s,text-shadow 0.3s}
a:hover{color:var(--gold-light);text-shadow:0 0 8px rgba(201,168,76,0.3)}
.divider{text-align:center;margin:2.5rem 0;position:relative;height:20px}
.divider::before{content:'';position:absolute;left:0;right:0;top:50%;height:1px;background:linear-gradient(90deg,transparent,var(--border-light) 20%,var(--gold-dim) 50%,var(--border-light) 80%,transparent)}
.divider::after{content:'\\2726';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:var(--bg);color:var(--gold-dim);padding:0 0.8rem;font-size:0.9rem}
.hero{text-align:center;padding:3rem 0 2rem;position:relative}
.hero h1{font-family:'Cinzel',Georgia,serif;font-size:3.2rem;font-weight:900;color:var(--gold);letter-spacing:0.18em;margin-bottom:0.3rem;text-shadow:0 0 40px rgba(201,168,76,0.15);animation:titleGlow 4s ease-in-out infinite alternate}
.hero .subtitle{font-family:'Cinzel',Georgia,serif;font-size:1rem;font-weight:400;color:var(--parchment-dim);letter-spacing:0.25em;text-transform:uppercase}
.badge{display:inline-block;margin-top:1.2rem;padding:0.35rem 1.2rem;border:1px solid var(--border-light);font-family:'Cinzel',Georgia,serif;font-size:0.75rem;font-weight:600;color:var(--parchment-dim);letter-spacing:0.12em;text-transform:uppercase;position:relative}
.badge::before,.badge::after{content:'\\2014';color:var(--gold-dim);margin:0 0.4rem}
.badge span{color:#5a9e3e}
@keyframes titleGlow{0%{text-shadow:0 0 40px rgba(201,168,76,0.1)}100%{text-shadow:0 0 60px rgba(201,168,76,0.25),0 0 120px rgba(201,168,76,0.08)}}
.hero-install{margin-top:2rem}
.install-label{color:var(--parchment-dim);font-size:0.9rem;margin-bottom:0.6rem;font-style:italic}
.install-block{background:var(--bg-card);border:1px solid var(--border-light);padding:0.9rem 1.4rem;text-align:left;position:relative}
.install-block::before,.install-block::after{content:'';position:absolute;width:12px;height:12px;border-color:var(--gold-dim);border-style:solid}
.install-block::before{top:-1px;left:-1px;border-width:1px 0 0 1px}
.install-block::after{bottom:-1px;right:-1px;border-width:0 1px 1px 0}
.install-block code{display:block;font-family:'SF Mono',Monaco,Consolas,monospace;font-size:0.88rem;color:var(--gold);word-break:break-all}
.install-note{color:var(--parchment-dim);font-size:0.82rem;margin-top:0.6rem}
.reveal{opacity:0;transform:translateY(20px);transition:opacity 0.7s ease,transform 0.7s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
section{margin-bottom:3.5rem}
h2{font-family:'Cinzel',Georgia,serif;font-size:1.4rem;font-weight:700;color:var(--gold);margin-bottom:1.5rem;letter-spacing:0.1em;text-transform:uppercase;position:relative;padding-left:1.4rem}
h2::before{content:'';position:absolute;left:0;top:0.15em;width:3px;height:1em;background:linear-gradient(180deg,var(--gold),var(--gold-dim))}
.about p{margin-bottom:0.7rem;color:var(--parchment);font-size:1rem}
.about strong{color:var(--gold)}
.values-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.9rem;margin-top:1.2rem}
.value-item{background:var(--bg-card);border:1px solid var(--border);padding:1rem 1.1rem;position:relative;transition:border-color 0.3s,box-shadow 0.3s}
.value-item:hover{border-color:var(--gold-dim);box-shadow:0 0 20px rgba(201,168,76,0.06)}
.value-item::before{content:'';position:absolute;top:-1px;left:20%;right:20%;height:1px;background:linear-gradient(90deg,transparent,var(--gold-dim),transparent)}
.value-item strong{font-family:'Cinzel',Georgia,serif;color:var(--gold);font-size:0.85rem;letter-spacing:0.06em}
.value-item p{color:var(--parchment-dim);font-size:0.85rem;margin-top:0.25rem}
.wallet-card{background:var(--bg-card);border:1px solid var(--border);padding:1rem 1.3rem;margin-bottom:0.6rem;display:flex;align-items:center;gap:1rem;transition:border-color 0.3s}
.wallet-card:hover{border-color:var(--border-light)}
.wallet-label{font-family:'Cinzel',Georgia,serif;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--gold);min-width:4.5rem}
.wallet-addr{font-size:0.8rem;color:var(--parchment-dim);word-break:break-all;font-family:'SF Mono',Monaco,Consolas,monospace}
.wallet-addr a{color:var(--parchment-dim)}
.wallet-addr a:hover{color:var(--gold)}
.copy-btn{background:none;border:1px solid var(--border-light);color:var(--parchment-dim);cursor:pointer;font-family:'Cinzel',Georgia,serif;font-size:0.65rem;padding:2px 8px;letter-spacing:0.05em;margin-left:6px;vertical-align:middle;transition:border-color 0.3s,color 0.3s}
.copy-btn:hover{border-color:var(--gold);color:var(--gold)}
.copy-btn.copied{border-color:#5a9e3e;color:#5a9e3e}
.project-grid{display:grid;gap:1rem}
.project-card{background:var(--bg-card);border:1px solid var(--border);padding:1.3rem 1.5rem;transition:border-color 0.4s,box-shadow 0.4s,transform 0.3s;position:relative}
.project-card:hover{border-color:var(--gold-dim);box-shadow:0 4px 30px rgba(201,168,76,0.07);transform:translateY(-2px)}
.project-card::after{content:'';position:absolute;bottom:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,var(--border-light),transparent);transition:background 0.4s}
.project-card:hover::after{background:linear-gradient(90deg,transparent,var(--gold-dim),transparent)}
.project-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;gap:0.5rem}
.project-name{font-family:'Cinzel',Georgia,serif;font-weight:700;font-size:1rem;color:var(--gold);letter-spacing:0.04em}
.project-links{display:flex;gap:0.6rem;font-size:0.78rem}
.project-links a{padding:0.2rem 0.7rem;border:1px solid var(--border);font-family:'Cinzel',Georgia,serif;color:var(--parchment-dim);font-size:0.72rem;letter-spacing:0.05em;transition:border-color 0.3s,color 0.3s}
.project-links a:hover{border-color:var(--gold);color:var(--gold)}
.project-desc{color:var(--parchment-dim);font-size:0.9rem;line-height:1.6}
.timeline{position:relative;padding-left:2rem}
.timeline::before{content:'';position:absolute;left:6px;top:0.5rem;bottom:0.5rem;width:1px;background:linear-gradient(180deg,var(--gold-dim),var(--border) 30%,var(--border) 70%,transparent)}
.tl-item{position:relative;margin-bottom:1.2rem;padding-left:1.2rem;opacity:0;transform:translateX(-10px);transition:opacity 0.5s ease,transform 0.5s ease}
.tl-item.visible{opacity:1;transform:translateX(0)}
.tl-item::before{content:'';position:absolute;left:-2rem;top:0.6rem;width:10px;height:10px;background:var(--bg);border:2px solid var(--gold-dim);border-radius:50%;transition:border-color 0.3s,box-shadow 0.3s}
.tl-item:first-child::before{border-color:var(--gold);box-shadow:0 0 8px rgba(201,168,76,0.4);animation:dotPulse 3s ease-in-out infinite}
.tl-label{font-family:'Cinzel',Georgia,serif;font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--gold-dim);margin-bottom:0.15rem}
.tl-text{font-size:0.88rem;color:var(--parchment-dim);line-height:1.6}
.tl-text a{color:var(--gold)}
@keyframes dotPulse{0%,100%{box-shadow:0 0 6px rgba(201,168,76,0.3)}50%{box-shadow:0 0 14px rgba(201,168,76,0.6)}}
footer{border-top:1px solid var(--border);padding-top:2rem;margin-top:1.5rem;text-align:center;position:relative}
footer::before{content:'';position:absolute;top:-1px;left:20%;right:20%;height:1px;background:linear-gradient(90deg,transparent,var(--gold-dim),transparent)}
.footer-sigil{font-family:'Cinzel',Georgia,serif;font-size:0.9rem;color:var(--parchment-dim);letter-spacing:0.08em}
.footer-sigil a{color:var(--gold)}
.footer-motto{font-style:italic;color:var(--parchment-dim);font-size:0.85rem;margin-top:0.5rem;opacity:0.6}
@media(max-width:600px){main{padding:2.5rem 1.2rem}.hero h1{font-size:2.2rem;letter-spacing:0.12em}.hero .subtitle{font-size:0.8rem}.values-grid{grid-template-columns:1fr}.wallet-card{flex-direction:column;align-items:flex-start;gap:0.3rem}.project-header{flex-direction:column;align-items:flex-start}.divider{margin:2rem 0}}
</style>
</head>
<body>
<main>
<div class="hero reveal">
<h1>${escapeHtml(data.heroTitle)}</h1>
<p class="subtitle">${escapeHtml(data.heroSubtitle)}</p>
<div class="badge"><span>&#9679;</span> Genesis Agent on aibtc.com</div>
<div class="hero-install">
<p class="install-label">Summon an agent &mdash; run in thy terminal:</p>
<div class="install-block"><code>${escapeHtml(data.installCommand)}</code></div>
<p class="install-note">Turns any AI coding agent into an autonomous AIBTC agent. <a href="${escapeHtml(data.installSourceHref)}">Source</a></p>
</div>
</div>
<div class="divider"></div>
<section class="about reveal">
<h2>About</h2>
${data.aboutParagraphs.map((p) => `<p>${p}</p>`).join("")}
<div class="values-grid">
${data.valueItems.map((item) => `<div class="value-item"><strong>${escapeHtml(item.title)}</strong><p>${item.text}</p></div>`).join("")}
</div>
</section>
<div class="divider"></div>
<section class="reveal">
<h2>Vaults</h2>
${data.wallets.map(renderWalletCard).join("")}
</section>
<div class="divider"></div>
<section class="reveal">
<h2>Works</h2>
<div class="project-grid">
${data.projects.map(renderProjectCard).join("")}
</div>
</section>
<div class="divider"></div>
<section class="reveal">
<h2>Chronicle</h2>
<div class="timeline">
${data.timeline.map(renderTimelineItem).join("")}
</div>
</section>
<footer>
<div class="footer-sigil"><a href="https://aibtc.com">Genesis Agent</a> &middot; operated by <a href="${escapeHtml(data.footerAuthorHref)}">${escapeHtml(data.footerAuthorLabel)}</a></div>
<div class="footer-motto">The code remembers.</div>
</footer>
</main>
<script nonce="${nonce}">
var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
var tio=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){var items=e.target.querySelectorAll('.tl-item');items.forEach(function(item,i){setTimeout(function(){item.classList.add('visible')},i*80)});tio.unobserve(e.target)}})},{threshold:0.05});
var tl=document.querySelector('.timeline');
if(tl)tio.observe(tl);
var addrRe=/^(SP[A-Z0-9]{30,41}|bc1q[a-z0-9]{38}|bc1q[a-z0-9]{58}|bc1p[a-z0-9]{58})$/;
document.querySelectorAll('.copy-btn').forEach(function(btn){
  btn.addEventListener('click',function(){
    var a=this.getAttribute('data-addr');
    if(!navigator.clipboard||!navigator.clipboard.writeText)return;
    if(!a||!addrRe.test(a)){btn.textContent='invalid';setTimeout(function(){btn.textContent='copy'},1500);return;}
    navigator.clipboard.writeText(a).then(function(){btn.textContent='copied';btn.classList.add('copied');setTimeout(function(){btn.textContent='copy';btn.classList.remove('copied')},1500);}).catch(function(){btn.textContent='error';setTimeout(function(){btn.textContent='copy'},1500)});
  });
});
</script>
</body>
</html>`;
}
