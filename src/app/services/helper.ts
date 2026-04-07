import { KEYWORD, RGB, rgb, keyword } from 'color-convert/conversions';
import namer from 'color-namer';
import { Question } from '../models/question.model';

/**
 * Generate a random integer within the specified numeric range.
 *
 * @param min - The inclusive lower bound of the range.
 * @param max - The upper bound of the range; exclusive by default.
 * @param includeMax - When `true`, treat `max` as inclusive; otherwise `max` is exclusive.
 * @returns A random integer greater than or equal to `min` and less than `max`, or less than or equal to `max` when `includeMax` is `true`.
 */
export function randomNumber(min: number, max: number, includeMax = false): number {
  const range = includeMax ? max - min + 1 : max - min;
  return Math.floor(Math.random() * range) + min;
}

/**
 * Selects a random element from an array.
 *
 * @param items - The array to pick an element from.
 * @returns The randomly selected element from `items`, or `undefined` if `items` is empty.
 */
export function randomItem<T>(items: T[]): T {
  const index = randomNumber(0, items.length);
  return items[index];
}

/**
 * Selects `count` unique random elements from `items` without replacement.
 *
 * @param items - Source array to sample from; the original array is not mutated.
 * @param count - Number of distinct elements to return
 * @returns An array of `count` distinct elements chosen at random. Uniqueness is determined by strict inequality (`!==`).
 */
export function randomItems<T>(items: T[], count: number): T[] {
  const res: T[] = [];

  while (res.length < count) {
    const newItem = randomItem(items);
    items = items.filter((i) => i !== newItem);
    res.push(newItem);
  }

  return res;
}

const KNOWN_COLORS: KEYWORD[] = [
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'magenta',
  'cyan',
  'gray',
  'brown',
  'teal',
  'gold',
  'lime',
  'tomato',
];

/**
 * Combines multiple RGB colors by summing their channels and clamping each channel to 255.
 *
 * @param rgbs - One or more RGB tuples to add together
 * @returns The resulting RGB tuple; each channel is the sum of the corresponding input channels, capped at 255
 */
export function addRgb(...rgbs: RGB[]): RGB {
  const res: RGB = [0, 0, 0];

  for (let index = 0; index < 3; index++) {
    const sum = rgbs.reduce((acc, c) => acc + c[index], 0);
    res[index] = Math.min(sum, 255);
  }

  return res;
}

/**
 * Builds a multiple-choice question by combining two or three color keywords and deriving candidate color names.
 *
 * The question's caption is the selected base color keywords. The answers array contains four HTML color name candidates for the combined color, with one entry replaced by the correct derived name; correctIndex identifies which answer is correct.
 *
 * @returns A `Question` whose `caption` is an array of the chosen color keywords, `answers` is an array of four color name strings (one correct), and `correctIndex` is the index of the correct answer.
 */
export function randomColorQuestion() {
  const twoOrThree = randomNumber(2, 3, true);
  const colors = randomItems([...KNOWN_COLORS], twoOrThree) as
    | [KEYWORD, KEYWORD]
    | [KEYWORD, KEYWORD, KEYWORD];
  const rgbs = colors.map((clr) => keyword.rgb(clr));
  const added = addRgb(...rgbs);
  const addedHex = rgb.hex(added);

  const htmlCols = namer(addedHex).html;
  const names = htmlCols.map((n) => n.name);
  const name = names[0];

  const answers = [names[25], names[50], names[75], names[100]];
  const correctIndex = randomNumber(0, 4);
  answers[correctIndex] = name;

  const question: Question = {
    caption: colors,
    answers,
    correctIndex,
  };
  return question;
}

/**
 * Generate a quiz composed of color-identification questions.
 *
 * @returns An array of Question objects representing the quiz; length is between 6 and 19 inclusive. Each Question contains a caption (the source colors), an array of four answers, and the index of the correct answer.
 */
export function randomColorQuiz() {
  return Array.from({
    length: randomNumber(6, 20),
  }).map((_) => randomColorQuestion());
}

/**
 * Inserts a space between a lowercase letter and a following uppercase letter.
 *
 * @param str - The input string to split at camel-case boundaries
 * @returns The input string with spaces inserted before uppercase letters that directly follow lowercase letters
 */
function splitCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

const COLOR_DISPLAY_NAMES = getColorDisplayNameMap();

/**
 * Build a lookup of HTML/CSS color names to human-friendly display names.
 *
 * Keys are the standard color names lowercased (e.g., "aliceblue"); values are the same names with spaces inserted between camel-case boundaries (e.g., "Alice Blue").
 *
 * @returns An object mapping each lowercased color name to its spaced display name.
 */
export function getColorDisplayNameMap() {
  const htmlColors = [
    'AliceBlue',
    'AntiqueWhite',
    'Aqua',
    'Aquamarine',
    'Azure',
    'Beige',
    'Bisque',
    'Black',
    'BlanchedAlmond',
    'Blue',
    'BlueViolet',
    'Brown',
    'BurlyWood',
    'CadetBlue',
    'Chartreuse',
    'Chocolate',
    'Coral',
    'CornflowerBlue',
    'Cornsilk',
    'Crimson',
    'Cyan',
    'DarkBlue',
    'DarkCyan',
    'DarkGoldenRod',
    'DarkGray',
    'DarkGrey',
    'DarkGreen',
    'DarkKhaki',
    'DarkMagenta',
    'DarkOliveGreen',
    'Darkorange',
    'DarkOrchid',
    'DarkRed',
    'DarkSalmon',
    'DarkSeaGreen',
    'DarkSlateBlue',
    'DarkSlateGray',
    'DarkSlateGrey',
    'DarkTurquoise',
    'DarkViolet',
    'DeepPink',
    'DeepSkyBlue',
    'DimGray',
    'DimGrey',
    'DodgerBlue',
    'FireBrick',
    'FloralWhite',
    'ForestGreen',
    'Fuchsia',
    'Gainsboro',
    'GhostWhite',
    'Gold',
    'GoldenRod',
    'Gray',
    'Grey',
    'Green',
    'GreenYellow',
    'HoneyDew',
    'HotPink',
    'IndianRed',
    'Indigo',
    'Ivory',
    'Khaki',
    'Lavender',
    'LavenderBlush',
    'LawnGreen',
    'LemonChiffon',
    'LightBlue',
    'LightCoral',
    'LightCyan',
    'LightGoldenRodYellow',
    'LightGray',
    'LightGrey',
    'LightGreen',
    'LightPink',
    'LightSalmon',
    'LightSeaGreen',
    'LightSkyBlue',
    'LightSlateGray',
    'LightSlateGrey',
    'LightSteelBlue',
    'LightYellow',
    'Lime',
    'LimeGreen',
    'Linen',
    'Magenta',
    'Maroon',
    'MediumAquaMarine',
    'MediumBlue',
    'MediumOrchid',
    'MediumPurple',
    'MediumSeaGreen',
    'MediumSlateBlue',
    'MediumSpringGreen',
    'MediumTurquoise',
    'MediumVioletRed',
    'MidnightBlue',
    'MintCream',
    'MistyRose',
    'Moccasin',
    'NavajoWhite',
    'Navy',
    'OldLace',
    'Olive',
    'OliveDrab',
    'Orange',
    'OrangeRed',
    'Orchid',
    'PaleGoldenRod',
    'PaleGreen',
    'PaleTurquoise',
    'PaleVioletRed',
    'PapayaWhip',
    'PeachPuff',
    'Peru',
    'Pink',
    'Plum',
    'PowderBlue',
    'Purple',
    'RebeccaPurple',
    'Red',
    'RosyBrown',
    'RoyalBlue',
    'SaddleBrown',
    'Salmon',
    'SandyBrown',
    'SeaGreen',
    'SeaShell',
    'Sienna',
    'Silver',
    'SkyBlue',
    'SlateBlue',
    'SlateGray',
    'SlateGrey',
    'Snow',
    'SpringGreen',
    'SteelBlue',
    'Tan',
    'Teal',
    'Thistle',
    'Tomato',
    'Turquoise',
    'Violet',
    'Wheat',
    'White',
    'WhiteSmoke',
    'Yellow',
    'YellowGreen',
  ];

  return Object.fromEntries(htmlColors.map((clr) => [clr.toLowerCase(), splitCamelCase(clr)]));
}

/**
 * Get the user-friendly display name for a CSS/HTML color name.
 *
 * @param color - The CSS/HTML color name (case-insensitive)
 * @returns The display name with spaces and normal casing (e.g., `Light Blue`), or `undefined` if no mapping exists
 */
export function displayNameOfColor(color: string) {
  return COLOR_DISPLAY_NAMES[color.toLowerCase()];
}
