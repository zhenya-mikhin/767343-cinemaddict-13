import {createElement} from "../utils.js";

const createMenuTemplate = () => {

  return `<nav class="main-navigation">
            <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>`;
};

export default class SiteMenu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate();
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
