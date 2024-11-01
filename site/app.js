/* Efeito de Parallax pelo movimento do mouse */
const parallax_el = document.querySelectorAll('.parallax');

let xValue = 0, yValue = 0;

function update() {
    parallax_el.forEach(el => {
        let speedx = el.dataset.speedx;

        el.style.transform = `translateX(${(-xValue / 50) * speedx}px) 
                              translateY(${(yValue / 50) * speedx}px)`;
    });
}

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    update();
});

/* Animação GSAP Inicial */
Array.from(parallax_el)
    .filter(el => !el.classList.contains("banner"))
    .forEach(el => {
    gsap.from(el, {
        y: el.offsetHeight / 2 + parseFloat(el.dataset.distance), 
        duration: 1,
        stagger: 0.3, 
        ease: "power3.out",
    },);
});



/* Effect by scrolling */
let listBg = document.querySelectorAll('.bg');
let listTab = document.querySelectorAll('.tab, .how-it-works');
let titleBanner = document.querySelector('.banner h1');

window.addEventListener("scroll", () => {
    let top = window.scrollY;

    listBg.forEach((bg, index) => {
        if (index !== 0 && index !== 8) {
            bg.style.transform = `translateY(${(top * index / 5)}px)`;
        } else if (index === 0) {
            bg.style.transform = `translateY(${(top / 4)}px)`;
        }
    });

    titleBanner.style.transform = `translateY(${(top * 2)}px)`;

    listTab.forEach(tab => {
        if (tab.offsetTop - top < 550) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
});
