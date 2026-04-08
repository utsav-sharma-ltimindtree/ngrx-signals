import { Component, computed, signal, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';

@Component({
    selector: 'app-done',
    imports: [SharedModule],
    templateUrl: './done.component.html',
    styleUrl: './done.component.scss'
})
export class DoneComponent {
  readonly correct = signal(3);

  readonly total = signal(8);

  @Input() set setCorrect(value: number) {
    this.correct.set(value);
  }

  @Input() set setTotal(value: number) {
    this.total.set(value);
  }

  readonly score = computed(() => {
    const t = this.total();
    return t === 0 ? 0 : this.correct() / t;
  });

}