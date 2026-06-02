// ============================================================
// ==================== БУРГЕР МЕНЮ ====================
// ОТВЕЧАЕТ ЗА: открытие/закрытие мобильного меню
// ============================================================

const burgerBtn = document.getElementById("burgerBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// При клике на бургер-иконку добавляем/убираем класс active
burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// При клике на любую ссылку меню закрывается
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burgerBtn.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// При клике вне области header — меню тоже закрывается
document.addEventListener("click", (e) => {
  if (!e.target.closest(".header")) {
    burgerBtn.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// ============================================================
// ==================== СЛАЙДЕР ПОРТФОЛИО (версия 1) ====================
// ОТВЕЧАЕТ ЗА: переключение слайдов по кнопкам, точкам и авто-слайд
// ============================================================

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const sliderTrack = document.getElementById("sliderTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const totalSlides = slides.length;

// Обновление позиции слайдера и активной точки
function updateSlider() {
  const offset = -currentSlide * 100;
  sliderTrack.style.transform = `translateX(${offset}%)`;

  dots.forEach((dot, index) => {
    dot.classList.remove("active");
    if (index === currentSlide) {
      dot.classList.add("active");
    }
  });
}

// Переключение на следующий/предыдущий слайд
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

// Обработчики кнопок и точек
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    updateSlider();
  });
});

// Автоматическое переключение каждые 5 секунд
setInterval(nextSlide, 5000);

// ============================================================
// ==================== ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ ====================
// ОТВЕЧАЕТ ЗА: проверку полей (имя, email, сообщение) и показ модалки
// ============================================================

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successModal = document.getElementById("successModal");

// Простая проверка email: есть @ и точка после @
function validateEmail(email) {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return false;
  const afterAt = email.substring(atIndex + 1);
  if (afterAt.indexOf(".") === -1) return false;
  return true;
}

// Очистка старых сообщений об ошибках
function clearErrors() {
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("messageError").textContent = "";
}

// Обработка отправки формы
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  let isValid = true;

  if (name === "") {
    document.getElementById("nameError").textContent = "Пожалуйста, введите имя";
    isValid = false;
  }

  if (email === "") {
    document.getElementById("emailError").textContent = "Пожалуйста, введите email";
    isValid = false;
  } else if (!validateEmail(email)) {
    document.getElementById("emailError").textContent = "Email должен содержать @ и точку после неё";
    isValid = false;
  }

  if (message === "") {
    document.getElementById("messageError").textContent = "Пожалуйста, введите сообщение";
    isValid = false;
  }

  if (isValid) {
    contactForm.reset();
    showSuccessModal();
    console.log("Форма отправлена:", { name, email, message });
  }
});

// ============================================================
// ==================== МОДАЛЬНОЕ ОКНО ====================
// ОТВЕЧАЕТ ЗА: показ всплывающего окна после успешной отправки
// Закрытие: клик на фон, Escape
// ============================================================

function showSuccessModal() {
  successModal.style.display = "flex";
  document.body.style.overflow = "hidden";
  successModal.style.opacity = "0";
  setTimeout(() => {
    successModal.style.opacity = "1";
  }, 10);
}

function closeModal() {
  successModal.style.opacity = "0";
  setTimeout(() => {
    successModal.style.display = "none";
    document.body.style.overflow = "auto";
  }, 300);
}

successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && successModal.style.display === "flex") {
    closeModal();
  }
});

// ============================================================
// ==================== ПЛАВНОЕ ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ====================
// ОТВЕЧАЕТ ЗА: анимацию карточек услуг, когда они появляются на экране
// ============================================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".service-card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// ============================================================
// ==================== ФОКУС НА ПОЛЯХ ФОРМЫ ====================
// ОТВЕЧАЕТ ЗА: добавление класса focused при клике на поле ввода
// ============================================================

const formInputs = document.querySelectorAll(".form-group input, .form-group textarea");

formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    this.parentElement.classList.remove("focused");
  });
});

// ============================================================
// ==================== АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ ====================
// ОТВЕЧАЕТ ЗА: подсветку пункта меню при скролле к секции
// ============================================================

window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

console.log("✓ Сайт загружен успешно!");

// ============================================================
// ==================== СЛАЙДЕР ПОРТФОЛИО (версия 2) ====================
// ⚠️ ВНИМАНИЕ: этот блок ДУБЛИРУЕТ первый слайдер и конфликтует с ним
// ОТВЕЧАЕТ ЗА: динамическое создание точек, переключение с зацикливанием
// НА ЭКЗАМЕНЕ СКАЗАТЬ: "Это альтернативная реализация, её лучше удалить"
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('sliderTrack');
  const slides = track ? Array.from(track.children) : [];
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const dotsContainer = document.getElementById('dotsContainer');
  
  if (!track || slides.length === 0) return;
  
  let currentIndex = 0;
  const slideCount = slides.length;
  
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  function updateDots() {
    const dots = Array.from(dotsContainer.children);
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }
  
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= slideCount) index = slideCount - 1;
    currentIndex = index;
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
  }
  
  function nextSlide() {
    if (currentIndex < slideCount - 1) goToSlide(currentIndex + 1);
    else goToSlide(0);
  }
  
  function prevSlide() {
    if (currentIndex > 0) goToSlide(currentIndex - 1);
    else goToSlide(slideCount - 1);
  }
  
  function handleResize() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  
  createDots();
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  window.addEventListener('resize', handleResize);
  setTimeout(() => handleResize(), 100);
});

// ============================================================
// ==================== СЛУЧАЙНАЯ ПОДСКАЗКА ====================
// ОТВЕЧАЕТ ЗА: генерацию случайного совета
// ⚠️ НО: переменная создана, но НЕ ИСПОЛЬЗУЕТСЯ на странице
// ============================================================

const tips = [
    "💡 Перезагружайте компьютер раз в неделю для стабильной работы",
    "💡 Не забывайте делать бэкап важных файлов в облако",
    "💡 Чистите системный блок от пыли каждые 6 месяцев"
];
const randomTip = tips[Math.floor(Math.random() * tips.length)];


// ошибка в  randomTip);