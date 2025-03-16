// Navbar scroll effect (copied from main script.js for completeness)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle (copied from main script.js for completeness)
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.menu-toggle')) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Lütfen tüm gerekli alanları doldurun.', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormMessage('Lütfen geçerli bir email adresi girin.', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('Mesajınız gönderiliyor...', 'info');
            
            // Here you would normally send the data to a server
            // Instead, we'll simulate a successful submission after a short delay
            setTimeout(function() {
                contactForm.reset();
                showFormMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
            }, 1500);
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show form messages
    function showFormMessage(message, type) {
        formMessage.innerHTML = message;
        formMessage.className = 'form-message';
        
        if (type) {
            formMessage.classList.add(type);
        }
        
        // Auto-hide error messages after 5 seconds
        if (type === 'error') {
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Animation effect for form elements
    const formElements = document.querySelectorAll('.form-group, .btn-submit');
    
    formElements.forEach((element, index) => {
        // Add a slight delay to each element for a staggered effect
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
    
    // Info items animation
    const infoItems = document.querySelectorAll('.info-item, .social-media');
    
    infoItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 150);
    });
});