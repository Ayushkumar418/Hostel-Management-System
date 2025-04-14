document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('aside ul li a');
    const mainContent = document.querySelector('iframe[name="mainContent"]');

    function setActiveLink(href) {
        sidebarLinks.forEach(link => {
            link.classList.remove('active', 'text-white');
            link.classList.add('text-gray-400');
            const linkHref = link.getAttribute('href');
            if (linkHref === href || linkHref.endsWith(href)) {
                link.classList.add('active', 'text-white');
                link.classList.remove('text-gray-400');
                sessionStorage.setItem('activeLink', linkHref);
            }
        });
    }

    function getInitialPath() {
        const urlParams = new URLSearchParams(window.location.search);
        const pathFromUrl = urlParams.get('page');
        const savedPath = sessionStorage.getItem('activeLink');
        return pathFromUrl || savedPath || 'occupancy/occupancy.html';
    }

    function initializeActiveState() {
        const initialPath = getInitialPath();
        setActiveLink(initialPath);
        if (!mainContent.src) {
            mainContent.src = initialPath;
        }
    }

    // Initialize active state
    initializeActiveState();

    // Handle clicks on sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            setActiveLink(this.getAttribute('href'));
        });
    });

    // Monitor iframe changes
    mainContent.addEventListener('load', function() {
        const currentPath = this.contentWindow.location.pathname;
        const pathParts = currentPath.split('/');
        const relativePath = pathParts.slice(-2).join('/');
        if (relativePath) {
            setActiveLink(relativePath);
        }
    });
});
