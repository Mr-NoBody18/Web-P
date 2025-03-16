// Filter dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.getElementById('filterBtn');
    const filterDropdown = document.getElementById('filterDropdown');
    
    // Toggle filter dropdown
    filterBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        filterDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
            filterDropdown.classList.remove('active');
        }
    });
    
    // Sorting buttons functionality
    const sortBtns = document.querySelectorAll('.sort-btn');
    sortBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            sortBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would add logic to sort the content
            // For example:
            // const sortType = this.textContent.trim();
            // sortContent(sortType);
        });
    });
    
    // Animation for cards when scrolling into view
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.classList.add('animate');
            }
        });
    };
    
    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Load more functionality (simulated)
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Here you would add logic to load more content
            // For this example, we'll just show an alert
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yükleniyor...';
            
            // Simulate loading delay
            setTimeout(() => {
                this.innerHTML = 'Daha Fazla Yükle';
                alert('Bu özellik demo sürümünde aktif değildir.');
            }, 1500);
        });
    }
});