import { Component, computed, inject, signal } from '@angular/core';
import { Question } from '../../models/question.model';
import { SharedModule } from '../../shared/shared-module';
import { QuizStore } from '../../stores/quiz.state';

@Component({
    selector: 'app-question-presenter',
    imports: [SharedModule],
    templateUrl: './question-presenter.component.html',
    styleUrl: './question-presenter.component.scss'
})
export class QuestionPresenterComponent {
  protected readonly quizStore = inject(QuizStore);
  readonly question = this.quizStore.currentQuestion;

  addAnswer(index: number) {
    if(this.quizStore.answers().length < this.quizStore.questions().length) {
      this.quizStore.addAnswer(index)
    }
  }
}
