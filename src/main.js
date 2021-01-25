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

import {render, RenderPosition, remove} from "./utils/render.js";

const DEFAULT_SHOW = 5;
const SUMMARY_FILMS_COUNT = 40;
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
const filtersComponent = new FilterView(filters);
const sortComponent = new SortView();

render(siteHeaderElement, new ProfileRatingView(watchedFilmsCount()));
render(siteMainElement, siteMenuComponent);
render(siteMenuComponent, filtersComponent, RenderPosition.AFTERBEGIN);
render(siteMainElement, sortComponent);

const getFilmDetails = (film) => {

  const filmDetailsComponent = new FilmDetailsView(film);
  const filmDetailsTopContainerElement = filmDetailsComponent.getElement().querySelector(`.form-details__top-container`);
  const filmDetailsCommentsElement = filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);
  const filmDetailsCommentsListElement = filmDetailsCommentsElement.querySelector(`.film-details__comments-list`);

  render(filmDetailsTopContainerElement, new FilmInfoView(film));
  render(filmDetailsTopContainerElement, new FilmControlsView(film));
  render(filmDetailsCommentsElement, new NewCommentView());
  film.comments.forEach((comment) => render(filmDetailsCommentsListElement, new CommentView(comment)));

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

  filmDetailsComponent.setClickHandler(() => {
    closeFilmDetails();
  });
  document.addEventListener(`keydown`, onEscKeyDown);

  return filmDetailsComponent;
};

const getFilmCard = (film) => {

  const showFilmDetails = () => {
    const filmDetailsElement = document.querySelector(`.film-details`);

    if (filmDetailsElement !== null) {
      removeElement(filmDetailsElement);
    }

    render(siteFooterElement, getFilmDetails(film), RenderPosition.AFTEREND);
  };

  const onFilmCardElementClick = () => {
    showFilmDetails();
  };

  const filmCardComponent = new FilmCardView(film);

  filmCardComponent.setClickHandlerOnFilm(() => {
    onFilmCardElementClick();
  });

  return filmCardComponent;
};

const renderFilms = (films) => {
  
  const siteFilmsComponent = new FilmsView();

  if (films.length === 0) {
    render(siteFilmsComponent, new FilmsListView({title: `There are no movies in our database`}));
    return;
  }
  const siteFilmsListComponent = new FilmsListView({title: `All movies. Upcoming`, isHidden: true});
  const siteFilmsListContainerComponent = new FilmsListContainerView();

  render(siteMainElement, siteFilmsComponent);

  render(siteFilmsComponent, siteFilmsListComponent);
  render(siteFilmsListComponent, siteFilmsListContainerComponent);
  
  films.slice(0, DEFAULT_SHOW).forEach( (film) => {
    render(siteFilmsListContainerComponent, getFilmCard(film));
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

    siteFilmsListContainerComponent.getElement()
      .querySelectorAll(`.film-card`)
      .forEach((element) => element.remove());

    films
      .slice()
      .sort(sortBy(evt.target.dataset.filter))
      .slice(0, showingFilmsCount)
      .forEach((film) => render(siteFilmsListContainerComponent, getFilmCard(film)));
  };

  const sortBtnHandler = (evt) => {
    document.querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
    evt.target.classList.add(`sort__button--active`);

    siteFilmsListContainerComponent.getElement()
      .querySelectorAll(`.film-card`)
      .forEach((element) => element.remove());

    films
      .slice()
      .sort(sortBy(evt.target.dataset.sort))
      .slice(0, showingFilmsCount)
      .forEach((film) => render(siteFilmsListContainerComponent, getFilmCard(film)));
  };

  filtersComponent.setFilterTypeChangeHandler(() => {
    filterBtnHandler();
  });
  
  sortComponent.setSortTypeChangeHandler(() => {
    sortBtnHandler();
  })
  

  const showMoreButtonComponent = new ShowMoreButtonView();
  render(siteFilmsComponent, showMoreButtonComponent);
  
  const showMoreButtonClickHandler = (evt) => {
    const prevCardCount = showingFilmsCount;
    showingFilmsCount += SHOW_MORE;
  
    films.slice(prevCardCount, showingFilmsCount).forEach((film) => {
      render(siteFilmsListContainerComponent, getFilmCard(film));
    });
  
    if (showingFilmsCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  } 
  showMoreButtonComponent.setClickHandler(()=>{showMoreButtonClickHandler();});

  render(siteFilmsComponent, new FilmsListView({title: `Top rated`, isExtra: true}));
  render(siteFilmsComponent, new FilmsListView({title: `Most commented`, isExtra: true}));
  
  const topRatedListElement = siteFilmsComponent.getElement().querySelector(`.films-list--extra .films-list__container`);
  const mostCommentedListElement = siteFilmsComponent.getElement().querySelector(`.films-list--extra:last-child .films-list__container`);
  
  render(siteFilmsListComponent, siteFilmsListContainerComponent);
  render(siteFilmsListComponent, siteFilmsListContainerComponent);

  topRatedFilms.forEach((films) => render(topRatedListElement, new FilmCardView(films)));
  mostCommentedFilms.forEach((films) => render(mostCommentedListElement, new FilmCardView(films)));

  render(siteFooterElement, new FooterStatsView(films.length));
};

renderFilms(films);
