import Abstract from "./abstract.js";

const createFilmsListContainerTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class FilmsListContainer extends Abstract {
  getTemplate() {
    return createFilmsListContainerTemplate();
  }
}
