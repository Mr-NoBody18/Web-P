// Hikaye Detay Sayfası JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Görsel galerisi için animasyon efektleri
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.5s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });
    
    // Yorum gönderme işlevi
    const commentForm = document.querySelector('.comment-form');
    const commentTextarea = commentForm.querySelector('textarea');
    const commentButton = commentForm.querySelector('.btn-comment');
    const commentsList = document.querySelector('.comments-list');
    const commentCount = document.querySelector('.comment-count');
    
    commentButton.addEventListener('click', function() {
        const commentText = commentTextarea.value.trim();
        
        if (commentText !== '') {
            // Yeni yorum oluştur
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            
            const date = new Date();
            const formattedDate = 'Az önce';
            
            newComment.innerHTML = `
                <img src="images/profile-default.jpg" alt="Kullanıcı" class="comment-avatar">
                <div class="comment-content">
                    <div class="comment-header">
                        <h4>Misafir</h4>
                        <span class="comment-date">${formattedDate}</span>
                    </div>
                    <p>${commentText}</p>
                    <div class="comment-actions">
                        <span><i class="fas fa-heart"></i> 0</span>
                        <span><i class="fas fa-reply"></i> Yanıtla</span>
                    </div>
                </div>
            `;
            
            // Yorum listesinin başına ekle
            commentsList.insertBefore(newComment, commentsList.firstChild);
            
            // Yorum sayısını güncelle
            const currentCount = parseInt(commentCount.textContent.replace(/[^0-9]/g, ''));
            commentCount.textContent = `(${currentCount + 1})`;
            
            // Yorum formunu temizle
            commentTextarea.value = '';
            
            // Yeni yorum animasyonu
            newComment.style.animation = 'fadeIn 0.5s ease';
        }
    });
    
    // Beğeni işlevi
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-heart') || e.target.parentElement.classList.contains('fa-heart')) {
            const likeElement = e.target.closest('span');
            if (likeElement) {
                const likeCount = likeElement.textContent.replace(/[^0-9]/g, '');
                let newCount = parseInt(likeCount) + 1;
                likeElement.innerHTML = `<i class="fas fa-heart" style="color: #ff6b6b;"></i> ${newCount}`;
                
                // Beğeni animasyonu
                const heart = likeElement.querySelector('.fa-heart');
                heart.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    heart.style.animation = '';
                }, 500);
            }
        }
    });
    
    // İlgili hikayeler için hover efekti
    const relatedStories = document.querySelectorAll('.related-story');
    
    relatedStories.forEach(story => {
        story.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        story.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Sayfa kaydırma animasyonu
    const storyElements = document.querySelectorAll('.story-text h2, .story-quote, .image-gallery, .story-facts');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    storyElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    // CSS sınıfı ekleme
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
    
    // Etiketler için hover efekti
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 3px 8px rgba(255, 107, 107, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Sayfa yüklendiğinde başlık animasyonu
    const storyHeader = document.querySelector('.story-header-content');
    if (storyHeader) {
        setTimeout(() => {
            storyHeader.style.opacity = '0';
            storyHeader.style.transform = 'translateY(20px)';
            storyHeader.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                storyHeader.style.opacity = '1';
                storyHeader.style.transform = 'translateY(0)';
            }, 100);
        }, 300);
    }
});

// Sayfa kaydırıldığında animasyon için CSS keyframes ekleme
if (!document.getElementById('animationStyles')) {
    const style = document.createElement('style');
    style.id = 'animationStyles';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}