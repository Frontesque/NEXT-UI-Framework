(function(document, s) {
    let NEXT_Loader = document.createElement('script');
    NEXT_Loader.type = 'text/javascript';
    NEXT_Loader.src = 'https://frontesque.github.io/NEXT-UI-Framework/latest.js';
    document.getElementsByTagName('head')[0].appendChild(NEXT_Loader);

    NEXT_Loader.onload = function(){
        // NEXT is injected here
    };
}(document));
