document.addEventListener('DOMContentLoaded', function() {
    // Tarih seçici için değişkenler
    const monthSelect = document.getElementById('month-select');
    const daySelect = document.getElementById('day-select');
    const searchDateButton = document.getElementById('search-date-button');
    const selectedDateDisplay = document.getElementById('selected-date');
    const historyEventsContainer = document.getElementById('history-events-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    const cardGrid = document.querySelector('.random-events-section .card-grid');
    
    // Bugünün tarihini al
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JavaScript'te aylar 0'dan başlar
    const currentDay = today.getDate();
    
    // Ay seçimini bugünkü aya ayarla
    monthSelect.value = currentMonth;
    
    // Günleri doldur ve bugünkü günü seç
    populateDays(currentMonth);
    daySelect.value = currentDay;
    
    // Sayfa yüklendiğinde bugünkü tarihe ait olayları göster
    showHistoricalEvents(currentMonth, currentDay);
    loadRandomEvents();
    
    // Ay değiştiğinde günleri güncelle
    monthSelect.addEventListener('change', function() {
        const selectedMonth = parseInt(this.value);
        populateDays(selectedMonth);
    });
    
    // Tarih ara butonuna tıklandığında
    searchDateButton.addEventListener('click', function() {
        const selectedMonth = parseInt(monthSelect.value);
        const selectedDay = parseInt(daySelect.value);
        showHistoricalEvents(selectedMonth, selectedDay);
    });
    
    // Seçilen aya göre günleri doldur
    function populateDays(month) {
        // Günleri temizle
        daySelect.innerHTML = '';
        
        // Seçilen ayın gün sayısını hesapla
        let daysInMonth;
        
        // Eğer ay değeri geçerli değilse, bugünkü ayı kullan
        if (isNaN(month) || month < 1 || month > 12) {
            month = new Date().getMonth() + 1;
        }
        
        // Gün seçimini etkinleştir
        daySelect.disabled = false;
        
        // Ayın son gününü hesapla
        const year = today.getFullYear();
        daysInMonth = new Date(year, month, 0).getDate();
        
        // Günleri ekle
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            
            // Bugünkü tarih ise seçili yap
            if (month === currentMonth && i === currentDay) {
                option.selected = true;
            }
            
            daySelect.appendChild(option);
        }
    }
    
    // Tarihsel olayları göster
    function showHistoricalEvents(month, day) {
        // Yükleniyor göstergesini göster
        loadingSpinner.style.display = 'flex';
        historyEventsContainer.innerHTML = '';
        historyEventsContainer.appendChild(loadingSpinner);
        
        // Seçilen tarihi göster
        const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        selectedDateDisplay.textContent = `${day} ${monthNames[month-1]}`;
        
        // Tarihsel olayları getir
        const events = getHistoricalEvents(month, day);
        
        // Yükleniyor göstergesini gizle
        loadingSpinner.style.display = 'none';
        
        if (events.length === 0) {
            const noEventMessage = document.createElement('div');
            noEventMessage.className = 'no-events-message';
            noEventMessage.textContent = 'Bu tarihte kayıtlı olay bulunamadı.';
            historyEventsContainer.appendChild(noEventMessage);
        } else {
            events.forEach(event => {
                const eventCard = createEventCard(event);
                historyEventsContainer.appendChild(eventCard);
            });
        }
    }
    
    // Rastgele tarihsel olayları yükle
    function loadRandomEvents() {
        // Tüm olaylardan rastgele 3 tanesini seç
        const allEvents = getAllHistoricalEvents();
        const randomEvents = getRandomItems(allEvents, 3);
        
        // Rastgele olayları göster
        randomEvents.forEach(event => {
            const eventCard = createContentCard(event);
            cardGrid.appendChild(eventCard);
        });
    }
    
    // Tarihsel olay kartı oluştur
    function createEventCard(event) {
        const eventCard = document.createElement('div');
        eventCard.className = 'history-event-card';
        
        eventCard.innerHTML = `
            <div class="event-year">${event.year}</div>
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                ${event.image ? `<img src="${event.image}" alt="${event.title}" class="event-image" onerror="handleImageError(this)">` : `<img src="${defaultImage}" alt="Default Image" class="event-image">`}
            </div>
        `;
        
        return eventCard;
    }
    
    // İçerik kartı oluştur (rastgele olaylar için)
    function handleImageError(img) {
        img.onerror = null; // Prevent infinite loop
        img.src = defaultImage;
    }

    function createContentCard(event) {
        const card = document.createElement('div');
        card.className = 'content-card';
        
        card.innerHTML = `
            ${event.image ? `<img src="${event.image}" alt="${event.title}" class="card-image" onerror="handleImageError(this)">` : `<img src="${defaultImage}" alt="Default Image" class="card-image">`}
            <div class="card-content">
                <div class="card-category category-historic">Tarihsel Olay</div>
                <h3 class="card-title">${event.title}</h3>
                <p class="card-description">${event.description}</p>
                
                <div class="info-box">
                    <h4 class="info-title">Olay Bilgileri</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Tarih: </span>
                            <span class="info-value">${event.day} ${getMonthName(event.month)} ${event.year}</span>
                        </div>
                        ${event.location ? `
                        <div class="info-item">
                            <span class="info-label">Konum: </span>
                            <span class="info-value">${event.location}</span>
                        </div>` : ''}
                    </div>
                </div>
                
                <div class="card-meta">
                    <div class="card-date">Tarihte Bugün</div>
                    <div class="card-stats">
                        <span>👁️ ${Math.floor(Math.random() * 10000)}+</span>
                        <span>💬 ${Math.floor(Math.random() * 200)}</span>
                    </div>
                </div>
            </div>
        `;
        
        // Kart tıklama olayı
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            alert(`"${event.title}" detayları yakında eklenecek!`);
        });
        
        return card;
    }
    
    // Ay adını döndür
    function getMonthName(month) {
        const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        return monthNames[month - 1];
    }
    
    // Diziden rastgele öğeler seç
    function getRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    // Tarihsel olayları getir
    function getHistoricalEvents(month, day) {
        const allEvents = getAllHistoricalEvents();
        return allEvents.filter(event => event.month === month && event.day === day);
    }
    
    // Tüm tarihsel olaylar
    function getAllHistoricalEvents() {
        const defaultImage = 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
        return [
            {
                year: 1879,
                month: 3,
                day: 14,
                title: "Albert Einstein'ın Doğumu",
                description: "Fizik alanında devrim yaratan ve görelilik teorisini geliştiren Albert Einstein dünyaya geldi.",
                location: "Ulm, Almanya",
                image: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            {
                year: 1883,
                month: 3,
                day: 14,
                title: "Karl Marx'ın Ölümü",
                description: "Komünizm teorisinin kurucusu ve 'Das Kapital' kitabının yazarı Karl Marx hayatını kaybetti.",
                location: "Londra, İngiltere",
                image: defaultImage
            },
            {
                year: 1900,
                month: 3,
                day: 14,
                title: "ABD'de Altın Standardı Yasası",
                description: "ABD Başkanı William McKinley, doları altına sabitleyen Altın Standardı Yasası'nı imzaladı.",
                location: "Washington D.C., ABD",
                image: defaultImage
            },
            {
                year: 1951,
                month: 4,
                day: 11,
                title: "Truman, MacArthur'u Görevden Aldı",
                description: "ABD Başkanı Harry Truman, Kore Savaşı sırasında General Douglas MacArthur'u görevden aldı.",
                location: "Washington D.C., ABD",
                image: "https://images.unsplash.com/photo-1580752300992-559f8e0734e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            {
                year: 1970,
                month: 4,
                day: 11,
                title: "Apollo 13 Fırlatıldı",
                description: "NASA'nın Apollo 13 uzay aracı, daha sonra 'Houston, we have a problem' sözüyle ünlenen görev için fırlatıldı.",
                location: "Cape Canaveral, Florida, ABD",
                image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            {
                year: 1979,
                month: 5,
                day: 4,
                title: "Margaret Thatcher Başbakan Oldu",
                description: "Margaret Thatcher, Birleşik Krallık'ın ilk kadın başbakanı olarak göreve başladı.",
                location: "Londra, İngiltere",
                image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            {
                year: 1986,
                month: 3,
                day: 14,
                title: "Avrupa Para Birimi (ECU)",
                description: "Avrupa Topluluğu'nun resmi para birimi olarak onaylandı.",
                location: "Avrupa",
                image: "https://images.unsplash.com/photo-1519458246479-6acae7536988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            // Diğer olaylar...
        ];
    }
});