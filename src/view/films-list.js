import Abstract from "./abstract.js";

const HIDDEN_CLASS = `visually-hidden`;
const EXTRA_CLASS = `--extra`;

const createFilmsListTemplate = ({title, isExtra = false, isHidden = false}) => {
  return `<section class="films-list${isExtra ? EXTRA_CLASS : ``}">
            <h2 class="films-list__title ${isHidden ? HIDDEN_CLASS : ``}">${title}</h2>
            <div class="films-list__container">
            </div>
          </section>`;
};

export default class FilmsList extends Abstract {
  constructor({title, isExtra = false, isHidden = false}) {
    super()
    this._title = title;
    this._isExtra = isExtra;
    this._isHidden = isHidden;
  }

  getTemplate() {
    return createFilmsListTemplate({title: this._title, isExtra: this._isExtra, isHidden: this._isHidden});
  }
}
