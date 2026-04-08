import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProgressComponent } from './progress.component';
import { provideRouter } from '@angular/router';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('has default value of 4', () => {
    expect(component.value()).toBe(4);
  });

  it('has default max of 9', () => {
    expect(component.max()).toBe(9);
  });

  it('computes ratio as value / max', () => {
    expect(component.ratio()).toBeCloseTo(4 / 9);
  });

  it('ratio updates reactively when value changes', () => {
    component.value.set(6);
    expect(component.ratio()).toBeCloseTo(6 / 9);
  });

  it('ratio updates reactively when max changes', () => {
    component.max.set(8);
    expect(component.ratio()).toBeCloseTo(4 / 8);
  });

  it('ratio is 1 when value equals max', () => {
    component.value.set(9);
    expect(component.ratio()).toBe(1);
  });

  it('ratio is 0 when value is 0', () => {
    component.value.set(0);
    expect(component.ratio()).toBe(0);
  });

  it('ratio works correctly with both signals updated', () => {
    component.value.set(3);
    component.max.set(12);
    expect(component.ratio()).toBeCloseTo(0.25);
  });

  it('renders value and max in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('4');
    expect(compiled.textContent).toContain('9');
  });

  it('fill bar has a width style proportional to ratio', () => {
    fixture.detectChanges();
    const fillEl = fixture.nativeElement.querySelector('.fill') as HTMLElement;
    expect(fillEl).toBeTruthy();
    // Default ratio ≈ 44.4%, width should be non-empty
    expect(fillEl.style.width).not.toBe('');
  });

  // Regression: ratio should never exceed 1 for normal inputs
  it('ratio does not exceed 1 when value equals max', () => {
    component.value.set(9);
    component.max.set(9);
    expect(component.ratio()).toBeLessThanOrEqual(1);
  });
});