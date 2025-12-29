// Admin Dashboard JavaScript
// Manages all site content from one centralized location

// Products Database (stored in localStorage, can be migrated to backend)
const PRODUCTS_STORAGE_KEY = 'qumont_products';
const ORDERS_STORAGE_KEY = 'qumont_orders';
const SETTINGS_STORAGE_KEY = 'qumont_settings';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadProducts();
    updateStats();
    setupNavigation();
    loadSettings();
});

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Load section-specific data
        if (sectionId === 'products') {
            loadProducts();
        } else if (sectionId === 'orders') {
            loadOrders();
        } else if (sectionId === 'categories') {
            loadCategories();
        } else if (sectionId === 'collections') {
            loadCollections();
        }
    }
}

// Products Management
function getProducts() {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    // Default products from Q.js
    return {
        1: { id: 1, name: "Premium Towel Rack", price: 1299.00, image: 'https://via.placeholder.com/300x300?text=Towel+Rack', category: 'Towel Racks' },
        2: { id: 2, name: "Automatic Soap Dispenser", price: 2499.00, image: 'https://via.placeholder.com/300x300?text=Soap+Dispenser', category: 'Dispensers' },
        3: { id: 3, name: "Rain Shower Head", price: 3999.00, image: 'https://via.placeholder.com/300x300?text=Shower+Head', category: 'Shower Accessories' },
        4: { id: 4, name: "LED Bathroom Mirror", price: 5499.00, image: 'https://via.placeholder.com/300x300?text=Bathroom+Mirror', category: 'Mirrors' },
        5: { id: 5, name: "Wall Mount Toothbrush Holder", price: 899.00, image: 'https://via.placeholder.com/300x300?text=Toothbrush+Holder', category: 'Holders & Organizers' },
        6: { id: 6, name: "Premium Tissue Holder", price: 699.00, image: 'https://via.placeholder.com/300x300?text=Tissue+Holder', category: 'Holders & Organizers' }
    };
}

function saveProducts(products) {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    // Also update Q.js search database if it exists
    if (typeof searchProductsDatabase !== 'undefined') {
        Object.assign(searchProductsDatabase, products);
    }
}

function loadProducts() {
    const products = getProducts();
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    Object.values(products).forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image || 'https://via.placeholder.com/50x50'}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
            <td><strong>${product.name}</strong></td>
            <td>${product.category || 'Uncategorized'}</td>
            <td>₹${product.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-secondary btn-sm" onclick="editProduct(${product.id})">
                        <i class="fa-solid fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    updateStats();
}

function openProductModal(productId = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('modalTitle');
    
    if (productId) {
        // Edit mode
        const products = getProducts();
        const product = products[productId];
        if (product) {
            title.textContent = 'Edit Product';
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productCategory').value = product.category || '';
            document.getElementById('productImage').value = product.image || '';
            document.getElementById('productDescription').value = product.description || '';
            form.dataset.productId = productId;
        }
    } else {
        // Add mode
        title.textContent = 'Add New Product';
        form.reset();
        delete form.dataset.productId;
    }
    
    modal.classList.add('active');
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.getElementById('productForm').reset();
}

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const products = getProducts();
    const productId = this.dataset.productId ? parseInt(this.dataset.productId) : Date.now();
    
    const product = {
        id: productId,
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        image: document.getElementById('productImage').value || 'https://via.placeholder.com/300x300?text=Product',
        description: document.getElementById('productDescription').value
    };
    
    products[productId] = product;
    saveProducts(products);
    
    showAlert('productAlert', 'Product saved successfully!', 'success');
    loadProducts();
    closeProductModal();
    
    // Refresh the main site's product data
    syncProductsToSite();
});

function editProduct(productId) {
    openProductModal(productId);
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const products = getProducts();
        delete products[productId];
        saveProducts(products);
        loadProducts();
        showAlert('productAlert', 'Product deleted successfully!', 'success');
        syncProductsToSite();
    }
}

// Stats
function updateStats() {
    const products = getProducts();
    const orders = getOrders();
    
    document.getElementById('statProducts').textContent = Object.keys(products).length;
    document.getElementById('statOrders').textContent = orders.length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    document.getElementById('statRevenue').textContent = '₹' + totalRevenue.toLocaleString('en-IN');
}

// Orders
function getOrders() {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function loadOrders() {
    const orders = getOrders();
    const content = document.getElementById('ordersContent');
    
    if (orders.length === 0) {
        content.innerHTML = `
            <p style="color: #666; text-align: center; padding: 40px;">
                No orders yet. Orders will appear here once customers complete checkout.
            </p>
        `;
        return;
    }
    
    let html = '<div class="table-container"><table><thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>';
    
    orders.forEach(order => {
        html += `
            <tr>
                <td>#${order.id}</td>
                <td>${new Date(order.date).toLocaleDateString()}</td>
                <td>${order.customerName || 'Guest'}</td>
                <td>${order.items.length} items</td>
                <td>₹${order.total.toLocaleString('en-IN')}</td>
                <td><span style="padding: 4px 12px; background: #4caf50; color: white; border-radius: 4px; font-size: 0.85rem;">${order.status || 'Pending'}</span></td>
            </tr>
        `;
    });
    
    html += '</tbody></table></div>';
    content.innerHTML = html;
}

// Categories
function loadCategories() {
    const categories = [
        { name: 'Towel Racks', count: 1, icon: 'fa-towel' },
        { name: 'Mirrors', count: 1, icon: 'fa-mirror' },
        { name: 'Shower Accessories', count: 1, icon: 'fa-shower' },
        { name: 'Dispensers', count: 1, icon: 'fa-pump-soap' },
        { name: 'Holders & Organizers', count: 2, icon: 'fa-box' }
    ];
    
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = '';
    
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'product-card-admin';
        card.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <i class="fa-solid ${cat.icon}" style="font-size: 3rem; color: #d4af37;"></i>
            </div>
            <h4 style="text-align: center;">${cat.name}</h4>
            <p style="text-align: center; color: #666; margin-top: 10px;">${cat.count} products</p>
        `;
        grid.appendChild(card);
    });
}

// Collections
function loadCollections() {
    const collections = [
        { name: 'Luxury Collection', count: 2 },
        { name: 'Modern Essentials', count: 2 },
        { name: 'Premium Sets', count: 3 },
        { name: 'New Arrivals', count: 2 }
    ];
    
    const grid = document.getElementById('collectionsGrid');
    grid.innerHTML = '';
    
    collections.forEach(col => {
        const card = document.createElement('div');
        card.className = 'product-card-admin';
        card.innerHTML = `
            <h4 style="text-align: center;">${col.name}</h4>
            <p style="text-align: center; color: #666; margin-top: 10px;">${col.count} products</p>
            <button class="btn btn-secondary" style="width: 100%; margin-top: 15px;" onclick="manageCollection('${col.name}')">
                Manage
            </button>
        `;
        grid.appendChild(card);
    });
}

// Settings
function loadSettings() {
    const settings = getSettings();
    document.getElementById('siteName').value = settings.siteName || 'Qumont';
    document.getElementById('siteTagline').value = settings.siteTagline || 'Premium Bathroom Accessories';
    document.getElementById('currency').value = settings.currency || '₹';
    document.getElementById('freeShipping').value = settings.freeShipping || 999;
}

function getSettings() {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

function saveSettings() {
    const settings = {
        siteName: document.getElementById('siteName').value,
        siteTagline: document.getElementById('siteTagline').value,
        currency: document.getElementById('currency').value,
        freeShipping: parseFloat(document.getElementById('freeShipping').value)
    };
    
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    showAlert('productAlert', 'Settings saved successfully!', 'success');
}

// Utility Functions
function showAlert(alertId, message, type) {
    const alert = document.getElementById(alertId);
    if (alert) {
        alert.textContent = message;
        alert.className = `alert ${type} show`;
        setTimeout(() => {
            alert.classList.remove('show');
        }, 3000);
    }
}

function exportData() {
    const products = getProducts();
    const orders = getOrders();
    const settings = getSettings();
    
    const data = {
        products,
        orders,
        settings,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qumont-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showAlert('productAlert', 'Data exported successfully!', 'success');
}

function syncProductsToSite() {
    // This function can be used to sync products to the main site
    // For now, it just updates localStorage which the main site can read
    console.log('Products synced to site');
}

function manageCollection(collectionName) {
    alert(`Managing collection: ${collectionName}\n\nThis feature allows you to assign products to collections. Full implementation would require backend integration.`);
}

// Initialize dashboard
function initializeDashboard() {
    console.log('Admin Dashboard Initialized');
}

