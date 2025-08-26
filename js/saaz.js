// Saaz Page JavaScript - Beverages & Drinks

document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initMenuCategories();
    initAddToCart();
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

// Menu Category Switching
function initMenuCategories() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');

            // Remove active class from all tabs and categories
            categoryTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));

            // Add active class to the clicked tab and target category
            this.classList.add('active');
            const targetElement = document.getElementById(targetCategory);
            if (targetElement) {
                targetElement.classList.add('active');

                // Staggered animation for menu items in the active category
                const menuItems = targetElement.querySelectorAll('.menu-item');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s ease-out';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100); // Stagger by 100ms
                });
            }
        });
    });

    // Activate the first category by default
    if (categoryTabs.length > 0) {
        categoryTabs[0].click();
    }
}

// Add to Cart Functionality
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
}

function updateCartDisplay() {
    // This function would typically update a cart icon or sidebar
    // For now, we'll just log to console and show a notification
    console.log('Current Cart:', cart);
    // Example: update a cart count element
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10); // Small delay to trigger transition

    setTimeout(() => {
        notification.classList.remove('show');
        notification.addEventListener('transitionend', () => notification.remove());
    }, 3000);
}

function initAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = menuItem.querySelector('.price').textContent;
            const itemImage = menuItem.querySelector('img')?.src || ''; // Get image source if available

            addToCart({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
            showNotification(`${itemName} added to cart!`, 'success');

            // Simple button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    updateCartDisplay(); // Initialize cart display on load
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Scroll Animations (using Intersection Observer)
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.intro-content, .feature, .section-header, .menu-item, .special-item, .accompaniment-item, .contact-content');

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
