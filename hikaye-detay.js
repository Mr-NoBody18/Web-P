// Hikaye detay sayfası için JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Yorumlar bölümü işlevselliği
    const commentForm = document.querySelector('.comment-input-container');
    const commentTextarea = commentForm.querySelector('textarea');
    const commentButton = commentForm.querySelector('.btn-comment');
    const commentsList = document.querySelector('.comments-list');
    
    if (commentButton) {
        commentButton.addEventListener('click', function() {
            const commentText = commentTextarea.value.trim();
            if (commentText) {
                // Yeni yorum oluştur
                const newComment = document.createElement('div');
                newComment.classList.add('comment');
                newComment.innerHTML = `
                    <img src="images/profile-default.jpg" alt="Profil Fotoğrafı" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-header">
                            <h4>Misafir</h4>
                            <span class="comment-date">Şimdi</span>
                        </div>
                        <p>${commentText}</p>
                        <div class="comment-actions">
                            <span><i class="fas fa-heart"></i> 0</span>
                            <span><i class="fas fa-reply"></i> Yanıtla</span>
                        </div>
                    </div>
                `;
                
                // Yorumu listeye ekle
                commentsList.prepend(newComment);
                
                // Yorum sayısını güncelle
                updateCommentCount();
                
                // Formu temizle
                commentTextarea.value = '';
            }
        });
    }
    
    // Beğeni butonları için işlevsellik
    document.querySelectorAll('.comment-actions span:first-child').forEach(likeButton => {
        likeButton.addEventListener('click', function() {
            const likeCount = this.querySelector('i').nextSibling;
            let count = parseInt(likeCount.textContent);
            count++;
            likeCount.textContent = ` ${count}`;
        });
    });
    
    // Yorum sayacını güncelleme fonksiyonu
    function updateCommentCount() {
        const commentCount = document.querySelector('.comment-count');
        const totalComments = document.querySelectorAll('.comment').length;
        commentCount.textContent = `(${totalComments})`;
    }
    
    // Hikaye görselleri için lightbox efekti
    const storyImages = document.querySelectorAll('.featured-image img, .gallery-item img');
    
    storyImages.forEach(image => {
        image.addEventListener('click', function() {
            // Lightbox elemanını oluştur
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                    <p class="lightbox-caption">${this.alt}</p>
                </div>
            `;
            
            // Lightbox'ı body'e ekle
            document.body.appendChild(lightbox);
            
            // Body'nin scroll'unu devre dışı bırak
            document.body.style.overflow = 'hidden';
            
            // Lightbox'ı göster
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Lightbox'ı kapatma fonksiyonu
            const closeLightbox = function() {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }, 300);
            };
            
            // Çarpı butonuna tıklama olayı
            lightbox.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
            
            // Lightbox'ın dışına tıklama olayı
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // ESC tuşuna basma olayı
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        });
    });
    
    // Benzer hikayeler ve kategori öğeleri için tıklama olayları
    const relatedStories = document.querySelectorAll('.related-story');
    const categoryItems = document.querySelectorAll('.categories-widget li');
    
    relatedStories.forEach(story => {
        story.addEventListener('click', function() {
            // Normalde başka bir hikaye sayfasına yönlendirilir
            // Şimdilik aynı sayfaya yönlendirilsin
            window.location.href = 'hikaye-detay.html';
        });
    });
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Normalde kategori sayfasına yönlendirilir
            // Şimdilik keşfet sayfasına yönlendirilsin
            window.location.href = 'kesfet.html';
        });
    });
    
    // Sayfa yüklendiğinde smooth scroll efekti
    const scrollToComments = new URLSearchParams(window.location.search).get('comments');
    if (scrollToComments === 'true') {
        const commentsSection = document.querySelector('.comments-section');
        if (commentsSection) {
            setTimeout(() => {
                window.scrollTo({
                    top: commentsSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
    
    // Lightbox için CSS stillerini ekleme
    const lightboxStyles = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1100;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 80%;
            max-height: 80%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 5px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
        }
        
        .close-lightbox {
            position: absolute;
            top: -30px;
            right: -30px;
            font-size: 28px;
            color: white;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .close-lightbox:hover {
            color: #ff6b6b;
        }
        
        .lightbox-caption {
            position: absolute;
            bottom: -30px;
            left: 0;
            width: 100%;
            text-align: center;
            color: white;
            font-size: 14px;
        }
    `;
    
    // Stil elemanını oluştur ve head'e ekle
    const styleElement = document.createElement('style');
    styleElement.textContent = lightboxStyles;
    document.head.appendChild(styleElement);
    
    // Hikaye içeriğinde anlatım animasyonu
    const storyTextElements = document.querySelectorAll('.story-text p, .story-text h2, .story-facts');
    
    // Intersection Observer API ile görünürlüğü izleme
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    storyTextElements.forEach(element => {
        element.classList.add('animate-element');
        observer.observe(element);
    });
    
    // Hikaye içeriği için animasyon stilleri
    const animationStyles = `
        .animate-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    // Animasyon stillerini ekle
    const animationStyleElement = document.createElement('style');
    animationStyleElement.textContent = animationStyles;
    document.head.appendChild(animationStyleElement);
    
    // Yorum yanıtlama işlevi
    document.querySelectorAll('.comment-actions span:last-child').forEach(replyButton => {
        replyButton.addEventListener('click', function() {
            const commentContent = this.closest('.comment-content');
            const replyForm = document.createElement('div');
            replyForm.classList.add('reply-form');
            
            // Daha önce bir yanıt formu eklenmiş mi kontrol et
            if (commentContent.querySelector('.reply-form')) {
                commentContent.querySelector('.reply-form').remove();
                return;
            }
            
            replyForm.innerHTML = `
                <div class="comment-input-container reply-input">
                    <textarea placeholder="Yanıtınızı yazın..."></textarea>
                    <button class="btn-comment">Yanıtla</button>
                </div>
            `;
            
            commentContent.appendChild(replyForm);
            
            // Yanıt gönderme butonu için olay dinleyicisi
            replyForm.querySelector('.btn-comment').addEventListener('click', function() {
                const replyText = replyForm.querySelector('textarea').value.trim();
                if (replyText) {
                    // Yeni yanıt oluştur
                    const newReply = document.createElement('div');
                    newReply.classList.add('comment', 'reply-comment');
                    newReply.innerHTML = `
                        <img src="images/profile-default.jpg" alt="Profil Fotoğrafı" class="comment-avatar">
                        <div class="comment-content">
                            <div class="comment-header">
                                <h4>Misafir</h4>
                                <span class="comment-date">Şimdi</span>
                            </div>
                            <p>${replyText}</p>
                            <div class="comment-actions">
                                <span><i class="fas fa-heart"></i> 0</span>
                                <span><i class="fas fa-reply"></i> Yanıtla</span>
                            </div>
                        </div>
                    `;
                    
                    // Yanıtı ekle
                    const parentComment = commentContent.closest('.comment');
                    parentComment.parentNode.insertBefore(newReply, parentComment.nextSibling);
                    
                    // Yorum sayısını güncelle
                    updateCommentCount();
                    
                    // Formu kaldır
                    replyForm.remove();
                }
            });
        });
    });
    
    // Yanıt yorumları için stil ekle
    const replyStyles = `
        .reply-form {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .reply-input {
            margin-bottom: 0;
        }
        
        .reply-comment {
            margin-left: 30px;
            width: calc(100% - 30px);
            background: rgba(255, 255, 255, 0.03);
        }
    `;
    
    const replyStyleElement = document.createElement('style');
    replyStyleElement.textContent = replyStyles;
    document.head.appendChild(replyStyleElement);
});