document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü için gerekli işlemler
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuButton && navLinks) {
        // Mobil menü için CSS sınıfı ekleyelim
        navLinks.classList.add('nav-links-mobile');
        
        mobileMenuButton.addEventListener('click', function() {
            // Toggle sınıfı ile menüyü açıp kapatalım
            navLinks.classList.toggle('nav-active');
            mobileMenuButton.classList.toggle('menu-active');
            
            // Menü açıkken sayfanın kaydırılmasını engelleyelim
            if (navLinks.classList.contains('nav-active')) {
                body.style.overflow = 'hidden';
                // Menü açık olduğunda butonun içeriğini değiştirelim
                mobileMenuButton.textContent = '✕';
            } else {
                body.style.overflow = '';
                // Menü kapalı olduğunda butonun içeriğini geri alalım
                mobileMenuButton.textContent = '☰';
            }
        });
        
        // Menü linklerine tıklandığında menüyü kapatalım
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('nav-active');
                mobileMenuButton.classList.remove('menu-active');
                body.style.overflow = '';
                mobileMenuButton.textContent = '☰';
            });
        });
    }
    
    // Kategori filtreleme işlevselliği
    const filterButtons = document.querySelectorAll('.filter-button');
    const sortButtons = document.querySelectorAll('.sort-button');
    const contentCards = document.querySelectorAll('.content-card');
    
    // Aktif filtreleme butonunu değiştirme
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktif sınıfını kaldır
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tıklanan butona aktif sınıfını ekle
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('data-category');
            
            // Kartları filtrele
            contentCards.forEach(card => {
                if (selectedCategory === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === selectedCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Sıralama işlevselliği
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktif sınıfını kaldır
            sortButtons.forEach(btn => btn.classList.remove('active'));
            // Tıklanan butona aktif sınıfını ekle
            this.classList.add('active');
            
            const sortType = this.getAttribute('data-sort');
            const cardsArray = Array.from(contentCards);
            
            // Sıralama fonksiyonu
            cardsArray.sort((a, b) => {
                const aViews = parseInt(a.querySelector('.card-stats span:first-child').textContent.replace(/[^0-9.]/g, ''));
                const bViews = parseInt(b.querySelector('.card-stats span:first-child').textContent.replace(/[^0-9.]/g, ''));
                
                const aDate = new Date(a.querySelector('.card-date').textContent);
                const bDate = new Date(b.querySelector('.card-date').textContent);
                
                if (sortType === 'popular') {
                    return bViews - aViews; // En popülerden en az popülere
                } else if (sortType === 'newest') {
                    return bDate - aDate; // En yeniden en eskiye
                } else if (sortType === 'oldest') {
                    return aDate - bDate; // En eskiden en yeniye
                }
            });
            
            // Sıralanmış kartları DOM'a yerleştir
            const cardGrid = document.querySelector('.card-grid');
            cardsArray.forEach(card => {
                cardGrid.appendChild(card);
            });
        });
    });
    
    // Kartlar için hover efektleri ve tıklama olayları
    contentCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            // Hikaye detay sayfasına yönlendirme
            window.location.href = 'story.html';
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = `0 15px 30px rgba(0, 0, 0, 0.4)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = `0 10px 20px rgba(0, 0, 0, 0.3)`;
        });
    });
    
    // Arama çubuğu işlevselliği
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (searchInput && searchButton) {
        // Arama kutusuna odaklandığında stil değişikliği
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 10px rgba(255, 77, 77, 0.3)';
        });
        
        // Arama kutusundan çıkıldığında stil değişikliği
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
        
        // Arama fonksiyonu
        const performSearch = function() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Arama terimi boşsa tüm kartları göster
                contentCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            // Arama sonuçlarını sayacak değişken
            let resultsFound = 0;
            
            // Kartları filtrele
            contentCards.forEach(card => {
                const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
                const cardDescription = card.querySelector('.card-description').textContent.toLowerCase();
                const cardCategory = card.querySelector('.card-category').textContent.toLowerCase();
                
                // Başlık, açıklama veya kategoride arama terimini içeriyorsa göster
                if (cardTitle.includes(searchTerm) || 
                    cardDescription.includes(searchTerm) || 
                    cardCategory.includes(searchTerm)) {
                    card.style.display = 'block';
                    resultsFound++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Arama sonuçlarını göster
            if (resultsFound === 0) {
                // Sonuç bulunamadıysa kullanıcıya bildir
                alert('Aramanızla eşleşen hikaye bulunamadı.');
            }
        };
        
        // Enter tuşuna basıldığında arama yap
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Arama butonuna tıklandığında arama yap
        searchButton.addEventListener('click', function() {
            performSearch();
        });
    }
});