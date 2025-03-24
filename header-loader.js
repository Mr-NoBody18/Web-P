// Header Loader - Modüler navigasyon barını tüm sayfalara yükler
document.addEventListener('DOMContentLoaded', function() {
    // Header içeriğini yükle
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Header yüklenemedi');
            }
            return response.text();
        })
        .then(data => {
            // Header içeriğini sayfaya ekle
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                
                // Mobil navigasyon script'ini yükle
                const mobileNavScript = document.createElement('script');
                mobileNavScript.src = 'mobile-nav.js';
                document.body.appendChild(mobileNavScript);
            } else {
                console.error('Header placeholder bulunamadı');
            }
        })
        .catch(error => {
            console.error('Header yüklenirken hata oluştu:', error);
        });
    // Sayfa yüklendiğinde aktif sayfayı belirle
    setTimeout(() => {
        const currentPage = window.location.pathname.split('/').pop();
        const navItems = document.querySelectorAll('.nav-links a');
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                item.classList.add('active');
            }
        });
    }, 100); // Header yüklendikten sonra çalışması için kısa bir gecikme
});