document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü için gerekli işlemler - script.js'den alındı
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.position = 'absolute';
                navLinks.style.top = '60px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.flexDirection = 'column';
                navLinks.style.backgroundColor = 'var(--glass-bg)';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.padding = '20px';
                navLinks.style.zIndex = '99';
                navLinks.style.borderBottom = '1px solid var(--glass-border)';
            } else {
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.width = '';
                navLinks.style.flexDirection = '';
                navLinks.style.backgroundColor = '';
                navLinks.style.backdropFilter = '';
                navLinks.style.padding = '';
                navLinks.style.zIndex = '';
                navLinks.style.borderBottom = '';
            }
        });
    }
    
    // Yorum gönderme işlevi
    const commentForm = document.querySelector('.comment-form');
    const commentInput = document.querySelector('.comment-input');
    const commentList = document.querySelector('.comment-list');
    
    if (commentForm && commentInput && commentList) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (commentInput.value.trim() === '') {
                return;
            }
            
            // Yeni yorum oluşturma
            const newComment = document.createElement('div');
            newComment.className = 'comment-item';
            
            const now = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = now.toLocaleDateString('tr-TR', options);
            
            newComment.innerHTML = `
                <div class="comment-header">
                    <div class="comment-author">
                        <div class="comment-avatar"></div>
                        <span class="comment-name">Misafir Kullanıcı</span>
                    </div>
                    <div class="comment-date">${formattedDate}</div>
                </div>
                <div class="comment-text">${commentInput.value}</div>
            `;
            
            // Yorumu listeye ekleme
            commentList.prepend(newComment);
            
            // Formu temizleme
            commentInput.value = '';
            
            // Animasyon efekti
            newComment.style.opacity = '0';
            newComment.style.transform = 'translateY(-10px)';
            newComment.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                newComment.style.opacity = '1';
                newComment.style.transform = 'translateY(0)';
            }, 10);
        });
    }
    
    // Paylaşım butonları için işlevler
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            const storyUrl = window.location.href;
            const storyTitle = document.querySelector('.story-title').textContent;
            
            let shareUrl = '';
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(storyUrl)}&text=${encodeURIComponent(storyTitle)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storyUrl)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(storyTitle + ' ' + storyUrl)}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(storyUrl).then(() => {
                        alert('Bağlantı panoya kopyalandı!');
                    });
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // Beğenme ve kaydetme butonları için işlevler
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            if (action === 'like') {
                this.classList.toggle('liked');
                if (this.classList.contains('liked')) {
                    this.style.color = 'var(--accent-red)';
                    this.innerHTML = '❤️ Beğenildi';
                } else {
                    this.style.color = 'var(--text-secondary)';
                    this.innerHTML = '🤍 Beğen';
                }
            } else if (action === 'save') {
                this.classList.toggle('saved');
                if (this.classList.contains('saved')) {
                    this.style.color = 'var(--accent-orange)';
                    this.innerHTML = '📑 Kaydedildi';
                } else {
                    this.style.color = 'var(--text-secondary)';
                    this.innerHTML = '📄 Kaydet';
                }
            }
        });
    });
    
    // Arama çubuğu işlevselliği
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.1)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert(`"${this.value}" için arama sonuçları yakında gösterilecek!`);
            }
        });
    }
    
    // Dairesel menü işlevselliği
    const userProfile = document.querySelector('.user-profile');
    const circularMenu = document.querySelector('.circular-menu');
    
    if (userProfile && circularMenu) {
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation(); // Tıklama olayının yayılmasını engelle
            circularMenu.classList.toggle('active');
            
            // Profil resmi tıklandığında animasyon efekti
            if (circularMenu.classList.contains('active')) {
                userProfile.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    userProfile.style.transform = 'scale(1)';
                }, 300);
            }
        });
        
        // Dairesel menü öğelerine tıklama olayları
        const menuItems = document.querySelectorAll('.circular-menu-item');
        menuItems.forEach((item, index) => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Menü öğesine tıklandığında animasyon efekti
                this.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    this.style.transform = '';
                    circularMenu.classList.remove('active');
                    
                    // Bildirim öğesi
                    if (index === 0) {
                        alert('Bildirimleriniz gösteriliyor!');
                    }
                    // Hikaye paylaşma öğesi
                    else if (index === 1) {
                        window.location.href = 'submit.html';
                    }
                }, 300);
            });
        });
        
        // Sayfa herhangi bir yerine tıklandığında menüyü kapat
        document.addEventListener('click', function() {
            circularMenu.classList.remove('active');
        });
    }
});