var C='cozmo-v4';
var F=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(C).then(function(ch){ch.put(e.request,c)});return r}).catch(function(){return caches.match(e.request)}));
});
