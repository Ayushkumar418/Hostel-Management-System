document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('header').offsetHeight;

    // Set home as default active
    const homeLink = document.querySelector('a[href="#"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        let current = '';
        
        if (window.scrollY === 0) {
            // At the top of page, set home as active
            current = '';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - headerHeight - 50)) {  // Adjusted offset
                    current = section.getAttribute('id') || 'home';
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === current || (href === '' && current === '')) {
                link.classList.add('active');
            }
        });
    });
});

function toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('nav-menu');
    
    menuToggle.classList.toggle('active');
    nav.classList.toggle('show');
    
    if (menuToggle.classList.contains('active')) {
        menuToggle.innerHTML = '+';
    } else {
        menuToggle.innerHTML = '☰';
    }
}
