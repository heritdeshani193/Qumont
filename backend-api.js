// Frontend API Helper for Qumont Backend
// This file connects your frontend to the backend API

const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your backend URL in production

class QumontAPI {
    constructor(baseURL = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    // Helper method for making requests
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        if (config.body && typeof config.body === 'object') {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Products API
    async getProducts(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`/products?${params}`);
    }

    async getProduct(id) {
        return this.request(`/products/${id}`);
    }

    async createProduct(product) {
        return this.request('/products', {
            method: 'POST',
            body: product
        });
    }

    async updateProduct(id, product) {
        return this.request(`/products/${id}`, {
            method: 'PUT',
            body: product
        });
    }

    async deleteProduct(id) {
        return this.request(`/products/${id}`, {
            method: 'DELETE'
        });
    }

    // Orders API
    async getOrders(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`/orders?${params}`);
    }

    async getOrder(id) {
        return this.request(`/orders/${id}`);
    }

    async createOrder(order) {
        return this.request('/orders', {
            method: 'POST',
            body: order
        });
    }

    async updateOrder(id, updates) {
        return this.request(`/orders/${id}`, {
            method: 'PUT',
            body: updates
        });
    }

    async deleteOrder(id) {
        return this.request(`/orders/${id}`, {
            method: 'DELETE'
        });
    }

    async getOrderStats() {
        return this.request('/orders/stats/summary');
    }

    // Categories API
    async getCategories() {
        return this.request('/categories');
    }

    async getCategory(id) {
        return this.request(`/categories/${id}`);
    }

    async createCategory(category) {
        return this.request('/categories', {
            method: 'POST',
            body: category
        });
    }

    async updateCategory(id, category) {
        return this.request(`/categories/${id}`, {
            method: 'PUT',
            body: category
        });
    }

    async deleteCategory(id) {
        return this.request(`/categories/${id}`, {
            method: 'DELETE'
        });
    }

    // Collections API
    async getCollections() {
        return this.request('/collections');
    }

    async getCollection(id) {
        return this.request(`/collections/${id}`);
    }

    async createCollection(collection) {
        return this.request('/collections', {
            method: 'POST',
            body: collection
        });
    }

    async updateCollection(id, collection) {
        return this.request(`/collections/${id}`, {
            method: 'PUT',
            body: collection
        });
    }

    async deleteCollection(id) {
        return this.request(`/collections/${id}`, {
            method: 'DELETE'
        });
    }

    async addProductToCollection(collectionId, productId) {
        return this.request(`/collections/${collectionId}/products`, {
            method: 'POST',
            body: { product_id: productId }
        });
    }

    async removeProductFromCollection(collectionId, productId) {
        return this.request(`/collections/${collectionId}/products/${productId}`, {
            method: 'DELETE'
        });
    }

    // Settings API
    async getSettings() {
        return this.request('/settings');
    }

    async getSetting(key) {
        return this.request(`/settings/${key}`);
    }

    async updateSetting(key, value) {
        return this.request(`/settings/${key}`, {
            method: 'PUT',
            body: { value }
        });
    }

    async updateSettings(settings) {
        return this.request('/settings', {
            method: 'PUT',
            body: settings
        });
    }

    // Upload API
    async uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${this.baseURL}/upload/image`, {
            method: 'POST',
            body: formData
        });

        return response.json();
    }

    async uploadImages(files) {
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('images', file);
        });

        const response = await fetch(`${this.baseURL}/upload/images`, {
            method: 'POST',
            body: formData
        });

        return response.json();
    }

    async deleteImage(filename) {
        return this.request(`/upload/image/${filename}`, {
            method: 'DELETE'
        });
    }

    // Health check
    async healthCheck() {
        return this.request('/health');
    }
}

// Create global instance
window.QumontAPI = new QumontAPI();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QumontAPI;
}

