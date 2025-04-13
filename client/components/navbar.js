document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-menu .nav-item');
    const contentFrame = window.parent.frames['content'];

    function syncNavigation(pagePath, pushState = true) {
        const cleanPath = pagePath.replace('../pages/', '');
        const targetItem = Array.from(navItems).find(item => item.dataset.page === cleanPath);
        
        if (targetItem) {
            // Update active state
            navItems.forEach(item => item.classList.remove('active'));
            targetItem.classList.add('active');
            
            // Update iframe content
            const targetUrl = targetItem.querySelector('a').href;
            if (contentFrame.location.href !== targetUrl) {
                contentFrame.location.href = targetUrl;
            }
            
            // Update session and history
            sessionStorage.setItem('activePage', cleanPath);
            if (pushState) {
                history.pushState({ page: cleanPath }, '', window.location.href);
            }
        }
    }

    // Initial state
    const savedPage = sessionStorage.getItem('activePage') || 'dashboard/dash.html';
    syncNavigation(savedPage, false);

    // Handle clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            syncNavigation(this.dataset.page);
        });
    });

    // Handle iframe changes
    contentFrame.addEventListener('load', function() {
        try {
            const currentPath = this.location.pathname;
            const pagePath = currentPath.split('/pages/')[1];
            if (pagePath && pagePath !== sessionStorage.getItem('activePage')) {
                syncNavigation(pagePath, true);
            }
        } catch (e) {
            console.warn('Could not access iframe location:', e);
        }
    });

    // Handle browser navigation
    window.addEventListener('popstate', function(event) {
        const targetPage = event.state?.page || savedPage;
        syncNavigation(targetPage, false);
    });
});
