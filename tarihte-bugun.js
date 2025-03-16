// Tarihte Bugün JavaScript Dosyası
document.addEventListener('DOMContentLoaded', function() {
    // Gerekli elementleri seçme
    const calendarDays = document.getElementById('calendarDays');
    const monthYearText = document.getElementById('monthYear');
    const selectedDateText = document.getElementById('selectedDate');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentDateDisplay = document.getElementById('currentDate');
    const daySelect = document.getElementById('daySelect');
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const searchDateBtn = document.getElementById('searchDate');
    
    // Ay isimleri
    const monthNames = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    
    // Güncel tarih
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    
    // Aranan tarihi izleme
    let selectedDay = today.getDate();
    let selectedMonth = today.getMonth();
    let selectedYear = today.getFullYear();
    
    // Tarih güncellemesi
    updateCurrentDateDisplay();
    
    // Takvim oluşturma
    generateCalendar(currentMonth, currentYear);
    
    // Dropdown gün seçeneklerini doldurma
    populateDaySelect();
    
    // Dropdown yıl seçeneklerini doldurma
    populateYearSelect();
    
    // Event listeners
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    // Arama butonu için listener
    searchDateBtn.addEventListener('click', function() {
        const selectedDayValue = daySelect.value;
        const selectedMonthValue = monthSelect.value - 1; // JavaScript'te aylar 0-11 arası
        const selectedYearValue = yearSelect.value;
        
        if (selectedDayValue && selectedMonthValue >= 0) {
            selectedDay = parseInt(selectedDayValue);
            selectedMonth = selectedMonthValue;
            
            if (selectedYearValue) {
                selectedYear = parseInt(selectedYearValue);
            }
            
            // Seçilen günü güncelle
            updateSelectedDate();
            
            // Tarih etkinliklerini yükle
            loadHistoricalEvents(selectedDay, selectedMonth, selectedYear);
            
            // Takvimi güncelleyip seçili günü göster
            generateCalendar(selectedMonth, currentYear);
        }
    });
    
    // Tarih gösterimini güncelleme fonksiyonu
    function updateCurrentDateDisplay() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateDisplay.textContent = today.toLocaleDateString('tr-TR', options);
    }
    
    // Seçilen tarihi güncelleme
    function updateSelectedDate() {
        let dateText = `${selectedDay} ${monthNames[selectedMonth]}`;
        if (yearSelect.value) {
            dateText += ` ${selectedYear}`;
        }
        selectedDateText.textContent = dateText;
    }
    
    // Takvim oluşturma fonksiyonu
    function generateCalendar(month, year) {
        // Takvim başlığını güncelle
        monthYearText.textContent = `${monthNames[month]} ${year}`;
        
        // Takvim günlerini temizle
        calendarDays.innerHTML = '';
        
        // Ayın ilk gününü belirle (0 = Pazar, 1 = Pazartesi, ..., 6 = Cumartesi)
        let firstDay = new Date(year, month, 1).getDay();
        // Türkiye'de hafta başlangıcı Pazartesi olduğu için düzeltme yapılıyor
        firstDay = firstDay === 0 ? 6 : firstDay - 1;
        
        // Ayın toplam gün sayısını belirle
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Önceki aydan kaç gün ekleneceğini hesapla
        const prevMonthDays = new Date(year, month, 0).getDate();
        
        // Boşlukları doldur (önceki aydan kalanlar)
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day', 'inactive');
            dayElement.textContent = prevMonthDays - i;
            calendarDays.appendChild(dayElement);
        }
        
        // Ayın günlerini ekle
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = i;
            
            // Bugünü vurgula
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Seçilen günü vurgula
            if (i === selectedDay && month === selectedMonth && year === selectedYear) {
                dayElement.classList.add('selected');
            }
            
            // Etkinliği olan günleri işaretle (örnek olarak)
            if (hasEvents(i, month)) {
                dayElement.classList.add('has-events');
            }
            
            // Tıklama olayı ekle
            dayElement.addEventListener('click', function() {
                // Önceki seçili günü kaldır
                const prevSelected = document.querySelector('.calendar-day.selected');
                if (prevSelected) {
                    prevSelected.classList.remove('selected');
                }
                
                // Yeni günü seç
                this.classList.add('selected');
                
                // Seçilen tarihi güncelle
                selectedDay = i;
                selectedMonth = month;
                selectedYear = year;
                updateSelectedDate();
                
                // Tarihe özel etkinlikleri yükle
                loadHistoricalEvents(i, month, year);
            });
            
            calendarDays.appendChild(dayElement);
        }
        
        // Sonraki aydan eklenecek günleri hesapla
        const totalCells = 42; // 6 satır x 7 sütun
        const remainingCells = totalCells - (firstDay + daysInMonth);
        
        // Sonraki aydan günleri ekle
        for (let i = 1; i <= remainingCells; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day', 'inactive');
            dayElement.textContent = i;
            calendarDays.appendChild(dayElement);
        }
    }
    
    // Gün dropdown için seçenekleri doldur
    function populateDaySelect() {
        // Önce varsayılan seçenek
        daySelect.innerHTML = '<option value="">Gün</option>';
        
        // 1'den 31'e kadar günleri ekle
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }
    }
    
    // Yıl dropdown için seçenekleri doldur
    function populateYearSelect() {
        // Önce varsayılan seçenek
        yearSelect.innerHTML = '<option value="">Yıl</option>';
        
        // Günümüzden 2000 yıl öncesine kadar olan yılları ekle (önemli tarihsel olaylar için)
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 2000;
        
        for (let i = currentYear; i >= startYear; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    }
    
    // Belirli bir günde etkinlik olup olmadığını kontrol et
    function hasEvents(day, month) {
        // Bu fonksiyon normalde bir API'den veri alacak veya yerel bir veritabanından kontrol yapacak
        // Şimdilik bazı örnekler ekleyelim
        
        // Örnek olarak her ayın 1, 10, 15, 16, 20 ve 25. günlerinde etkinlik olsun
        return [1, 10, 15, 16, 20, 25].includes(day);
    }
    
    // Belirli bir tarih için tarihsel olayları yükle
    function loadHistoricalEvents(day, month, year) {
        // Bu normalde bir API çağrısı yapacak veya yerel veritabanından yükleyecek
        // Şimdilik sabit veriler kullanıyoruz
        
        // Seçilen tarih 16 Mart 2025 ise varsayılan verileri göster
        if (day === 16 && month === 2 && year === 2025) { // JavaScript'te Mart = 2 (0-tabanlı)
            return; // Zaten HTML'de bu tarih için veriler var
        }
        
        // Demo verileri - gerçek uygulamada bu veriler API'den gelecek
        const historyCardsContainer = document.querySelector('.history-cards');
        let eventsHTML = '';
        
        // Farklı tarih için örnek olaylar
        if (day === 10 && month === 2) { // 10 Mart
            eventsHTML = `
                <div class="history-card">
                    <div class="history-card-date">
                        <span class="day">10</span>
                        <span class="month">Mart</span>
                        <span class="year">1876</span>
                    </div>
                    <div class="history-card-content">
                        <h3>İlk Telefon Görüşmesi</h3>
                        <p>Alexander Graham Bell, ilk telefon görüşmesini gerçekleştirdi. "Mr. Watson, come here, I want to see you." sözleri telefon üzerinden aktarılan ilk cümle oldu.</p>
                        <a href="hikaye-detay.html?id=telefon-tarihi" class="read-more">Devamını Oku</a>
                    </div>
                </div>
            `;
        } else if (day === 15 && month === 2) { // 15 Mart
            eventsHTML = `
                <div class="history-card">
                    <div class="history-card-date">
                        <span class="day">15</span>
                        <span class="month">Mart</span>
                        <span class="year">44</span>
                        <span class="bc">MÖ</span>
                    </div>
                    <div class="history-card-content">
                        <h3>Julius Caesar'ın Suikastı</h3>
                        <p>Roma İmparatoru Julius Caesar, yakın arkadaşı Brutus'un da aralarında bulunduğu bir grup senatör tarafından suikaste uğradı.</p>
                        <a href="hikaye-detay.html?id=caesar-suikasti" class="read-more">Devamını Oku</a>
                    </div>
                </div>
            `;
        } else {
            // Eğer seçilen tarih için özel veri yoksa boş mesaj göster
            eventsHTML = `
                <div class="no-events">
                    <i class="fas fa-calendar-times"></i>
                    <p>Bu tarih için kayıtlı tarihsel olay bulunamadı.</p>
                </div>
            `;
        }
        
        historyCardsContainer.innerHTML = eventsHTML;
    }
    
    // Read More bağlantıları için olay dinleyicileri ekle
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Varsayılan davranışı engelle
            const storyId = this.getAttribute('data-story-id') || this.getAttribute('href').split('=')[1] || 'default-story';
            redirectToStory(storyId);
        });
    });
    
    // Sayfa ilk yüklendiğinde seçili tarihi güncelle
    updateSelectedDate();
});

// Okuma sayfasına yönlendirme fonksiyonu (hikaye için)
function redirectToStory(storyId) {
    window.location.href = `hikaye-detay.html?id=${storyId}`;
}