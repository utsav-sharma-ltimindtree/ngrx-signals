import { Component, computed, inject, input, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { QuizStore } from '../../stores/quiz.state';

@Component({
  selector: 'app-done',
  imports: [SharedModule],
  templateUrl: './done.component.html',
  styleUrl: './done.component.scss',
})
export class DoneComponent {
  protected readonly quizStore = inject(QuizStore);

  readonly total = this.quizStore.answers;
  readonly correct = computed(() => {
    const totalAnswers = this.total();
    const questions = this.quizStore.questions();
    const correctAnswers = totalAnswers.reduce((acc, val, i) => {
      if (val === questions[i].correctIndex) return acc + 1;
      return acc;
    }, 0);
    return correctAnswers;
  });

  readonly score = computed(() => this.correct() / this.total().length);
}
