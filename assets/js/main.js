// DOM elements
const themeToggle = document.getElementById("themeToggle");
const portfolioToggle = document.getElementById("portfolioToggle");
const portfolioSectionTitle = document.getElementById("portfolioSectionTitle");
const categoryFilters = document.getElementById("categoryFilters");
const shopContainer = document.getElementById("shopContainer");
const blogContainer = document.getElementById("blogContainer");
const contactModal = document.getElementById("contactModal");
const modalOverlay = contactModal?.querySelector(".modal-overlay");
const modalContainer = contactModal?.querySelector(".modal-container");
const modalClose = document.getElementById("modalClose");
const cancelButton = document.getElementById("cancelButton");
const contactForm = document.getElementById("contactForm");

// State variables
let isShopMode = false;
let activeFilter = 'All';

// Theme toggle
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    const icon = themeToggle.querySelector(".theme-icon");
    if (document.body.classList.contains("light-mode")) {
      icon?.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "light");
    } else {
      icon?.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "dark");
    }
    updateModalTheme();
  });
}

// Check saved theme preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.remove("light-mode");
  document.body.classList.add("dark-mode");
  themeToggle?.querySelector(".theme-icon")?.classList.replace("fa-sun", "fa-moon");
}

// Update modal theme based on current theme
function updateModalTheme() {
  const modals = document.querySelectorAll('.modal-container');
  modals.forEach(modal => {
    if (document.body.classList.contains("light-mode")) {
      modal.classList.add('light-mode');
      modal.classList.remove('dark-mode');
    } else {
      modal.classList.add('dark-mode');
      modal.classList.remove('light-mode');
    }
  });
}

// Update section title based on mode
function updateSectionTitle(isShopMode) {
  if (!portfolioSectionTitle) return;
  
  portfolioSectionTitle.style.opacity = '0.5';
  setTimeout(() => {
    portfolioSectionTitle.textContent = isShopMode ? 'Shop' : 'Blog';
    portfolioSectionTitle.style.opacity = '1';
  }, 150);
}

// Filter cards by category
function filterCards(category) {
  activeFilter = category;
  updateCategoryFilters();
  updatePortfolioCards();
}

// Update category filters
function updateCategoryFilters() {
  if (!categoryFilters) return;
  
  const categoryButtons = categoryFilters.querySelectorAll('.category-filter');
  categoryButtons.forEach(button => {
    if (button.dataset.category === activeFilter) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Enhanced lazy loading with Intersection Observer
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy-img');
  if (!lazyImages.length) return;

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.onload = () => {
              img.classList.add('loaded');
              img.removeAttribute('data-src');
              img.parentElement?.classList.remove('image-loading');
            };
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
      threshold: 0.01
    });
    
    lazyImages.forEach(img => {
      if (img.classList.contains('loaded') || !img.dataset.src) return;
      if (!img.parentElement?.classList.contains('image-loading')) {
        img.parentElement?.classList.add('image-loading');
      }
      imageObserver.observe(img);
    });
  } else {
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
        img.removeAttribute('data-src');
        img.parentElement?.classList.remove('image-loading');
      }
    });
  }
}

// Update portfolio cards
function updatePortfolioCards() {
  if (!shopContainer || !blogContainer) return;

  const allShopCards = document.querySelectorAll('#shopContainer .shop-card');
  const allBlogCards = document.querySelectorAll('#blogContainer .blog-card');

  shopContainer.style.opacity = '0.3';
  blogContainer.style.opacity = '0.3';

  setTimeout(() => {
    if (isShopMode) {
      allShopCards.forEach(card => {
        const categories = card.dataset.category?.split(',') || [];
        if (activeFilter === 'All' || categories.includes(activeFilter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      shopContainer.classList.remove('hidden');
      blogContainer.classList.add('hidden');
    } else {
      allBlogCards.forEach(card => {
        const categories = card.dataset.category?.split(',') || [];
        if (activeFilter === 'All' || categories.includes(activeFilter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      blogContainer.classList.remove('hidden');
      shopContainer.classList.add('hidden');
    }

    shopContainer.style.opacity = '1';
    blogContainer.style.opacity = '1';

    initLazyLoading();
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }, 150);
}

// Switch portfolio mode
function switchPortfolioMode(isShop) {
  isShopMode = isShop;
  activeFilter = 'All';
  updateSectionTitle(isShopMode);
  updateCategoryFilters();
  updatePortfolioCards();
}

// Portfolio toggle event listener
if (portfolioToggle) {
  portfolioToggle.addEventListener("click", () => {
    isShopMode = !isShopMode;
    const slider = portfolioToggle.querySelector(".portfolio-toggle-slider");
    if (slider) {
      slider.style.transform = isShopMode ? "translateX(32px)" : "translateX(0)";
    }
    portfolioToggle.setAttribute("aria-checked", isShopMode ? "true" : "false");

    switchPortfolioMode(isShopMode);
    localStorage.setItem("portfolioView", isShopMode ? "shop" : "blog");
  });
}

// Contact Modal Functions
function openModal() {
  if (!contactModal || !modalContainer) return;
  
  document.body.style.overflow = 'hidden';
  contactModal.classList.remove('hidden');
  setTimeout(() => {
    modalContainer.classList.add('active');
  }, 10);
}

function closeModal() {
  if (!contactModal || !modalContainer) return;
  
  modalContainer.classList.remove('active');
  setTimeout(() => {
    contactModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 300);
}

// Event listeners for contact buttons
document.querySelectorAll('[data-section="contact"]').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
});

// Close modal events
modalOverlay?.addEventListener('click', closeModal);
modalClose?.addEventListener('click', closeModal);
cancelButton?.addEventListener('click', closeModal);

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.textContent;
    
    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        submitButton.classList.add('opacity-75');
      }
      
      // Simulate API call (replace with actual form submission)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      showAlert('success', 'Message sent successfully!');
      contactForm.reset();
      closeModal();
    } catch (error) {
      // Show error message
      showAlert('error', 'Error sending message. Please try again.');
      console.error('Error:', error);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        submitButton.classList.remove('opacity-75');
      }
    }
  });
}

// Shop Modal Functions
function openShopModal(item) {
  const modal = document.getElementById('shopModal');
  if (!modal) return;

  const modalImage = document.getElementById('shopModalImage');
  const modalItemTitle = document.getElementById('shopModalItemTitle');
  const modalPrice = document.getElementById('shopModalPrice');
  const modalOriginalPrice = document.getElementById('shopModalOriginalPrice');
  const modalDescription = document.getElementById('shopModalDescription');
  const modalCategory = document.querySelector('.shop-modal-category');
  const stripeLink = document.getElementById('shopModalStripeLink');

  // Reset image loading state
  modalImage?.parentElement?.classList.add('image-loading');
  modalImage?.classList.remove('loaded');
  
  // Set modal content
  if (modalImage) modalImage.src = item.image;
  if (modalImage) modalImage.alt = item.title;
  if (modalItemTitle) modalItemTitle.textContent = item.title;
  if (modalPrice) modalPrice.textContent = item.price;
  if (modalOriginalPrice) modalOriginalPrice.textContent = item.original_price;
  if (modalDescription) modalDescription.textContent = item.description;
  if (modalCategory) modalCategory.textContent = item.category;
  if (stripeLink) stripeLink.href = item.stripe_link;

  // When image loads
  if (modalImage) {
    modalImage.onload = function() {
      modalImage.classList.add('loaded');
      modalImage.parentElement?.classList.remove('image-loading');
    };
    modalImage.onerror = function() {
      modalImage.parentElement?.classList.remove('image-loading');
    };
  }

  // Show modal
  document.body.style.overflow = 'hidden';
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.querySelector('.modal-container')?.classList.add('active');
  }, 10);
}

function closeShopModal() {
  const modal = document.getElementById('shopModal');
  if (!modal) return;

  modal.querySelector('.modal-container')?.classList.remove('active');
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 300);
}

// Show alert message
function showAlert(type, message) {
  const alert = document.createElement('div');
  alert.className = `alert-message alert-${type} flex items-center`;
  alert.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(alert);
  
  // Remove after delay
  setTimeout(() => {
    alert.style.opacity = '0';
    alert.style.transform = 'translateY(-20px)';
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}

// Initialize shop item click handlers
function initShopItemHandlers() {
  document.querySelectorAll('.shop-info-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const item = {
        image: button.dataset.image,
        title: button.dataset.title,
        price: button.dataset.price,
        original_price: button.dataset.originalPrice || '',
        description: button.dataset.description,
        category: button.dataset.category,
        stripe_link: button.dataset.stripeLink
      };
      openShopModal(item);
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.scrollBehavior = 'smooth';
  updateCategoryFilters();
  updatePortfolioCards(); // Initial call to display correct section
  initShopItemHandlers(); // Initialize shop item click handlers

  if (localStorage.getItem('portfolioView') === 'shop') {
    // Simulate click if last view was shop
    const slider = portfolioToggle?.querySelector(".portfolio-toggle-slider");
    if (slider) {
      slider.style.transform = "translateX(32px)";
    }
    portfolioToggle?.setAttribute("aria-checked", "true");
    isShopMode = true;
    updateSectionTitle(isShopMode);
    updatePortfolioCards();
  }

  updateModalTheme();

  // Shop modal close button
  document.querySelector('.shop-modal-close')?.addEventListener('click', closeShopModal);
  document.getElementById('shopModal')?.querySelector('.modal-overlay')?.addEventListener('click', closeShopModal);

  // Lazy loading for images
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy-img"));
  
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src || lazyImage.src;
          lazyImage.classList.remove("lazy-img");
          lazyImage.classList.add("loaded");
          lazyImageObserver.unobserve(lazyImage);
          
          // Remove loading animation
          const loadingContainer = lazyImage.closest('.image-loading');
          if (loadingContainer) {
            loadingContainer.classList.remove('image-loading');
          }
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
  
  // Smooth scroll for anchor links in post content
  document.querySelectorAll('.prose a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Expose filterCards to global scope
window.filterCards = filterCards;
