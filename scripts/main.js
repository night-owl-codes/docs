// Night Owl Codes - Documentation Site JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initSidebar();
    initSearch();
    initScrollSpy();
    initMobileMenu();
    initCodeCopy();
});

/**
 * Sidebar Navigation
 */
function initSidebar() {
    const navItems = document.querySelectorAll('.nav-item[data-href]');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const href = item.dataset.href;
            if (href) {
                window.location.href = href;
            }
        });
    });
    
    // Set active state based on current URL
    const currentPath = window.location.pathname;
    navItems.forEach(item => {
        if (item.dataset.href === currentPath) {
            item.classList.add('active');
        }
    });
}

/**
 * Search Functionality
 */
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchInput) return;
    
    // Search data (would typically come from a backend or generated index)
    const searchData = [
        { title: 'Getting Started', href: 'index.html', category: 'Scripts' },
        { title: 'Installation', href: '#installation', category: 'Scripts' },
        { title: 'Configuration', href: '#configuration', category: 'Scripts' },
        { title: 'API Reference', href: '#api', category: 'Scripts' },
        { title: 'Troubleshooting', href: '#troubleshooting', category: 'Help' },
        { title: 'noc_telegraph', href: 'scripts/noc_telegraph.html', category: 'Scripts' },
        { title: 'noc_bounty', href: 'scripts/noc_bounty.html', category: 'Scripts' },
    ];
    
    let debounceTimer;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                hideSearchResults();
                return;
            }
            
            const results = searchData.filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            );
            
            showSearchResults(results);
        }, 300);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSearchResults();
        }
    });
    
    // Keyboard shortcut (Cmd/Ctrl + K)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
    
    function showSearchResults(results) {
        if (!searchResults) {
            // Create search results container if it doesn't exist
            const container = document.querySelector('.search-container');
            searchResults = document.createElement('div');
            searchResults.className = 'search-results';
            container.appendChild(searchResults);
        }
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-result-empty">
                    <span>No results found</span>
                </div>
            `;
        } else {
            searchResults.innerHTML = results.map(result => `
                <a href="${result.href}" class="search-result-item">
                    <span class="search-result-title">${result.title}</span>
                    <span class="search-result-category">${result.category}</span>
                </a>
            `).join('');
        }
        
        searchResults.classList.add('visible');
    }
    
    function hideSearchResults() {
        if (searchResults) {
            searchResults.classList.remove('visible');
        }
    }
}

/**
 * Scroll Spy for Table of Contents
 */
function initScrollSpy() {
    const tocLinks = document.querySelectorAll('.toc-item a');
    const headings = document.querySelectorAll('h2[id], h3[id]');
    
    if (tocLinks.length === 0 || headings.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -80% 0px'
    });
    
    headings.forEach(heading => observer.observe(heading));
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (!menuToggle || !sidebar) return;
    
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) {
            overlay.classList.toggle('visible');
        }
        document.body.classList.toggle('sidebar-open');
    });
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('visible');
            document.body.classList.remove('sidebar-open');
        });
    }
}

/**
 * Code Copy Functionality
 */
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy-btn';
        copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;
        copyButton.title = 'Copy code';
        
        // Add button to pre element
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
        
        // Copy functionality
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyButton.classList.add('copied');
                copyButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                
                setTimeout(() => {
                    copyButton.classList.remove('copied');
                    copyButton.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    `;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Theme Preference (for future dark/light mode toggle)
 */
function getThemePreference() {
    return localStorage.getItem('theme') || 'dark';
}

function setThemePreference(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
}