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
    
    // Detay ekleme fonksiyonu
    const addDetailButton = document.getElementById('add-detail');
    const detailsContainer = document.getElementById('details-container');
    
    if (addDetailButton && detailsContainer) {
        addDetailButton.addEventListener('click', function() {
            const detailRow = document.createElement('div');
            detailRow.className = 'form-grid';
            detailRow.innerHTML = `
                <div class="form-group">
                    <input type="text" name="detail-label[]" class="form-input" placeholder="Etiket (örn: Tarih, Konum)">
                </div>
                <div class="form-group">
                    <input type="text" name="detail-value[]" class="form-input" placeholder="Değer (örn: 1986, İstanbul)">
                </div>
            `;
            detailsContainer.appendChild(detailRow);
        });
    }
    
    // Form gönderimi
    const storyForm = document.getElementById('story-form');
    if (storyForm) {
        storyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini toplama
            const formData = new FormData(storyForm);
            const storyData = {};
            
            // Temel form alanlarını işleme
            for (const [key, value] of formData.entries()) {
                if (key !== 'detail-label[]' && key !== 'detail-value[]') {
                    storyData[key] = value;
                }
            }
            
            // Detay alanlarını işleme
            const detailLabels = formData.getAll('detail-label[]');
            const detailValues = formData.getAll('detail-value[]');
            const details = [];
            
            for (let i = 0; i < detailLabels.length; i++) {
                if (detailLabels[i] && detailValues[i]) {
                    details.push({
                        label: detailLabels[i],
                        value: detailValues[i]
                    });
                }
            }
            
            storyData.details = details;
            
            // Normalde burada bir API'ye gönderilir, şimdilik konsola yazdırıyoruz
            console.log('Hikaye verileri:', storyData);
            
            // Başarılı gönderim mesajı
            alert('Hikayeniz başarıyla gönderildi! İncelendikten sonra yayınlanacaktır.');
            
            // Formu sıfırlama
            storyForm.reset();
            
            // Eklenen detay alanlarını temizleme
            while (detailsContainer.children.length > 1) {
                detailsContainer.removeChild(detailsContainer.lastChild);
            }
        });
    }
    
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
});