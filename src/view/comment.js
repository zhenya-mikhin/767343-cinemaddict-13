export const createCommentTemplate = (comment) => {

  const {text, emoji, autor, data} = comment;

  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-puke">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${autor}</span>
                <span class="film-details__comment-day">${data}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
};
