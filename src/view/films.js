import Abstract from "./abstract.js";

const createFilmsTemplate = () => `<section class="films"></section>`;

export default class FilmsView extends Abstract {
  getTemplate() {
    return createFilmsTemplate();
  }
}
