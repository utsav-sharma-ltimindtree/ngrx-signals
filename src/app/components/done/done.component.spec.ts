import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DoneComponent } from './done.component';
import { provideRouter } from '@angular/router';

describe('DoneComponent', () => {
  let component: DoneComponent;
  let fixture: ComponentFixture<DoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoneComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('has correct default value of 3', () => {
    expect(component.correct()).toBe(3);
  });

  it('has total default value of 8', () => {
    expect(component.total()).toBe(8);
  });

  it('computes score as correct / total', () => {
    expect(component.score()).toBeCloseTo(3 / 8);
  });

  it('score updates when correct signal changes', () => {
    component.correct.set(4);
    expect(component.score()).toBeCloseTo(4 / 8);
  });

  it('score updates when total signal changes', () => {
    component.total.set(10);
    expect(component.score()).toBeCloseTo(3 / 10);
  });

  it('score is 1 when correct equals total', () => {
    component.correct.set(5);
    component.total.set(5);
    expect(component.score()).toBe(1);
  });

  it('score is 0 when correct is 0', () => {
    component.correct.set(0);
    expect(component.score()).toBe(0);
  });

  it('score handles 100% correctly (all correct)', () => {
    component.correct.set(8);
    component.total.set(8);
    expect(component.score()).toBe(1);
  });

  it('renders the All Done heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('All Done');
  });

  it('renders the score as a percentage', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // PercentPipe formats 0.375 as "38%"
    expect(compiled.textContent).toContain('38%');
  });
});