export const createMenuTemplate = () => {

  return `<nav class="main-navigation">
            <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>

          <ul class="sort">
            <li><a href="#" class="sort__button sort_default_btn sort__button--active" data-sort="default">Sort by default</a></li>
            <li><a href="#" class="sort__button sort_by_date_btn" data-sort="release">Sort by date</a></li>
            <li><a href="#" class="sort__button sort_by_rate_btn" data-sort="rating">Sort by rating</a></li>
          </ul>`;
};
