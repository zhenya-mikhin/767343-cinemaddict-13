import {createProfileRatingTemplate} from "./view/profile-rating.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilmsTemplate} from './view/films.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from "./view/show-more.js";
import {createTopRatedTemplate} from "./view/top-rated.js";
import {createMostCommentedTemplate} from "./view/most-commented.js";
import {createFooterStatsTemplate} from "./view/footer-stats.js";
import {createPopupTemplate} from "./view/popup.js";

const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatsElement = siteFooterElement.querySelector(`.footer__statistics`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createProfileRatingTemplate(), `beforeend`);

render(siteMainElement, createMenuTemplate(), `beforeend`);

render(siteMainElement, createFilmsTemplate(), `beforeend`);
const siteFilmsContainer = siteMainElement.querySelector(`.films-list__container`);
const renderFilmsTemplate = () => {
  for (let i = 0; i < FILM_COUNT; i++) {
    render(siteFilmsContainer, createFilmCardTemplate(), `beforeend`);
  }
};
render(siteFilmsContainer, renderFilmsTemplate(), `beforeend`);

render(siteFilmsContainer, createShowMoreButtonTemplate(), `beforeend`);

render(siteFilmsContainer, createTopRatedTemplate(), `beforeend`);
render(siteFilmsContainer, createMostCommentedTemplate(), `beforeend`);
const siteExtraElements = siteMainElement.querySelectorAll(`.films-list--extra`);
const renderExtraFilms = () => {
  for (const element of siteExtraElements) {
    for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
      const siteExtraElement = element.querySelector(`.films-list__container`);
      render(siteExtraElement, createFilmCardTemplate(), `beforeend`);
    }
  }
};
renderExtraFilms();

render(siteFooterStatsElement, createFooterStatsTemplate(), `beforeend`);
render(siteFooterElement, createPopupTemplate(), `beforeend`);
