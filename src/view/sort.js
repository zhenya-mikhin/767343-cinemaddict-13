import Abstract from "./abstract.js";

const createSortTemplate = () => {

  return `<ul class="sort">
            <li><a href="#" class="sort__button sort_default_btn sort__button--active" data-sort="default">Sort by default</a></li>
            <li><a href="#" class="sort__button sort_by_date_btn" data-sort="release">Sort by date</a></li>
            <li><a href="#" class="sort__button sort_by_rate_btn" data-sort="rating">Sort by rating</a></li>
          </ul>`;
};

export default class Sort extends Abstract {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.sorttypeChange(evt.target.dataset.sort);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sorttypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
