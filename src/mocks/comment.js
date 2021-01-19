import {Descriptions} from "./film-data.js";
import {
  getRandomArrayItem
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
    emoji: getRandomArrayItem(Emoji),
    author: getRandomArrayItem(CommentAutors),
    data: ``
  };
};

const generateComments = (count) => {
  return new Array(count).fill().map(generateComment);
};

export {generateComments};
