import ProfileRatingView from "./view/profile-rating.js";
import SiteMenuView from "./view/menu.js";
import FooterStatsView from "./view/footer-stats.js";

import FilterView from './view/filter.js';
import SortView from './view/sort.js';

import FilmsView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmsListContainerView from './view/films-list-container.js';

import FilmCardView from './view/film-card.js';

import ShowMoreButtonView from "./view/show-more.js";

import FilmDetailsView from "./view/film-details.js";
import FilmInfoView from "./view/film-info.js";
import FilmControlsView from "./view/film-controls.js";

import CommentView from "./view/comment.js";
import NewCommentView from "./view/new-comment.js";

import {generateFilm} from "./mocks/film.js";
import {generateFilter} from "./mocks/filter.js";

import {renderTemplate, render, RenderPosition} from "./utils.js";

const DEFAULT_SHOW = 5;
const SUMMARY_FILMS_COUNT = 30;
const SHOW_MORE = 5;
const FILM_TOP_RATED = 2;
const FILM_MOST_COMMENTED = 2;

const films = new Array(SUMMARY_FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

let showingFilmsCount = DEFAULT_SHOW;

const watchedFilmsCount = () => {
  let count = 0;
  films.forEach((film) => {if (film.isWatched) {count++;}});
  return count;
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

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteMenuComponent = new SiteMenuView();

render(siteHeaderElement, new ProfileRatingView(watchedFilmsCount()).getElement());
render(siteMainElement, siteMenuComponent.getElement());
render(siteMenuComponent.getElement(), new FilterView(filters).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainElement, new SortView().getElement());

const getFilmDetails = (film) => {

  const filmDetailsComponent = new FilmDetailsView(film);
  const filmDetailsTopContainerElement = filmDetailsComponent.getElement().querySelector(`.form-details__top-container`);
  const filmDetailsCommentsElement = filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);
  const filmDetailsCommentsListElement = filmDetailsCommentsElement.querySelector(`.film-details__comments-list`);

  render(filmDetailsTopContainerElement, new FilmInfoView(film));
  render(filmDetailsTopContainerElement, new FilmControlsView(film));
  render(filmDetailsCommentsElement, new NewCommentView());
  film.comments.forEach((comment) => render(filmDetailsCommentsListElement, new CommentView(comment)));

  const closeButtonElement = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  const closeFilmDetails = () => {
    filmDetailsComponent.removeElement();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closeFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  closeButtonElement.addEventListener(`click`, closeFilmDetails);
  document.addEventListener(`keydown`, onEscKeyDown);

  return filmDetailsComponent;
};

const getFilmCard = (film) => {

  const showFilmDetails = () => {
    const anotherFilmDetailsElement = document.querySelector(`.film-details`);

    if (anotherFilmDetailsElement !== null) {
      removeElement(anotherFilmDetailsElement);
      render(siteFooterElement, getFilmDetails(film), RenderPosition.AFTEREND);
    } else {
      render(siteFooterElement, getFilmDetails(film), RenderPosition.AFTEREND);
    }
  };

  const onFilmCardElementClick = () => {
    showFilmDetails();
  };

  const filmCardComponent = new FilmCardView(film);

  const filmPosterElement = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  filmPosterElement.addEventListener(`click`, onFilmCardElementClick);

  const filmTitleElement = filmCardComponent.getElement().querySelector(`.film-card__title`);
  filmTitleElement.addEventListener(`click`, onFilmCardElementClick);

  const filmCommentsLinkElement = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  filmCommentsLinkElement.addEventListener(`click`, onFilmCardElementClick);

  return filmCardComponent;
};

const renderFilms = (films) => {
  const siteFilmsComponent = new FilmsView();
  const siteFilmsListComponent = new FilmsListView({title: `All movies. Upcoming`, isHidden: true});
  const siteFilmsListContainerComponent = new FilmsListContainerView();

  render(siteMainElement, siteFilmsComponent.getElement());

  render(siteFilmsComponent.getElement(), siteFilmsListComponent.getElement());
  render(siteFilmsListComponent.getElement(), siteFilmsListContainerComponent.getElement());
  
  films.slice(0, DEFAULT_SHOW).forEach( (film) => {
    render(siteFilmsListContainerComponent.getElement(), getFilmCard(film).getElement());
  });

  const sortBy = (sortAtr) => {
    const sortByValue = (a, b) => {
      return a[sortAtr] - b[sortAtr];
    };
    return sortByValue;
  };
  
  const filterBtnHandler = (evt) => {
    evt.target.classList.add(`main-navigation__item--active`);
    document.querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
    evt.target.classList.add(`main-navigation__item--active`);
    siteFilmsListContainerComponent.getElement().remove();
    siteFilmsListContainerComponent.removeElement();
  
    films
      .slice()
      .sort(sortBy(evt.target.dataset.filter))
      .slice(0, showingFilmsCount)
      .forEach((film) => render(siteFilmsListContainerComponent.getElement(), getFilmCard(film).getElement()));
  };
  
  const sortBtnHandler = (evt) => {
    document.querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
    evt.target.classList.add(`sort__button--active`);
    siteFilmsListContainerComponent.getElement().remove();
    siteFilmsListContainerComponent.removeElement();
  
    films
      .slice()
      .sort(sortBy(evt.target.dataset.sort))
      .slice(0, showingFilmsCount)
      .forEach((film) => render(siteFilmsListContainerComponent.getElement(), getFilmCard(film).getElement()));
  };
  
  document.querySelectorAll(`.main-navigation__item`)
    .forEach((btn) => btn.addEventListener(`click`, filterBtnHandler));
  
  document.querySelectorAll(`.sort__button`)
    .forEach((btn) => btn.addEventListener(`click`, sortBtnHandler));
  

  const showMoreButtonComponent = new ShowMoreButtonView();
  render(siteFilmsComponent.getElement(), showMoreButtonComponent.getElement());
  
  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const prevCardCount = showingFilmsCount;
    showingFilmsCount += SHOW_MORE;
  
    films.slice(prevCardCount, showingFilmsCount).forEach((film) => {
      render(siteFilmsListContainerComponent.getElement(), getFilmCard(film).getElement());
    });
  
    if (showingFilmsCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  
  });

  render(siteFilmsComponent.getElement(), new FilmsListView({title: `Top rated`, isExtra: true}).getElement());
  render(siteFilmsComponent.getElement(), new FilmsListView({title: `Most commented`, isExtra: true}).getElement());
  
  const topRatedListElement = siteFilmsComponent.getElement().querySelector(`.films-list--extra .films-list__container`);
  const mostCommentedListElement = siteFilmsComponent.getElement().querySelector(`.films-list--extra:last-child .films-list__container`);
  
  render(siteFilmsListComponent.getElement(), siteFilmsListContainerComponent.getElement());
  render(siteFilmsListComponent.getElement(), siteFilmsListContainerComponent.getElement());

  topRatedFilms.forEach((films) => render(topRatedListElement, new FilmCardView(films).getElement()));
  mostCommentedFilms.forEach((films) => render(mostCommentedListElement, new FilmCardView(films).getElement()));

  render(siteFooterElement, new FooterStatsView(films.length).getElement());



};

renderFilms(films);
