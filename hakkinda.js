// Hakkında sayfası için özel animasyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Animasyon fonksiyonu - görüş alanına giren elementleri animasyonla göster
    const animateAboutSections = function() {
        const sections = document.querySelectorAll('.about-section');
        const teamMembers = document.querySelectorAll('.team-member');
        
        // About section animasyonları
        sections.forEach((section, index) => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (sectionPosition < screenPosition) {
                // Her section için gecikmeli animasyon
                setTimeout(() => {
                    section.classList.add('animate');
                }, 200 * index);
            }
        });
        
        // Takım üyeleri animasyonları
        teamMembers.forEach((member, index) => {
            const memberPosition = member.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (memberPosition < screenPosition) {
                // Her takım üyesi için gecikmeli animasyon
                setTimeout(() => {
                    member.classList.add('animate');
                }, 200 * index);
            }
        });
    };
    
    // Sayfa yüklendiğinde ve kaydırıldığında animasyonları kontrol et
    window.addEventListener('scroll', animateAboutSections);
    window.addEventListener('load', animateAboutSections);
    
    // Hero section parallax efekti
    window.addEventListener('scroll', function() {
        const aboutHero = document.querySelector('.about-hero');
        if (aboutHero) {
            const scrollPosition = window.scrollY;
            // Parallax efekti - arka planı yavaşça kaydır
            aboutHero.style.backgroundPositionY = scrollPosition * 0.3 + 'px';
        }
    });
});