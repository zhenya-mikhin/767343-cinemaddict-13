import Abstract from "./abstract.js";

const createMenuTemplate = () => {

  return `<nav class="main-navigation">
            <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>`;
};

export default class SiteMenu extends Abstract {
  getTemplate() {
    return createMenuTemplate();
  }
}
