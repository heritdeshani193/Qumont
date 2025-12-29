// SEO Helper Functions for Qumont
// Use this to dynamically add structured data and meta tags

class SEOHelper {
    constructor() {
        this.baseURL = window.location.origin;
    }

    // Add product structured data
    addProductStructuredData(product) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description || `${product.name} - Premium bathroom accessory from Qumont`,
            "image": product.image || `${this.baseURL}/images/${product.id}.jpg`,
            "brand": {
                "@type": "Brand",
                "name": "Qumont"
            },
            "offers": {
                "@type": "Offer",
                "url": `${this.baseURL}/product-detail.html?id=${product.id}`,
                "priceCurrency": "INR",
                "price": product.price,
                "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                "itemCondition": "https://schema.org/NewCondition",
                "availability": product.stock > 0 
                    ? "https://schema.org/InStock" 
                    : "https://schema.org/OutOfStock",
                "seller": {
                    "@type": "Organization",
                    "name": "Qumont"
                }
            },
            "aggregateRating": product.rating ? {
                "@type": "AggregateRating",
                "ratingValue": product.rating,
                "reviewCount": product.reviewCount || 0
            } : undefined
        };

        // Remove undefined properties
        Object.keys(structuredData).forEach(key => {
            if (structuredData[key] === undefined) {
                delete structuredData[key];
            }
        });

        this.addStructuredData(structuredData);
    }

    // Add breadcrumb structured data
    addBreadcrumbStructuredData(items) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }))
        };

        this.addStructuredData(structuredData);
    }

    // Add FAQ structured data
    addFAQStructuredData(faqs) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };

        this.addStructuredData(structuredData);
    }

    // Add review structured data
    addReviewStructuredData(reviews) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Product",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": this.calculateAverageRating(reviews),
                "reviewCount": reviews.length
            },
            "review": reviews.map(review => ({
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": review.author
                },
                "datePublished": review.date,
                "reviewBody": review.text,
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": review.rating,
                    "bestRating": "5"
                }
            }))
        };

        this.addStructuredData(structuredData);
    }

    // Add structured data to page
    addStructuredData(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }

    // Update meta tags dynamically
    updateMetaTag(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`) || 
                   document.querySelector(`meta[name="${property}"]`);
        
        if (!meta) {
            meta = document.createElement('meta');
            if (property.startsWith('og:') || property.startsWith('twitter:')) {
                meta.setAttribute('property', property);
            } else {
                meta.setAttribute('name', property);
            }
            document.head.appendChild(meta);
        }
        
        meta.setAttribute('content', content);
    }

    // Update page title and meta description
    updatePageSEO(title, description, keywords = '') {
        document.title = title;
        this.updateMetaTag('title', title);
        this.updateMetaTag('description', description);
        if (keywords) {
            this.updateMetaTag('keywords', keywords);
        }
        this.updateMetaTag('og:title', title);
        this.updateMetaTag('og:description', description);
        this.updateMetaTag('twitter:title', title);
        this.updateMetaTag('twitter:description', description);
    }

    // Calculate average rating
    calculateAverageRating(reviews) {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    }

    // Generate canonical URL
    setCanonicalURL(url) {
        let link = document.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }
}

// Create global instance
window.SEOHelper = new SEOHelper();

// Auto-add product structured data if on product page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        // You can fetch product data and add structured data
        // Example:
        // fetch(`/api/products/${productId}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         SEOHelper.addProductStructuredData(data.data);
        //     });
    }
});

