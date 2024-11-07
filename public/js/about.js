const parallaxElements = document.querySelectorAll('.container');
var card = document.querySelectorAll('.card');

parallaxElements.forEach(el => {
    gsap.from(el, {
        y: el.offsetHeight / 2 + parseFloat(el.parentNode.dataset.distance),
        duration: 1,
        scale: 1,
        ease: "power3.out",
        onComplete: () => {
            card.forEach(toAppear => {
                toAppear.classList.remove('hidden');
                gsap.to(toAppear, {
                    opacity: 1, 
                    duration: 2,
                    ease: "power2.out"
                });
            });
        }
    });
});
