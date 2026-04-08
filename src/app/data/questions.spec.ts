import { QUESTIONS } from './questions';
import { Question } from '../models/question.model';

describe('QUESTIONS data', () => {
  it('exports an array', () => {
    expect(Array.isArray(QUESTIONS)).toBe(true);
  });

  it('contains 8 questions', () => {
    expect(QUESTIONS).toHaveLength(8);
  });

  it('each question has a caption of 2 or 3 strings', () => {
    QUESTIONS.forEach((q: Question) => {
      expect(q.caption.length).toBeGreaterThanOrEqual(2);
      expect(q.caption.length).toBeLessThanOrEqual(3);
    });
  });

  it('each question has exactly 4 answers', () => {
    QUESTIONS.forEach((q: Question) => {
      expect(q.answers).toHaveLength(4);
    });
  });

  it('each question has a correctIndex in [0, 3]', () => {
    QUESTIONS.forEach((q: Question) => {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
    });
  });

  it('first question combines red, lime, blue with white as correct answer', () => {
    const q = QUESTIONS[0];
    expect(q.caption).toEqual(['red', 'lime', 'blue']);
    expect(q.correctIndex).toBe(2);
    expect(q.answers[2]).toBe('white');
  });

  it('all caption entries are non-empty strings', () => {
    QUESTIONS.forEach((q: Question) => {
      q.caption.forEach((c) => {
        expect(typeof c).toBe('string');
        expect(c.length).toBeGreaterThan(0);
      });
    });
  });

  it('all answer entries are non-empty strings', () => {
    QUESTIONS.forEach((q: Question) => {
      q.answers.forEach((a) => {
        expect(typeof a).toBe('string');
        expect(a.length).toBeGreaterThan(0);
      });
    });
  });

  it('all correctIndex values point to a valid answer', () => {
    QUESTIONS.forEach((q: Question) => {
      expect(q.answers[q.correctIndex]).toBeDefined();
    });
  });

  // Regression: ensure all caption arrays have at least 2 colors (valid tuple type)
  it('no question has a single-color caption (must be 2-tuple or 3-tuple)', () => {
    QUESTIONS.forEach((q: Question) => {
      expect(q.caption.length).not.toBe(1);
    });
  });

  it('last question combines lime and magenta with white as correct answer', () => {
    const q = QUESTIONS[QUESTIONS.length - 1];
    expect(q.caption).toEqual(['lime', 'magenta']);
    expect(q.answers[q.correctIndex]).toBe('White');
    expect(q.correctIndex).toBe(2);
  });
});