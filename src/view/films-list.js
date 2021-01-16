const HIDDEN_CLASS = `visually-hidden`;
const EXTRA_CLASS = `--extra`;

export const createFilmsListTemplate = ({title, isExtra = false, isHidden = false}) => {
  return `<section class="films-list${isExtra ? EXTRA_CLASS : ``}">
            <h2 class="films-list__title ${isHidden ? HIDDEN_CLASS : ``}">${title}</h2>
            <div class="films-list__container">
            </div>
          </section>`;
};
