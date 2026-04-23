window.addEventListener("load", () => {
    const overlay = document.querySelector(".masked-landing");

    if (!overlay) {
        return;
    }

    overlay.style.transition = "opacity 0.6s ease";
    overlay.style.opacity = "0";

    const hideOverlay = () => {
        overlay.style.display = "none";
    };

    overlay.addEventListener("transitionend", hideOverlay, { once: true });
    window.setTimeout(hideOverlay, 700);
});

document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.querySelector(".site-container");
    const upArrow = document.querySelector(".up-arrow");
    const downArrow = document.querySelector(".down-arrow");
    const sections = document.querySelectorAll(".landing-page-container, .deferred-section");
    const slides = document.querySelectorAll(".md-slides, .md-slidesB, .md-slides2, .md-slidesB2");

    if (!mainContainer || !upArrow || !downArrow) {
        return;
    }

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle("is-active", entry.isIntersecting);
            });
        },
        {
            root: mainContainer,
            threshold: 0.15,
            rootMargin: "20% 0px"
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    if (slides.length > 0) {
        const slideObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio >= 0.99) {
                        entry.target.style.transform = "rotateY(180deg)";
                    } else {
                        entry.target.style.transform = "";
                    }
                });
            },
            {
                root: mainContainer,
                threshold: [0, 0.99]
            }
        );

        slides.forEach((slide) => slideObserver.observe(slide));
    }

    function handleScroll() {
        const scrollTop = mainContainer.scrollTop;
        const viewportHeight = mainContainer.clientHeight;
        const fullHeight = mainContainer.scrollHeight;

        upArrow.classList.toggle("hidden-arrows", scrollTop <= 0);
        downArrow.classList.toggle("hidden-arrows", scrollTop + viewportHeight >= fullHeight - 1);
    }

    mainContainer.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
});
