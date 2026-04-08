import { TestBed, ComponentFixture } from '@angular/core/testing';
import { QuestionPresenterComponent } from './question-presenter.component';
import { provideRouter } from '@angular/router';

describe('QuestionPresenterComponent', () => {
  let component: QuestionPresenterComponent;
  let fixture: ComponentFixture<QuestionPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionPresenterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('has a default question signal with two caption colors', () => {
    const q = component.question();
    expect(q.caption).toHaveLength(2);
    expect(q.caption[0]).toBe('Red');
    expect(q.caption[1]).toBe('Green');
  });

  it('default question has 4 answers', () => {
    const q = component.question();
    expect(q.answers).toHaveLength(4);
  });

  it('default question has correctIndex of 3', () => {
    expect(component.question().correctIndex).toBe(3);
  });

  it('default answers are Red, Green, Blue, Yellow', () => {
    const q = component.question();
    expect(q.answers).toEqual(['Red', 'Green', 'Blue', 'Yellow']);
  });

  it('renders the question heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.textContent).toContain('Question');
  });

  it('renders the answers section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const answers = compiled.querySelector('.answers');
    expect(answers).toBeTruthy();
  });

  it('renders exactly 4 answer items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const answerItems = compiled.querySelectorAll('.answer');
    expect(answerItems.length).toBe(4);
  });

  it('each answer has a thumbnail and caption', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const answers = compiled.querySelectorAll('.answer');
    answers.forEach((answer) => {
      expect(answer.querySelector('.thumbnail')).toBeTruthy();
      expect(answer.querySelector('.caption')).toBeTruthy();
    });
  });

  it('question signal can be updated', () => {
    component.question.set({
      caption: ['Blue', 'Yellow'],
      answers: ['Green', 'Orange', 'Purple', 'Teal'],
      correctIndex: 0,
    });
    expect(component.question().caption[0]).toBe('Blue');
    expect(component.question().answers[0]).toBe('Green');
  });
});