const passwordResult = document.getElementById('passwordResult');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyButton = document.getElementById('copyButton');
const strengthBars = document.querySelectorAll('.bar');

// Şifre karakter setleri
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Slider değeri güncelleme
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

// Şifre oluşturma
generateBtn.addEventListener('click', generatePassword);

function generatePassword() {
    let chars = '';
    let password = '';
    
    if (uppercaseCheck.checked) chars += uppercase;
    if (lowercaseCheck.checked) chars += lowercase;
    if (numbersCheck.checked) chars += numbers;
    if (symbolsCheck.checked) chars += symbols;

    if (chars === '') {
        alert('Lütfen en az bir seçenek seçin!');
        return;
    }

    const length = lengthSlider.value;
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    passwordResult.value = password;
    updateStrengthMeter(password);
}

// Şifre gücü ölçme
function updateStrengthMeter(password) {
    let strength = 0;
    
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    if (password.length >= 12) strength++;

    strengthBars.forEach((bar, index) => {
        bar.className = 'bar';
        if (index < strength) {
            if (strength <= 2) bar.classList.add('weak');
            else if (strength <= 3) bar.classList.add('medium');
            else if (strength <= 4) bar.classList.add('strong');
            else bar.classList.add('very-strong');
        }
    });
}

// Modal işlevleri
const modal = document.getElementById('aboutModal');
const aboutBtn = document.getElementById('aboutBtn');
const closeBtn = document.querySelector('.close');

aboutBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Dil ve tema değişkenleri
let currentLang = 'tr';
let isDarkMode = false;

// Dil değiştirme fonksiyonu
function switchLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-' + lang + ']').forEach(element => {
        element.textContent = element.getAttribute('data-' + lang);
    });

    // Dil butonlarını güncelle
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// Tema değiştirme fonksiyonu
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    const themeIcon = document.querySelector('#themeToggle i');
    themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// Event Listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.getAttribute('data-lang')));
});

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Kopyalama mesajını dile göre güncelle
function showCopySuccess() {
    const tooltip = copyButton.querySelector('.tooltiptext');
    tooltip.textContent = currentLang === 'tr' ? 'Kopyalandı!' : 'Copied!';
    setTimeout(() => {
        tooltip.textContent = currentLang === 'tr' ? 'Kopyala' : 'Copy';
    }, 1500);
}

// Kopyalama işlevini güncelle
copyButton.addEventListener('click', () => {
    if (!passwordResult.value) return;
    
    navigator.clipboard.writeText(passwordResult.value)
        .then(() => {
            copyButton.innerHTML = `
                <i class="fas fa-check"></i>
                <span class="tooltiptext">${currentLang === 'tr' ? 'Kopyalandı!' : 'Copied!'}</span>
            `;
            setTimeout(() => {
                copyButton.innerHTML = `
                    <i class="far fa-copy"></i>
                    <span class="tooltiptext">${currentLang === 'tr' ? 'Kopyala' : 'Copy'}</span>
                `;
            }, 1500);
        })
        .catch(err => {
            console.error(currentLang === 'tr' ? 'Kopyalama başarısız:' : 'Copy failed:', err);
        });
});

// Sayfa yüklendiğinde varsayılan dili ayarla
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage('tr');
});

// Sayfa yüklendiğinde ilk şifreyi oluştur
generatePassword(); 