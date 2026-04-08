import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { provideRouter } from '@angular/router';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('caption', 'Test Caption');
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('displays the caption text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Caption');
  });

  it('defaults icon input to empty string', () => {
    expect(component.icon()).toBe('');
  });

  it('does not render mat-icon when icon is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('mat-icon');
    expect(icon).toBeNull();
  });

  it('renders mat-icon when icon input is provided', () => {
    fixture.componentRef.setInput('icon', 'home');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('mat-icon');
    expect(icon).toBeTruthy();
    expect(icon?.textContent?.trim()).toBe('home');
  });

  it('updates displayed caption when input changes', () => {
    fixture.componentRef.setInput('caption', 'New Caption');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('New Caption');
  });

  it('caption signal reflects the provided input value', () => {
    expect(component.caption()).toBe('Test Caption');
  });

  it('icon signal reflects the provided icon input', () => {
    fixture.componentRef.setInput('icon', 'settings');
    fixture.detectChanges();
    expect(component.icon()).toBe('settings');
  });

  it('mat-icon is hidden again when icon is cleared', () => {
    fixture.componentRef.setInput('icon', 'home');
    fixture.detectChanges();
    fixture.componentRef.setInput('icon', '');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-icon')).toBeNull();
  });

  // Boundary: caption accepts long strings
  it('renders long caption strings without error', () => {
    const longCaption = 'A'.repeat(200);
    fixture.componentRef.setInput('caption', longCaption);
    fixture.detectChanges();
    expect(component.caption()).toBe(longCaption);
  });
});