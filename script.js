/*=====================================
 PORTFOLIO — MATHEUS FRAGA
======================================*/

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
    hideLoader();
    typingEffect();
    revealOnScroll();
    animateNumbers();
    activeMenu();
    mobileNav();
    createBackTop();
    copyEmail();
    spotlightFollow();
});

/*=====================================
 LOADER
======================================*/
function hideLoader(){
    const loader = document.querySelector(".loader");
    if(!loader) return;

    window.addEventListener("load", () => {
        setTimeout(() => loader.classList.add("hidden"), 350);
    });

    // Fallback in case the load event already fired
    setTimeout(() => loader.classList.add("hidden"), 1800);
}

/*=====================================
 NAVBAR BACKGROUND ON SCROLL
======================================*/
const header = document.querySelector(".navbar");

if(header){
    window.addEventListener("scroll", () => {
        if(window.scrollY > 40){
            header.style.background = "rgba(10,14,20,.9)";
        }else{
            header.style.background = "rgba(10,14,20,.7)";
        }
    });
}

/*=====================================
 MOBILE NAV
======================================*/
function mobileNav(){
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");
    if(!toggle || !links) return;

    toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            links.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

/*=====================================
 REVEAL ON SCROLL
======================================*/
function revealOnScroll(){
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: .15 });

    reveals.forEach(item => observer.observe(item));
}

/*=====================================
 ACTIVE MENU
======================================*/
function activeMenu(){
    const sections = document.querySelectorAll("section[id]");
    const nav = document.querySelectorAll(".nav-links a");
    if(!sections.length || !nav.length) return;

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop - 130;
            if(window.pageYOffset >= top){
                current = section.getAttribute("id");
            }
        });

        nav.forEach(link => {
            link.classList.remove("active");
            if(link.getAttribute("href") === "#" + current){
                link.classList.add("active");
            }
        });
    });
}

/*=====================================
 TYPING EFFECT (hero code block)
======================================*/
function typingEffect(){
    const target = document.querySelector(".typing-target");
    if(!target) return;

    if(prefersReducedMotion){
        target.textContent = "'disponível'";
        return;
    }

    const text = "'disponível'";
    let i = 0;

    function type(){
        if(i < text.length){
            target.textContent += text.charAt(i);
            i++;
            setTimeout(type, 70);
        }
    }

    setTimeout(type, 900);
}

/*=====================================
 COUNTERS
======================================*/
function animateNumbers(){
    const counters = document.querySelectorAll("[data-number]");
    if(!counters.length) return;

    counters.forEach(counter => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    const target = +counter.dataset.number;

                    if(prefersReducedMotion){
                        counter.textContent = target;
                        observer.disconnect();
                        return;
                    }

                    let value = 0;
                    const speed = Math.max(target / 60, 1);

                    const interval = setInterval(() => {
                        value += speed;
                        if(value >= target){
                            value = target;
                            clearInterval(interval);
                        }
                        counter.textContent = Math.floor(value);
                    }, 20);

                    observer.disconnect();
                }
            });
        }, { threshold: .5 });

        observer.observe(counter);
    });
}

/*=====================================
 BACK TO TOP
======================================*/
function createBackTop(){
    const btn = document.createElement("button");
    btn.innerHTML = "↑";
    btn.className = "backTop";
    btn.setAttribute("aria-label", "Voltar ao topo");
    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });

    window.addEventListener("scroll", () => {
        btn.classList.toggle("visible", window.scrollY > 500);
    });
}

/*=====================================
 COPY EMAIL
======================================*/
function copyEmail(){
    const btn = document.getElementById("copy-email");
    const valueEl = document.getElementById("email-value");
    if(!btn || !valueEl) return;

    const email = btn.dataset.email;
    const originalText = valueEl.textContent;

    btn.addEventListener("click", async () => {
        try{
            await navigator.clipboard.writeText(email);
            valueEl.textContent = "copiado!";
            setTimeout(() => { valueEl.textContent = originalText; }, 1800);
        }catch(err){
            window.location.href = `mailto:${email}`;
        }
    });
}

/*=====================================
 SPOTLIGHT FOLLOW (desktop only, respects reduced motion)
======================================*/
function spotlightFollow(){
    const spotlight = document.querySelector(".spotlight");
    if(!spotlight || prefersReducedMotion) return;
    if(window.matchMedia("(pointer: coarse)").matches) return;

    let ticking = false;

    window.addEventListener("mousemove", (e) => {
        if(ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            document.documentElement.style.setProperty("--spot-x", `${e.clientX}px`);
            document.documentElement.style.setProperty("--spot-y", `${e.clientY}px`);
            ticking = false;
        });
    });
}

  document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        // Verifica se o menu já está aberto
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        // Altera o estado do atributo de acessibilidade (ativa as animações do CSS)
        navToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Alterna a classe que exibe/esconde o menu
        navLinks.classList.toggle('active');
      });

      // Fecha o menu automaticamente quando o usuário clica em algum link
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navToggle.setAttribute('aria-expanded', 'false');
          navLinks.classList.remove('active');
        });
      });
    }
  });

