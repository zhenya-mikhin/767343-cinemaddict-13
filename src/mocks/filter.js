const filmsToFilterMap = {
    All: (films) => films.length,
    Watchlist: (films) => films.filter((film) => film.isWatchlist).length,
    Watched: (films) => films.filter((film) => film.isWatched).length,
    Favorites: (films) => films.filter((film) => film.isFavorites).length,
  };
  
  export const generateFilter = (films) => {
    return Object.entries(filmsToFilterMap).map(([filterName, countFilms]) => {
      return {
        name: filterName,
        count: countFilms(films),
      };
    });
  };