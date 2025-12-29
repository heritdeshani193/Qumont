// Example: How to integrate analytics tracking into your pages
// Copy and adapt these examples to your specific pages

// ============================================
// PRODUCT DETAIL PAGE
// ============================================

// Track product view when page loads
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Fetch product data (from API or localStorage)
    // Then track:
    if (window.QumontAnalytics && productId) {
        const product = {
            id: productId,
            name: "Product Name", // Get from your data source
            price: 1299,
            category: "Towel Racks"
        };
        QumontAnalytics.trackProductView(product);
    }
});

// ============================================
// CATEGORY PAGES
// ============================================

// Track category view
if (window.QumontAnalytics) {
    // On towel-racks.html
    QumontAnalytics.trackCategoryView('Towel Racks');
    
    // On mirrors.html
    // QumontAnalytics.trackCategoryView('Mirrors');
}

// ============================================
// COLLECTION PAGES
// ============================================

// Track collection view
if (window.QumontAnalytics) {
    // On luxury-collection.html
    QumontAnalytics.trackCollectionView('Luxury Collection');
}

// ============================================
// NEWSLETTER FORM
// ============================================

document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Track newsletter signup
        if (window.QumontAnalytics) {
            QumontAnalytics.trackNewsletterSignup(email);
        }
        
        // Process form submission...
        console.log('Newsletter signup:', email);
    });
});

// ============================================
// SOCIAL MEDIA LINKS
// ============================================

document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.href;
        let platform = 'other';
        
        if (href.includes('instagram')) platform = 'instagram';
        else if (href.includes('facebook')) platform = 'facebook';
        else if (href.includes('twitter')) platform = 'twitter';
        else if (href.includes('pinterest')) platform = 'pinterest';
        
        if (window.QumontAnalytics) {
            QumontAnalytics.trackSocialClick(platform);
        }
    });
});

// ============================================
// CONTACT FORM
// ============================================

document.querySelectorAll('form.contact-form, form.billing-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        // Track form submission
        if (window.QumontAnalytics) {
            const formName = this.getAttribute('name') || 'contact_form';
            QumontAnalytics.trackFormSubmit(formName, 'contact');
        }
        
        // Process form...
    });
});

// ============================================
// BUTTON CLICKS
// ============================================

// Track CTA button clicks
document.querySelectorAll('.cta-button, .welcome-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (window.QumontAnalytics) {
            const buttonText = this.textContent.trim() || this.querySelector('span')?.textContent || 'CTA Button';
            QumontAnalytics.trackButtonClick(buttonText, 'hero');
        }
    });
});

// ============================================
// REMOVE FROM CART
// ============================================

// If you have remove from cart functionality
function removeFromCart(productId) {
    // Your remove logic...
    
    // Track removal
    if (window.QumontAnalytics) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            QumontAnalytics.trackRemoveFromCart(product, product.quantity);
        }
    }
}

// ============================================
// PAGE VIEW TRACKING
// ============================================

// Track page view on load (automatic, but you can customize)
if (window.QumontAnalytics) {
    QumontAnalytics.trackPageView(window.location.pathname, document.title);
}

// ============================================
// ERROR TRACKING
// ============================================

// Track JavaScript errors
window.addEventListener('error', function(e) {
    if (window.QumontAnalytics) {
        QumontAnalytics.trackError(e.message, e.filename + ':' + e.lineno);
    }
});

// Track promise rejections
window.addEventListener('unhandledrejection', function(e) {
    if (window.QumontAnalytics) {
        QumontAnalytics.trackError(e.reason?.message || 'Unhandled promise rejection', 'promise');
    }
});

