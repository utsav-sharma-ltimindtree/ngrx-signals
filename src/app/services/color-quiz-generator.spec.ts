import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ColorQuizGeneratorService } from './color-quiz-generator';
import { Question } from '../models/question.model';

describe('ColorQuizGeneratorService', () => {
  let service: ColorQuizGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorQuizGeneratorService);
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  it('createRandomQuiz returns an Observable', () => {
    const result = service.createRandomQuiz();
    expect(result).toBeDefined();
    expect(typeof result.subscribe).toBe('function');
  });

  it('createRandomQuiz eventually emits an array of questions', async () => {
    const questions = await firstValueFrom(service.createRandomQuiz());
    expect(Array.isArray(questions)).toBe(true);
  }, 5000);

  it('emitted quiz has at least 6 questions', async () => {
    const questions = await firstValueFrom(service.createRandomQuiz());
    expect(questions.length).toBeGreaterThanOrEqual(6);
  }, 5000);

  it('each question has caption, answers, and correctIndex', async () => {
    const questions: Question[] = await firstValueFrom(service.createRandomQuiz());
    questions.forEach((q) => {
      expect(q).toHaveProperty('caption');
      expect(q).toHaveProperty('answers');
      expect(q).toHaveProperty('correctIndex');
    });
  }, 5000);

  it('each question has exactly 4 answers', async () => {
    const questions: Question[] = await firstValueFrom(service.createRandomQuiz());
    questions.forEach((q) => {
      expect(q.answers).toHaveLength(4);
    });
  }, 5000);

  it('correctIndex is in range [0, 3] for every question', async () => {
    const questions: Question[] = await firstValueFrom(service.createRandomQuiz());
    questions.forEach((q) => {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
    });
  }, 5000);

  it('can be injected with providedIn root', () => {
    const service2 = TestBed.inject(ColorQuizGeneratorService);
    expect(service2).toBe(service);
  });
});