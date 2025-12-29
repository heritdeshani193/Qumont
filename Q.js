// --- WELCOME SCREEN LOGIC ---
function initializeWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const enterSiteBtn = document.getElementById('enterSite');
    
    if (!welcomeScreen) {
        console.error('Welcome screen element not found');
        return;
    }
    
    // Check if user has seen welcome screen before
    function checkWelcomeScreen() {
        const hasSeenWelcome = localStorage.getItem('qumont_welcome_seen');
        
        console.log('Welcome screen check:', hasSeenWelcome); // Debug log
        
        if (!hasSeenWelcome) {
            // Show welcome screen
            welcomeScreen.style.display = 'flex';
            // Force reflow
            welcomeScreen.offsetHeight;
            // Then add active class for animation
            setTimeout(() => {
                welcomeScreen.classList.add('active');
            }, 50);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            // Hide welcome screen
            welcomeScreen.style.display = 'none';
        }
    }
    
    // Function to close welcome screen
    function closeWelcomeScreen() {
        welcomeScreen.classList.remove('active');
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }, 500);
        
        // Mark as seen in localStorage
        localStorage.setItem('qumont_welcome_seen', 'true');
    }
    
    // Event listener for enter button
    if (enterSiteBtn) {
        enterSiteBtn.addEventListener('click', closeWelcomeScreen);
    }
    
    // Initialize welcome screen check
    checkWelcomeScreen();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWelcomeScreen);
} else {
    // DOM is already loaded
    initializeWelcomeScreen();
}

// --- HAMBURGER MENU LOGIC ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    // Toggle the 'active' class to show/hide the menu
    navLinks.classList.toggle('active');
    
    // Change icon from Bars to X when open
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// --- DROPDOWN MENU LOGIC (Mobile) ---
const navDropdowns = document.querySelectorAll('.nav-dropdown');

navDropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');
    
    // For mobile: toggle dropdown on click
    dropdownLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// --- CART LOGIC ---

// Cart Data Structure
let cart = [];

// Select Elements
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');
const cartBody = document.querySelector('.cart-body');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.getElementById('cartTotal');

// Function to open/close cart
function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Function to format price in Indian Rupees
function formatPrice(price) {
    // Format number with Indian numbering system (commas for thousands, lakhs, crores)
    const formattedPrice = parseFloat(price).toFixed(2);
    const parts = formattedPrice.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '₹' + parts.join('.');
}

// Function to calculate cart total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Function to update cart count badge
function updateCartCount() {
    if (!cartCount) {
        console.error('Cart count element not found');
        return;
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems > 99 ? '99+' : totalItems;
        cartCount.style.display = 'flex';
        cartCount.style.visibility = 'visible';
        cartCount.style.opacity = '1';
        // Adjust badge width for double digits
        if (totalItems > 9 && totalItems <= 99) {
            cartCount.style.width = 'auto';
            cartCount.style.minWidth = '24px';
            cartCount.style.height = '20px';
            cartCount.style.padding = '0 6px';
            cartCount.style.borderRadius = '10px';
            cartCount.style.fontSize = '0.6rem';
        } else {
            cartCount.style.width = '20px';
            cartCount.style.minWidth = '20px';
            cartCount.style.height = '20px';
            cartCount.style.padding = '0';
            cartCount.style.borderRadius = '50%';
            cartCount.style.fontSize = '0.65rem';
        }
    } else {
        cartCount.textContent = '0';
        cartCount.style.display = 'none';
        cartCount.style.visibility = 'hidden';
    }
}

// Function to render cart items
function renderCart() {
    if (cart.length === 0) {
        cartBody.innerHTML = '<p class="empty-msg" style="text-align:center; color:#888; margin-top:20px;">Your cart is currently empty.</p>';
        cartTotal.textContent = formatPrice(0);
        return;
    }

    let cartHTML = '<div class="cart-items">';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartHTML += `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <img src="${item.image || 'https://via.placeholder.com/80x80?text=Product'}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <span class="item-total-price">${formatPrice(itemTotal)}</span>
                    <button class="remove-item" onclick="removeFromCart(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartHTML += '</div>';
    cartBody.innerHTML = cartHTML;
    
    // Update total
    const total = calculateTotal();
    cartTotal.textContent = formatPrice(total);
    
    updateCartCount();
}

// Function to save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('qumont_cart', JSON.stringify(cart));
}

// Function to load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('qumont_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
        updateCartCount();
    }
}

// Function to add product to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: product.quantity || 1,
            category: product.category || 'Uncategorized'
        });
    }
    
    saveCartToStorage();
    renderCart();
    updateCartCount();
    
    // Track analytics event
    if (window.QumontAnalytics) {
        window.QumontAnalytics.trackAddToCart(product, product.quantity || 1);
    }
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Function to show notification
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fa-solid fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    renderCart();
    updateCartCount();
}

// Function to update quantity
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            saveCartToStorage();
            renderCart();
            updateCartCount();
        }
    }
}

// Make functions globally available for onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

// Function to go to checkout page
function goToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart first.');
        return;
    }
    
    // Track begin checkout event
    if (window.QumontAnalytics) {
        const totalValue = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        window.QumontAnalytics.trackBeginCheckout(cart, totalValue);
    }
    
    // Save cart before redirecting
    saveCartToStorage();
    window.location.href = 'checkout.html';
}

// --- SEARCH FUNCTIONALITY ---

// Products database for search (simplified version)
const searchProductsDatabase = {
    1: { id: 1, name: "Premium Towel Rack", price: 1299.00, image: 'https://via.placeholder.com/300x300?text=Towel+Rack', category: 'Towel Accessories' },
    2: { id: 2, name: "Automatic Soap Dispenser", price: 2499.00, image: 'https://via.placeholder.com/300x300?text=Soap+Dispenser', category: 'Hygiene Products' },
    3: { id: 3, name: "Rain Shower Head", price: 3999.00, image: 'https://via.placeholder.com/300x300?text=Shower+Head', category: 'Shower Accessories' },
    4: { id: 4, name: "LED Bathroom Mirror", price: 5499.00, image: 'https://via.placeholder.com/300x300?text=Bathroom+Mirror', category: 'Mirrors' },
    5: { id: 5, name: "Wall Mount Toothbrush Holder", price: 899.00, image: 'https://via.placeholder.com/300x300?text=Toothbrush+Holder', category: 'Organizers' },
    6: { id: 6, name: "Premium Tissue Holder", price: 699.00, image: 'https://via.placeholder.com/300x300?text=Tissue+Holder', category: 'Organizers' }
};

function searchProducts(query) {
    const results = [];
    
    Object.values(searchProductsDatabase).forEach(product => {
        const nameMatch = product.name.toLowerCase().includes(query);
        const categoryMatch = product.category.toLowerCase().includes(query);
        
        if (nameMatch || categoryMatch) {
            results.push(product);
        }
    });
    
    return results;
}

function displayNavbarSearchResults(results, query) {
    const navbarSearchResults = document.getElementById('navbarSearchResults');
    if (!navbarSearchResults) return;
    
    if (results.length === 0) {
        navbarSearchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fa-solid fa-search"></i>
                <p>No products found for "<strong>${query}</strong>"</p>
            </div>
        `;
        navbarSearchResults.classList.add('show');
        return;
    }
    
    let resultsHTML = '';
    
    results.slice(0, 5).forEach(product => {
        resultsHTML += `
            <div class="navbar-search-item" onclick="window.location.href='product-detail.html?id=${product.id}'; if(typeof closeSearch === 'function') closeSearch();">
                <div class="navbar-result-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="navbar-result-info">
                    <h4 class="navbar-result-name">${highlightMatch(product.name, query)}</h4>
                    <p class="navbar-result-category">${product.category}</p>
                    <p class="navbar-result-price">${formatPrice(product.price)}</p>
                </div>
            </div>
        `;
    });
    
    navbarSearchResults.innerHTML = resultsHTML;
    navbarSearchResults.classList.add('show');
}

// Initialize search when DOM is ready
function initializeSearch() {
    const searchIconBtn = document.getElementById('searchIconBtn');
    const searchWrapper = document.getElementById('searchWrapper');
    const searchInputWrapper = document.getElementById('searchInputWrapper');
    const navbarSearchInput = document.getElementById('navbarSearchInput');
    const navbarSearchResults = document.getElementById('navbarSearchResults');
    
    if (!searchIconBtn || !searchWrapper || !searchInputWrapper || !navbarSearchInput || !navbarSearchResults) {
        console.error('Search elements not found, retrying...');
        setTimeout(initializeSearch, 100);
        return;
    }
    
    // Open search - expand icon to text field
    searchIconBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        searchWrapper.classList.add('active');
        searchInputWrapper.classList.add('active');
        setTimeout(() => {
            navbarSearchInput.focus();
        }, 100);
    });
    
    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (searchWrapper && !searchWrapper.contains(e.target)) {
            if (navbarSearchInput && navbarSearchInput.value.trim() === '') {
                closeSearchFunction();
            } else {
                // Hide results but keep input open
                navbarSearchResults.classList.remove('show');
            }
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchWrapper.classList.contains('active')) {
            if (navbarSearchInput.value.trim() === '') {
                closeSearchFunction();
            } else {
                navbarSearchInput.value = '';
                navbarSearchResults.innerHTML = '';
                navbarSearchResults.classList.remove('show');
            }
        }
    });
    
    function closeSearchFunction() {
        searchWrapper.classList.remove('active');
        searchInputWrapper.classList.remove('active');
        navbarSearchInput.value = '';
        navbarSearchResults.innerHTML = '';
        navbarSearchResults.classList.remove('show');
    }
    
    // Search functionality
    navbarSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        
        if (query.length === 0) {
            navbarSearchResults.innerHTML = '';
            navbarSearchResults.classList.remove('show');
            return;
        }
        
        const results = searchProducts(query);
        displayNavbarSearchResults(results, query);
        
        // Track search event (debounced)
        if (window.QumontAnalytics && query.length >= 3) {
            clearTimeout(window.searchTrackingTimeout);
            window.searchTrackingTimeout = setTimeout(() => {
                window.QumontAnalytics.trackSearch(query);
            }, 1000); // Track after 1 second of typing
        }
    });
    
    // Make closeSearch available globally
    window.closeSearch = closeSearchFunction;
}

// Initialize search when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
    initializeSearch();
}

function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Make function globally available
window.goToCheckout = goToCheckout;

// Test function to verify badge works (can be called from console)
window.testCartBadge = function() {
    addToCart({
        id: 999,
        name: "Test Product",
        price: 99.99,
        image: "https://via.placeholder.com/80x80?text=Test",
        quantity: 1
    });
    console.log('Test product added! Badge should now be visible.');
};

// Event Listeners
cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart();
});

closeCartBtn.addEventListener('click', toggleCart);

// Close cart if user clicks on the dimmed background
cartOverlay.addEventListener('click', toggleCart);

// Initialize cart display when DOM is ready
function initializeCart() {
    // Load cart from localStorage first
    loadCartFromStorage();
    
    if (cartCount && cartBody && cartTotal) {
        updateCartCount();
        renderCart();
    } else {
        console.error('Cart elements not found. Retrying...');
        setTimeout(initializeCart, 100);
    }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCart);
} else {
    // DOM is already loaded
    initializeCart();
}