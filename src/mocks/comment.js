import Descriptions from "./film-data.js";
import {
  getRandomArrayItem,
  getCommentsAmount
} from "./utils.js";

const CommentAutors = [
  `Jonh Doe`,
  `Tim Macoveev`,
  `Catty Lover`,
  `Mitkin Oleg`,
  `BEST MAN EVER`,
  `Jasmine`,
  `Ninel Scavo`,
  `Tom Randle`
];

const Emoji = [`smile`, `sleeping`, `puke`, `angry`];

const generateComment = () => {
  return {
    text: getRandomArrayItem(Descriptions),
    emoji: `./images/emoji/${getRandomArrayItem(Emoji)}.png`,
    author: getRandomArrayItem(CommentAutors),
    data: ``
  };
};

const generateComments = () => {
  return new Array(getCommentsAmount()).fill(``).map(generateComment);
};

export {generateComments};