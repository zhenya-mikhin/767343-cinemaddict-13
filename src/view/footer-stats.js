import Abstract from "./abstract.js";

const createFooterStatsTemplate = (filmsAmount) => {
  return `<p>${filmsAmount} movies inside</p>`;
};

export default class FooterStatsView extends Abstract {
  constructor(filmsAmount) {
    super();
    this._filmsAmount = filmsAmount;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._filmsAmount);
  }
}
