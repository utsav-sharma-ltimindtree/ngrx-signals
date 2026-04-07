import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BusyComponent } from './busy.component';
import { provideRouter } from '@angular/router';

describe('BusyComponent', () => {
  let component: BusyComponent;
  let fixture: ComponentFixture<BusyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusyComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BusyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders the busy text "Please wait..."', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Please wait...');
  });

  it('contains a mat-progress-spinner element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const spinner = compiled.querySelector('mat-progress-spinner');
    expect(spinner).toBeTruthy();
  });

  it('spinner is in indeterminate mode', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const spinner = compiled.querySelector('mat-progress-spinner');
    expect(spinner?.getAttribute('mode')).toBe('indeterminate');
  });

  it('contains the .content wrapper div', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const content = compiled.querySelector('.content');
    expect(content).toBeTruthy();
  });

  it('contains the .busy-text element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const busyText = compiled.querySelector('.busy-text');
    expect(busyText).toBeTruthy();
    expect(busyText?.textContent?.trim()).toBe('Please wait...');
  });
});