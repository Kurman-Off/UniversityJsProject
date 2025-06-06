`use strict`;

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const indicatorsContainer = document.getElementById("indicators");
const slider = document.querySelector('.carousel');
const categories = document.querySelector('.category__container');
const mainContainer = document.querySelector('.main__container');
const mainContent = document.querySelector('.main__container__content');
const authorizationBlock = document.querySelector('.authorization__container');
const loginBtn = document.querySelector('.btn__login');
const signUpBtn = document.querySelector('.btn__signup');
const logUotBtn = document.querySelector('.header__container__navbar__actions__btn');
const h2 = document.querySelector('.authorization__container__content__h2');
const labelName = document.getElementById('regLabel');
const span = document.querySelector('.authorization__container__content__span');
const emailInput = document.getElementById('loginEmail');
const passwordInput = document.getElementById('loginPassword');
const errorMessage = document.getElementById('error');
const logo = document.getElementById('logo');
const mobileMenu = document.getElementById('mobileMenu');
const burgerIcon = document.getElementById('burgerIcon');
const header = document.querySelector('.header__container');
const footer = document.querySelector('.footer__container');
const gameContainer = document.querySelector('.game-container'); 

const home = document.querySelector('.header__container__navbar__logo')
  .addEventListener('click', () => {
    categories.style.display = 'none';
    slider.style.display = 'none';
    mainContent.style.display = 'flex';
    gameContainer.style.display = 'none';
  });

const game = document.addEventListener('click', (event) => {
  const action = event.target.dataset.action;

  if (action === 'start-game') {
    event.preventDefault();
    showGame();
  }
});

const authorizationBtn = document.querySelector('.header__container__navbar__actions__btn')
  .addEventListener('click', () => {
    categories.style.display = 'none';
    slider.style.display = 'none';
    mainContent.style.display = 'none';
    header.style.display = 'none';
    footer.style.display = 'none';
    authorizationBlock.style.display = 'flex';
  });

const btnBack = document.querySelector('.category__container__btn-back')
  .addEventListener('click', () => {
    categories.style.display = 'none';
    slider.style.display = 'block';
  });
 
const goToCategories = document.getElementById('go__to__categories')
  .addEventListener('click', () => {
    mainContent.style.display = 'none';
    mainContainer.style.alignItems  = 'center';
    slider.style.display = 'block'
  });

function showSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  document.getElementById("slides").style.transform = `translateX(-${currentSlide * 100}%)`;
  updateIndicators();
}

function moveSlide(step) {
  showSlide(currentSlide + step);
}

function updateIndicators() {
  indicatorsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === currentSlide ? " active" : "");
    dot.onclick = () => showSlide(i);
    indicatorsContainer.appendChild(dot);
  }
}

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

setInterval(() => {
  moveSlide(1);
}, 10000);

showSlide(currentSlide);

document.querySelectorAll('.btn__show__category').forEach(button => {
  button.addEventListener('click', () => {
    mainContainer.style.alignItems  = 'center';
    slider.style.display = 'none';
    categories.style.display = 'flex';
    const categoryId = button.id;
    const jsonPath = `./JSON/${categoryId}.json`;

    fetch(jsonPath)
      .then(res => res.json())
      .then(data => {
        const containerH2 = document.querySelector('.category__container__h2');
        containerH2.textContent = data[0].category || 'Категорія';
        
        const container = document.querySelector('.category__container__items');
        container .innerHTML = '';

        data.forEach(itemData => {
          const item = document.createElement('div');
          item.classList.add('category__container__item');

          item.innerHTML = `
            <img class="category__container__item__img" src="${itemData.image}" alt="ball">
            <span class="category__container__item__name">${itemData.name}</span>
            <p class="category__container__item__description">${itemData.description}</p>
            <span class="category__container__item__price">${itemData.price}₴</span>
          `;

          container.appendChild(item);
        });
      })
      .catch(err => {
        console.error(`Помилка при завантаженні JSON з ${jsonPath}:`, err);
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {

function register() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('loginEmail').value.trim();
  const password = md5(document.getElementById('loginPassword').value);

  if (!name || !email || !password) {
    errorMessage.style.display = 'flex';
    errorMessage.textContent = 'Будь ласка, заповніть всі поля!';  
    
    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }, 3000);
    
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.some(user => user.email === email)) {
    errorMessage.style.display = 'flex';
    errorMessage.textContent = 'Користувач з таким email вже існує!';  
    
    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }, 3000);
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  localStorage.setItem('token', JSON.stringify({ email, name }));

  errorMessage.style.display = 'flex';
  errorMessage.style.backgroundColor = '#68f59fcf';
  errorMessage.textContent = 'Реєстрація успішна!';
  logo.disabled = false;
    
  setTimeout(() => {
    errorMessage.style.display = 'none';
    errorMessage.style.backgroundColor = '#f56872';
    errorMessage.textContent = '';
  }, 3000);
  
  location.href = 'index.html';
}

function login() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = md5(document.getElementById('loginPassword').value);

  if (!email || !password) {
    errorMessage.style.display = 'flex';
    errorMessage.textContent = 'Будь ласка, введіть логін та пароль!';  
    
    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }, 3000);

    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const foundUser = users.find(user => user.email === email && user.password === password);

  if (foundUser) {
    localStorage.setItem('token', JSON.stringify({ email, name: foundUser.name }));
    errorMessage.style.display = 'flex';
    errorMessage.style.backgroundColor = '#68f59fcf';
    errorMessage.textContent = 'Вхід успішний!';  
    logo.disabled = false;
    
    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorMessage.style.backgroundColor = '#f56872';
      errorMessage.textContent = '';
    }, 3000);

    location.href = 'index.html';
  } else {
    errorMessage.style.display = 'flex';
    errorMessage.textContent = 'Невірний логін або пароль!';  
    
    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }, 3000);
  }
}


  document.getElementById('switchToRegister').addEventListener('click', () => {
    document.getElementById('regLabel').style.display = 'block';

    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('switchToRegister').style.display = 'none';

    document.getElementById('registerBtn').style.display = 'inline-block';
    document.getElementById('switchToLogin').style.display = 'inline-block';
  });

  document.getElementById('switchToLogin').addEventListener('click', () => {
    document.getElementById('regLabel').style.display = 'none';

    document.getElementById('loginBtn').style.display = 'inline-block';
    document.getElementById('switchToRegister').style.display = 'inline-block';

    document.getElementById('registerBtn').style.display = 'none';
    document.getElementById('switchToLogin').style.display = 'none';
  });

  document.getElementById('loginBtn').addEventListener('click', login);
  document.getElementById('registerBtn').addEventListener('click', register);
});

document.addEventListener('DOMContentLoaded', () => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    logUotBtn.textContent = 'Вийти';
    logUotBtn.id = 'logoutBtn';

    document.getElementById('logoutBtn').addEventListener('click', logout);
  }

  if (token && mobileMenu) {
    const existingLogout = mobileMenu.querySelector('#mobileLogout');
    if (existingLogout) existingLogout.remove();

    const logoutLi = document.createElement('li');
    logoutLi.id = 'mobileLogout';
    logoutLi.innerHTML = `<a href="#">Вийти</a> <img src="./images/header_icons/exit.png">`;
    logoutLi.addEventListener('click', logout);
    mobileMenu.appendChild(logoutLi);
  }

  function logout() {
    localStorage.removeItem('token');
    if (categories) categories.style.display = 'none';
    if (slider) slider.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (authorizationBlock) authorizationBlock.style.display = 'flex';
    if (logo) logo.disabled = true;
    logUotBtn.textContent = 'Увійти';
    logUotBtn.id = '';
    location.reload();
  }
});

const token = JSON.parse(localStorage.getItem('token'));
if (!token) {
  header.style.display = 'none';
  logo.disabled = true;
  categories.style.display = 'none';
  slider.style.display = 'none';
  mainContent.style.display = 'none';
  footer.style.display = 'none';
  authorizationBlock.style.display = 'flex';
}

burgerIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
});

document.addEventListener('click', (e) => {
  const isClickInsideMenu = mobileMenu.contains(e.target);
  const isClickOnIcon = burgerIcon.contains(e.target);

  if (!isClickInsideMenu && !isClickOnIcon) {
    mobileMenu.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('infoModal');
  const modalText = document.getElementById('infoModalText');
  const closeModal = document.getElementById('closeModal');


  document.querySelectorAll('[data-info]').forEach(el => {
    el.addEventListener('click', (e) => {
      const infoType = el.dataset.info;

      switch(infoType) {
        case 'dev':
              modalText.textContent = 'Інформація про розробників Розробники проєкту: Олексюк А.І., Желіховська Т.Ю., Куман Р.І.';
              break;
        case 'add':
              modalText.innerHTML = `
                Додаткова інформація:<br><br>
                  Football Center Shop — це інтернет-магазин, створений для поціновувачів футболу. На сайті представлений широкий асортимент товарів, серед яких:<br><br>
                  -футбольні м’ячі,<br>
                  -рюкзаки,<br>
                  -спортивна форма,<br>
                  -взуття для футболу,<br>
                  -професійне спорядження.<br><br>
                  Крім цього, сайт містить інтерактивну міні-гру, де користувач може спробувати забити гол воротарю — це додає розваги та інтерактивності під час відвідування ресурсу.<br>
                  Для зручності користувачів реалізована карусель категорій товарів, яка дозволяє швидко переглянути доступні категорії та обрати необхідне.
              `;
              break;
        case 'cop':
              modalText.textContent = 'Інформація щодо копірайту© 2025 Football Center Shop. Всі права захищені.';
              break;
      }
      
      modal.classList.remove('hidden');
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
});

function showGame() {
  categories.style.display = 'none';
  slider.style.display = 'none';
  mainContent.style.display = 'none';
  mainContainer.style.margin = 0;
  gameContainer.style.display = 'flex';
}