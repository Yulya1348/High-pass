// Карта

ymaps.ready(init);
function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        center: [55.767535, 37.630985],
        zoom: 15,
        controls: []
    });

    var myPlacemark = new ymaps.Placemark([55.769535, 37.639985], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'images/marker.svg',
      iconImageSize: [12, 12],
      iconImageOffset: [-3, -42]
    });

    // Размещение геообъекта на карте.
    myMap.geoObjects.add(myPlacemark);

    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "small",
        right: 10
      }
    });
    myMap.controls.add(zoomControl);

    myMap.controls.add('geolocationControl');
};

// Блок контактов

document.querySelector(".section-contacts__btn-close").addEventListener("click", function() {
    document.querySelector(".section-contacts__contacts").classList.add("close")
    document.querySelector(".section-contacts__arrow").classList.add("active")
    this.classList.add("in-active")
});

document.querySelector(".section-contacts__arrow").addEventListener("click", function() {
  document.querySelector(".section-contacts__contacts").classList.remove("close")
  document.querySelector(".section-contacts__btn-close").classList.remove("in-active")
  this.classList.remove("active");
});

// Строка поиска

document.querySelector(".header__search-btn").addEventListener("click", function() {
  document.querySelector(".header__form").classList.add("header__form__active");
  this.classList.add("in-active");
});

document.querySelector(".header__btn-close").addEventListener("click", function() {
  document.querySelector(".header__form").classList.add("in-active");
  document.querySelector(".header__search-btn").classList.remove("in-active")
});

// Бургер-меню

document.querySelector(".header__burger").addEventListener("click", function() {
  document.querySelector(".header__burger-nav").classList.add("active");
  this.classList.add("in-active")
});

document.querySelector(".header__burger-close").addEventListener("click", function() {
  document.querySelector(".header__burger-nav").classList.remove("active");
  document.querySelector(".header__burger").classList.remove("in-active");

});


// Валидация

document.addEventListener("DOMContentLoaded", function() {
  const validation = new JustValidate('#form');
  
  validation
    .addField('#name', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: "Не достаточное количество символов"
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: "Вы ввели больше чем положено"
      },
      {
        rule: 'required',
        errorMessage: "Заполните поле"
      },
    ])

    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Заполните поле',
      },
      {
        rule: 'email',
        errorMessage: 'Вы не корректно ввели email',
      },
    ])

    .addField('#comment', [
      {
        rule: 'required',
        errorMessage: 'Заполните поле',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: "Не достаточное количество символов"
      },
      {
        rule: 'maxLength',
        value: 200,
        errorMessage: "Вы ввели больше чем положено"
      }
    ])
})

document.addEventListener("DOMContentLoaded", function() {
  const validation = new JustValidate('.section-about__form');
  
  validation

    .addField('#email_about', [
      {
        rule: 'required',
        errorMessage: 'Заполните поле',
      },
      {
        rule: 'email',
        errorMessage: 'Вы не корректно ввели email',
      },
    ])
})
