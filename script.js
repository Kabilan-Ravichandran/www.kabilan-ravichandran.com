document.addEventListener('DOMContentLoaded', () => {

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Fade-in Animations on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all elements with the .fade-in class and content sections for a smooth effect
    const elementsToAnimate = document.querySelectorAll('.fade-in, .content-section');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Manually trigger hero animation since it's already in view on page load
    const heroContent = document.querySelector('.hero-content');
    const heroElements = heroContent.querySelectorAll('.fade-in');
    heroElements.forEach(el => el.classList.add('visible'));

    // --- Slideshow Logic ---
    // Initialize all slideshows on the page
    const slideshows = document.querySelectorAll('.slideshow-container');
    slideshows.forEach(slideshow => {
        slideshow.setAttribute('data-slide-index', 1);
        showSlides(1, slideshow);
    });
});

// Slideshow global functions
let slideIndexes = {};

function plusSlides(n, btn) {
    const slideshow = btn.closest('.slideshow-container');
    let slideIndex = parseInt(slideshow.getAttribute('data-slide-index'));
    slideIndex += n;
    showSlides(slideIndex, slideshow);
}

function showSlides(n, slideshow) {
    let i;
    let slides = slideshow.getElementsByClassName("slide");
    let slideIndex = n;
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slides[slideIndex - 1].style.display = "block";
    slideshow.setAttribute('data-slide-index', slideIndex);
}
