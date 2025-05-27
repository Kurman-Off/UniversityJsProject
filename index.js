`use strict`;

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const indicatorsContainer = document.getElementById("indicators");
const slider = document.querySelector('.carousel');
const categories = document.querySelector('.category__container');
const mainContent = document.querySelector('.main__container__content');
const authorizationBlock = document.querySelector('.authorization__container');
const loginBtn = document.querySelector('.btn__login');
const signUpBtn = document.querySelector('.btn__signup');
const h2 = document.querySelector('.authorization__container__content__h2');
const labelName = document.getElementById('regLabel');
const span = document.querySelector('.authorization__container__content__span');
const emailInput = document.getElementById('loginEmail');
const passwordInput = document.getElementById('loginPassword');
const errorMessage = document.getElementById('error');
const logo = document.getElementById('logo');

const home = document.querySelector('.header__container__navbar__logo')
  .addEventListener('click', () => {
    categories.style.display = 'none';
    slider.style.display = 'none';
    mainContent.style.display = 'flex';
  });

const authorizationBtn = document.querySelector('.header__container__navbar__actions__btn')
  .addEventListener('click', () => {
    categories.style.display = 'none';
    slider.style.display = 'none';
    mainContent.style.display = 'none';
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
    slider.style.display = 'none';
    categories.style.display = 'flex';
    const categoryId = button.id;
    const jsonPath = `./${categoryId}.json`;

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
  const navbar = document.querySelector('.header__container__navbar__actions');

  if (token && navbar) {
    navbar.innerHTML = `
      <img class="icon header__container__navbar__actions__img" src="./images/header_icons/header.png" alt="gamepad">
      <span>Привіт, ${token.name}!</span>
      <button class="btn" id="logoutBtn">Вийти</button>
    `;

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('token');
      categories.style.display = 'none';
      slider.style.display = 'none';
      mainContent.style.display = 'none';
      authorizationBlock.style.display = 'flex';
      logo.disabled = true;
      location.reload();
    });
  }
});

const token = JSON.parse(localStorage.getItem('token'));
if (!token) {
  logo.disabled = true;
  categories.style.display = 'none';
  slider.style.display = 'none';
  mainContent.style.display = 'none';
  authorizationBlock.style.display = 'flex';
}

document.getElementById('burgerIcon').addEventListener('hover', () => {
  const menu = document.getElementById('mobileMenu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});
