// Qumont Analytics Helper
// Google Analytics 4 and Custom Event Tracking

class QumontAnalytics {
    constructor() {
        this.gaId = 'G-XXXXXXXXXX'; // Replace with your Google Analytics 4 Measurement ID
        this.isInitialized = false;
        this.init();
    }

    // Initialize Google Analytics
    init() {
        if (this.gaId && this.gaId !== 'G-XXXXXXXXXX') {
            // Load Google Analytics 4
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', this.gaId, {
                page_path: window.location.pathname,
                page_title: document.title
            });

            // Load GA4 script
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
            document.head.appendChild(script);

            // Add gtag function to window
            window.gtag = gtag;
            this.isInitialized = true;
            console.log('✅ Google Analytics initialized');
        } else {
            console.warn('⚠️ Google Analytics ID not configured. Please update analytics.js with your GA4 Measurement ID.');
        }
    }

    // Track page views
    trackPageView(pagePath, pageTitle) {
        if (this.isInitialized && window.gtag) {
            window.gtag('config', this.gaId, {
                page_path: pagePath || window.location.pathname,
                page_title: pageTitle || document.title
            });
        }
    }

    // Track custom events
    trackEvent(eventName, eventParams = {}) {
        if (this.isInitialized && window.gtag) {
            window.gtag('event', eventName, eventParams);
        } else {
            // Fallback: log to console if GA not initialized
            console.log('Analytics Event:', eventName, eventParams);
        }
    }

    // E-commerce Events

    // Track product view
    trackProductView(product) {
        this.trackEvent('view_item', {
            currency: 'INR',
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category || 'Uncategorized',
                price: product.price,
                quantity: 1
            }]
        });
    }

    // Track add to cart
    trackAddToCart(product, quantity = 1) {
        this.trackEvent('add_to_cart', {
            currency: 'INR',
            value: product.price * quantity,
            items: [{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category || 'Uncategorized',
                price: product.price,
                quantity: quantity
            }]
        });
    }

    // Track remove from cart
    trackRemoveFromCart(product, quantity = 1) {
        this.trackEvent('remove_from_cart', {
            currency: 'INR',
            value: product.price * quantity,
            items: [{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category || 'Uncategorized',
                price: product.price,
                quantity: quantity
            }]
        });
    }

    // Track begin checkout
    trackBeginCheckout(cartItems, totalValue) {
        const items = cartItems.map(item => ({
            item_id: item.id,
            item_name: item.name,
            item_category: item.category || 'Uncategorized',
            price: item.price,
            quantity: item.quantity || 1
        }));

        this.trackEvent('begin_checkout', {
            currency: 'INR',
            value: totalValue,
            items: items
        });
    }

    // Track purchase
    trackPurchase(order) {
        const items = order.items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            item_category: item.category || 'Uncategorized',
            price: item.price,
            quantity: item.quantity || 1
        }));

        this.trackEvent('purchase', {
            transaction_id: order.order_number || order.id,
            value: order.total,
            currency: 'INR',
            tax: order.tax || 0,
            shipping: order.shipping || 0,
            items: items
        });
    }

    // Track search
    trackSearch(searchTerm) {
        this.trackEvent('search', {
            search_term: searchTerm
        });
    }

    // Track category view
    trackCategoryView(categoryName) {
        this.trackEvent('view_item_list', {
            item_list_name: categoryName,
            item_list_id: categoryName.toLowerCase().replace(/\s+/g, '-')
        });
    }

    // Track collection view
    trackCollectionView(collectionName) {
        this.trackEvent('view_item_list', {
            item_list_name: collectionName,
            item_list_id: collectionName.toLowerCase().replace(/\s+/g, '-')
        });
    }

    // Track button clicks
    trackButtonClick(buttonName, location = 'unknown') {
        this.trackEvent('button_click', {
            button_name: buttonName,
            button_location: location
        });
    }

    // Track form submissions
    trackFormSubmit(formName, formType = 'contact') {
        this.trackEvent('form_submit', {
            form_name: formName,
            form_type: formType
        });
    }

    // Track newsletter signup
    trackNewsletterSignup(email) {
        this.trackEvent('newsletter_signup', {
            method: 'email'
        });
    }

    // Track social media clicks
    trackSocialClick(platform) {
        this.trackEvent('social_click', {
            social_platform: platform
        });
    }

    // Track video play (if you add videos)
    trackVideoPlay(videoName) {
        this.trackEvent('video_play', {
            video_name: videoName
        });
    }

    // Track file downloads
    trackFileDownload(fileName, fileType) {
        this.trackEvent('file_download', {
            file_name: fileName,
            file_type: fileType
        });
    }

    // Track scroll depth
    trackScrollDepth(depth) {
        this.trackEvent('scroll', {
            percent_scrolled: depth
        });
    }

    // Track time on page
    trackTimeOnPage(timeInSeconds) {
        this.trackEvent('timing_complete', {
            name: 'time_on_page',
            value: timeInSeconds
        });
    }

    // Track errors
    trackError(errorMessage, errorLocation) {
        this.trackEvent('exception', {
            description: errorMessage,
            fatal: false,
            error_location: errorLocation
        });
    }
}

// Initialize analytics
window.QumontAnalytics = new QumontAnalytics();

// Auto-track page views on navigation
if (window.history && window.history.pushState) {
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
        originalPushState.apply(window.history, arguments);
        setTimeout(() => {
            QumontAnalytics.trackPageView();
        }, 100);
    };
}

// Track scroll depth
let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    100: false
};

window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    [25, 50, 75, 100].forEach(depth => {
        if (scrollPercent >= depth && !scrollDepthTracked[depth]) {
            QumontAnalytics.trackScrollDepth(depth);
            scrollDepthTracked[depth] = true;
        }
    });
});

// Track time on page (when user leaves)
let pageStartTime = Date.now();
window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
    if (timeOnPage > 3) { // Only track if user spent more than 3 seconds
        QumontAnalytics.trackTimeOnPage(timeOnPage);
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QumontAnalytics;
}

