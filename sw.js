self.addEventListener('install', e => { 

    self.skipWaiting(); 

});



self.addEventListener('activate', e => { 

    return self.clients.claim(); 

});



self.addEventListener('fetch', e => {

    // Um fetch básico para passar na validação do PWA

    e.respondWith(

        fetch(e.request).catch(() => new Response("Offline"))

    );

}); 

