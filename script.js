// script.js - FreshEat Professional & Human-Centered JavaScript

/**
 * FreshEat E-commerce Platform
 * Developed with ❤️ by Nagaty Ayman for Mansoura University
 * A demonstration of modern web development practices
 */

// ===== CONFIGURATION & CONSTANTS =====
const CONFIG = {
    CART_KEY: 'fresheat_cart_v3',
    PRODUCTS_KEY: 'fresheat_products_v3',
    THEME_KEY: 'fresheat_theme_v2',
    USER_PREFERENCES: 'fresheat_preferences_v1',
    APP_VERSION: '1.0.0'
};

// ===== PREMIUM PRODUCT CATALOG =====
const PREMIUM_PRODUCTS = [
    {
        id: 'organic-apples',
        name: 'Organic Red Apples',
        price: 4.99,
        originalPrice: 6.99,
        img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop',
        desc: 'Crisp, sweet organic apples harvested at peak ripeness. Perfect for healthy snacks, baking, and family meals. Each apple is carefully selected for optimal flavor and nutrition.',
        category: 'fruits',
        badge: 'Organic',
        features: ['No Pesticides', 'Rich in Fiber', 'Vitamin C', 'Family Favorite'],
        nutrition: { calories: 95, fiber: '4g', vitaminC: '14%' },
        farmer: 'Green Valley Organic Farms',
        rating: 4.8,
        reviewCount: 127,
        tags: ['organic', 'family', 'healthy', 'local']
    },
    {
        id: 'ripe-bananas',
        name: 'Sun-Ripened Bananas',
        price: 2.99,
        originalPrice: 3.99,
        img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop',
        desc: 'Naturally ripened bananas with perfect sweetness. Packed with potassium and essential nutrients for active families and growing children.',
        category: 'fruits',
        badge: 'Fresh',
        features: ['High Potassium', 'Natural Energy', 'Kid Friendly', 'Easy Digest'],
        nutrition: { calories: 105, potassium: '12%', vitaminB6: '20%' },
        farmer: 'Tropical Sunshine Co-op',
        rating: 4.6,
        reviewCount: 89,
        tags: ['energy', 'family', 'healthy']
    },
    {
        id: 'fresh-strawberries',
        name: 'Fresh Picked Strawberries',
        price: 5.99,
        originalPrice: 7.99,
        img: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400&h=300&fit=crop',
        desc: 'Juicy, vibrant strawberries handpicked at dawn. Bursting with antioxidants and natural sweetness that your family will love.',
        category: 'fruits',
        badge: 'Seasonal',
        features: ['Antioxidant Rich', 'Vitamin C', 'Low Calorie', 'Sweet Treat'],
        nutrition: { calories: 32, vitaminC: '149%', manganese: '29%' },
        farmer: 'Berry Bliss Farms',
        rating: 4.9,
        reviewCount: 203,
        tags: ['antioxidant', 'sweet', 'seasonal']
    },
    {
        id: 'sweet-oranges',
        name: 'Sweet Citrus Oranges',
        price: 3.79,
        originalPrice: 4.99,
        img: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop',
        desc: 'Sun-kissed oranges bursting with vitamin C and natural juices. Perfect for fresh eating, juicing, or adding sunshine to your day.',
        category: 'fruits',
        badge: 'Vitamin C',
        features: ['Immune Support', 'Natural Hydration', 'Fresh Juice', 'Family Health'],
        nutrition: { calories: 62, vitaminC: '138%', fiber: '3.1g' },
        farmer: 'Citrus Grove Collective',
        rating: 4.7,
        reviewCount: 156,
        tags: ['vitamin-c', 'immune', 'hydration']
    },
    {
        id: 'vine-tomatoes',
        name: 'Vine-Ripened Tomatoes',
        price: 3.49,
        originalPrice: 4.49,
        img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
        desc: 'Flavorful tomatoes ripened naturally on the vine. Perfect for salads, sauces, and bringing garden-fresh taste to your kitchen.',
        category: 'vegetables',
        badge: 'Local',
        features: ['Vine Ripened', 'Rich Flavor', 'Versatile', 'Kitchen Essential'],
        nutrition: { calories: 22, vitaminC: '28%', vitaminK: '12%' },
        farmer: 'Heritage Garden Farms',
        rating: 4.5,
        reviewCount: 94,
        tags: ['local', 'versatile', 'fresh']
    },
    {
        id: 'tropical-pineapple',
        name: 'Tropical Golden Pineapple',
        price: 6.49,
        originalPrice: 8.49,
        img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop',
        desc: 'Sweet tropical pineapple with vibrant golden flesh. Rich in digestive enzymes and natural sweetness for a taste of paradise.',
        category: 'fruits',
        badge: 'Tropical',
        features: ['Digestive Enzymes', 'Tropical Sweet', 'Vitamin Rich', 'Exotic Treat'],
        nutrition: { calories: 82, vitaminC: '131%', manganese: '76%' },
        farmer: 'Island Sunshine Imports',
        rating: 4.8,
        reviewCount: 167,
        tags: ['tropical', 'digestive', 'sweet']
    }
];

// ===== DOM UTILITIES =====
class DOMUtils {
    static $(selector, parent = document) {
        return parent.querySelector(selector);
    }

    static $$(selector, parent = document) {
        return Array.from(parent.querySelectorAll(selector));
    }

    static createElement(tag, classes = '', content = '') {
        const element = document.createElement(tag);
        if (classes) element.className = classes;
        if (content) element.innerHTML = content;
        return element;
    }

    static showElement(selector) {
        const element = this.$(selector);
        if (element) element.style.display = 'block';
    }

    static hideElement(selector) {
        const element = this.$(selector);
        if (element) element.style.display = 'none';
    }
}

// ===== STORAGE MANAGER =====
class StorageManager {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage Error:', error);
            this.showStorageError();
            return false;
        }
    }

    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage Read Error:', error);
            return defaultValue;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Storage Remove Error:', error);
        }
    }

    static showStorageError() {
        ToastManager.show(
            'We encountered a storage issue. Some features may not work properly.',
            'error'
        );
    }
}

// ===== THEME MANAGER =====
class ThemeManager {
    static init() {
        const savedTheme = StorageManager.get(CONFIG.THEME_KEY, 'light');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : savedTheme;
        
        this.applyTheme(theme);
        this.setupEventListeners();
    }

    static applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        StorageManager.set(CONFIG.THEME_KEY, theme);
        
        const toggleButton = DOMUtils.$('#dark-toggle');
        if (toggleButton) {
            toggleButton.innerHTML = theme === 'dark' ? '☀️' : '🌙';
            toggleButton.setAttribute('aria-label', 
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }
    }

    static setupEventListeners() {
        const toggleButton = DOMUtils.$('#dark-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.applyTheme(newTheme);
                
                // Provide feedback for screen readers
                ToastManager.show(`Switched to ${newTheme} mode`);
            });
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const savedTheme = StorageManager.get(CONFIG.THEME_KEY);
            if (savedTheme === 'system') {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// ===== TOAST MANAGER =====
class ToastManager {
    static show(message, type = 'info', duration = 4000) {
        const toast = this.createToast(message, type);
        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        });

        // Auto remove
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);

        return toast;
    }

    static createToast(message, type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: '💡'
        };

        const toast = DOMUtils.createElement('div', 'toast');
        toast.innerHTML = `
            <div class="toast-content toast-${type}">
                <span class="toast-icon">${icons[type] || icons.info}</span>
                <span class="toast-message">${message}</span>
                <button class="toast-close" aria-label="Dismiss notification">×</button>
            </div>
        `;

        // Close button event
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.removeToast(toast);
        });

        return toast;
    }

    static removeToast(toast) {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// ===== CART MANAGER =====
class CartManager {
    static getCart() {
        return StorageManager.get(CONFIG.CART_KEY, []);
    }

    static saveCart(cart) {
        const success = StorageManager.set(CONFIG.CART_KEY, cart);
        if (success) {
            this.updateCartUI();
            this.dispatchCartUpdate();
        }
        return success;
    }

    static addItem(product, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.addedAt = new Date().toISOString();
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        const success = this.saveCart(cart);
        if (success) {
            ToastManager.show(`Added ${product.name} to cart!`, 'success');
            this.animateAddToCart(product);
        }
        
        return success;
    }

    static updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            return this.removeItem(productId);
        }

        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity = quantity;
            return this.saveCart(cart);
        }
        
        return false;
    }

    static removeItem(productId) {
        const cart = this.getCart().filter(item => item.id !== productId);
        const success = this.saveCart(cart);
        if (success) {
            ToastManager.show('Item removed from cart');
        }
        return success;
    }

    static clearCart() {
        const success = StorageManager.set(CONFIG.CART_KEY, []);
        if (success) {
            this.updateCartUI();
            ToastManager.show('Cart cleared successfully', 'info');
        }
        return success;
    }

    static getCartCount() {
        return this.getCart().reduce((total, item) => total + item.quantity, 0);
    }

    static getCartTotal() {
        return this.getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    static updateCartUI() {
        const count = this.getCartCount();
        const countElements = DOMUtils.$$('#cart-count');
        
        countElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'flex' : 'none';
        });

        // Update cart page if open
        if (DOMUtils.$('#cart-root')) {
            this.renderCartPage();
        }
    }

    static animateAddToCart(product) {
        // Create flying animation element
        const animElement = DOMUtils.createElement('div', 'add-to-cart-animation');
        animElement.innerHTML = '🛒';
        animElement.style.cssText = `
            position: fixed;
            z-index: 10000;
            font-size: 20px;
            pointer-events: none;
        `;

        document.body.appendChild(animElement);

        // Get positions
        const buttonRect = event?.target?.getBoundingClientRect();
        const cartRect = DOMUtils.$('.cart-link')?.getBoundingClientRect();

        if (buttonRect && cartRect) {
            const startX = buttonRect.left + buttonRect.width / 2;
            const startY = buttonRect.top + buttonRect.height / 2;
            const endX = cartRect.left + cartRect.width / 2;
            const endY = cartRect.top + cartRect.height / 2;

            animElement.style.left = startX + 'px';
            animElement.style.top = startY + 'px';

            // Animate
            requestAnimationFrame(() => {
                animElement.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                animElement.style.left = endX + 'px';
                animElement.style.top = endY + 'px';
                animElement.style.transform = 'scale(0.5)';
                animElement.style.opacity = '0';
            });

            // Clean up
            setTimeout(() => {
                if (animElement.parentNode) {
                    animElement.parentNode.removeChild(animElement);
                }
            }, 800);
        }
    }

    static dispatchCartUpdate() {
        window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { cart: this.getCart(), total: this.getCartTotal() }
        }));
    }

    static renderCartPage() {
        const container = DOMUtils.$('#cart-root');
        if (!container) return;

        const cart = this.getCart();
        
        if (cart.length === 0) {
            container.innerHTML = this.getEmptyCartHTML();
            this.updateCartSummary(0);
            return;
        }

        container.innerHTML = this.getCartItemsHTML(cart);
        this.updateCartSummary(this.getCartTotal());
        this.attachCartEventListeners();
    }

    static getEmptyCartHTML() {
        return `
            <div class="empty-cart-state">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is waiting for delicious finds!</h3>
                <p>Explore our fresh selection and add some goodness to your cart</p>
                <a href="products.html" class="cta-button primary">
                    <span class="button-icon">🌿</span>
                    Discover Fresh Products
                </a>
            </div>
        `;
    }

    static getCartItemsHTML(cart) {
        return cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.img}" alt="${item.name}" 
                         onerror="this.src='https://via.placeholder.com/100x100/22c55e/ffffff?text=${encodeURIComponent(item.name)}'">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
                    <p class="cart-item-farmer">From our trusted farm partners</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease" aria-label="Decrease quantity">−</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" 
                               aria-label="Quantity of ${item.name}">
                        <button class="quantity-btn increase" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="remove-item-btn" aria-label="Remove ${item.name} from cart">
                        <span class="remove-icon">🗑️</span>
                        Remove
                    </button>
                </div>
                <div class="cart-item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `).join('');
    }

    static updateCartSummary(subtotal) {
        const shipping = 2.99;
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shipping + tax;

        const subtotalEl = DOMUtils.$('#cart-subtotal');
        const shippingEl = DOMUtils.$('#cart-shipping');
        const taxEl = DOMUtils.$('#cart-tax');
        const totalEl = DOMUtils.$('#cart-total');

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }

    static attachCartEventListeners() {
        // Quantity controls
        DOMUtils.$$('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.closest('.cart-item');
                const productId = item.dataset.productId;
                const input = item.querySelector('.quantity-input');
                const newQuantity = Math.max(1, parseInt(input.value) - 1);
                input.value = newQuantity;
                this.updateQuantity(productId, newQuantity);
            });
        });

        DOMUtils.$$('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.closest('.cart-item');
                const productId = item.dataset.productId;
                const input = item.querySelector('.quantity-input');
                const newQuantity = parseInt(input.value) + 1;
                input.value = newQuantity;
                this.updateQuantity(productId, newQuantity);
            });
        });

        // Input changes
        DOMUtils.$$('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const item = e.target.closest('.cart-item');
                const productId = item.dataset.productId;
                const newQuantity = Math.max(1, Math.min(99, parseInt(e.target.value) || 1));
                e.target.value = newQuantity;
                this.updateQuantity(productId, newQuantity);
            });
        });

        // Remove buttons
        DOMUtils.$$('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.closest('.cart-item');
                const productId = item.dataset.productId;
                this.removeItem(productId);
            });
        });
    }
}

// ===== PRODUCT MANAGER =====
class ProductManager {
    static init() {
        // Initialize with premium products if not already set
        const existingProducts = StorageManager.get(CONFIG.PRODUCTS_KEY);
        if (!existingProducts || existingProducts.length === 0) {
            StorageManager.set(CONFIG.PRODUCTS_KEY, PREMIUM_PRODUCTS);
        }
    }

    static getProducts() {
        return StorageManager.get(CONFIG.PRODUCTS_KEY, PREMIUM_PRODUCTS);
    }

    static getProduct(id) {
        return this.getProducts().find(product => product.id === id);
    }

    static renderProductsGrid(containerSelector = '#products-grid') {
        const container = DOMUtils.$(containerSelector);
        if (!container) return;

        const products = this.getProducts();
        
        if (products.length === 0) {
            container.innerHTML = this.getEmptyProductsHTML();
            return;
        }

        // Show loading state
        container.innerHTML = this.getLoadingHTML();
        
        // Simulate loading for better UX
        setTimeout(() => {
            container.innerHTML = products.map(product => this.getProductCardHTML(product)).join('');
            this.attachProductEventListeners();
        }, 600);
    }

    static getProductCardHTML(product) {
        const discount = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        return `
            <article class="product-card" data-product-id="${product.id}" data-aos="fade-up">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                ${discount > 0 ? `<div class="discount-badge">Save ${discount}%</div>` : ''}
                
                <div class="product-image">
                    <img src="${product.img}" alt="${product.name}" 
                         loading="lazy"
                         onerror="this.src='https://via.placeholder.com/400x300/22c55e/ffffff?text=${encodeURIComponent(product.name)}'">
                    <div class="product-overlay">
                        <button class="quick-view-btn" data-product-id="${product.id}">
                            <span class="eye-icon">👁️</span>
                            Quick View
                        </button>
                    </div>
                </div>

                <div class="product-content">
                    <div class="product-header">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-rating">
                            <span class="rating-stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
                            <span class="rating-value">${product.rating}</span>
                            <span class="review-count">(${product.reviewCount})</span>
                        </div>
                    </div>

                    <p class="product-description">${product.desc}</p>

                    <div class="product-features">
                        ${product.features.slice(0, 2).map(feature => `
                            <span class="feature-tag">${feature}</span>
                        `).join('')}
                    </div>

                    <div class="product-meta">
                        <div class="product-pricing">
                            ${product.originalPrice ? `
                                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                            ` : ''}
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                        </div>
                        
                        <div class="product-actions">
                            <button class="btn secondary view-details-btn" data-product-id="${product.id}">
                                <span class="btn-icon">🔍</span>
                                Details
                            </button>
                            <button class="btn primary add-to-cart-btn" data-product-id="${product.id}">
                                <span class="btn-icon">🛒</span>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    <div class="product-footer">
                        <span class="farmer-info">🌱 ${product.farmer}</span>
                    </div>
                </div>
            </article>
        `;
    }

    static getLoadingHTML() {
        return `
            <div class="products-loading">
                <div class="loading-spinner"></div>
                <p>Loading fresh products...</p>
            </div>
        `;
    }

    static getEmptyProductsHTML() {
        return `
            <div class="empty-products-state">
                <div class="empty-icon">🌱</div>
                <h3>Fresh products coming soon!</h3>
                <p>We're preparing our next harvest of delicious, organic products for you.</p>
                <button class="cta-button primary" onclick="location.reload()">
                    Check Again
                </button>
            </div>
        `;
    }

    static attachProductEventListeners() {
        // Add to cart buttons
        DOMUtils.$$('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = btn.dataset.productId;
                const product = this.getProduct(productId);
                if (product) {
                    CartManager.addItem(product, 1);
                }
            });
        });

        // View details buttons
        DOMUtils.$$('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = btn.dataset.productId;
                window.location.href = `product-details.html?id=${productId}`;
            });
        });

        // Quick view buttons
        DOMUtils.$$('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = btn.dataset.productId;
                this.showQuickView(productId);
            });
        });
    }

    static showQuickView(productId) {
        const product = this.getProduct(productId);
        if (!product) return;

        // Create quick view modal
        const modal = DOMUtils.createElement('div', 'quick-view-modal');
        modal.innerHTML = this.getQuickViewHTML(product);
        document.body.appendChild(modal);

        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Animate in
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });

        // Close modal on background click or escape key
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeQuickView(modal);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeQuickView(modal);
            }
        });

        // Add to cart in quick view
        const quickAddBtn = modal.querySelector('.quick-add-to-cart');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', () => {
                CartManager.addItem(product, 1);
                this.closeQuickView(modal);
            });
        }
    }

    static getQuickViewHTML(product) {
        return `
            <div class="quick-view-content">
                <button class="close-quick-view" aria-label="Close quick view">×</button>
                <div class="quick-view-grid">
                    <div class="quick-view-image">
                        <img src="${product.img}" alt="${product.name}">
                    </div>
                    <div class="quick-view-details">
                        <h3>${product.name}</h3>
                        <div class="quick-view-price">$${product.price.toFixed(2)}</div>
                        <p class="quick-view-description">${product.desc}</p>
                        
                        <div class="quick-view-features">
                            ${product.features.map(feature => `
                                <div class="feature-item">
                                    <span class="feature-icon">✅</span>
                                    <span>${feature}</span>
                                </div>
                            `).join('')}
                        </div>

                        <div class="quick-view-actions">
                            <button class="btn primary quick-add-to-cart">
                                <span class="btn-icon">🛒</span>
                                Add to Cart
                            </button>
                            <a href="product-details.html?id=${product.id}" class="btn secondary">
                                View Full Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static closeQuickView(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    static renderProductDetails() {
        const container = DOMUtils.$('#product-detail-root');
        if (!container) return;

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = this.getProduct(productId);

        if (!product) {
            container.innerHTML = this.getProductNotFoundHTML();
            return;
        }

        container.innerHTML = this.getProductDetailHTML(product);
        this.attachProductDetailListeners(product);
    }

    static getProductDetailHTML(product) {
        return `
            <div class="product-detail-container">
                <div class="product-detail-grid">
                    <div class="product-detail-images">
                        <div class="main-image">
                            <img src="${product.img}" alt="${product.name}">
                        </div>
                    </div>

                    <div class="product-detail-info">
                        <nav class="breadcrumb">
                            <a href="index.html">Home</a>
                            <span class="separator">/</span>
                            <a href="products.html">Products</a>
                            <span class="separator">/</span>
                            <span class="current">${product.name}</span>
                        </nav>

                        <h1 class="product-detail-title">${product.name}</h1>
                        
                        <div class="product-detail-rating">
                            <div class="stars">${'⭐'.repeat(5)}</div>
                            <span class="rating">${product.rating}/5</span>
                            <span class="reviews">(${product.reviewCount} reviews)</span>
                        </div>

                        <div class="product-detail-pricing">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            ${product.originalPrice ? `
                                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                                <span class="discount">Save $${(product.originalPrice - product.price).toFixed(2)}</span>
                            ` : ''}
                        </div>

                        <p class="product-detail-description">${product.desc}</p>

                        <div class="product-detail-features">
                            <h4>Why you'll love it:</h4>
                            <div class="features-grid">
                                ${product.features.map(feature => `
                                    <div class="feature">
                                        <span class="feature-icon">✅</span>
                                        <span>${feature}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="product-detail-meta">
                            <div class="meta-item">
                                <span class="meta-label">🌱 Farmer:</span>
                                <span class="meta-value">${product.farmer}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">📦 Delivery:</span>
                                <span class="meta-value">Next day available</span>
                            </div>
                        </div>

                        <div class="product-detail-actions">
                            <div class="quantity-selector">
                                <label for="detail-quantity">Quantity:</label>
                                <div class="quantity-controls">
                                    <button class="qty-btn decrease">−</button>
                                    <input type="number" id="detail-quantity" value="1" min="1" max="10">
                                    <button class="qty-btn increase">+</button>
                                </div>
                            </div>

                            <button class="cta-button primary add-to-cart-detail">
                                <span class="button-icon">🛒</span>
                                Add to Cart - $${product.price.toFixed(2)}
                            </button>
                        </div>

                        <div class="product-guarantee">
                            <div class="guarantee-item">
                                <span class="guarantee-icon">🚚</span>
                                <span>Free delivery on orders over $50</span>
                            </div>
                            <div class="guarantee-item">
                                <span class="guarantee-icon">↩️</span>
                                <span>30-day freshness guarantee</span>
                            </div>
                            <div class="guarantee-item">
                                <span class="guarantee-icon">💝</span>
                                <span>Supporting local farming families</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static attachProductDetailListeners(product) {
        const quantityInput = DOMUtils.$('#detail-quantity');
        const addToCartBtn = DOMUtils.$('.add-to-cart-detail');
        const decreaseBtn = DOMUtils.$('.qty-btn.decrease');
        const increaseBtn = DOMUtils.$('.qty-btn.increase');

        // Quantity controls
        decreaseBtn?.addEventListener('click', () => {
            const current = parseInt(quantityInput.value) || 1;
            quantityInput.value = Math.max(1, current - 1);
            this.updateDetailPrice(product.price, quantityInput.value);
        });

        increaseBtn?.addEventListener('click', () => {
            const current = parseInt(quantityInput.value) || 1;
            quantityInput.value = Math.min(10, current + 1);
            this.updateDetailPrice(product.price, quantityInput.value);
        });

        quantityInput?.addEventListener('change', () => {
            const value = Math.max(1, Math.min(10, parseInt(quantityInput.value) || 1));
            quantityInput.value = value;
            this.updateDetailPrice(product.price, value);
        });

        // Add to cart
        addToCartBtn?.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value) || 1;
            CartManager.addItem(product, quantity);
        });
    }

    static updateDetailPrice(price, quantity) {
        const addToCartBtn = DOMUtils.$('.add-to-cart-detail');
        if (addToCartBtn) {
            const total = price * quantity;
            addToCartBtn.innerHTML = `
                <span class="button-icon">🛒</span>
                Add to Cart - $${total.toFixed(2)}
            `;
        }
    }

    static getProductNotFoundHTML() {
        return `
            <div class="product-not-found">
                <div class="not-found-icon">🔍</div>
                <h2>Product Not Found</h2>
                <p>We couldn't find the product you're looking for. It might be out of season or no longer available.</p>
                <div class="not-found-actions">
                    <a href="products.html" class="cta-button primary">Browse All Products</a>
                    <a href="index.html" class="cta-button secondary">Return Home</a>
                </div>
            </div>
        `;
    }
}

// ===== MOBILE NAVIGATION =====
class MobileNavigation {
    static init() {
        this.setupEventListeners();
    }

    static setupEventListeners() {
        const toggle = DOMUtils.$('.mobile-menu-toggle');
        const nav = DOMUtils.$('.main-navigation');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                this.updateToggleIcon(toggle, nav.classList.contains('active'));
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.main-navigation') && !e.target.closest('.mobile-menu-toggle')) {
                    nav.classList.remove('active');
                    this.updateToggleIcon(toggle, false);
                }
            });

            // Close menu on link click
            nav.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    nav.classList.remove('active');
                    this.updateToggleIcon(toggle, false);
                }
            });
        }
    }

    static updateToggleIcon(toggle, isActive) {
        const bars = toggle.querySelectorAll('.toggle-bar');
        if (isActive) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
}

// ===== CHECKOUT MANAGER =====
class CheckoutManager {
    static init() {
        this.setupEventListeners();
    }

    static setupEventListeners() {
        const checkoutBtn = DOMUtils.$('#checkout-btn');
        const clearCartBtn = DOMUtils.$('#clear-cart-btn');

        checkoutBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.processCheckout();
        });

        clearCartBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.confirmClearCart();
        });
    }

    static processCheckout() {
        const cart = CartManager.getCart();
        
        if (cart.length === 0) {
            ToastManager.show('Your cart is empty! Add some products first.', 'warning');
            return;
        }

        // Show loading state
        const checkoutBtn = DOMUtils.$('#checkout-btn');
        const originalText = checkoutBtn.innerHTML;
        checkoutBtn.innerHTML = `
            <span class="loading-spinner-small"></span>
            Processing your order...
        `;
        checkoutBtn.disabled = true;

        // Simulate order processing
        setTimeout(() => {
            this.completeCheckout();
            checkoutBtn.innerHTML = originalText;
            checkoutBtn.disabled = false;
        }, 2000);
    }

    static completeCheckout() {
        const cart = CartManager.getCart();
        const total = CartManager.getCartTotal();
        
        // Create order summary
        const order = {
            id: 'ORD-' + Date.now(),
            items: cart,
            total: total,
            date: new Date().toISOString(),
            status: 'completed'
        };

        // Show success message
        ToastManager.show(
            `🎉 Order successful! Thank you for your purchase of $${total.toFixed(2)}.`,
            'success',
            5000
        );

        // Clear cart
        CartManager.clearCart();

        // Redirect to thank you page after delay
        setTimeout(() => {
            window.location.href = 'order-success.html';
        }, 3000);
    }

    static confirmClearCart() {
        const cart = CartManager.getCart();
        
        if (cart.length === 0) {
            ToastManager.show('Your cart is already empty!', 'info');
            return;
        }

        if (confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
            CartManager.clearCart();
        }
    }
}

// ===== APPLICATION INITIALIZATION =====
class FreshEatApp {
    static init() {
        console.log(`
            🍎 FreshEat E-commerce Platform
            Version: ${CONFIG.APP_VERSION}
            Developed with ❤️ by Nagaty Ayman
            Mansoura University Computer Science Project
        `);

        // Initialize core systems
        this.initializeCore();
        
        // Setup page-specific functionality
        this.initializePage();

        // Setup global event listeners
        this.setupGlobalListeners();

        console.log('✅ FreshEat application initialized successfully');
    }

    static initializeCore() {
        // Initialize storage with default data
        ProductManager.init();
        
        // Initialize theme system
        ThemeManager.init();
        
        // Initialize mobile navigation
        MobileNavigation.init();
        
        // Initialize cart UI
        CartManager.updateCartUI();
    }

    static initializePage() {
        const path = window.location.pathname;
        
        if (path.includes('products.html') || DOMUtils.$('#products-grid')) {
            ProductManager.renderProductsGrid();
        } else if (path.includes('product-details.html') || DOMUtils.$('#product-detail-root')) {
            ProductManager.renderProductDetails();
        } else if (path.includes('cart.html') || DOMUtils.$('#cart-root')) {
            CartManager.renderCartPage();
            CheckoutManager.init();
        } else if (path.includes('index.html') || path === '/') {
            this.initializeHomepage();
        }
    }

    static initializeHomepage() {
        // Render featured products
        this.renderFeaturedProducts();
        
        // Initialize any homepage-specific functionality
        console.log('🏠 Homepage initialized');
    }

    static renderFeaturedProducts() {
        const container = DOMUtils.$('#featured-products');
        if (!container) return;

        const featuredProducts = ProductManager.getProducts().slice(0, 6);
        container.innerHTML = featuredProducts.map(product => 
            ProductManager.getProductCardHTML(product)
        ).join('');

        ProductManager.attachProductEventListeners();
    }

    static setupGlobalListeners() {
        // Handle cart updates from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === CONFIG.CART_KEY) {
                CartManager.updateCartUI();
            }
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            ToastManager.show('Connection restored!', 'success');
        });

        window.addEventListener('offline', () => {
            ToastManager.show('You are currently offline. Some features may be limited.', 'warning');
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                CartManager.updateCartUI();
            }
        });
    }
}

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    ToastManager.show('Something went wrong. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    ToastManager.show('A system error occurred. We\'re working on it!', 'error');
    e.preventDefault();
});

// ===== SERVICE WORKER REGISTRATION (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== START APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    FreshEatApp.init();
});

// Make core functions globally available for HTML attributes
window.addToCart = (productId, quantity = 1) => {
    const product = ProductManager.getProduct(productId);
    if (product) {
        CartManager.addItem(product, quantity);
    }
};

window.showQuickView = (productId) => {
    ProductManager.showQuickView(productId);
};