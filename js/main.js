'use strict';

const Data = {
  BANNERS: [
    {
      id: 1,
      title: 'Новая Suzuki Vitara',
      price: '999 000',
      img: 'promo-suzuki-vitara',
    },
    {
      id: 2,
      title: 'Новая Suzuki SX4',
      price: '1 099 000',
      img: 'promo-suzuki-sx4',
      defaultOpen: true,
    },
  ],
  CATALOG: {
    models: [
      {
        name: 'Suzuki Vitara',
        img: 'model-suzuki-vitara',
        defaultOpen: true,
      },
      {
        name: 'Suzuki SX4',
        img: 'model-suzuki-sx4',
      },
    ],
    cars: [
      {
        name: 'Suzuki Vitara GL',
        img: 'suzuki-vitara-black',
        modification: '1.6 л. 5АКПП',
        driveUnit: 'Передний',
        oldPrice: '1 315 990',
        price: '1 115 990',
      },
      {
        name: 'Suzuki Vitara GL+',
        img: 'suzuki-vitara-black',
        modification: '1.6 л. 5АКПП',
        driveUnit: 'Передний',
        oldPrice: '1 455 990',
        price: '1 255 990',
      },
      {
        name: 'Suzuki Vitara GL',
        img: 'suzuki-vitara-black',
        modification: '1.6 л. 5МКПП',
        driveUnit: 'Передний',
        oldPrice: '1 215 990',
        price: '1 015 990',
      },
      {
        name: 'Suzuki Vitara GL',
        img: 'suzuki-vitara-silver',
        modification: '1.6 л. 5МКПП',
        driveUnit: 'Передний',
        oldPrice: '1 215 990',
        price: '1 015 990',
      },
      {
        name: 'Suzuki Vitara GL',
        img: 'suzuki-vitara-silver',
        modification: '1.6 л. 5МКПП',
        driveUnit: 'Передний',
        oldPrice: '1 215 990',
        price: '1 015 990',
      },
      {
        name: 'Suzuki Vitara GL+',
        img: 'suzuki-vitara-white',
        modification: '1.6 л. 5АКПП',
        driveUnit: 'Передний',
        oldPrice: '1 455 990',
        price: '1 255 990',
      },
      {
        name: 'Suzuki Vitara GL',
        img: 'suzuki-vitara-silver',
        modification: '1.6 л. 6АКПП',
        driveUnit: 'Передний',
        oldPrice: '1 315 990',
        price: '1 115 990',
      },
      {
        name: 'Suzuki Vitara GL',
        img: 'suzuki-vitara-silver',
        modification: '1.6 л. 6АКПП',
        driveUnit: 'Передний',
        oldPrice: '1 315 990',
        price: '1 115 990',
      },
      {
        name: 'Suzuki Vitara GLX',
        img: 'suzuki-vitara-silver',
        modification: '1.6 л. 6АКПП',
        driveUnit: 'Полный',
        oldPrice: '1 685 990',
        price: '1 485 990',
      },
      {
        name: 'Suzuki Vitara GL+',
        img: 'suzuki-vitara-silver',
        modification: '1.6 л. 5МКПП',
        driveUnit: 'Полный',
        oldPrice: '1 495 990',
        price: '1 295 990',
      },
      {
        name: 'Suzuki Vitara GL',
        img: 'suzuki-vitara-steelblue',
        modification: '1.6 л. 5МКПП',
        driveUnit: 'Передний',
        oldPrice: '1 315 990',
        price: '1 115 990',
      },
      {
        name: 'Suzuki Vitara GL+',
        img: 'suzuki-vitara-gold',
        modification: '1.6 л. 5МКПП',
        driveUnit: 'Передний',
        oldPrice: '1 455 990',
        price: '1 255 990',
      },
    ],
  },
};

const Container = {
  HERO: document.querySelector('.hero'),
  CATALOG: document.querySelector('.catalog'),
  CATALOG_HEADER: document.querySelector('.catalog-header .wrapper'),
  CATALOG_LIST: document.querySelector('.catalog__list'),
};

/* Tools */

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const doFilterCars = (carsData, modelName) => {
  return carsData.filter((it) => {
    return it.name.includes(modelName);
  });
}

/* Classes */

class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error('Can\'t instantiate BaseComponent, only concrete one.');
    }

    this._element = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error('You have to define template.');
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {}

  unbind() {}

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}

class HeroBanner extends Component {
  constructor(data, count) {
    super();
    this._id = data.id;
    this._count = count;
    this._title = data.title || '';
    this._img = data.img || '';
    this._price = data.price || '';

    this._defaultOpen = data.defaultOpen || false;

    this._onToggleBannerClick = this._onToggleBannerClick.bind(this);
  }

  _onToggleBannerClick(evt) {
    const controlID = evt.target.classList.value.match(/\d/);

    document.querySelector(`.hero__banner--${this._id}`).classList.add('hidden');
    document.querySelector(`.hero__banner--${controlID}`).classList.remove('hidden');
  }

  _doFormatPrice() {
    let price = '';
    const piecesPrice = this._price.split(' ');

    piecesPrice.forEach((it, index, array) => {
      if (index !== array.length - 1) {
        price += `${it}<span class="hero__space"> </span>`;
      } else {
        price += `${it}`
      }
    });

    return price;
  }

  _getControls() {
    if (this._count === 1) {
      return '';
    }

    let controls = '';
    for(let i = 1; i <= this._count; i++) {
      controls += `
      <button class="hero__control hero__control--${i}${i === this._id ? ' hero__control--active' : ''}">
        <span class="visually-hidden">Предложение №${i}</span>
      </button>`;
    }

    return controls;
  }

  get template() {
    return `
    <div class="hero__banner hero__banner--${this._id} ${this._defaultOpen ? '' : 'hidden'}">
      <div class="hero__wrapper wrapper">
        <div class="hero__container">
          <h2 class="hero__title">${this._title}</h2>
          <span class="hero__price">от ${this._doFormatPrice()} ₽</span>
          <a class="hero__button button" href="#">Узнать подробнее</a>
          <div class="hero__controls">
            ${this._getControls()}
          </div>
        </div>
      </div>
      <div class="hero__background">
        <img class="hero__photo"
          src="img/${this._img}.jpg"
          width="1920" height="695"
          alt="${this._title}"
        >
      </div>
    </div>`.trim();
  }

  get id() {
    return this._id;
  }

  bind() {
    this._element.querySelectorAll('.hero__control').forEach((it) => {
      it.addEventListener('click', this._onToggleBannerClick)
    });
  }

  unbind() {
    this._element.querySelectorAll('.hero__control').forEach((it) => {
      it.removeEventListener('click', this._onToggleBannerClick)
    });
  }
}

class Model extends Component {
  constructor(data) {
    super();
    this._name = data.name || '';
    this._img = data.img || '';

    this._defaultOpen = data.defaultOpen || false;

    this._onModel = null;
    this._onModelClick = this._onModelClick.bind(this);
  }

  _onModelClick() {
    if (typeof this._onModel === 'function') {
      this._onModel();
    }
  }

  get template() {
    return `
    <button class="catalog-header__item ${this._defaultOpen ? 'catalog-header__item--active' : ''}">
      <span class="catalog-header__model">${this._name}</span>
      <img class="catalog-header__photo"
        src="img/${this._img}.png"
        alt="Изображение ${this._name}"
      >
    </button>`.trim();
  }

  set onModel(callback) {
    this._onModel = callback;
  }

  bind() {
    this._element.addEventListener('click', this._onModelClick);
  }

  unbind() {
    this._element.removeEventListener('click', this._onModelClick);
  }
}

class Car extends Component {
  constructor(data) {
    super();
    this._name = data.name || '';
    this._img = data.img || '';
    this._modification = data.modification || '';
    this._driveUnit = data.driveUnit || '';
    this._oldPrice = data.oldPrice || '';
    this._price = data.price || '';
  }

  get template() {
    return `
    <li class="catalog__item car">
      <h3 class="car__name">${this._name}</h3>
      <img class="car__photo"
        src="img/${this._img}.png"
        width="268" height="191"
        alt="Изображение ${this._name}"
      >
      <ul class="car__characteristics characteristics clear-list">
        <li class="characteristics__item">
          <p class="characteristics__name">Модификация</p>
          <span class="characteristics__dots"></span>
          <p class="characteristics__value">${this._modification}</p>
        </li>
        <li class="characteristics__item">
          <p class="characteristics__name">Привод</p>
          <span class="characteristics__dots"></span>
          <p class="characteristics__value">${this._driveUnit}</p>
        </li>
        <li class="characteristics__item">
          <p class="characteristics__name">Старая цена</p>
          <span class="characteristics__dots"></span>
          <p class="characteristics__value">${this._oldPrice} ₽</p>
        </li>
      </ul>
      <a class="car__more button button-light" href="#">Подробнее об автомобиле</a>
      <a class="car__buy button" href="#">Купить за ${this._price} ₽</a>
    </li>`.trim();
  }
}

/* Renders */

const renderHeroBanners = (container, bannersData) => {
  container.innerHTML = '';
  bannersData.forEach((it) => {
    const heroBannerElement = new HeroBanner(it, bannersData.length);
    container.append(heroBannerElement.render());
  });
}

const renderCars = (container, carsData) => {
  if (carsData.length === 0) {
    container.innerHTML = '<li class="catalog__item">Кажется таких машин нет :(</li>';
  } else {
    container.innerHTML = '';
    carsData.forEach((it) => {
      const carElement = new Car(it);
      container.append(carElement.render());
    });
  }
};

const renderModels = (container, modelsData, carsData) => {
  container.innerHTML = '';
  modelsData.forEach((it) => {
    const modelElement = new Model(it);
    container.append(modelElement.render());

    modelElement.onModel = () => {
      document.querySelector('.catalog-header__item--active').classList.remove('catalog-header__item--active')
      modelElement.element.classList.add('catalog-header__item--active');

      renderCars(Container.CATALOG_LIST, doFilterCars(carsData, it.name));
    }
  });
}

const renderCatalog = (catalogData) => {
  renderModels(Container.CATALOG_HEADER, catalogData.models, catalogData.cars);
  renderCars(Container.CATALOG_LIST, catalogData.cars);
};

renderHeroBanners(Container.HERO, Data.BANNERS);
renderCatalog(Data.CATALOG);
