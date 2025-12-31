import { Component, computed, inject, input, Input, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { QuizStore } from '../../stores/quiz.state';

@Component({
    selector: 'app-progress',
    imports: [SharedModule],
    templateUrl: './progress.component.html',
    styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  protected readonly quizStore = inject(QuizStore);
  
  readonly value = input.required<number>();

  readonly max = input.required<number>();

  readonly ratio = computed(() => this.value() / this.max());

}
