// Order Online Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initMenuFilters();
    initAddToCart();
    initCartSidebar();
    initSmoothScrolling();
    initScrollAnimations();
});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger-lines');
    const menuItems = document.querySelector('.menu-items');
    const menuLinks = document.querySelectorAll('.menu-items a');

    if (hamburger && menuItems) {
        hamburger.addEventListener('click', function() {
            // Toggle menu
            menuItems.classList.toggle('active');
            
            // Animate hamburger lines
            const lines = this.querySelectorAll('.line');
            lines.forEach((line, index) => {
                if (menuItems.classList.contains('active')) {
                    if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) line.style.opacity = '0';
                    if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                }
            });
        });

        // Close menu when clicking on a link
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuItems.classList.remove('active');
                // Reset hamburger lines
                const lines = hamburger.querySelectorAll('.line');
                lines.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !menuItems.contains(e.target)) {
                menuItems.classList.remove('active');
                const lines = hamburger.querySelectorAll('.line');
                lines.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            }
        });
    }
}

// Menu Filter Switching
function initMenuFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter menu items
            filterMenuItems(filter);
        });
    });

    // Activate the first filter by default
    if (filterButtons.length > 0) {
        // Set the first button as active and show all items
        filterButtons[0].classList.add('active');
        showAllMenuItems();
    }
}

function filterMenuItems(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        } else {
            item.style.display = 'none';
        }
    });
}

function showAllMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
}

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }
    saveCart();
    updateCartDisplay();
    updateCartSidebar();
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    saveCart();
    updateCartDisplay();
    updateCartSidebar();
}

function updateQuantity(itemName, newQuantity) {
    const item = cart.find(cartItem => cartItem.name === itemName);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemName);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartDisplay();
            updateCartSidebar();
        }
    }
}

function updateCartDisplay() {
    const cartCountElement = document.querySelector('#cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #28a745;' : 
          type === 'error' ? 'background: #dc3545;' : 'background: #17a2b8;'}
    `;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function initAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const itemName = this.getAttribute('data-name');
            const itemPrice = this.getAttribute('data-price');
            const itemImage = this.getAttribute('data-image');

            addToCart({ 
                name: itemName, 
                price: itemPrice, 
                image: itemImage, 
                quantity: 1 
            });
            
            showNotification(`${itemName} added to cart!`, 'success');

            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Cart Sidebar Management
function initCartSidebar() {
    const cartToggle = document.querySelector('#cart-toggle');
    const cartSidebar = document.querySelector('#cart-section');
    const closeCart = document.querySelector('#close-cart');
    
    console.log('Cart elements found:', { cartToggle, cartSidebar, closeCart });
    
    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', function() {
            console.log('Cart toggle clicked!');
            cartSidebar.classList.add('open');
            console.log('Cart sidebar classes:', cartSidebar.className);
        });
    } else {
        console.error('Cart elements not found:', { cartToggle, cartSidebar });
    }
    
    if (closeCart && cartSidebar) {
        closeCart.addEventListener('click', function() {
            console.log('Close cart clicked!');
            cartSidebar.classList.remove('open');
        });
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (cartSidebar && !cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
            cartSidebar.classList.remove('open');
        }
    });

    updateCartSidebar();
}

function updateCartSidebar() {
    const cartItems = document.querySelector('#cart-items');
    const cartTotal = document.querySelector('#cart-total');
    
    if (!cartItems) return;

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: var(--spacing-lg);">Your cart is empty</p>';
        if (cartTotal) cartTotal.textContent = '₹0.00';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image || '../images/placeholder.jpg'}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-name="${item.name}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-name="${item.name}">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    // Add event listeners to quantity buttons
    cartItems.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const item = cart.find(cartItem => cartItem.name === itemName);
            if (item) {
                if (this.classList.contains('minus')) {
                    updateQuantity(itemName, item.quantity - 1);
                } else if (this.classList.contains('plus')) {
                    updateQuantity(itemName, item.quantity + 1);
                }
            }
        });
    });

    // Update total
    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('₹', ''));
        return sum + (price * item.quantity);
    }, 0);

    if (cartTotal) cartTotal.textContent = `₹${total.toFixed(2)}`;
}

// Checkout functionality
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    showNotification('Proceeding to checkout...', 'info');
    console.log('Checkout with items:', cart);
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.intro-content, .feature, .section-heading, .menu-item, .order-step, .contact-content');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });
}
