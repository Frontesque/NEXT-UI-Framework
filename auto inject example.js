(function(document, s) {
    let NUXT_Loader = document.createElement('script');
    NUXT_Loader.type = 'text/javascript';
    NUXT_Loader.src = 'https://frontesque.github.io/NEXT-UI-Framework/latest.js';
    document.getElementsByTagName('head')[0].appendChild(NUXT_Loader);

    NUXT_Loader.onload = function(){
        // NUXT is injected here
    };
}(document));
