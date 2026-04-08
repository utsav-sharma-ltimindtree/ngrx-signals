import { addRgb, displayNameOfColor, getColorDisplayNameMap, randomColorQuestion, randomColorQuiz, randomItem, randomItems, randomNumber } from './helper';
import { RGB } from 'color-convert/conversions';

describe('randomNumber', () => {
  it('returns a value within [min, max) exclusive by default', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomNumber(0, 10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    }
  });

  it('returns integers only', () => {
    for (let i = 0; i < 50; i++) {
      const result = randomNumber(0, 100);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('includes max when includeMax is true', () => {
    const results = new Set<number>();
    for (let i = 0; i < 500; i++) {
      results.add(randomNumber(0, 2, true));
    }
    expect(results.has(2)).toBe(true);
    results.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(2);
    });
  });

  it('never returns max when includeMax is false (default)', () => {
    for (let i = 0; i < 200; i++) {
      const result = randomNumber(0, 1);
      expect(result).toBe(0);
    }
  });

  it('returns min when range is 1 (min === max-1)', () => {
    for (let i = 0; i < 20; i++) {
      expect(randomNumber(5, 6)).toBe(5);
    }
  });

  it('handles negative min values', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomNumber(-10, -5);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThan(-5);
    }
  });
});

describe('randomItem', () => {
  it('returns an element from the array', () => {
    const items = [1, 2, 3, 4, 5];
    for (let i = 0; i < 50; i++) {
      const result = randomItem(items);
      expect(items).toContain(result);
    }
  });

  it('can return any element from a single-item array', () => {
    expect(randomItem([42])).toBe(42);
  });

  it('returns all elements over many calls for small arrays', () => {
    const items = ['a', 'b', 'c'];
    const seen = new Set<string>();
    for (let i = 0; i < 200; i++) {
      seen.add(randomItem(items));
    }
    expect(seen).toEqual(new Set(['a', 'b', 'c']));
  });
});

describe('randomItems', () => {
  it('returns exactly count unique elements', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = randomItems(items, 3);
    expect(result).toHaveLength(3);
    const uniqueSet = new Set(result);
    expect(uniqueSet.size).toBe(3);
  });

  it('all returned items come from the source array', () => {
    const items = ['red', 'blue', 'green', 'yellow'];
    const result = randomItems(items, 2);
    result.forEach((item) => expect(items).toContain(item));
  });

  it('returns all items when count equals array length', () => {
    const items = [10, 20, 30];
    const result = randomItems(items, 3);
    expect(result).toHaveLength(3);
    expect(new Set(result)).toEqual(new Set(items));
  });

  it('does not mutate the original items array', () => {
    const items = ['a', 'b', 'c', 'd'];
    const original = [...items];
    randomItems(items, 2);
    expect(items).toEqual(original);
  });

  it('returns empty array when count is 0', () => {
    expect(randomItems([1, 2, 3], 0)).toEqual([]);
  });
});

describe('addRgb', () => {
  it('adds two RGB tuples channel by channel', () => {
    const a: RGB = [100, 150, 200];
    const b: RGB = [50, 30, 20];
    expect(addRgb(a, b)).toEqual([150, 180, 220]);
  });

  it('clamps each channel to 255', () => {
    const a: RGB = [200, 100, 255];
    const b: RGB = [100, 200, 10];
    const result = addRgb(a, b);
    expect(result[0]).toBe(255);
    expect(result[1]).toBe(255);
    expect(result[2]).toBe(255);
  });

  it('returns zeros when all inputs are zero', () => {
    expect(addRgb([0, 0, 0], [0, 0, 0])).toEqual([0, 0, 0]);
  });

  it('handles a single RGB argument', () => {
    const c: RGB = [100, 200, 50];
    expect(addRgb(c)).toEqual([100, 200, 50]);
  });

  it('handles three RGB arguments', () => {
    const a: RGB = [10, 20, 30];
    const b: RGB = [10, 20, 30];
    const c: RGB = [10, 20, 30];
    expect(addRgb(a, b, c)).toEqual([30, 60, 90]);
  });

  it('handles three arguments with clamping', () => {
    const a: RGB = [100, 0, 0];
    const b: RGB = [100, 0, 0];
    const c: RGB = [100, 0, 0];
    expect(addRgb(a, b, c)).toEqual([255, 0, 0]);
  });

  it('red + green + blue primary colors clamp to white', () => {
    // red=255,0,0 + lime=0,255,0 + blue=0,0,255 => 255,255,255
    const red: RGB = [255, 0, 0];
    const green: RGB = [0, 255, 0];
    const blue: RGB = [0, 0, 255];
    expect(addRgb(red, green, blue)).toEqual([255, 255, 255]);
  });
});

describe('getColorDisplayNameMap', () => {
  it('returns an object with lowercase keys', () => {
    const map = getColorDisplayNameMap();
    Object.keys(map).forEach((key) => {
      expect(key).toBe(key.toLowerCase());
    });
  });

  it('contains well-known color names', () => {
    const map = getColorDisplayNameMap();
    expect(map).toHaveProperty('red');
    expect(map).toHaveProperty('blue');
    expect(map).toHaveProperty('green');
    expect(map).toHaveProperty('white');
    expect(map).toHaveProperty('black');
  });

  it('splits camel-case color names into spaced words', () => {
    const map = getColorDisplayNameMap();
    expect(map['aliceblue']).toBe('Alice Blue');
    expect(map['antiquewhite']).toBe('Antique White');
    expect(map['cornflowerblue']).toBe('Cornflower Blue');
    expect(map['lightgoldenrodyellow']).toBe('Light Golden Rod Yellow');
  });

  it('single-word colors remain unchanged', () => {
    const map = getColorDisplayNameMap();
    expect(map['red']).toBe('Red');
    expect(map['blue']).toBe('Blue');
    expect(map['gold']).toBe('Gold');
    expect(map['cyan']).toBe('Cyan');
  });

  it('returns a non-empty map with many entries', () => {
    const map = getColorDisplayNameMap();
    expect(Object.keys(map).length).toBeGreaterThan(100);
  });
});

describe('displayNameOfColor', () => {
  it('returns display name for a known lowercase color', () => {
    expect(displayNameOfColor('red')).toBe('Red');
    expect(displayNameOfColor('blue')).toBe('Blue');
    expect(displayNameOfColor('aliceblue')).toBe('Alice Blue');
  });

  it('is case-insensitive', () => {
    expect(displayNameOfColor('Red')).toBe('Red');
    expect(displayNameOfColor('RED')).toBe('Red');
    expect(displayNameOfColor('AliceBlue')).toBe('Alice Blue');
    expect(displayNameOfColor('ALICEBLUE')).toBe('Alice Blue');
  });

  it('returns undefined for unknown colors', () => {
    expect(displayNameOfColor('notacolor')).toBeUndefined();
    expect(displayNameOfColor('')).toBeUndefined();
    expect(displayNameOfColor('xyzcolor')).toBeUndefined();
  });

  it('handles camelCase input correctly', () => {
    expect(displayNameOfColor('lightblue')).toBe('Light Blue');
    expect(displayNameOfColor('LightBlue')).toBe('Light Blue');
    expect(displayNameOfColor('LIGHTBLUE')).toBe('Light Blue');
  });

  it('handles color names with multiple words', () => {
    expect(displayNameOfColor('mediumaquamarine')).toBe('Medium Aqua Marine');
    expect(displayNameOfColor('darkslategray')).toBe('Dark Slate Gray');
  });
});

describe('randomColorQuestion', () => {
  it('returns a Question with a caption of 2 or 3 colors', () => {
    for (let i = 0; i < 20; i++) {
      const q = randomColorQuestion();
      expect(q.caption.length).toBeGreaterThanOrEqual(2);
      expect(q.caption.length).toBeLessThanOrEqual(3);
    }
  });

  it('returns a Question with exactly 4 answers', () => {
    for (let i = 0; i < 20; i++) {
      const q = randomColorQuestion();
      expect(q.answers).toHaveLength(4);
    }
  });

  it('has a valid correctIndex in range [0, 3]', () => {
    for (let i = 0; i < 20; i++) {
      const q = randomColorQuestion();
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
    }
  });

  it('all caption colors are strings', () => {
    for (let i = 0; i < 20; i++) {
      const q = randomColorQuestion();
      q.caption.forEach((c) => expect(typeof c).toBe('string'));
    }
  });

  it('all answers are strings', () => {
    for (let i = 0; i < 20; i++) {
      const q = randomColorQuestion();
      q.answers.forEach((a) => expect(typeof a).toBe('string'));
    }
  });

  it('caption colors are distinct', () => {
    for (let i = 0; i < 20; i++) {
      const q = randomColorQuestion();
      const unique = new Set(q.caption);
      expect(unique.size).toBe(q.caption.length);
    }
  });
});

describe('randomColorQuiz', () => {
  it('returns an array of questions', () => {
    const quiz = randomColorQuiz();
    expect(Array.isArray(quiz)).toBe(true);
  });

  it('returns between 6 and 19 questions (exclusive max of 20)', () => {
    for (let i = 0; i < 10; i++) {
      const quiz = randomColorQuiz();
      expect(quiz.length).toBeGreaterThanOrEqual(6);
      expect(quiz.length).toBeLessThan(20);
    }
  });

  it('each question has caption, answers, and correctIndex', () => {
    const quiz = randomColorQuiz();
    quiz.forEach((q) => {
      expect(q).toHaveProperty('caption');
      expect(q).toHaveProperty('answers');
      expect(q).toHaveProperty('correctIndex');
    });
  });
});