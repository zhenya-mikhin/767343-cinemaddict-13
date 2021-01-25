import Abstract from "./abstract.js";

const createFilmInfoTemplate = (film) => {

  const {
    title,
    rating,
    release,
    duration,
    genres,
    poster,
    description,
    director,
    writer,
    cast,
    country,
    ageLimit
  } = film;

  const genreTitle = {
    genre: `Genre`,
    genres: `Genres`
  };
  const getGenreTitle = (genresValue) => {
    return genresValue > 1 ? genreTitle.genre : genreTitle.genres;
  };

  const createGenreTemplate = (genreValue) => {
    return `<span class="film-details__genre">${genreValue}</span>`;
  };
  const createGanresTemplate = (genresValue) => {
    return genresValue.map(createGenreTemplate).join(``);
  };

  return `<div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

              <p class="film-details__age">${ageLimit}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writer}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${cast}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${release}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${getGenreTitle(genres)}</td>
                  <td class="film-details__cell">
                    ${createGanresTemplate(genres)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>`;
};

export default class FilmInfoView extends Abstract {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmInfoTemplate(this._film);
  }
}
