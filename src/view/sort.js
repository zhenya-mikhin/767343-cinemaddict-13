import {createElement} from "../utils.js";

const createSortTemplate = () => {

  return `<ul class="sort">
            <li><a href="#" class="sort__button sort_default_btn sort__button--active" data-sort="default">Sort by default</a></li>
            <li><a href="#" class="sort__button sort_by_date_btn" data-sort="release">Sort by date</a></li>
            <li><a href="#" class="sort__button sort_by_rate_btn" data-sort="rating">Sort by rating</a></li>
          </ul>`;
};

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
};
