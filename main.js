const CAROUSEL_DATA = {
    "music-forward": [
        {
            containerClass: "md-slide2-container md-slide-containers",
            frontClass: "md-slide2 md-slidesB slide1",
            backClass: "md-slide2 md-slides slide1",
            frontImage: {
                src: "./assets/king-kong-production-11.webp",
                alt: "King Kong in jail - from King Kong: Legend of a Boxer (2017)"
            },
            backImage: {
                src: "./assets/king-kong-production-22.webp",
                alt: "The boxing match begins - from King Kong: Legend of a Boxer (2017)"
            }
        },
        {
            containerClass: "md-slide1-container md-slide-containers",
            frontClass: "md-slide1 md-slidesB slide2",
            backClass: "md-slide1 md-slides slide2",
            frontImage: {
                src: "./assets/langarm-production-11.webp",
                alt: "Dancing at Harry's bar - from Langarm (2018)"
            },
            backImage: {
                src: "./assets/langarm-production-02.webp",
                alt: "Dancing lessons - from Langarm (2018)"
            }
        },
        {
            containerClass: "md-slide3-container md-slide-containers",
            frontClass: "md-slide3 md-slidesB slide3",
            backClass: "md-slide3 md-slides slide3",
            frontImage: {
                src: "./assets/king-kong-production-07.webp",
                alt: "Joyce performs at the Back of the Moon Shebeen - from King Kong: Legend of a Boxer (2017)"
            },
            backImage: {
                src: "./assets/Starlight.webp",
                alt: "RMB Starlight Classics on stage logo"
            }
        },
        {
            containerClass: "md-slide4-container md-slide-containers",
            frontClass: "md-slide4 md-slidesB slide4",
            backClass: "md-slide4 md-slides slide4",
            frontImage: {
                src: "./assets/king-kong-production-27.webp",
                alt: "A fight to fix - from King kong: Legend of a Boxer (2017)"
            },
            backImage: {
                src: "./assets/king-kong-production-14.webp",
                alt: "Joyce and Lucky - from King Kong: Legend of a Boxer"
            }
        }
    ],
    "music-backward": [
        {
            containerClass: "md-slide1-container md-slide-containersB",
            frontClass: "md-slide1a md-slidesB2 slide5",
            backClass: "md-slide1a md-slides2 slide5",
            frontImage: {
                src: "./assets/king-kong-production-08.webp",
                alt: "The king in the ring - from King Kong: Legend of a Boxer (2017)",
                className: "md-imgs md-imgsB"
            },
            backImage: {
                src: "./assets/king-kong-production-15.webp",
                alt: "The king and Jack square off - from King Kong: Legend of a Boxer (2017)"
            }
        },
        {
            containerClass: "md-slide2-container md-slide-containersB",
            frontClass: "md-slide2a md-slidesB2 slide6",
            backClass: "md-slide2a md-slides2 slide6",
            frontImage: {
                src: "./assets/funny-girl-production-13.webp",
                alt: "Lovers' quarrel - from Funny Girl (2017)"
            },
            backImage: {
                src: "./assets/funny-girl-production-11.webp",
                alt: "Engaged to be wed - from Funny Girl (2017)"
            }
        },
        {
            containerClass: "md-slide3-container md-slide-containersB",
            frontClass: "md-slide3a md-slidesB2",
            backClass: "md-slide3a md-slides2",
            frontImage: {
                src: "./assets/king-kong-production-09.webp",
                alt: "Enter the shebeen - from King Kong: Legendof a Boxer (2017)"
            },
            backImage: {
                src: "./assets/king-kong-production-17.webp",
                alt: "A boxing match - from King Kong: Legend of a Boxer (2017)"
            }
        },
        {
            containerClass: "md-slide4-container md-slide-containersB",
            frontClass: "md-slide4a md-slidesB2",
            backClass: "md-slide4a md-slides2",
            frontImage: {
                src: "./assets/cabaret-production-01.webp",
                alt: "Wilkommen to the Cabaret - from Cabaret (2015)"
            },
            backImage: {
                src: "./assets/cabaret-production-10.webp",
                alt: "Cabaret silhouette - from Cabaret (2015)"
            }
        }
    ]
};

function createImage({ src, alt, className = "md-imgs" }) {
    const image = document.createElement("img");
    image.loading = "lazy";
    image.decoding = "async";
    image.src = src;
    image.alt = alt;
    image.className = className;
    return image;
}

function createSlide(slideClass, imageConfig) {
    const slide = document.createElement("div");
    slide.className = slideClass;
    slide.append(createImage(imageConfig));
    return slide;
}

function createCarouselGroup(slides) {
    const group = document.createElement("div");
    group.className = "carousel-group";

    slides.forEach((slideConfig) => {
        const container = document.createElement("div");
        container.className = slideConfig.containerClass;
        container.append(
            createSlide(slideConfig.frontClass, slideConfig.frontImage),
            createSlide(slideConfig.backClass, slideConfig.backImage)
        );
        group.append(container);
    });

    return group;
}

function buildCarousels() {
    document.querySelectorAll(".generated-carousel").forEach((carousel) => {
        const key = carousel.dataset.carousel;
        const slides = CAROUSEL_DATA[key];

        if (!slides) {
            return;
        }

        const directionClass = key.endsWith("backward")
            ? "carousel-track-backward"
            : "carousel-track-forward";
        const track = document.createElement("div");
        track.className = `carousel-track ${directionClass}`;

        track.append(createCarouselGroup(slides));

        const duplicateGroup = createCarouselGroup(slides);
        duplicateGroup.setAttribute("aria-hidden", "true");
        track.append(duplicateGroup);

        carousel.replaceChildren(track);
    });
}

function buildMarquees() {
    document.querySelectorAll(".marquee-banner").forEach((banner) => {
        const track = document.createElement("div");
        const trackClass = banner.dataset.trackClass || "";
        const itemClass = banner.dataset.itemClass || "";
        const itemCount = Number.parseInt(banner.dataset.itemCount || "3", 10);
        const text = banner.dataset.marqueeText || "";

        track.className = `marquee-track ${trackClass}`.trim();

        for (let groupIndex = 0; groupIndex < 2; groupIndex += 1) {
            const group = document.createElement("div");
            group.className = "marquee-group";

            if (groupIndex > 0) {
                group.setAttribute("aria-hidden", "true");
            }

            for (let itemIndex = 0; itemIndex < itemCount; itemIndex += 1) {
                const item = document.createElement("div");
                const heading = document.createElement("h2");

                item.className = itemClass;
                heading.textContent = text;
                item.append(heading);
                group.append(item);
            }

            track.append(group);
        }

        banner.replaceChildren(track);
    });
}

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

    buildMarquees();
    buildCarousels();

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
                    } else if (!entry.isIntersecting) {
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
