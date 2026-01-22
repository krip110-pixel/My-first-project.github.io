document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
    toggleBtn.classList.toggle('open');
    // Обновляем aria-expanded для доступности
    const expanded = toggleBtn.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', expanded);
  });
});


const slides = document.querySelectorAll('.news-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicatorsContainer = document.querySelector('.news-indicators');

    // Генерируем индикаторы
    if (slides.length > 0 && indicatorsContainer) {
        indicatorsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            indicatorsContainer.appendChild(dot);
        });
    }
    const dots = indicatorsContainer ? indicatorsContainer.querySelectorAll('span') : [];

    let currentIndex = 0;
    let autoTimer = null;
    const AUTO_INTERVAL = 10000; // 10 секунд

    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        if (dots.length) dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        currentIndex = index;
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = setInterval(nextSlide, AUTO_INTERVAL);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
        nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
    }
    if (dots.length) {
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => { showSlide(i); startAutoSlide(); });
        });
    }

    showSlide(0);
    startAutoSlide();

      // === Добавляем свайп для мобильных устройств ===
  const slider = document.querySelector('.news-slider'); // контейнер всех .news-item
  let startX = 0;
  let endX = 0;

  if (slider) {
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) > 50) { // минимальная дистанция свайпа
        if (diff > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
        startAutoSlide();
      }
      startX = 0;
      endX = 0;
    });
  }

    // === Кнопка "Подробнее" ===
    document.querySelectorAll('.news-more').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Детальная информация о новости');
        });
    });

    // === МОДАЛЬНОЕ ОКНО "ЛИЧНЫЙ КАБИНЕТ" ===
    const modal = document.getElementById('modal');
    const openBtn = document.querySelector('.personal-cabinet');
    const closeBtn = document.getElementById('modal-close');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password-input');
    const loginInput = document.getElementById('login-input');

    if (openBtn && modal) {
      openBtn.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = 'flex';
        if (loginInput) loginInput.focus();
      });
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
    window.addEventListener('click', e => {
      if (modal && e.target === modal) {
        modal.style.display = 'none';
      }
    });
    window.addEventListener('keydown', (e) => {
      if (modal && e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
      }
    });
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
            } else {
                passwordInput.type = "password";
            }
        });
    }

const tabs = document.querySelectorAll('.services-tabs .tab');
const fizList = document.getElementById('services-fiz');
const jurList = document.getElementById('services-jur');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    if(tab.dataset.type === 'fiz') {
      fizList.style.display = 'grid';
      jurList.style.display = 'none';
    } else {
      fizList.style.display = 'none';
      jurList.style.display = 'grid';
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: false,
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      840: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      1100: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
      }
    }
  });
});

// Всплывающее окно для "Подробнее"
window.showLinks = function(links) {
  let arr = Array.isArray(links) ? links : [links];
  let out = arr.map(link => '<a href="' + link + '" target="_blank" style="color:#357abD">' + link + '</a>').join('<br>');
  let popup = document.createElement('div');
  popup.innerHTML = `
    <div style="
      position:fixed; top:0; left:0; right:0; bottom:0;
      background:rgba(0,0,0,0.2);
      display:flex; justify-content:center; align-items:center; z-index:15000;">
      <div style="background:#fff; padding:33px 33px 28px 33px; border-radius:14px; min-width:260px; text-align:center;">
        <div style="margin-bottom:10px;font-weight:bold;">Ссылки:</div>
        ${out}
        <br><br>
        <button onclick="this.closest('div[style]').remove()" style="background:#357abD;color:#fff;border:none;padding:7px 22px;border-radius:6px;cursor:pointer;margin-top:16px;">Закрыть</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('question-btn');
  const modal = document.getElementById('question-modal');
  const closeBtn = document.getElementById('close-modal');

  btn.addEventListener('click', () => {
    modal.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Возвращаем прокрутку страницы
  });

  // Закрытие по клику вне окна
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });

  // Закрытие по ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeBtn.click();
    }
  });
});

