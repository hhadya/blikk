document .addEventListener ("DOMContentLoaded", function(){

       const section1 = document.querySelector(".sec_1");
    const letters = document.querySelectorAll(".word_b, .word_l, .word_i, .word_k");

    letters.forEach(letter => {
        letter.addEventListener("mouseenter", () => section1.classList.add("letters-hover"));
        letter.addEventListener("mouseleave", () => section1.classList.remove("letters-hover"));
    });

    /* ===== Секция 2: появление по скроллу ===== */
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

    /* ===== Секция 2: группы ===== */
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

    /* ===== Hover ===== */
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

    /* ===== Клик по circle/косметике: фиксация + печать .for_* + скрытие .kak ===== */
    groups.forEach(group => {
        const els = group.targets.map(sel => document.querySelector(sel)).filter(Boolean);

        els.forEach(el => {
            el.addEventListener("click", () => {
                if (activeGroup) return;

                activeGroup = group;

                section2.classList.add(group.cls);
                section2.classList.add(group.pinnedCls);

                // скрываем основной текст .kak
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

    /* ===== Клик по .for_*: вернуть всё + вернуть .kak ===== */
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

            // возвращаем основной текст .kak
            if (kakEl) kakEl.classList.remove("is-hidden");

            activeGroup = null;
        });
    });

    /* ===== revealed (сброс задержек) ===== */
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

    /* ===== Печать .kak (основной текст) ===== */
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
    // базовая группа — астигматизм
    section3.classList.add("show-ast");

    sec3Groups.forEach(group => {
        const btn = document.querySelector(group.btn);
        if (!btn) return;

        btn.addEventListener("click", () => {
            // снимаем все группы
            sec3Groups.forEach(g => section3.classList.remove(g.cls));
            // добавляем нужную
            section3.classList.add(group.cls);
        });
    });
}


    
});