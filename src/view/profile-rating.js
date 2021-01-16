const RATING_TITLES = [
  {rating: 21, title: `movie buff`},
  {rating: 11, title: `fan`},
  {rating: 1, title: `novice`},
  {rating: 0, title: ``},
];

const getRatingTitle = (value) => RATING_TITLES.find(({rating}) => value >= rating).title;

export const createProfileRatingTemplate = (history) => {
  return `<section class="header__profile profile">
            <p class="profile__rating">${getRatingTitle(history)}</p>
            <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`;
};
