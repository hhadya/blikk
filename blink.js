document .addEventListener ("DOMContentLoaded", function(){

       const section1 = document.querySelector(".sec_1");
    const letters = document.querySelectorAll(".word_b, .word_l, .word_i, .word_k");

    letters.forEach(letter => {
        letter.addEventListener("mouseenter", () => section1.classList.add("letters-hover"));
        letter.addEventListener("mouseleave", () => section1.classList.remove("letters-hover"));
    });

   
    const section2 = document.querySelector(".sec_2");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section2.classList.add("is-visible");
                observer.unobserve(section2);
            }
        });
    }, { threshold: 0.25 });

    observer.observe(section2);


    const groups = [
        {
            targets: [".circle_1", ".lipstick"],
            cls: "hover-1",
            pinnedCls: "pinned-1",
            revealDelay: 1000,
            all: [".circle_1", ".lipstick", ".pryam_1", ".t_one"],
            forEl: ".for_l",
            forText: ".for_l-text"
        },
        {
            targets: [".circle_2", ".pudra"],
            cls: "hover-2",
            pinnedCls: "pinned-2",
            revealDelay: 1800,
            all: [".circle_2", ".pudra", ".pryam_2", ".t_two"],
            forEl: ".for_p",
            forText: ".for_p-text"
        },
        {
            targets: [".circle_3", ".moscara"],
            cls: "hover-3",
            pinnedCls: "pinned-3",
            revealDelay: 2600,
            all: [".circle_3", ".moscara", ".pryam_3", ".t_three"],
            forEl: ".for_t",
            forText: ".for_t-text"
        },
        {
            targets: [".circle_4", ".konsiler"],
            cls: "hover-4",
            pinnedCls: "pinned-4",
            revealDelay: 3400,
            all: [".circle_4", ".konsiler", ".pryam_4", ".t_four"],
            forEl: ".for_k",
            forText: ".for_k-text"
        }
    ];

    let activeGroup = null;
    let typingTimer = null;

    const kakEl = document.querySelector(".kak");

   
    groups.forEach(group => {
        const els = group.targets.map(sel => document.querySelector(sel)).filter(Boolean);

        els.forEach(el => {
            el.addEventListener("mouseenter", () => {
                if (activeGroup) return;
                section2.classList.add(group.cls);
            });
            el.addEventListener("mouseleave", () => {
                if (activeGroup) return;
                section2.classList.remove(group.cls);
            });
        });
    });

    
    groups.forEach(group => {
        const els = group.targets.map(sel => document.querySelector(sel)).filter(Boolean);

        els.forEach(el => {
            el.addEventListener("click", () => {
                if (activeGroup) return;

                activeGroup = group;

                section2.classList.add(group.cls);
                section2.classList.add(group.pinnedCls);

               
                if (kakEl) kakEl.classList.add("is-hidden");

                const forEl = document.querySelector(group.forEl);
                const forText = document.querySelector(group.forText);

                if (forEl && forText) {
                    forEl.classList.add("is-open");

                    const full = forText.textContent;
                    forText.style.setProperty("--reveal", "0%");

                    let i = 0;
                    const typeNext = () => {
                        if (i < full.length) {
                            i++;
                            const percent = (i / full.length) * 100;
                            forText.style.setProperty("--reveal", percent + "%");
                            typingTimer = setTimeout(typeNext, 25 + Math.random() * 15);
                        }
                    };
                    typeNext();
                }
            });
        });
    });

   
    groups.forEach(group => {
        const forEl = document.querySelector(group.forEl);
        if (!forEl) return;

        forEl.addEventListener("click", () => {
            if (activeGroup !== group) return;

            if (typingTimer) {
                clearTimeout(typingTimer);
                typingTimer = null;
            }

            forEl.classList.remove("is-open");

            section2.classList.remove(group.pinnedCls);
            section2.classList.remove(group.cls);

            
            if (kakEl) kakEl.classList.remove("is-hidden");

            activeGroup = null;
        });
    });

   
    const mo = new MutationObserver(() => {
        if (section2.classList.contains("is-visible")) {
            groups.forEach(group => {
                setTimeout(() => {
                    group.all.forEach(sel => {
                        const el = document.querySelector(sel);
                        if (el) el.classList.add("revealed");
                    });
                }, group.revealDelay + 1500);
            });
            mo.disconnect();
        }
    });
    mo.observe(section2, { attributes: true, attributeFilter: ["class"] });

   
    const kakText = document.querySelector(".kak-text");

    if (kakEl && kakText) {
        const fullText = "Как люди с нарушениями зрения пользуются косметикой?";
        let typeIndex = 0;
        let typingStarted = false;

        const typeNext = () => {
            if (typeIndex < fullText.length) {
                kakText.textContent = fullText.slice(0, typeIndex + 1);
                typeIndex++;
                const speed = 45 + Math.random() * 25;
                setTimeout(typeNext, speed);
            } else {
                setTimeout(() => kakEl.classList.add("is-done"), 800);
            }
        };

        const kakObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !typingStarted) {
                    typingStarted = true;
                    kakEl.classList.add("is-typing");
                    typeNext();
                    kakObserver.unobserve(kakEl);
                }
            });
        }, { threshold: 0.4 });

        kakObserver.observe(kakEl);
    }

    const section3 = document.querySelector(".sec_3");

const sec3Groups = [
    { btn: ".ast_girl",  cls: "show-ast"  },
    { btn: ".gem_girl",  cls: "show-gem"  },
    { btn: ".skot_girl", cls: "show-skot" },
    { btn: ".dalt_girl", cls: "show-dalt" },
    { btn: ".bl_girl",   cls: "show-bl"   },
    { btn: ".d_girl",    cls: "show-d"    }
];

if (section3) {
   
    section3.classList.add("show-ast");

    sec3Groups.forEach(group => {
        const btn = document.querySelector(group.btn);
        if (!btn) return;

        btn.addEventListener("click", () => {
            
            sec3Groups.forEach(g => section3.classList.remove(g.cls));
           
            section3.classList.add(group.cls);
        });
    });
}

const section4 = document.querySelector(".sec_4");
 
if (section4) {
   
    let inView = false;
    let lastY = window.scrollY;
    let acc = 0;               
    const STEP = 25;           
 
    const open  = () => section4.classList.add("is-visible");
    const close = () => section4.classList.remove("is-visible");
 
    const observer4 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            inView = entry.isIntersecting;
            if (entry.isIntersecting) {
                open();
            } else if (entry.boundingClientRect.top > 0) {
                
                close();
            }
        });
    }, { threshold: 0.15 });
 
    observer4.observe(section4);
 
    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        const dy = y - lastY;
        lastY = y;
        if (!inView) { acc = 0; return; }
 
       
        if ((dy > 0 && acc < 0) || (dy < 0 && acc > 0)) acc = 0;
        acc += dy;
 
        if (acc > STEP)  { open();  acc = 0; }  
        if (acc < -STEP) { close(); acc = 0; } 
    }, { passive: true });
}
 
const TOOL_MS = 1200;   

const makeupGroups = [
    { tool: ".teni",   dots: { ".indigo": ".for_indigo", ".violet": ".for_violet", ".sunny":  ".for_sunny"  } },
    { tool: ".tus",    dots: { ".blue":   ".for_blue",   ".purple": ".for_purple", ".yellow": ".for_yellow" } },
    { tool: ".podra",  dots: { ".bezh":   ".for_bezh",   ".dark":   ".for_dark",   ".light":  ".for_light"  } },
    { tool: ".pomada", dots: { ".rose":   ".for_rose",   ".fial":   ".for_fial",   ".pink":   ".for_pink"   } }
];

makeupGroups.forEach(group => {
    const tool = document.querySelector(group.tool);
    const entries = Object.keys(group.dots).map(dotSel => ({
        dot: document.querySelector(dotSel),
        variant: document.querySelector(group.dots[dotSel])
    })).filter(e => e.dot && e.variant);

    let current = null;   
    let timer = null;     

    entries.forEach(({ dot, variant }) => {
        dot.addEventListener("click", () => {
            
            if (current === variant && !timer) {
                variant.classList.remove("is-on");
                dot.classList.remove("is-selected");
                current = null;
                return;
            }

           
            clearTimeout(timer);
            if (tool) {
                tool.classList.remove("is-active");
                void tool.offsetWidth;
                tool.classList.add("is-active");
            }

            timer = setTimeout(() => {
                if (tool) tool.classList.remove("is-active");
                entries.forEach(e => {
                    e.variant.classList.toggle("is-on", e.variant === variant);
                    e.dot.classList.toggle("is-selected", e.dot === dot);
                });
                current = variant;
                timer = null;
            }, TOOL_MS);
        });
    });
});

const okBtn = document.querySelector(".ok");
const popup = document.querySelector(".popup");

if (okBtn && popup) {
    okBtn.addEventListener("click", () => popup.classList.add("is-open"));
    popup.addEventListener("click", () => popup.classList.remove("is-open"));
}

const section7 = document.querySelector(".sec_7");

if (section7) {
   
    const pom1 = document.querySelector(".ppomada_1");
    if (pom1) {
        const ghost = pom1.cloneNode(false);
        ghost.className = "ppomada_ghost";
        ghost.alt = "";
        ghost.setAttribute("aria-hidden", "true");
        pom1.after(ghost);
    }

     [[".ttus", "ttus_copy", ".ttus_1"], [".rum", "rum_copy", ".rum_1"]].forEach(([src, cls, seenSel]) => {
        const orig = document.querySelector(src);
        const seen = document.querySelector(seenSel);
        if (orig && seen) {
            const copy = orig.cloneNode(false);
            copy.className = cls;
            copy.alt = "";
            copy.setAttribute("aria-hidden", "true");
            seen.before(copy);
        }
    });


    
    const slideDefs = [
        [[".paletka", "img", 0],   [".paletka_1", "img", .1],
         [".n_1", "txt", .2],      [".text_1", "txt", .3]],

        [[".ppomada", "img", 0],   [".ppomada_1", "img", .1], [".ppomada_ghost", "img", .1],
         [".svet_pomada", "fx", .5], [".n_2", "txt", .2],     [".text_2", "txt", .3]],

        [[".ppudra", "img", 0],    [".ppudra_1", "img", .1],
         [".n_3", "txt", .2],      [".text_3", "txt", .3]],

          [[".rum", "img", 0],       [".rum_copy", "img", .1],  [".rum_1", "img", .1],
         [".n_4", "txt", .2],      [".text_4", "txt", .3]],

        [[".ttus", "img", 0],      [".ttus_copy", "img", .1], [".ttus_1", "img", .1],
         [".n_5", "txt", .2],      [".text_5", "txt", .3]]
    ];

    const slides = slideDefs.map(def => def.map(([sel, role, delay]) => {
        const el = section7.querySelector(sel);
        if (!el) return null;
        el.classList.add("sl", "sl-" + role);
        el.style.setProperty("--d", delay + "s");
        return el;
    }).filter(Boolean));

    let index = 0;
    let busy = false;

   
    slides[0].forEach(el => el.classList.add("is-active"));

    
    const observer7 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section7.classList.add("is-visible");
                observer7.unobserve(section7);
            }
        });
    }, { threshold: 0.25 });
    observer7.observe(section7);

    const go = (next, dir) => {
        if (busy) return;
        busy = true;

        const leaving = slides[index];
        const entering = slides[next];

       
        section7.style.setProperty("--in",  dir > 0 ? "3vw"  : "-3vw");
        section7.style.setProperty("--out", dir > 0 ? "-3vw" : "3vw");
        void section7.offsetWidth;   

        leaving.forEach(el => { el.classList.remove("is-active"); el.classList.add("is-exit"); });
        setTimeout(() => leaving.forEach(el => el.classList.remove("is-exit")), 600);

        setTimeout(() => entering.forEach(el => el.classList.add("is-active")), 250);

        index = next;
        setTimeout(() => { busy = false; }, 1000);
    };

    const rightBtn = section7.querySelector(".right");
    const leftBtn  = section7.querySelector(".left");

    if (rightBtn) rightBtn.addEventListener("click", () => go((index + 1) % slides.length, 1));
    if (leftBtn)  leftBtn.addEventListener("click",  () => go((index - 1 + slides.length) % slides.length, -1));
}
 
const section8 = document.querySelector(".sec_8");
const bumaga   = section8 && section8.querySelector(".bumaga");
const always   = section8 && section8.querySelector(".always");

if (section8 && bumaga) {
    
    const wrap = document.createElement("div");
    wrap.className = "paper-wrap";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = `
        <div class="paper">
            <div class="fold fold-1">
                <div class="face front"></div>
                <div class="fold fold-2">
                    <div class="face front"></div>
                    <div class="face back"></div>
                    <div class="fold fold-3">
                        <div class="face front"></div>
                        <div class="face back"></div>
                    </div>
                </div>
            </div>
        </div>`;
    wrap.firstElementChild.style.setProperty("--paper-img", `url("${bumaga.src}")`);
    bumaga.after(wrap);
    section8.classList.add("has-paper");

    
    if (always) {
        const text = always.textContent.trim();
        always.setAttribute("aria-label", text);
        always.innerHTML = text.split(/\s+/)
            .map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`)
            .join(" ");
    }

    
    const observer8 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section8.classList.add("is-open");
            } else if (entry.boundingClientRect.top > 0) {
                section8.classList.remove("is-open");
            }
        });
    }, { threshold: 0.5 });
    observer8.observe(section8);
}

const section9 = document.querySelector(".sec_9");

if (section9) {
   
    const observer9 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section9.classList.add("is-visible");
                observer9.unobserve(section9);
            }
        });
    }, { threshold: 0.25 });
    observer9.observe(section9);

   
    [1, 2, 3].forEach(n => {
        const plus  = section9.querySelector(".plus_" + n);
        const krest = section9.querySelector(".krest_" + n);
        if (plus)  plus.addEventListener("click",  () => section9.classList.add("open-" + n));
        if (krest) krest.addEventListener("click", () => section9.classList.remove("open-" + n));
    });

   
     const girll = section9.querySelector(".girll");
    if (girll) {
      
        const lit = girll.cloneNode(false);
        lit.className = "girll-lit";
        lit.alt = "";
        lit.setAttribute("aria-hidden", "true");
        girll.after(lit);

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let hovering = false;
        let revealed = false;
        let raf = null;
        let x = 50, y = 45, rx = 0, ry = 0;          
        let tx = 50, ty = 45, tRx = 0, tRy = 0;      

        const frame = (now) => {
            if (!hovering && !reduce) {
               
                tx  = 50 + 22 * Math.sin(now / 2600);
                ty  = 42 + 18 * Math.sin(now / 3300 + 1.2);
                tRx = 1.2 * Math.sin(now / 3100);
                tRy = 1.6 * Math.sin(now / 2700 + .6);
            }
            x  += (tx  - x)  * 0.1;
            y  += (ty  - y)  * 0.1;
            rx += (tRx - rx) * 0.08;
            ry += (tRy - ry) * 0.08;

            lit.style.setProperty("--lx", x.toFixed(2) + "%");
            lit.style.setProperty("--ly", y.toFixed(2) + "%");
            [girll, lit].forEach(el => {
                el.style.setProperty("--rx", rx.toFixed(2) + "deg");
                el.style.setProperty("--ry", ry.toFixed(2) + "deg");
            });
            raf = requestAnimationFrame(frame);
        };

    
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!raf) raf = requestAnimationFrame(frame);
                    if (!revealed) {
                        revealed = true;
                        setTimeout(() => lit.classList.add("is-idle"), 1700);   
                    }
                } else if (raf) {
                    cancelAnimationFrame(raf);
                    raf = null;
                }
            });
        }, { threshold: 0.3 }).observe(girll);

        const aim = (e) => {
            const r = girll.getBoundingClientRect();
            tx  = ((e.clientX - r.left) / r.width)  * 100;
            ty  = ((e.clientY - r.top)  / r.height) * 100;
            tRy =  (tx - 50) / 50 * 4;   
            tRx = -(ty - 50) / 50 * 4;
        };
        girll.addEventListener("pointerenter", (e) => {
            hovering = true;
            aim(e);
            lit.classList.add("is-on");
            girll.classList.add("is-dim");
        });
        girll.addEventListener("pointermove", aim);
        girll.addEventListener("pointerleave", () => {
            hovering = false;
            lit.classList.remove("is-on");
            girll.classList.remove("is-dim");
        });
    }
}

const section10 = document.querySelector(".sec_10");
const grp1 = section10 && section10.querySelector(".group_1");
const grp2 = section10 && section10.querySelector(".group_2");

if (section10 && grp1 && grp2) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

   
    const grp1c = grp1.cloneNode(true);
    const grp2c = grp2.cloneNode(true);
    [grp1c, grp2c].forEach(el => {
        el.setAttribute("aria-hidden", "true");
        section10.append(el);
    });

   
    const items = [[grp2, -1], [grp1, 0], [grp2c, 1], [grp1c, 2]];

    const BASE      = reduce ? 0 : 0.07;  
    const BOOST_K   = 3;                   
    const BOOST_MAX = 0.6;                
    const SMOOTH    = 3;                   

    let W = 0;           
    let pos = 0;        
    let v = 0;          
    let boost = 0;       
    let dir = 1;         
    let active = false;  
    let ratio = 0;       
    let raf = null;
    let last = 0;

    const measure = () => {
        const cards = grp1.children;
        let gap = 0;
        if (cards.length > 1) {
            const a = cards[0].getBoundingClientRect();
            const b = cards[1].getBoundingClientRect();
            gap = b.left - a.right;
        }
        if (!(gap > 0)) gap = window.innerWidth * 0.0236;
        W = grp1.getBoundingClientRect().width + gap;
    };

    const apply = () => {
        const period = 2 * W;
        const s = (((pos % period) + period) % period) - W;   
        items.forEach(([el, slot]) => {
            el.style.transform = `translate3d(${(slot * W + s).toFixed(2)}px, 0, 0)`;
        });
    };

    const reset = () => {
        active = false; v = 0; boost = 0;
        pos = W;          
        apply();
    };

    measure();
    reset();
    window.addEventListener("load", () => { measure(); reset(); });
    window.addEventListener("resize", () => {
        const old = W;
        measure();
        if (old) pos = pos * W / old;
        apply();
    });

    const tick = (now) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        boost *= Math.exp(-dt * 2.5);
        const speed  = BASE * window.innerWidth + boost;
        const target = active ? dir * speed : 0;
        v += (target - v) * Math.min(1, dt * SMOOTH);
        pos += v * dt;
        apply();
        raf = requestAnimationFrame(tick);
    };

    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            ratio = entry.intersectionRatio;
            if (entry.isIntersecting) {
                if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
            } else if (raf) {
                cancelAnimationFrame(raf);
                raf = null;
                reset();
            }
        });
    }, { threshold: [0, 0.5] }).observe(section10);

    
    const nudge = (dy) => {
        if (ratio < 0.5 || Math.abs(dy) < 1) return;
        active = true;
        dir = dy > 0 ? 1 : -1;
        boost = Math.min(boost + Math.abs(dy) * BOOST_K, BOOST_MAX * window.innerWidth);
    };

    let lastY = window.scrollY;
    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        nudge(y - lastY);
        lastY = y;
    }, { passive: true });

    window.addEventListener("wheel", (e) => nudge(e.deltaY), { passive: true });

    let touchY = null;
    window.addEventListener("touchstart", (e) => { touchY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener("touchmove", (e) => {
        const y = e.touches[0].clientY;
        if (touchY !== null) nudge(touchY - y);
        touchY = y;
    }, { passive: true });
}

const podval = document.querySelector(".podval");
const footDots = document.querySelectorAll(".foot-dot");

if (podval && footDots.length) {
    
    footDots.forEach((dot, i) => {
        dot.style.setProperty("--d", (i * 0.015) + "s");
    });

    const observerFoot = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                podval.classList.add("is-visible");
                observerFoot.unobserve(podval); 
            }
        });
    }, { threshold: 0.3 });

    observerFoot.observe(podval);
}

const footSvg = document.querySelector(".foot__dots");

if (podval && footSvg && footDots.length) {
    const NS = "http://www.w3.org/2000/svg";
    const mk = (tag, attrs) => {
        const el = document.createElementNS(NS, tag);
        Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));
        return el;
    };

   
    const LETTER_PATHS = [
        "m11495 13037.8 17.5-2.6v-138.4l-17.5-2.8v-4h108.7v40.5h-5.7l-14.3-35.8h-50.3v61.8h27q28 0 41.6 10.6 13.8 10.5 13.8 32.1 0 21.8-13.8 32.4-13.7 10.4-41.6 10.4h-65.4zm62.7-.6q17.7 0 26.4-8.3t8.8-25.8v-7.7q0-17.4-8.8-25.8-8.7-8.5-26.4-8.5h-24.3v76.1z",
        "M11868.7 13048.9q-9.1 0-13.5-4.2a15 15 0 0 1-4.2-10.6q0-5 3.2-8.6a12 12 0 0 1 9.3-3.8q3.5 0 5.7 1.5 2.5 1.4 3.5 2.9 1.1 1.3 1.3 1.9a7 7 0 0 0-3.4 5.9q0 2.3 1.3 3.8 1.5 1.5 4 1.5 6.3 0 10.6-9.3 4.6-9.4 7.4-31.5 3.1-22 4.6-59.9l1.3-30.8-20.1-8.3v-4.4h110.6v4.2l-17.7 2.6v138.4l17.7 2.8v4h-56.3v-4l17.7-2.8v-140.5h-46.4l-1.7 39a786 786 0 0 1-4.9 65.4 87 87 0 0 1-10.1 33.8 22 22 0 0 1-19.9 11",
        "M12214 13048v-4l17.5-2.8v-138.4l-17.5-2.6v-4.2h55.9v4.2l-17.5 2.6v123.2l74.1-117.8v-5.4l-17.7-2.6v-4.2h56.3v4.2l-17.7 2.6v138.4l17.7 2.8v4h-56.3v-4l17.7-2.8v-124.1l-74.1 117.8v6.3l17.5 2.8v4z",
        "M12688.4 13048.8q-10.6 0-16-5.1-5.2-5.1-7.2-17.5l-4.6-32.1q-1.8-13.5-8.1-19.6-6.3-6-20.2-6.1h-15.9v71.7l17.5 2.8v4h-55.9v-4l17.5-2.8v-138.4l-17.5-2.6v-4.2h55.9v4.2l-17.5 2.6v62.2h19.9q9.1-.3 15.6-7.1a41 41 0 0 0 9.3-18.6l5.9-23.9a34 34 0 0 1 8-16q5.5-5.3 13.1-5.3 6.3 0 10.8 3.6 4.8 3.6 4.8 9.5 0 5.6-3.2 8.9a11 11 0 0 1-8.2 3.5h-3.8q-3-8.2-9.5-8.2-6.3 0-7.8 6.5l-5.9 23.9a47 47 0 0 1-6.6 15.2q-4.5 6-10.1 8.7a44 44 0 0 1 24.1 9.2 31 31 0 0 1 10.3 19.5l4.3 28.7a59 59 0 0 0 3.3 13.5q1.7 3.8 4.9 4.6l1.7.2q5.7 0 12-6.5l3.2 3.4a31 31 0 0 1-24.1 11.6"
    ];

    
    const dotsG = mk("g", { class: "foot-dots-g" });
    footSvg.insertBefore(dotsG, footDots[0]);
    footDots.forEach(d => dotsG.appendChild(d));

   
    const defs = mk("defs", {});
    const mask = mk("mask", { id: "foot-bloom", maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 1453, height: 783 });
    const fullRect = mk("rect", { x: 0, y: 0, width: 1453, height: 783, fill: "#fff", opacity: 0 });
    mask.appendChild(fullRect);
    defs.appendChild(mask);
    footSvg.insertBefore(defs, footSvg.firstChild);

    
    const perLetter = [0, 0, 0, 0];
    footDots.forEach(el => { perLetter[+el.getAttribute("data-letter")]++; });
    const seen = [0, 0, 0, 0];

    const dots = Array.from(footDots).map(el => {
        const cx = +el.getAttribute("cx");
        const cy = +el.getAttribute("cy");
        const letter = +el.getAttribute("data-letter");
        const order = seen[letter]++;
        const angle = Math.random() * Math.PI * 2;
        const bloom = mk("circle", { cx: cx, cy: cy, r: 0, fill: "#fff" });
        mask.appendChild(bloom);
        return {
            el, bloom, cx, cy, letter,
            rx0: +el.getAttribute("rx"),
            ry0: +el.getAttribute("ry"),
            jx: Math.cos(angle),
            jy: Math.sin(angle),
            delay: (cx / 1453) * 0.3,                                   
            hd: (order / Math.max(1, perLetter[letter] - 1)) * 0.5      
        };
    });

   
    const lettersOuter = mk("g", { mask: "url(#foot-bloom)", class: "foot-letters-g" });
    const lettersInner = mk("g", { transform: "translate(-11379 -12267)" });
    const letterPaths = LETTER_PATHS.map(d => {
        const path = mk("path", { d: d, fill: "#212121" });
        lettersInner.appendChild(path);
        return path;
    });
    lettersOuter.appendChild(lettersInner);
    footSvg.insertBefore(lettersOuter, dotsG);

   
    const hitG = mk("g", { transform: "translate(-11379 -12267)" });
    footSvg.appendChild(hitG);
    let hovered = -1;
    letterPaths.forEach((path, i) => {
        const b = path.getBBox();
        const pad = 8;
        const hit = mk("rect", {
            x: b.x - pad, y: b.y - pad, width: b.width + pad * 2, height: b.height + pad * 2,
            fill: "#000", "fill-opacity": 0, "pointer-events": "all"
        });
        hit.addEventListener("pointerenter", () => { hovered = i; wake(); });
        hit.addEventListener("pointerleave", () => { if (hovered === i) hovered = -1; wake(); });
        hitG.appendChild(hit);
    });

   
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DURATION   = reduce ? 0.01 : 2.2;  
    const HOVER_DUR  = reduce ? 0.01 : 0.7;   
    const R   = 38;                           
    const JIT = 16;                           

    const clamp01 = (v) => Math.max(0, Math.min(1, v));
    const ease = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const easeOutBack = (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };

    let p = 0, target = 0;
    const hv = [0, 0, 0, 0];       
    const hTarget = [0, 0, 0, 0];
    let raf = null, last = 0;

    const render = () => {
        dots.forEach(d => {
            const q  = ease(clamp01((p - d.delay) / 0.7));
            const h  = hv[d.letter];
            const hl = clamp01((h - d.hd) / 0.5);
            const pop = h > 0 ? easeOutBack(hl) : 0;
            const size = Math.max(1 - clamp01(q * 1.15), pop);
            const jit  = JIT * q * (1 - hl);
            d.bloom.setAttribute("r", (R * q).toFixed(2));
            d.el.setAttribute("cx", (d.cx + d.jx * jit).toFixed(2));
            d.el.setAttribute("cy", (d.cy + d.jy * jit).toFixed(2));
            d.el.setAttribute("rx", (d.rx0 * size).toFixed(2));
            d.el.setAttribute("ry", (d.ry0 * size).toFixed(2));
        });
        
        letterPaths.forEach((path, i) => path.setAttribute("opacity", (1 - 0.85 * ease(hv[i])).toFixed(3)));
        fullRect.setAttribute("opacity", clamp01((p - 0.8) / 0.2).toFixed(3));
    };

    const step = (now) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;

        
        const dir = Math.sign(target - p);
        p += dir * dt / DURATION;
        if ((dir > 0 && p >= target) || (dir < 0 && p <= target)) p = target;

       
        const ready = target === 1 && p >= 0.9;
        let busy = p !== target;
        for (let i = 0; i < 4; i++) {
            hTarget[i] = (ready && hovered === i) ? 1 : 0;
            const hd = Math.sign(hTarget[i] - hv[i]);
            hv[i] += hd * dt / HOVER_DUR;
            if ((hd > 0 && hv[i] >= hTarget[i]) || (hd < 0 && hv[i] <= hTarget[i])) hv[i] = hTarget[i];
            if (hv[i] !== hTarget[i]) busy = true;
        }

        render();
        raf = busy ? requestAnimationFrame(step) : null;
    };

    function wake() {
        if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); }
    }

    
    const LETTERS_TOP = 623 / 783;  
    const check = () => {
        const r = footSvg.getBoundingClientRect();
        const lettersTop = r.top + r.height * LETTERS_TOP;
        const f = (window.innerHeight - lettersTop) / (r.height * (1 - LETTERS_TOP));
        if (f >= 0.55 && target !== 1) { target = 1; wake(); }        
        else if (f <= 0.2 && target !== 0) { target = 0; wake(); }    
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
}



const gromk = document.querySelector(".gromk");
const voice = document.querySelector(".voice");

if (gromk && voice) {
    gromk.addEventListener("click", () => {
        
        if (!voice.paused) return;

       
        voice.currentTime = 0;

        const playPromise = voice.play();

        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    gromk.classList.add("is-playing");
                })
                .catch(err => {
                    console.warn("Не удалось воспроизвести звук:", err);
                });
        } else {
            gromk.classList.add("is-playing");
        }
    });

    
    voice.addEventListener("ended", () => {
        gromk.classList.remove("is-playing");
    });

    
    voice.addEventListener("pause", () => {
        gromk.classList.remove("is-playing");
    });

   
    voice.addEventListener("play", () => {
        gromk.classList.add("is-playing");
    });
}

const heroSec = document.querySelector(".sec_1");

if (heroSec) {
    const reduceHero = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img1 = heroSec.querySelector(".maingirl");
    const img2 = heroSec.querySelector(".maingirl_2");

   
    
    const EYES = null;
    const STORE_KEY = "blik-eyes";

    const applyEyes = (e) => {
        heroSec.style.setProperty("--ex", e.x.toFixed(2));
        heroSec.style.setProperty("--ey", e.y.toFixed(2));
        heroSec.style.setProperty("--erx", e.rx.toFixed(2));
        heroSec.style.setProperty("--ery", e.ry.toFixed(2));
        heroSec.classList.add("eyes-masked");
    };

    
    const detectEyes = async () => {
        if (!img1 || !img2) return;
        try {
            await Promise.all([img1.decode(), img2.decode()]);
            const W = 240, H = Math.round(W * 80 / 93);
            const draw = (img) => {
                const c = document.createElement("canvas");
                c.width = W; c.height = H;
                const ctx = c.getContext("2d", { willReadFrequently: true });
                ctx.drawImage(img, 0, 0, W, H);
                return ctx.getImageData(0, 0, W, H).data;
            };
            const a = draw(img1), b = draw(img2);
            const xs = [], ys = [];
            for (let y = 0; y < H; y++) {
                for (let x = 0; x < W; x++) {
                    const i = (y * W + x) * 4;
                    const d = Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) +
                              Math.abs(a[i + 2] - b[i + 2]) + Math.abs(a[i + 3] - b[i + 3]);
                    if (d > 60) { xs.push(x); ys.push(y); }
                }
            }
            if (xs.length < 8) return;
            xs.sort((m, n) => m - n); ys.sort((m, n) => m - n);
            const q = (arr, p) => arr[Math.min(arr.length - 1, Math.floor(arr.length * p))];
            const x0 = q(xs, 0.02), x1 = q(xs, 0.98), y0 = q(ys, 0.02), y1 = q(ys, 0.98);
            const wPct = (x1 - x0) / W * 100, hPct = (y1 - y0) / H * 100;
            if (wPct > 50 || hPct > 30) return;   
            applyEyes({
                x: (x0 + x1) / 2 / W * 100,
                y: (y0 + y1) / 2 / H * 100,
                rx: Math.max(7, wPct / 2 * 1.35 + 1),
                ry: Math.max(4, hPct / 2 * 1.5 + 1)
            });
        } catch (err) {}
    };

    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (err) { saved = null; }
    if (EYES) applyEyes(EYES);
    else if (saved) applyEyes(saved);
    else detectEyes();

   
    if (/[?&]calibrate\b/.test(location.search) && img1) {
        const panel = document.createElement("div");
        panel.style.cssText = "position:fixed;left:16px;bottom:16px;z-index:9999;max-width:380px;padding:12px 14px;" +
            "background:#fff;color:#212121;font:14px/1.45 sans-serif;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.35)";
        panel.textContent = "Калибровка: кликните по ЛЕВОМУ глазу девушки.";
        document.body.appendChild(panel);

        const pts = [];
        const onClick = (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            const r = img1.getBoundingClientRect();
            pts.push({ x: (ev.clientX - r.left) / r.width * 100, y: (ev.clientY - r.top) / r.height * 100 });

            const dot = document.createElement("div");
            dot.style.cssText = "position:fixed;left:" + (ev.clientX - 5) + "px;top:" + (ev.clientY - 5) +
                "px;width:10px;height:10px;border-radius:50%;background:#ff3b3b;z-index:9998;pointer-events:none";
            document.body.appendChild(dot);

            if (pts.length === 1) {
                panel.textContent = "Теперь кликните по ПРАВОМУ глазу.";
                return;
            }
            document.removeEventListener("click", onClick, true);
            const e = {
                x: (pts[0].x + pts[1].x) / 2,
                y: (pts[0].y + pts[1].y) / 2,
                rx: Math.abs(pts[1].x - pts[0].x) / 2 + 7,
                ry: 7
            };
            applyEyes(e);
            try { localStorage.setItem(STORE_KEY, JSON.stringify(e)); } catch (err) {}
            const code = "const EYES = { x: " + e.x.toFixed(1) + ", y: " + e.y.toFixed(1) +
                         ", rx: " + e.rx.toFixed(1) + ", ry: " + e.ry.toFixed(1) + " };";
            panel.innerHTML = "Готово, область применена. Впишите в blink.js вместо <b>const EYES = null;</b>:<br>" +
                              "<code style='display:block;margin-top:6px;user-select:all'>" + code + "</code>";
            console.info(code);
           
            heroSec.classList.add("blink");
            setTimeout(() => heroSec.classList.remove("blink"), 1200);
        };
        document.addEventListener("click", onClick, true);
    }


    if (img2 && !reduceHero) {
        let timer = null;
        const rand = (a, b) => a + Math.random() * (b - a);
        const closeEyes = () => heroSec.classList.add("blink");
        const openEyes  = () => heroSec.classList.remove("blink");

        function schedule() {
            timer = setTimeout(() => blink(false), rand(1800, 4500));   
        }
        function blink(isSecond) {
            closeEyes();
            const closedFor = (!isSecond && Math.random() < 0.1) ? rand(160, 240) : rand(60, 110);
            timer = setTimeout(() => {
                openEyes();
                if (!isSecond && Math.random() < 0.2) {
                    timer = setTimeout(() => blink(true), rand(160, 260));   
                } else {
                    schedule();
                }
            }, closedFor);
        }

        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !timer) {
                    schedule();
                } else if (!entry.isIntersecting && timer) {
                    clearTimeout(timer);
                    timer = null;
                    openEyes();
                }
            });
        }, { threshold: 0.1 }).observe(heroSec);
    }

  
    const bubble = heroSec.querySelector(".bubble");
    if (bubble) {
        let inView = true;
        const updateBubble = () => {
            bubble.classList.toggle("is-open", window.scrollY > 30 && inView);
        };
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                inView = entry.intersectionRatio >= 0.35;
                updateBubble();
            });
        }, { threshold: [0, 0.35] }).observe(heroSec);
        window.addEventListener("scroll", updateBubble, { passive: true });
        updateBubble();
    }
}


    
});