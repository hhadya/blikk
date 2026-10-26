document .addEventListener ("DOMContentLoaded", function(){

   (function () {
    const root = document.documentElement;
    root.classList.add("is-loading");           
 
    const TOTAL      = 5000;    
    const COUNT_MS   = 4200;    
    const LEAVE_AT   = 4450;   
 
    const clamp01 = (v) => Math.max(0, Math.min(1, v));
    const easeIO  = (t) => 0.5 - 0.5 * Math.cos(Math.PI * clamp01(t));
 
   
 
    const init = function () {
        const loader = document.getElementById("loader");
        if (!loader) { root.classList.remove("is-loading"); return; }
 
        loader.innerHTML =
            '<div class="loader__sky"></div>' +
            '<p class="loader__title">БЛИК</p>' +
            '<p class="loader__info">' +
                '<span class="loader__label">загрузка</span>' +
                '<span class="loader__count">0%</span>' +
            '</p>';
 
       
 
        const count = loader.querySelector(".loader__count");
        const label = loader.querySelector(".loader__label");
        const start = performance.now();
        let done = false, leaving = false;
 
        const frame = (now) => {
            const t = now - start;
            const v = Math.round(100 * easeIO(t / COUNT_MS));
            count.textContent = v + "%";
 
            if (!done && v >= 100) {
                done = true;
                label.textContent = "готово";
                loader.classList.add("is-done");
            }
            if (!leaving && t >= LEAVE_AT) {
                leaving = true;
                loader.classList.add("is-leaving");
            }
 
            if (t < TOTAL) {
                requestAnimationFrame(frame);
            } else {
                loader.remove();
                root.classList.remove("is-loading");
            }
        };
        requestAnimationFrame(frame);
    };
 
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
 

});