import {createElement} from "../utils.js";

const createFilterItemTemplate = (filters) => {

  const {name, count} = filters;

  return `<a href="#${name}" class="main-navigation__item" data-filter="is${name}">${name} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createFilterTemplate = (filterItems) => {

  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join(``);

  return `<div class="main-navigation__items">
            ${filterItemsTemplate}
          </div>`;
};

export default class FilterView {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
}
