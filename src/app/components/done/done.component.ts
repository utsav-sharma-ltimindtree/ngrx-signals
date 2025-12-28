import { Component, computed, signal } from '@angular/core';
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

  readonly score = computed(() => this.correct() / this.total());

}
