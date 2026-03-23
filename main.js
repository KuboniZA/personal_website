 document.addEventListener('DOMContentLoaded', () => { 
    const images = document.querySelectorAll('.md-slides, .md-slidesB, .md-slides2, .md-slidesB2');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 0.99) {
                // Fully visible → start animation
                entry.target.style.transform = "rotateY(180deg)";
                
            } else {
                // Not fully visible → pause
                // entry.target.style.transform = "rotateY(360deg)";
            }
        });
    }, {
        threshold: [0, 0.99]  // 100% visibility required
    });

    images.forEach(img => observer.observe(img));

    
 });