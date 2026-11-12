const CACHE="pomofarm-v41";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","favicon-32.png","favicon-64.png","favicon.ico","sounds/chick.mp3","sounds/chick2.mp3","sounds/chick3.mp3","sounds/chick4.mp3","sounds/duck.mp3","sounds/goose.mp3","sounds/goose2.mp3","sounds/goose3.mp3","sounds/goose4.mp3","sounds/duck-baby.mp3","sounds/duck-teen.mp3","sounds/duck-teen2.mp3","sounds/duck-teen3.mp3","sounds/duck-teen4.mp3","sounds/goose-teen.mp3","sounds/goose-teen2.mp3","sounds/goose-teen3.mp3","sounds/goose-teen4.mp3","sounds/ambience-farm.mp3"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>fetch(new Request(f,{cache:"reload"})).then(r=>r.ok?c.put(f,r):null).catch(()=>null)))).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
/* network first so updates show up, cache as the offline fallback */
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request,{cache:"no-cache"}).then(r=>{const c=r.clone();caches.open(CACHE).then(ch=>ch.put(e.request,c));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))));
});
