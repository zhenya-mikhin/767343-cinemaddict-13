import {createElement} from "../utils.js";

const createFooterStatsTemplate = (filmsAmount) => {
  return `<p>${filmsAmount} movies inside</p>`;
};

export default class FooterStatsView {
  constructor(filmsAmount) {
    this._filmsAmount = filmsAmount;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._filmsAmount);
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
