document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('aside ul li a');
    const mainContent = document.querySelector('iframe[name="mainContent"]');

    function setActiveLink(href) {
        sidebarLinks.forEach(link => {
            link.classList.remove('active', 'text-white');
            link.classList.add('text-gray-400');
            if (link.getAttribute('href') === href) {
                link.classList.add('active', 'text-white');
                link.classList.remove('text-gray-400');
                sessionStorage.setItem('activeLink', href);
            }
        });
    }

    // Set initial active state from sessionStorage or default
    const savedLink = sessionStorage.getItem('activeLink') || 'analytics/analysis.html';
    setActiveLink(savedLink);

    // Handle clicks on sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            setActiveLink(this.getAttribute('href'));
        });
    });

    // Monitor iframe changes
    mainContent.addEventListener('load', function() {
        const currentPath = this.contentWindow.location.pathname;
        const relativePath = currentPath.split('/').slice(-2).join('/');
        setActiveLink(relativePath);
    });
});
