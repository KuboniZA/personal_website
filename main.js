 document.addEventListener('DOMContentLoaded', () => { 
    const images = document.querySelectorAll('.md-slides, .md-slidesB');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio === 1) {
                // Fully visible → start animation
                entry.target.style.transform = "rotateY(180deg)";
                
            } else {
                // Not fully visible → pause
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, {
        threshold: 1.0 // 100% visibility required
    });

    images.forEach(img => observer.observe(img));
 });