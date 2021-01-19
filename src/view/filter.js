const createFilterItemTemplate = (filter) => {

  const {name, count} = filter;

  return `<a href="#${name}" class="main-navigation__item" data-filter="is${name}">${name} <span class="main-navigation__item-count">${count}</span></a>`;
};

export const createFilterTemplate = (filterItems) => {

  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join(``);

  return `<div class="main-navigation__items">
            ${filterItemsTemplate}
          </div>`;
};

