
const carousels = document.querySelectorAll(".md-carousal");

carousels.forEach(carousel => {
    let isHovering = false;
    let autoScrollTimeout;

    carousel.addEventListener("mouseenter", () => {
        isHovering = true;
        autoScroll();
        duplicateSlides("md-slide1");
        duplicateSlides("md-slide2");
        duplicateSlides("md-slide3");
        duplicateSlides("md-slide4");
    });

    carousel.addEventListener("mouseleave", () => {
        isHovering = false;

        const slide = carousel.querySelector(".md-slides");
        const slideWidth = slide.offsetWidth;

        const index = Math.round(carousel.scrollLeft / slideWidth);

        // carousel.scrollTo({
        //     left: index * slideWidth,
        //     behavior: "smooth"
        // });
    });

    function autoScroll() {
        if (!isHovering) return;

        const slide = carousel.querySelector(".md-slides");
        const slideWidth = slide.offsetWidth;

        carousel.scrollBy({
            left: slideWidth,
            behavior: "smooth"
        });

        autoScrollTimeout = setTimeout(autoScroll, 1250);
    }

    function duplicateSlides(sliderId) {
        const carousel = document.querySelector(`#${sliderId}.md-slides`);
        const slides = Array.from(carousel.children);

        slides.forEach((slide) => {
            const clone = slide.cloneNode(true);
            carousel.appendChild(clone);
        });
    }
});
