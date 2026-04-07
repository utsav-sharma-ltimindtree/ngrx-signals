import { ColorNamePipe } from './color-name-pipe';

describe('ColorNamePipe', () => {
  let pipe: ColorNamePipe;

  beforeEach(() => {
    pipe = new ColorNamePipe();
  });

  it('creates an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a lowercase known color name to its display name', () => {
    expect(pipe.transform('red')).toBe('Red');
    expect(pipe.transform('blue')).toBe('Blue');
    expect(pipe.transform('cyan')).toBe('Cyan');
  });

  it('is case-insensitive', () => {
    expect(pipe.transform('RED')).toBe('Red');
    expect(pipe.transform('Blue')).toBe('Blue');
    expect(pipe.transform('CYAN')).toBe('Cyan');
  });

  it('handles camelCase multi-word color names', () => {
    expect(pipe.transform('aliceblue')).toBe('Alice Blue');
    expect(pipe.transform('lightblue')).toBe('Light Blue');
    expect(pipe.transform('darkslategray')).toBe('Dark Slate Gray');
  });

  it('returns undefined for unknown color names', () => {
    expect(pipe.transform('notacolor')).toBeUndefined();
    expect(pipe.transform('')).toBeUndefined();
  });

  it('handles mixed case input for multi-word colors', () => {
    expect(pipe.transform('AliceBlue')).toBe('Alice Blue');
    expect(pipe.transform('LightBlue')).toBe('Light Blue');
  });

  it('handles well-known single-word colors', () => {
    expect(pipe.transform('gold')).toBe('Gold');
    expect(pipe.transform('magenta')).toBe('Magenta');
    expect(pipe.transform('white')).toBe('White');
    expect(pipe.transform('black')).toBe('Black');
  });

  // Regression: ensure that the pipe never returns numeric values or non-string types
  it('always returns string or undefined (never numeric)', () => {
    const result = pipe.transform('red');
    expect(typeof result).toBe('string');
  });
});