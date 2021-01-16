import {createProfileRatingTemplate} from "./view/profile-rating.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFooterStatsTemplate} from "./view/footer-stats.js";

import {createFilmsTemplate} from './view/films.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';

import {createShowMoreButtonTemplate} from "./view/show-more.js";

import {createFilmDetailsTemplate} from "./view/film-details.js";
import {createFilmInfoTemplate} from "./view/film-info.js";
import {createFilmControlsTemplate} from "./view/film-controls.js";

import {createCommentTemplate} from "./view/comment.js";
import {createNewCommentTemplate} from "./view/new-comment.js";

import {generateFilm} from "./mocks/film.js";

const DEFAULT_SHOW = 5;
const SUMMARY_FILMS_COUNT = 30;
const SHOW_MORE = 5;
const FILM_TOP_RATED = 2;
const FILM_MOST_COMMENTED = 2;

const generateFilms = () => {
  return new Array(SUMMARY_FILMS_COUNT).fill().map(generateFilm);
};

const films = generateFilms();

let showingFilmsCount = DEFAULT_SHOW;

const getWatchStats = (array) => {
  const reducer = (stats, film) => {
    if (film.isWatchlist) {
      stats.watchlist += 1;
    }
    if (film.isWatched) {
      stats.history += 1;
    }
    if (film.isFavorites) {
      stats.favorites += 1;
    }
    return stats;
  }
  return array.reduce(reducer, {
    watchlist: 0,
    history: 0,
    favorites: 0
  });
};

const topRatedFilms = films.slice().sort((a, b) => {
  if (a.rating > b.rating) {
    return -1;
  }
  if (a.rating < b.rating) {
    return 1;
  }
  return 0;
}).slice(0, FILM_TOP_RATED);

const mostCommentedFilms = films.slice().sort((a, b) => {
  if (a.comments.length > b.comments.length) {
    return -1;
  }
  if (a.comments.length < b.comments.length) {
    return 1;
  }
  return 0;
}).slice(0, FILM_MOST_COMMENTED);

const watchStats = getWatchStats(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createProfileRatingTemplate(watchStats.history), `beforeend`);
render(siteMainElement, createMenuTemplate(watchStats), `beforeend`);

render(siteMainElement, createFilmsTemplate(), `beforeend`);
const siteFilmsContainer = siteMainElement.querySelector(`.films`);

render(siteFilmsContainer, createFilmsListTemplate({title: `All movies. Upcoming`, isHidden: true}), `beforeend`);

const siteFilmsListContainer = siteFilmsContainer.querySelector(`.films-list__container`);
films.slice(0, DEFAULT_SHOW).forEach( (film) => {
  render(siteFilmsListContainer, createFilmCardTemplate(film), `beforeend`);
});

render(siteFilmsContainer, createShowMoreButtonTemplate(), `beforeend`);
const showMoreButtonElement = siteMainElement.querySelector(`.films-list__show-more`);

showMoreButtonElement.addEventListener(`click`, () => {

  const prevCardCount = showingFilmsCount;
  showingFilmsCount += SHOW_MORE;

  films.slice(prevCardCount, showingFilmsCount).forEach( (film) => {
    render(siteFilmsListContainer, createFilmCardTemplate(film), `afterbegin`);
  });

  if (showingFilmsCount >= films.length) {
    showMoreButtonElement.remove();
  }

});

render(siteFilmsContainer, createFilmsListTemplate({title: `Top rated`, isExtra: true}), `beforeend`);
render(siteFilmsContainer, createFilmsListTemplate({title: `Most commented`, isExtra: true}), `beforeend`);

const topRatedListElement = siteFilmsContainer.querySelector(`.films-list--extra .films-list__container`);
const mostCommentedListElement = siteFilmsContainer.querySelector(`.films-list--extra:last-child .films-list__container`);

topRatedFilms.forEach((film) => render(topRatedListElement, createFilmCardTemplate(film), `beforeend`));
mostCommentedFilms.forEach((film) => render(mostCommentedListElement, createFilmCardTemplate(film), `beforeend`));

const siteFooterStatsElement = siteFooterElement.querySelector(`.footer__statistics`);
render(siteFooterStatsElement, createFooterStatsTemplate(films.length), `beforeend`);

const renderPopup = (film) => {

  render(siteFooterElement, createFilmDetailsTemplate(film), `beforeend`);

  const filmDetailsElement = siteFooterElement.querySelector(`.film-details`);
  const filmDetailsTopContainerElement = filmDetailsElement.querySelector(`.form-details__top-container`);
  const filmDetailsCommentsElement = filmDetailsElement.querySelector(`.film-details__comments-wrap`);
  const filmDetailsCommentsListElement = filmDetailsCommentsElement.querySelector(`.film-details__comments-list`);

  render(filmDetailsTopContainerElement, createFilmInfoTemplate(film), `beforeend`);
  render(filmDetailsTopContainerElement, createFilmControlsTemplate(film), `beforeend`);
  render(filmDetailsCommentsElement, createNewCommentTemplate(), `beforeend`);

  film.comments.forEach((comment) => render(filmDetailsCommentsListElement, createCommentTemplate(comment), `beforeend`));
};

renderPopup(films[0]);
