'use strict';

const Data = {
  BANNERS: [
    {
      title: 'Новая Suzuki Vitara',
      price: '999 000',
      img: 'promo-suzuki-vitara',
    },
    {
      title: 'Новая Suzuki SX4',
      price: '1 099 000',
      img: 'promo-suzuki-sx4',
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

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

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

class Model extends Component {
  constructor(data) {
    super();
    this._name = data.name || '';
    this._img = data.img || '';

    this._defaultOpen = data.defaultOpen || false,

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
        width="347" height="233"
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

const doFilterCars = (carsData, modelName) => {
  return carsData.filter((it) => {
    return it.name.includes(modelName);
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

renderCatalog(Data.CATALOG);
