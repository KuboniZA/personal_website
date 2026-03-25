 document.addEventListener('DOMContentLoaded', () => { 
    const images = document.querySelectorAll('.md-slides, .md-slidesB, .md-slides2, .md-slidesB2');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 0.99) {
                // Fully visible → start animation
                entry.target.style.transform = "rotateY(180deg)";
                
            } // else {
                // Not fully visible → pause
                // entry.target.style.transform = "rotateY(360deg)";
            // }
        });
    }, {
        threshold: [0, 0.99] 
    });

    images.forEach(img => observer.observe(img));

    // Hide and reveal the arrows ⬇
    const mainContainer = document.querySelector('.site-container')
    // mainContainer.scrollTop = 0;

    const upArrow = document.querySelector('.up-arrow');
    const downArrow = document.querySelector('.down-arrow');

    function handleScroll() {
        const scrollTop = mainContainer.scrollTop;
        const viewportHeight = mainContainer.clientHeight;
        const fullHeight = mainContainer.scrollHeight;

        // Hide up arrow at top
        if (scrollTop <= 0) {
            upArrow.classList.add('hidden-arrows');
        } else {
            upArrow.classList.remove('hidden-arrows');
        }

        // Hide down arrow at bottom
        if (scrollTop + viewportHeight >= fullHeight - 1) {
            downArrow.classList.add('hidden-arrows');
        } else {
            downArrow.classList.remove('hidden-arrows');
        }
    }

    mainContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on load

 });